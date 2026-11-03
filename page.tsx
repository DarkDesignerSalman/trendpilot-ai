import { getDb } from "@/lib/db";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  let article:any = null;
  try { const db = await getDb(); article = await db.collection("articles").findOne({ slug: params.slug, status: "published" }); } catch {}
  if (!article) notFound();
  return <><header className="topbar"><div className="container nav"><a className="logo" href="/">TrendPilot<span>AI.</span></a><a href="/">← Home</a></div></header>
    <main className="article"><div className="eyebrow">{article.category} · {article.language === "bn" ? "বাংলা" : "English"}</div><h1>{article.title}</h1><p className="muted">{article.excerpt}</p><div className="ad-slot">ADVERTISEMENT</div><div className="article-body">{article.content}</div>
    <div className="notice" style={{marginTop:32}}>Editorial note: This article may have been prepared with AI assistance. Verify important information against the original sources.</div></main>
  </>;
}
