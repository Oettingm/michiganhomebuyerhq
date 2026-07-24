"use client";

import { useState } from "react";

const LOAN_TYPES = [
  { id: "conventional", label: "Conventional", lowPct: 2.0, highPct: 4.0 },
  { id: "fha", label: "FHA", lowPct: 2.5, highPct: 4.5 },
  { id: "va", label: "VA", lowPct: 1.5, highPct: 3.5 },
  { id: "usda", label: "USDA / RD", lowPct: 2.0, highPct: 4.0 },
];

function formatCurrency(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export default function ClosingCostCalculator() {
  const [homePrice, setHomePrice] = useState(275000);
  const [loanType, setLoanType] = useState("conventional");

  const selected = LOAN_TYPES.find((l) => l.id === loanType)!;
  const low = Math.round((homePrice * selected.lowPct) / 100);
  const high = Math.round((homePrice * selected.highPct) / 100);
  const mid = Math.round((low + high) / 2);

  return (
    <div className="border border-pine/10 rounded-sm p-6 md:p-8 bg-white">
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-pine mb-2">
            Home price
          </label>
          <div className="flex items-center gap-2">
            <span className="text-slate">$</span>
            <input
              type="number"
              value={homePrice}
              min={0}
              step={5000}
              onChange={(e) => setHomePrice(Number(e.target.value) || 0)}
              className="w-full border border-pine/20 rounded-sm px-3 py-2 font-mono"
            />
          </div>
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
          <label className="block text-sm font-medium text-pine mb-2">
            Loan type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {LOAN_TYPES.map((lt) => (
              <button
                key={lt.id}
                onClick={() => setLoanType(lt.id)}
                className={`px-3 py-2 rounded-sm text-sm font-medium border transition ${
                  loanType === lt.id
                    ? "bg-pine text-paper border-pine"
                    : "border-pine/20 text-pine hover:border-amber"
                }`}
              >
                {lt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-pine/[0.04] rounded-sm p-6 text-center">
        <p className="text-xs uppercase tracking-wide text-amber font-medium mb-2">
          Estimated closing costs
        </p>
        <p className="font-display text-4xl text-pine mb-1">
          {formatCurrency(low)} – {formatCurrency(high)}
        </p>
        <p className="text-slate text-sm">
          Midpoint estimate: {formatCurrency(mid)}
        </p>
      </div>

      <p className="text-xs text-slate/70 mt-4 text-center">
        This is a planning estimate based on typical ranges for{" "}
        {selected.label} loans in Michigan. Your actual costs depend on your
        specific lender, county, and loan details.
      </p>
    </div>
  );
}
