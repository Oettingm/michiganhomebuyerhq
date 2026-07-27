import { getAllGuides, getGuideBySlug, getRelatedGuides } from "@/lib/guides";
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
  const relatedGuides = getRelatedGuides(guide.slug, guide.category);

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

      {relatedGuides.length > 0 && (
        <div className="mt-16 pt-12 border-t border-pine/10">
          <h2 className="font-display text-2xl text-pine mb-6">
            You might also want to read
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {relatedGuides.map((related) => (
              <Link
                key={related.slug}
                href={`/guides/${related.slug}`}
                className="block border border-pine/10 rounded-sm p-6 hover:border-amber transition group"
              >
                <p className="text-xs uppercase tracking-wide text-amber font-medium mb-2">
                  {related.category}
                </p>
                <h3 className="font-display text-lg text-pine mb-2 group-hover:text-amber transition">
                  {related.title}
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  {related.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
