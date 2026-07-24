import ClosingCostCalculator from "@/components/ClosingCostCalculator";

export const metadata = {
  title: "Michigan Closing Cost Calculator — MichiganHomeBuyerHQ",
  description:
    "Estimate your closing costs on a Michigan home purchase by loan type.",
};

export default function ClosingCostsCalculatorPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <p className="text-xs uppercase tracking-wide text-amber font-medium mb-3">
        Calculator
      </p>
      <h1 className="font-display text-3xl text-pine mb-3">
        Michigan Closing Cost Calculator
      </h1>
      <p className="text-slate mb-8">
        Enter your home price and loan type to see a realistic closing cost
        range for Michigan.
      </p>

      <ClosingCostCalculator />
    </div>
  );
}
