"use client";

import { useState } from "react";

function formatCurrency(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

// Approximate average total millage rate for an owner-occupied (homestead)
// property in each county — blends typical local, county, and school
// millages. Illustrative planning figures only; actual rates vary by
// specific city/township and school district. Non-homestead (no Principal
// Residence Exemption) adds back the standard ~18 mill school operating tax.
const COUNTIES = [
  { name: "Wayne", homesteadMillage: 50 },
  { name: "Oakland", homesteadMillage: 38 },
  { name: "Macomb", homesteadMillage: 40 },
  { name: "Kent", homesteadMillage: 36 },
  { name: "Washtenaw", homesteadMillage: 42 },
  { name: "Genesee", homesteadMillage: 46 },
  { name: "Ingham", homesteadMillage: 44 },
  { name: "Ottawa", homesteadMillage: 30 },
];

const NON_HOMESTEAD_ADDER_MILLS = 18;

export default function PropertyTaxEstimator() {
  const [purchasePrice, setPurchasePrice] = useState(275000);
  const [countyName, setCountyName] = useState(COUNTIES[0].name);
  const [isPrimaryResidence, setIsPrimaryResidence] = useState(true);

  const county = COUNTIES.find((c) => c.name === countyName)!;
  const millage =
    county.homesteadMillage + (isPrimaryResidence ? 0 : NON_HOMESTEAD_ADDER_MILLS);

  // Taxable value resets to match assessed value the year after a sale,
  // and assessed value runs roughly half of market value in Michigan.
  const taxableValue = purchasePrice * 0.5;
  const annualTax = (taxableValue * millage) / 1000;
  const monthlyTax = annualTax / 12;
  const effectiveRatePct = (annualTax / purchasePrice) * 100;

  return (
    <div className="border border-pine/10 rounded-sm p-6 md:p-8 bg-white">
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-pine mb-1">
            Purchase price
          </label>
          <input
            type="number"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(Number(e.target.value) || 0)}
            className="w-full border border-pine/20 rounded-sm px-3 py-2 font-mono"
          />
          <input
            type="range"
            min={100000}
            max={800000}
            step={5000}
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(Number(e.target.value))}
            className="w-full mt-3 accent-amber"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-pine mb-1">
            County
          </label>
          <select
            value={countyName}
            onChange={(e) => setCountyName(e.target.value)}
            className="w-full border border-pine/20 rounded-sm px-3 py-2 font-mono bg-white"
          >
            {COUNTIES.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="flex items-center gap-2 text-sm font-medium text-pine">
            <input
              type="checkbox"
              checked={isPrimaryResidence}
              onChange={(e) => setIsPrimaryResidence(e.target.checked)}
              className="accent-amber w-4 h-4"
            />
            This will be my primary residence (Principal Residence Exemption)
          </label>
        </div>
      </div>

      <div className="bg-pine/[0.04] rounded-sm p-6">
        <p className="text-xs uppercase tracking-wide text-amber font-medium mb-2 text-center">
          Estimated property tax — {county.name} County
        </p>
        <p className="font-display text-4xl text-pine mb-1 text-center">
          {formatCurrency(monthlyTax)}
          <span className="text-base text-slate">/mo</span>
        </p>
        <p className="text-slate text-sm mb-4 text-center">
          {formatCurrency(annualTax)}/yr &middot; ~{effectiveRatePct.toFixed(2)}% of
          purchase price
        </p>
        <div className="text-sm space-y-1 max-w-xs mx-auto">
          <div className="flex justify-between">
            <span className="text-slate">Est. taxable value</span>
            <span className="font-mono text-pine">{formatCurrency(taxableValue)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate">Millage rate used</span>
            <span className="font-mono text-pine">{millage.toFixed(1)} mills</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate/70 mt-4 text-center">
        Planning estimate only, using an approximate average millage rate for
        each county and assuming taxable value resets to roughly half of
        purchase price after a sale, per Michigan's uncapping rule. Actual
        millage rates vary by specific city/township and school district —
        confirm the exact rate with your local assessor or lender.
      </p>
    </div>
  );
}
