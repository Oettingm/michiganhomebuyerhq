"use client";

import { useState } from "react";

function formatCurrency(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function possessive(name: string) {
  return name.endsWith("s") ? `${name}'` : `${name}'s`;
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
const LOOKUP_TIMEOUT_MS = 15000;

type LookupResult = {
  county: string;
  schoolDistrict: string | null;
};

type Status = "idle" | "loading" | "error" | "success";

export default function PropertyTaxEstimator() {
  const [purchasePrice, setPurchasePrice] = useState(275000);
  const [isPrimaryResidence, setIsPrimaryResidence] = useState(true);
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<LookupResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmed = address.trim();
    if (!trimmed) {
      setStatus("error");
      setErrorMessage("Enter an address to look up.");
      return;
    }

    setStatus("loading");
    setErrorMessage(null);

    try {
      const res = await fetch(
        `/api/property-tax-lookup?address=${encodeURIComponent(trimmed)}`,
        { signal: AbortSignal.timeout(LOOKUP_TIMEOUT_MS) }
      );
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      const matchedCounty = COUNTIES.find(
        (c) => c.name.toLowerCase() === String(data.county).toLowerCase()
      );

      if (!matchedCounty) {
        setStatus("error");
        setErrorMessage(
          `We found this address in ${data.county} County, but we don't yet have millage data for that county. ` +
            `This tool currently covers ${COUNTIES.map((c) => c.name).join(", ")}. ` +
            `Check with your local assessor for an exact rate.`
        );
        return;
      }

      setResult({ county: matchedCounty.name, schoolDistrict: data.schoolDistrict });
      setStatus("success");
    } catch (err) {
      const timedOut = err instanceof Error && err.name === "TimeoutError";
      setStatus("error");
      setErrorMessage(
        timedOut
          ? "That lookup is taking too long. Please try again."
          : "Something went wrong looking up that address. Please try again."
      );
    }
  }

  const county = result ? COUNTIES.find((c) => c.name === result.county) : null;
  const millage = county
    ? county.homesteadMillage + (isPrimaryResidence ? 0 : NON_HOMESTEAD_ADDER_MILLS)
    : null;

  // Taxable value resets to match assessed value the year after a sale,
  // and assessed value runs roughly half of market value in Michigan.
  const taxableValue = purchasePrice * 0.5;
  const annualTax = millage !== null ? (taxableValue * millage) / 1000 : null;
  const monthlyTax = annualTax !== null ? annualTax / 12 : null;
  const effectiveRatePct =
    annualTax !== null && purchasePrice > 0 ? (annualTax / purchasePrice) * 100 : null;

  return (
    <div className="border border-pine/10 rounded-sm p-6 md:p-8 bg-white">
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
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
              Property address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Main St, Ann Arbor, MI 48104"
              className="w-full border border-pine/20 rounded-sm px-3 py-2 font-mono"
            />
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

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-pine text-paper px-6 py-3 rounded-sm font-medium hover:bg-pine-light transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Looking up address…" : "Estimate my property tax"}
        </button>
      </form>

      {status === "error" && errorMessage && (
        <div className="mt-6 border border-red-200 bg-red-50 rounded-sm p-4">
          <p className="text-red-700 text-sm">{errorMessage}</p>
        </div>
      )}

      {status === "success" && result && county && millage !== null && (
        <div className="mt-6 bg-pine/[0.04] rounded-sm p-6">
          <p className="text-xs uppercase tracking-wide text-amber font-medium mb-2 text-center">
            Detected location
          </p>
          <p className="text-pine font-medium text-center mb-1">
            {result.county} County
            {result.schoolDistrict ? ` — ${result.schoolDistrict}` : ""}
          </p>
          {result.schoolDistrict && (
            <p className="text-slate text-xs text-center mb-6">
              Rate shown reflects the county average. {possessive(result.schoolDistrict)}{" "}
              specific rate may differ slightly — check your local assessor for an
              exact figure.
            </p>
          )}
          {!result.schoolDistrict && <div className="mb-6" />}

          <p className="font-display text-4xl text-pine mb-1 text-center">
            {formatCurrency(monthlyTax!)}
            <span className="text-base text-slate">/mo</span>
          </p>
          <p className="text-slate text-sm mb-4 text-center">
            {formatCurrency(annualTax!)}/yr &middot; ~{effectiveRatePct!.toFixed(2)}% of
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
      )}

      <p className="text-xs text-slate/70 mt-4 text-center">
        Planning estimate only, using an approximate average millage rate for
        the detected county and assuming taxable value resets to roughly half
        of purchase price after a sale, per Michigan's uncapping rule. Actual
        millage rates vary by specific city/township and school district —
        confirm the exact rate with your local assessor or lender.
      </p>
    </div>
  );
}
