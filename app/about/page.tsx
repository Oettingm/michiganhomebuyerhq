import Link from "next/link";

export const metadata = {
  title: "About — MichiganHomeBuyerHQ",
  description:
    "Free, plain-language homebuying education for Michigan — no application, no pressure, no jargon.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <p className="text-xs uppercase tracking-wide text-amber font-medium mb-3">
        About
      </p>
      <h1 className="font-display text-3xl md:text-4xl text-pine mb-6 leading-tight">
        About MichiganHomeBuyerHQ
      </h1>

      <section className="mb-10">
        <h2 className="font-display text-2xl text-pine mb-4">
          Why this site exists
        </h2>
        <p className="text-slate leading-relaxed">
          MichiganHomeBuyerHQ is meant to be a one-stop shop for Michigan
          homebuyers — plain-language guides, real calculators, and
          current down payment assistance information, all in one place.
          No application, no pressure, no jargon. The goal is to answer
          the questions buyers actually have — &ldquo;can I afford
          this,&rdquo; &ldquo;how much cash do I need,&rdquo; &ldquo;what
          programs am I missing&rdquo; — before they ever need to talk to
          a lender.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-display text-2xl text-pine mb-4">
          About Matthew Oetting
        </h2>
        <p className="text-slate leading-relaxed">
          Matthew Oetting is an <strong>Executive Loan Officer</strong>{" "}
          (NMLS #1639468) with <strong>Best Interest Financial</strong>{" "}
          (BIF Mortgage, NMLS #2469842), licensed in Michigan,
          Pennsylvania, Florida, Georgia, Texas, Colorado, Minnesota, and
          Ohio. He works with a wide range of borrowers — from standard
          W-2 buyers to more complex, credit-challenged, and
          non-traditional income situations — with a particular focus on
          down payment assistance programs.
        </p>
      </section>

      {/* Placeholder — replace with a personal note before launch. Matches
          the footer's compliance placeholder in spirit: don't ship this
          as-is. */}
      <div className="border border-pine/15 rounded-sm p-6 bg-pine/[0.03] mb-10">
        <p className="text-xs text-slate/70 leading-relaxed">
          [PLACEHOLDER — Add a few sentences here about why you personally
          started this site, and how long you&rsquo;ve been in the
          mortgage business.]
        </p>
      </div>

      <section>
        <h2 className="font-display text-2xl text-pine mb-4">Contact</h2>
        <p className="text-slate leading-relaxed">
          <a href="tel:7347550871" className="text-pine font-medium border-b border-amber hover:text-amber transition">
            734-755-0871
          </a>
          {" · "}
          <a href="mailto:matthew@bifmortgage.com" className="text-pine font-medium border-b border-amber hover:text-amber transition">
            matthew@bifmortgage.com
          </a>
          {" · "}
          <a
            href="https://bestinterest.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pine font-medium border-b border-amber hover:text-amber transition"
          >
            Bestinterest.com
          </a>
        </p>
      </section>

      <div className="mt-16 border border-pine/15 rounded-sm p-8 text-center bg-pine/[0.03]">
        <h2 className="font-display text-xl text-pine mb-2">
          Start with what you can afford
        </h2>
        <p className="text-slate text-sm mb-5">
          Run your own numbers — no application required.
        </p>
        <Link
          href="/calculators"
          className="inline-block bg-pine text-paper px-6 py-3 rounded-sm font-medium hover:bg-pine-light transition"
        >
          See the calculators
        </Link>
      </div>
    </div>
  );
}
