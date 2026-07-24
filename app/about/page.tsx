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

      <p className="text-slate leading-relaxed mb-4">
        MichiganHomeBuyerHQ exists to answer the question every buyer
        actually has — <em>can I afford this, and how would it work?</em> —
        without an application, a sales pitch, or a call you didn&rsquo;t
        ask for.
      </p>
      <p className="text-slate leading-relaxed mb-10">
        That means plain-language guides instead of jargon, real
        calculators you can run with your own numbers, and a straight
        look at Michigan-specific programs like MSHDA down payment
        assistance and city-run homebuyer help — the kind of information
        that&rsquo;s normally scattered across a dozen different sites.
      </p>

      {/* Placeholder — replace with real bio/company copy, credentials,
          and contact details before launch. Matches the footer's
          compliance placeholder in spirit: don't ship this as-is. */}
      <div className="border border-pine/15 rounded-sm p-6 bg-pine/[0.03]">
        <p className="text-xs text-slate/70 leading-relaxed">
          [About-page placeholder — replace with who&rsquo;s actually behind
          this site before launch: your name or company, background,
          licensing/NMLS details if applicable, and contact information.]
        </p>
      </div>

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
