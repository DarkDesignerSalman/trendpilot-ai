export type Article = {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  language: "en" | "bn";
  status: "draft" | "published";
  createdAt: string;
  sourceNotes?: string[];
};
