import { NextRequest,NextResponse } from "next/server";
import { getDb } from "@/lib/db";

// Configure a free external scheduler to call this endpoint. It creates a DRAFT only.
async function askGemini(prompt:string, system:string) {
 const key=process.env.GOOGLE_AI_API_KEY;
 if(!key)throw new Error("Missing GOOGLE_AI_API_KEY");
 const response=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`,{
  method:"POST",headers:{"Content-Type":"application/json"},
  body:JSON.stringify({systemInstruction:{parts:[{text:system}]},contents:[{parts:[{text:prompt}]}],generationConfig:{responseMimeType:"application/json",temperature:0.5}})
 });
 const data=await response.json();if(!response.ok)throw new Error(data?.error?.message||"Gemini API failed");
 return JSON.parse(data?.candidates?.[0]?.content?.parts?.map((p:any)=>p.text||"").join("")||"{}");
}
export async function GET(req:NextRequest){
 if(!process.env.CRON_SECRET || req.headers.get("authorization")!==`Bearer ${process.env.CRON_SECRET}`)return NextResponse.json({error:"Unauthorized"},{status:401});
 try{
  const idea=await askGemini("Suggest one evergreen topic suitable for a technology/business/lifestyle publication. Do not claim live trend research. Return JSON: {topic, category, language}.","You suggest practical, responsible editorial topics.");
  const data=await askGemini(`Write a 600-800 word ${idea.language==="bn"?"Bangla":"English"} article about ${idea.topic}. Return JSON with title, excerpt, content, sourceNotes. Do not fabricate sources or statistics.`,`You write original, careful, fact-conscious articles.`);
  const slug=(data.title||idea.topic).toLowerCase().replace(/[^a-z0-9]+/g,"-").slice(0,60)+"-"+Date.now().toString().slice(-6);
  const db=await getDb();const result=await db.collection("articles").insertOne({title:data.title||idea.topic,excerpt:data.excerpt||"",content:data.content||"",sourceNotes:data.sourceNotes||[],category:idea.category||"Insights",language:idea.language||"en",status:"draft",slug,createdAt:new Date().toISOString()});
  return NextResponse.json({ok:true,id:result.insertedId.toString(),status:"draft"});
 }catch(e:any){return NextResponse.json({error:e.message||"Cron generation failed"},{status:500});}
}
