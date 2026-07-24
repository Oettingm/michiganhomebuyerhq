"use client";

import { useState } from "react";

function formatCurrency(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

// Fixed planning assumptions, kept out of the UI to avoid overwhelming the
// inputs — surfaced instead in the disclaimer below the results.
const PROPERTY_TAX_RATE_PCT = 1.6;
const ANNUAL_INSURANCE = 1400;
const MAINTENANCE_RATE_PCT = 1.0;
const CLOSING_COST_PCT = 3.0;
const SELLING_COST_PCT = 7.0;

export default function RentVsBuyCalculator() {
  const [homePrice, setHomePrice] = useState(275000);
  const [downPaymentPct, setDownPaymentPct] = useState(10);
  const [interestRate, setInterestRate] = useState(6.5);
  const [termYears, setTermYears] = useState(30);
  const [monthlyRent, setMonthlyRent] = useState(1600);
  const [rentIncreasePct, setRentIncreasePct] = useState(3);
  const [appreciationPct, setAppreciationPct] = useState(3);
  const [yearsStaying, setYearsStaying] = useState(7);

  const downPayment = (homePrice * downPaymentPct) / 100;
  const loanAmount = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = termYears * 12;
  const horizonPayments = Math.min(yearsStaying * 12, numPayments);

  const principalAndInterest =
    monthlyRate === 0
      ? loanAmount / numPayments
      : (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);

  const monthlyTax = (homePrice * (PROPERTY_TAX_RATE_PCT / 100)) / 12;
  const monthlyInsurance = ANNUAL_INSURANCE / 12;
  const monthlyMaintenance = (homePrice * (MAINTENANCE_RATE_PCT / 100)) / 12;
  const monthlyPMI = downPaymentPct < 20 ? (loanAmount * 0.005) / 12 : 0;

  const totalMonthlyOwnCost =
    principalAndInterest + monthlyTax + monthlyInsurance + monthlyMaintenance + monthlyPMI;

  // Remaining loan balance after the years-staying horizon (0 if paid off)
  const remainingBalance =
    monthlyRate === 0
      ? Math.max(loanAmount - principalAndInterest * horizonPayments, 0)
      : (loanAmount *
          (Math.pow(1 + monthlyRate, numPayments) -
            Math.pow(1 + monthlyRate, horizonPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);

  const homeValueAtEnd = homePrice * Math.pow(1 + appreciationPct / 100, yearsStaying);
  const closingCosts = (homePrice * CLOSING_COST_PCT) / 100;
  const sellingCosts = (homeValueAtEnd * SELLING_COST_PCT) / 100;

  const totalCashInBuying =
    downPayment + closingCosts + totalMonthlyOwnCost * 12 * yearsStaying;
  const netProceedsAtSale = homeValueAtEnd - remainingBalance - sellingCosts;
  const netCostBuying = totalCashInBuying - netProceedsAtSale;

  let totalRentPaid = 0;
  for (let y = 0; y < yearsStaying; y++) {
    totalRentPaid += monthlyRent * 12 * Math.pow(1 + rentIncreasePct / 100, y);
  }
  const netCostRenting = totalRentPaid;

  const difference = netCostRenting - netCostBuying;
  const buyingIsCheaper = difference > 0;

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
          <input
            type="range"
            min={100000}
            max={800000}
            step={5000}
            value={homePrice}
            onChange={(e) => setHomePrice(Number(e.target.value))}
            className="w-full mt-3 accent-amber"
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
            Current monthly rent
          </label>
          <input
            type="number"
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(Number(e.target.value) || 0)}
            className="w-full border border-pine/20 rounded-sm px-3 py-2 font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-pine mb-1">
            Annual rent increase ({rentIncreasePct}%/yr)
          </label>
          <input
            type="range"
            min={0}
            max={8}
            step={0.5}
            value={rentIncreasePct}
            onChange={(e) => setRentIncreasePct(Number(e.target.value))}
            className="w-full mt-2 accent-amber"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-pine mb-1">
            Est. home appreciation ({appreciationPct}%/yr)
          </label>
          <input
            type="range"
            min={0}
            max={6}
            step={0.5}
            value={appreciationPct}
            onChange={(e) => setAppreciationPct(Number(e.target.value))}
            className="w-full mt-2 accent-amber"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-pine mb-1">
            Years you plan to stay ({yearsStaying})
          </label>
          <input
            type="range"
            min={1}
            max={15}
            step={1}
            value={yearsStaying}
            onChange={(e) => setYearsStaying(Number(e.target.value))}
            className="w-full mt-2 accent-amber"
          />
        </div>
      </div>

      <div className="bg-pine/[0.04] rounded-sm p-6">
        <p className="text-xs uppercase tracking-wide text-amber font-medium mb-2 text-center">
          Over {yearsStaying} year{yearsStaying === 1 ? "" : "s"}
        </p>
        <p className="font-display text-3xl text-pine mb-4 text-center">
          {buyingIsCheaper
            ? `Buying saves ~${formatCurrency(Math.abs(difference))}`
            : `Renting saves ~${formatCurrency(Math.abs(difference))}`}
        </p>
        <div className="text-sm space-y-1 max-w-sm mx-auto">
          <div className="flex justify-between">
            <span className="text-slate">Net cost of buying (after equity, minus selling costs)</span>
            <span className="font-mono text-pine">{formatCurrency(netCostBuying)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate">Total cost of renting</span>
            <span className="font-mono text-pine">{formatCurrency(netCostRenting)}</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate/70 mt-4 text-center">
        Planning estimate only. Assumes {PROPERTY_TAX_RATE_PCT}% property tax,{" "}
        {formatCurrency(ANNUAL_INSURANCE)}/yr insurance, {MAINTENANCE_RATE_PCT}% annual
        maintenance, {CLOSING_COST_PCT}% closing costs, and {SELLING_COST_PCT}% selling
        costs if you sold at the end of the period. Actual costs depend on your lender,
        county, and market conditions.
      </p>
    </div>
  );
}
