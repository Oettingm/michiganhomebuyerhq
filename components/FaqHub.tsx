"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Faq } from "@/lib/faqs";

export default function FaqHub({ faqs }: { faqs: Faq[] }) {
  const [query, setQuery] = useState("");

  const filteredFaqs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs;
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q)
    );
  }, [faqs, query]);

  const groupedByCategory = useMemo(() => {
    const groups = new Map<string, Faq[]>();
    for (const faq of filteredFaqs) {
      const existing = groups.get(faq.category) ?? [];
      existing.push(faq);
      groups.set(faq.category, existing);
    }
    return Array.from(groups.entries()).sort((a, b) =>
      a[0].localeCompare(b[0])
    );
  }, [filteredFaqs]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search questions by keyword…"
        aria-label="Search frequently asked questions"
        className="w-full border border-pine/20 rounded-sm px-4 py-3 text-sm mb-10 bg-white focus:outline-none focus:border-amber transition"
      />

      {groupedByCategory.length === 0 ? (
        <p className="text-slate text-sm">
          No questions match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <div className="space-y-12">
          {groupedByCategory.map(([category, items]) => (
            <div key={category}>
              <h2 className="text-xs uppercase tracking-wide text-amber font-medium mb-4">
                {category}
              </h2>
              <div className="space-y-6">
                {items.map((faq) => (
                  <Link
                    key={`${faq.slug}-${faq.question}`}
                    href={`/guides/${faq.slug}#faq`}
                    className="block border border-pine/10 rounded-sm p-6 hover:border-amber transition group"
                  >
                    <h3 className="font-display text-lg text-pine mb-2 group-hover:text-amber transition">
                      {faq.question}
                    </h3>
                    <p className="text-slate text-sm leading-relaxed mb-3">
                      {faq.answer}
                    </p>
                    <p className="text-xs text-slate/60">
                      From: {faq.guideTitle}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
