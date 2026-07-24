import PropertyTaxEstimator from "@/components/PropertyTaxEstimator";

export const metadata = {
  title: "Michigan Property Tax Estimator — MichiganHomeBuyerHQ",
  description:
    "Estimate your annual and monthly property tax by purchase price and address.",
};

export default function PropertyTaxEstimatorPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <p className="text-xs uppercase tracking-wide text-amber font-medium mb-3">
        Calculator
      </p>
      <h1 className="font-display text-3xl text-pine mb-3">
        Property Tax Estimator
      </h1>
      <p className="text-slate mb-8">
        Enter a Michigan address to see an estimated property tax bill,
        using the county's average millage rate and Michigan's taxable
        value rules.
      </p>

      <PropertyTaxEstimator />
    </div>
  );
}
