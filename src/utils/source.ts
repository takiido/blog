import { createSource } from "git-mdx-source";

export const source = createSource({
  owner: "takiido",
  repo: "articles",
  debug: true,
  token: process.env.GITHUB_TOKEN,
  revalidateSeconds: 360,
});
