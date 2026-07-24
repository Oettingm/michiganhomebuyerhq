import RentVsBuyCalculator from "@/components/RentVsBuyCalculator";

export const metadata = {
  title: "Rent vs Buy Calculator — MichiganHomeBuyerHQ",
  description:
    "Compare the real cost of renting vs buying in Michigan over the years you plan to stay, including equity, appreciation, and selling costs.",
};

export default function RentVsBuyCalculatorPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <p className="text-xs uppercase tracking-wide text-amber font-medium mb-3">
        Calculator
      </p>
      <h1 className="font-display text-3xl text-pine mb-3">
        Rent vs Buy Calculator
      </h1>
      <p className="text-slate mb-8">
        See which option actually costs less for how long you plan to stay
        — factoring in equity, appreciation, and what it costs to sell.
      </p>

      <RentVsBuyCalculator />
    </div>
  );
}
