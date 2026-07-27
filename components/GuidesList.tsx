"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { GuideMeta } from "@/lib/guides";

export default function GuidesList({ guides }: { guides: GuideMeta[] }) {
  const [query, setQuery] = useState("");

  const filteredGuides = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return guides;
    return guides.filter(
      (guide) =>
        guide.title.toLowerCase().includes(q) ||
        guide.description.toLowerCase().includes(q)
    );
  }, [guides, query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search guides by keyword…"
        aria-label="Search guides"
        className="w-full border border-pine/20 rounded-sm px-4 py-3 text-sm mb-10 bg-white focus:outline-none focus:border-amber transition"
      />

      {filteredGuides.length === 0 ? (
        <p className="text-slate text-sm">
          No guides match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <div className="space-y-6">
          {filteredGuides.map((guide) => (
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
      )}
    </div>
  );
}
