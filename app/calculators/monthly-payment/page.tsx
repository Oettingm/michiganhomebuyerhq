import MonthlyPaymentCalculator from "@/components/MonthlyPaymentCalculator";

export const metadata = {
  title: "Michigan Monthly Mortgage Payment Calculator — MichiganHomeBuyerHQ",
  description:
    "Estimate your full monthly mortgage payment including principal, interest, taxes, and insurance for a Michigan home.",
};

export default function MonthlyPaymentCalculatorPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <p className="text-xs uppercase tracking-wide text-amber font-medium mb-3">
        Calculator
      </p>
      <h1 className="font-display text-3xl text-pine mb-3">
        Monthly Payment Calculator
      </h1>
      <p className="text-slate mb-8">
        See your full estimated monthly payment — principal, interest,
        taxes, insurance, and PMI if applicable.
      </p>

      <MonthlyPaymentCalculator />
    </div>
  );
}
