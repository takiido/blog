import { createSource } from "git-mdx-loader";
import Link from "next/link";

export const source = createSource({
  owner: "takiido",
  repo: "articles",
  debug: true,
  token: process.env.GITHUB_TOKEN,
  revalidateSeconds: 360,
});

export default async function TestPage() {
  const articles = await source.listEntries();

  return (
    <main className="container">
      <div>
        {articles.map((article, index) => (
          <div className="article" key={index}>
            <Link href={"blog/" + article.slug}>
              {article.createdAt} {article.slug}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
