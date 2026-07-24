import { getAllGuides, getGuideBySlug } from "@/lib/guides";
import Link from "next/link";

export async function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  return {
    title: `${guide.title} — MichiganHomeBuyerHQ`,
    description: guide.description,
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <p className="text-xs uppercase tracking-wide text-amber font-medium mb-3">
        {guide.category}
      </p>
      <h1 className="font-display text-3xl md:text-4xl text-pine mb-4 leading-tight">
        {guide.title}
      </h1>
      <p className="text-slate mb-2">{guide.description}</p>
      <p className="text-xs text-slate/70 mb-10">Updated {guide.updated}</p>

      <div
        className="prose-guide"
        dangerouslySetInnerHTML={{ __html: guide.contentHtml }}
      />

      {/* Soft, non-pushy CTA — matches the "irresistible, not Apply Now" approach */}
      <div className="mt-16 border border-pine/15 rounded-sm p-8 text-center bg-pine/[0.03]">
        <h2 className="font-display text-xl text-pine mb-2">
          Want to see this with your own numbers?
        </h2>
        <p className="text-slate text-sm mb-5">
          Run the numbers on your specific home price and down payment — no
          application required.
        </p>
        <Link
          href="/calculators/closing-costs"
          className="inline-block bg-pine text-paper px-6 py-3 rounded-sm font-medium hover:bg-pine-light transition"
        >
          Try the calculator
        </Link>
      </div>
    </article>
  );
}
