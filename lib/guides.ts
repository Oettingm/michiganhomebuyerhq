import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const guidesDirectory = path.join(process.cwd(), "content/guides");

export type GuideMeta = {
  slug: string;
  title: string;
  description: string;
  category: string;
  updated: string;
};

export function getAllGuides(): GuideMeta[] {
  const filenames = fs.readdirSync(guidesDirectory);
  return filenames
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const fileContents = fs.readFileSync(
        path.join(guidesDirectory, filename),
        "utf8"
      );
      const { data } = matter(fileContents);
      return {
        slug,
        title: data.title,
        description: data.description,
        category: data.category,
        updated: data.updated,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export async function getGuideBySlug(slug: string) {
  const fullPath = path.join(guidesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(remarkHtml).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    category: data.category as string,
    updated: data.updated as string,
    contentHtml,
  };
}
