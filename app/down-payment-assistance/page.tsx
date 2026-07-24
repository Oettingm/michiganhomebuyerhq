import Link from "next/link";

export const metadata = {
  title: "Down Payment Assistance in Michigan — MichiganHomeBuyerHQ",
  description:
    "Statewide MSHDA programs and city-run down payment assistance across Michigan, in one place.",
};

const CITY_PROGRAMS = [
  {
    city: "Detroit",
    name: "Detroit Down Payment Assistance Program",
    amount: "Up to $25,000",
    description:
      "Funded through federal CDBG and CDBG-DR dollars, this grant can go toward down payment, closing costs, an interest rate buydown, or principal reduction. Buyers generally need 12 months of Detroit residency (or proof of a prior property-tax foreclosure in the city), household income under 80% of area median income, and completed homebuyer education.",
  },
  {
    city: "Grand Rapids",
    name: "Homebuyer Assistance Fund (HAF)",
    amount: "Up to $7,500",
    description:
      "A zero-interest, forgivable loan for down payment, closing costs, and prepaid expenses on homes within Grand Rapids city limits. Buyers must not have owned a home in the past three years, meet income and asset limits, and commit to living in the home at least five years.",
  },
  {
    city: "Lansing",
    name: "City of Lansing Down Payment Assistance Program",
    amount: "Up to $14,999",
    description:
      "Administered through the Capital Area Housing Partnership for homes within Lansing city limits. Requires a homebuyer education course, a program-specific home inspection, and a minimum buyer contribution of $1,000.",
  },
  {
    city: "Warren",
    name: "Direct Homebuyer Assistance Program (HOME)",
    amount: "Up to $14,000 combined",
    description:
      "Covers roughly half of the required down payment plus up to $2,500 toward closing costs, structured as a forgivable second mortgage that's forgiven after five years. Applies to qualifying city-owned properties.",
  },
  {
    city: "Genesee County",
    name: "GCMPC Down Payment Assistance Program",
    amount: "Up to $10,000",
    description:
      "A zero-interest loan, forgiven after five years in the home, run by the Genesee County Metropolitan Planning Commission. It covers the county outside city limits — it explicitly excludes the Cities of Flint and Clio and the Villages of Otter Lake and Lennon, so confirm a specific address actually qualifies before counting on it.",
  },
  {
    city: "Kalamazoo County",
    name: "Homebuyer Assistance Program",
    amount: "Up to $7,000 combined",
    description:
      "Combines up to $5,000 in down payment help from the County Treasurer's office with additional closing-cost assistance from a partnering bank. Requires a minimum buyer contribution of $1,000.",
  },
];

export default function DownPaymentAssistancePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <p className="text-xs uppercase tracking-wide text-amber font-medium mb-3">
        Down Payment Assistance
      </p>
      <h1 className="font-display text-3xl md:text-4xl text-pine mb-4 leading-tight">
        Down Payment Assistance in Michigan
      </h1>
      <p className="text-slate max-w-2xl mb-12">
        Between the state's MSHDA programs and city-run assistance, most
        Michigan buyers have more help available than they realize. Here's
        where to start looking.
      </p>

      <section className="mb-16">
        <h2 className="font-display text-2xl text-pine mb-4">
          Statewide: MSHDA programs
        </h2>
        <p className="text-slate leading-relaxed mb-4">
          The Michigan State Housing Development Authority runs the
          state&rsquo;s primary down payment assistance, structured as a
          0%-interest second loan of up to $10,000 (or $12,500 in some
          targeted areas) that pairs with your main mortgage. The{" "}
          <strong>MI Home Loan</strong> program covers first-time buyers
          statewide and repeat buyers in targeted areas;{" "}
          <strong>MI Home Loan Flex</strong> opens the same assistance to
          repeat buyers statewide.
        </p>
        <p className="text-slate leading-relaxed mb-6">
          It isn&rsquo;t free money — it&rsquo;s a loan that gets repaid
          when you sell, refinance, or pay off your first mortgage — but
          for many buyers it&rsquo;s the difference between saving for
          years and buying now.
        </p>
        <Link
          href="/guides/michigan-down-payment-assistance"
          className="inline-block text-pine font-medium border-b border-amber hover:text-amber transition"
        >
          Read the full MSHDA guide →
        </Link>
      </section>

      <section>
        <h2 className="font-display text-2xl text-pine mb-2">
          Local &amp; city programs
        </h2>
        <p className="text-slate leading-relaxed mb-8">
          Several Michigan cities and counties run their own down payment
          assistance on top of MSHDA — often stackable with it, though not
          always. Terms, funding availability, and dollar amounts change
          more often than state programs do, so treat the figures below as
          a starting point and confirm current details directly with each
          city or county before counting on them.
        </p>

        <div className="space-y-6">
          {CITY_PROGRAMS.map((program) => (
            <div key={program.city} className="border border-pine/10 rounded-sm p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <h3 className="font-display text-lg text-pine">{program.city}</h3>
                <span className="text-xs uppercase tracking-wide text-amber font-medium">
                  {program.amount}
                </span>
              </div>
              <p className="text-sm text-pine/80 font-medium mb-2">{program.name}</p>
              <p className="text-slate text-sm leading-relaxed">{program.description}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate/70 mt-8">
          This isn&rsquo;t a complete list — many other Michigan cities and
          counties run smaller or less publicized programs. If you
          don&rsquo;t see your target city here, it&rsquo;s worth checking
          with its housing or community development department directly.
        </p>
      </section>

      <div className="mt-16 border border-pine/15 rounded-sm p-8 text-center bg-pine/[0.03]">
        <h2 className="font-display text-xl text-pine mb-2">
          See what this could mean for your numbers
        </h2>
        <p className="text-slate text-sm mb-5">
          Run your home price and down payment through the calculator — no
          application required.
        </p>
        <Link
          href="/calculators/closing-costs"
          className="inline-block bg-pine text-paper px-6 py-3 rounded-sm font-medium hover:bg-pine-light transition"
        >
          Try the calculator
        </Link>
      </div>
    </div>
  );
}
