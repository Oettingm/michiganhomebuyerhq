import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";

const guidesDirectory = path.join(process.cwd(), "content/guides");

export type Faq = {
  question: string;
  answer: string;
  slug: string;
  guideTitle: string;
  category: string;
};

type MdastNode = {
  type: string;
  value?: string;
  children?: MdastNode[];
};

function textFromNode(node: MdastNode): string {
  if (node.type === "text" || node.type === "inlineCode") return node.value ?? "";
  if (node.type === "break") return " ";
  if (node.children) return node.children.map(textFromNode).join("");
  return "";
}

function normalize(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

// Each FAQ paragraph is a leading bold "strong" run (the question) followed by plain text (the answer).
function extractFaqsFromMarkdown(
  markdown: string,
  meta: { slug: string; guideTitle: string; category: string }
): Faq[] {
  const tree = remark().parse(markdown) as unknown as { children: MdastNode[] };
  const nodes = tree.children;

  const startIndex = nodes.findIndex(
    (node) =>
      node.type === "heading" &&
      /frequently asked questions/i.test(textFromNode(node))
  );
  if (startIndex === -1) return [];

  const faqs: Faq[] = [];
  for (let i = startIndex + 1; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.type === "heading") break;
    if (node.type !== "paragraph" || !node.children || node.children.length === 0) {
      continue;
    }

    const [first, ...rest] = node.children;
    if (first.type !== "strong") continue;

    const question = normalize(textFromNode(first));
    const answer = normalize(rest.map(textFromNode).join(""));
    if (question && answer) {
      faqs.push({ question, answer, ...meta });
    }
  }

  return faqs;
}

export function getAllFaqs(): Faq[] {
  const filenames = fs.readdirSync(guidesDirectory);
  const faqs: Faq[] = [];

  for (const filename of filenames) {
    if (!filename.endsWith(".md")) continue;
    const slug = filename.replace(/\.md$/, "");
    const fileContents = fs.readFileSync(
      path.join(guidesDirectory, filename),
      "utf8"
    );
    const { data, content } = matter(fileContents);

    faqs.push(
      ...extractFaqsFromMarkdown(content, {
        slug,
        guideTitle: data.title,
        category: data.category,
      })
    );
  }

  return faqs;
}
