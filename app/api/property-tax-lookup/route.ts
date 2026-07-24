import { NextRequest, NextResponse } from "next/server";

// The Census Geocoder doesn't send CORS headers, so it can't be called
// directly from the browser — this route proxies the lookup server-side.
const CENSUS_GEOCODER_URL =
  "https://geocoding.geo.census.gov/geocoder/geographies/onelineaddress";

const CENSUS_TIMEOUT_MS = 10000;

type CensusGeography = {
  BASENAME?: string;
  NAME?: string;
};

type CensusAddressMatch = {
  geographies?: {
    Counties?: CensusGeography[];
    "Unified School Districts"?: CensusGeography[];
    "Elementary School Districts"?: CensusGeography[];
    "Secondary School Districts"?: CensusGeography[];
  };
};

export async function GET(request: NextRequest) {
  const address = request.nextUrl.searchParams.get("address")?.trim();

  if (!address) {
    return NextResponse.json(
      { error: "Enter an address to look up." },
      { status: 400 }
    );
  }

  const params = new URLSearchParams({
    address,
    benchmark: "Public_AR_Current",
    vintage: "Current_Current",
    layers:
      "Counties,Unified School Districts,Elementary School Districts,Secondary School Districts",
    format: "json",
  });

  let response: Response;
  try {
    response = await fetch(`${CENSUS_GEOCODER_URL}?${params.toString()}`, {
      signal: AbortSignal.timeout(CENSUS_TIMEOUT_MS),
    });
  } catch (err) {
    const timedOut = err instanceof Error && err.name === "TimeoutError";
    return NextResponse.json(
      {
        error: timedOut
          ? "The address lookup timed out. Please try again."
          : "Couldn't reach the address lookup service. Please try again.",
      },
      { status: 504 }
    );
  }

  if (!response.ok) {
    return NextResponse.json(
      { error: "Couldn't reach the address lookup service. Please try again." },
      { status: 502 }
    );
  }

  const data = await response.json();
  const matches: CensusAddressMatch[] = data?.result?.addressMatches ?? [];

  if (matches.length === 0) {
    return NextResponse.json(
      {
        error:
          "We couldn't find that address. Try a more complete address, including the city and zip code (e.g. 123 Main St, Ann Arbor, MI 48104).",
      },
      { status: 422 }
    );
  }

  const geographies = matches[0].geographies ?? {};
  const county = geographies.Counties?.[0]?.BASENAME;

  const schoolDistrict =
    geographies["Unified School Districts"]?.[0]?.BASENAME ??
    geographies["Elementary School Districts"]?.[0]?.BASENAME ??
    geographies["Secondary School Districts"]?.[0]?.BASENAME ??
    null;

  if (!county) {
    return NextResponse.json(
      {
        error:
          "We found that address but couldn't determine its county. Try a more complete address, including the city and zip code.",
      },
      { status: 422 }
    );
  }

  return NextResponse.json({ county, schoolDistrict });
}
