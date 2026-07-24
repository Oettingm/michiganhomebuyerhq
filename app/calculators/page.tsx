import Link from "next/link";

export const metadata = {
  title: "Mortgage Calculators — MichiganHomeBuyerHQ",
  description: "Free interactive mortgage calculators for Michigan homebuyers.",
};

const calculators = [
  {
    href: "/calculators/monthly-payment",
    title: "Monthly Payment Calculator",
    description:
      "See your full estimated monthly payment — principal, interest, taxes, insurance, and PMI.",
  },
  {
    href: "/calculators/closing-costs",
    title: "Closing Cost Calculator",
    description:
      "Estimate your closing costs by home price and loan type.",
  },
  {
    href: "/calculators/rent-vs-buy",
    title: "Rent vs Buy Calculator",
    description:
      "Compare the real cost of renting vs buying over the years you plan to stay.",
  },
  {
    href: "/calculators/property-tax",
    title: "Property Tax Estimator",
    description:
      "Estimate your annual and monthly property tax by purchase price and county.",
  },
];

export default function CalculatorsIndex() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="font-display text-3xl text-pine mb-2">Calculators</h1>
      <p className="text-slate mb-10">
        Free tools to run your own numbers — no application required.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {calculators.map((calc) => (
          <Link
            key={calc.href}
            href={calc.href}
            className="block border border-pine/10 rounded-sm p-6 hover:border-amber transition group"
          >
            <h2 className="font-display text-lg text-pine mb-2 group-hover:text-amber transition">
              {calc.title}
            </h2>
            <p className="text-slate text-sm leading-relaxed">
              {calc.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
