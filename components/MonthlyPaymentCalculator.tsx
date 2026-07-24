"use client";

import { useState } from "react";

function formatCurrency(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export default function MonthlyPaymentCalculator() {
  const [homePrice, setHomePrice] = useState(275000);
  const [downPaymentPct, setDownPaymentPct] = useState(10);
  const [interestRate, setInterestRate] = useState(6.5);
  const [termYears, setTermYears] = useState(30);
  const [taxRatePct, setTaxRatePct] = useState(1.6);
  const [annualInsurance, setAnnualInsurance] = useState(1400);

  const downPayment = (homePrice * downPaymentPct) / 100;
  const loanAmount = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = termYears * 12;

  const principalAndInterest =
    monthlyRate === 0
      ? loanAmount / numPayments
      : (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);

  const monthlyTax = (homePrice * (taxRatePct / 100)) / 12;
  const monthlyInsurance = annualInsurance / 12;

  // Rough PMI estimate: ~0.5%/yr of loan amount if under 20% down
  const monthlyPMI =
    downPaymentPct < 20 ? (loanAmount * 0.005) / 12 : 0;

  const total = principalAndInterest + monthlyTax + monthlyInsurance + monthlyPMI;

  return (
    <div className="border border-pine/10 rounded-sm p-6 md:p-8 bg-white">
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-pine mb-1">
            Home price
          </label>
          <input
            type="number"
            value={homePrice}
            onChange={(e) => setHomePrice(Number(e.target.value) || 0)}
            className="w-full border border-pine/20 rounded-sm px-3 py-2 font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-pine mb-1">
            Down payment ({downPaymentPct}%) — {formatCurrency(downPayment)}
          </label>
          <input
            type="range"
            min={0}
            max={30}
            step={0.5}
            value={downPaymentPct}
            onChange={(e) => setDownPaymentPct(Number(e.target.value))}
            className="w-full mt-2 accent-amber"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-pine mb-1">
            Interest rate ({interestRate}%)
          </label>
          <input
            type="range"
            min={3}
            max={9}
            step={0.125}
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full mt-2 accent-amber"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-pine mb-1">
            Loan term
          </label>
          <div className="flex gap-2">
            {[15, 30].map((t) => (
              <button
                key={t}
                onClick={() => setTermYears(t)}
                className={`px-4 py-2 rounded-sm text-sm font-medium border transition ${
                  termYears === t
                    ? "bg-pine text-paper border-pine"
                    : "border-pine/20 text-pine hover:border-amber"
                }`}
              >
                {t} years
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-pine mb-1">
            Est. property tax rate ({taxRatePct}%/yr)
          </label>
          <input
            type="range"
            min={0.8}
            max={2.5}
            step={0.05}
            value={taxRatePct}
            onChange={(e) => setTaxRatePct(Number(e.target.value))}
            className="w-full mt-2 accent-amber"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-pine mb-1">
            Annual homeowners insurance
          </label>
          <input
            type="number"
            value={annualInsurance}
            onChange={(e) => setAnnualInsurance(Number(e.target.value) || 0)}
            className="w-full border border-pine/20 rounded-sm px-3 py-2 font-mono"
          />
        </div>
      </div>

      <div className="bg-pine/[0.04] rounded-sm p-6">
        <p className="text-xs uppercase tracking-wide text-amber font-medium mb-2 text-center">
          Estimated monthly payment
        </p>
        <p className="font-display text-4xl text-pine mb-4 text-center">
          {formatCurrency(total)}
        </p>
        <div className="text-sm space-y-1 max-w-xs mx-auto">
          <div className="flex justify-between">
            <span className="text-slate">Principal & interest</span>
            <span className="font-mono text-pine">
              {formatCurrency(principalAndInterest)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate">Property tax (est.)</span>
            <span className="font-mono text-pine">
              {formatCurrency(monthlyTax)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate">Homeowners insurance</span>
            <span className="font-mono text-pine">
              {formatCurrency(monthlyInsurance)}
            </span>
          </div>
          {monthlyPMI > 0 && (
            <div className="flex justify-between">
              <span className="text-slate">PMI (est., under 20% down)</span>
              <span className="font-mono text-pine">
                {formatCurrency(monthlyPMI)}
              </span>
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-slate/70 mt-4 text-center">
        Planning estimate only. Actual PMI, tax, and insurance figures
        depend on your lender, county, and insurer.
      </p>
    </div>
  );
}
