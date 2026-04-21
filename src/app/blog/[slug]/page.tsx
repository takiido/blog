import { createSource, RenderContent } from "git-mdx-loader";
import "katex/dist/katex.min.css";
import 'highlight.js/styles/github-dark.min.css';


const source = createSource({
  owner: "takiido",
  repo: "articles",
  debug: true,
  revalidateSeconds: 360,
  token: process.env.GITHUB_TOKEN,
});

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await source.getEntry(slug);

  return (
    <article>
      <header>
        <h1>{article.frontmatter.title}</h1>
        <p>{article.frontmatter.description}</p>
        <time dateTime={article.frontmatter.date}>
          {article.frontmatter.date}
        </time>
        <ul>
          {article.frontmatter.tags?.map((tag: string) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </header>
      <div>
        <RenderContent content={article.content} />
      </div>
    </article>
  );
}
