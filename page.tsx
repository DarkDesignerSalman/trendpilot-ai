
import Link from "next/link";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let articles: any[] = [];

  try {
    const db = await getDb();
    articles = await db
      .collection("articles")
      .find({ status: "published" })
      .sort({ createdAt: -1 })
      .limit(12)
      .toArray();
  } catch (error) {
    console.error("Article loading failed");
  }

  return (
    <main>
      <header className="topbar">
        <div className="container nav">
          <Link href="/" className="logo">
            TrendPilot<span>AI.</span>
          </Link>
          <nav>
            <Link href="/">Home</Link>
            <a href="#trending">Trending</a>
            <a href="#categories">Categories</a>
          </nav>
        </div>
      </header>

      <section className="hero container">
        <div className="eyebrow">YOUR DAILY INSIGHT PLATFORM</div>
        <h1>
          Ideas shaping <span>tomorrow.</span>
        </h1>
        <p>
          Discover useful perspectives on technology, business,
          lifestyle and the trends shaping our future.
        </p>

        <form action="/search" method="GET" className="search-box">
          <input
            type="search"
            name="q"
            placeholder="Search articles and trends..."
          />
          <button type="submit">Search</button>
        </form>
      </section>

      <section className="container">
        <div className="ad-slot">ADVERTISEMENT</div>
      </section>

      <section className="container" id="categories">
        <div className="section-heading">
          <div>
            <div className="eyebrow">EXPLORE</div>
            <h2>Discover Topics</h2>
          </div>
        </div>

        <div className="categories">
          {["Technology", "Business", "Lifestyle", "AI & Future"].map(
            (category) => (
              <a
                key={category}
                href={`/category/${encodeURIComponent(category)}`}
                className="category-card"
              >
                {category}
                <span>Explore →</span>
              </a>
            )
          )}
        </div>
      </section>

      <section className="container articles-section" id="trending">
        <div className="section-heading">
          <div>
            <div className="eyebrow">LATEST STORIES</div>
            <h2>Trending Articles</h2>
          </div>
        </div>

        {articles.length > 0 ? (
          <div className="article-grid">
            {articles.map((article) => (
              <article className="article-card" key={article._id.toString()}>
                <div className="article-category">
                  {article.category || "General"}
                </div>
                <h3>
                  <Link href={`/articles/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>
                <p>
                  {article.excerpt || "Discover more insights and ideas."}
                </p>
                <Link
                  href={`/articles/${article.slug}`}
                  className="read-more"
                >
                  Read Article →
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No articles published yet.</h3>
            <p>New stories will appear here soon.</p>
          </div>
        )}
      </section>

      <section className="container">
        <div className="ad-slot">ADVERTISEMENT</div>
      </section>

      <footer className="footer">
        <div className="container">
          <Link href="/" className="logo">
            TrendPilot<span>AI.</span>
          </Link>
          <p>Ideas shaping tomorrow.</p>
          <p>© {new Date().getFullYear()} TrendPilot AI. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
