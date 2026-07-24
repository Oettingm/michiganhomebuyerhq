import Link from "next/link";
import { getAllGuides } from "@/lib/guides";

export const metadata = {
  title: "Michigan Homebuying Guides — MichiganHomeBuyerHQ",
};

export default function GuidesIndex() {
  const guides = getAllGuides();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="font-display text-3xl text-pine mb-2">Guides</h1>
      <p className="text-slate mb-10">
        Every guide answers one question. No fluff, no sales pitch.
      </p>
      <div className="space-y-6">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="block border-b border-pine/10 pb-6 hover:opacity-70 transition"
          >
            <p className="text-xs uppercase tracking-wide text-amber font-medium mb-1">
              {guide.category}
            </p>
            <h2 className="font-display text-xl text-pine">{guide.title}</h2>
            <p className="text-slate text-sm mt-1">{guide.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
