import { NextRequest, NextResponse } from "next/server";

// Nominatim's usage policy requires a descriptive User-Agent identifying the
// application, caps requests at 1/sec, and asks that results be cached
// rather than re-fetched — the client-side debounce is what keeps this
// route's call volume within that limit per user.
const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
const USER_AGENT = "MichiganHomeBuyerHQ/1.0 (https://michiganhomebuyerhq.com)";
const NOMINATIM_TIMEOUT_MS = 8000;
const MAX_SUGGESTIONS = 5;

// Rough Michigan bounding box (covers both peninsulas) — biases results
// toward Michigan without hard-excluding valid nearby matches.
const MICHIGAN_VIEWBOX = "-90.5,48.3,-82.0,41.5";

type NominatimResult = {
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    house_number?: string;
    road?: string;
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    postcode?: string;
  };
};

// Nominatim's display_name includes POI names, county, and country, which
// routinely exceeds the Census Geocoder's 100-character input limit and
// confuses its parser. Build a short mailing-style address instead, from
// the structured fields, so a selected suggestion round-trips cleanly.
function toMailingAddress(address: NonNullable<NominatimResult["address"]>) {
  const city = address.city ?? address.town ?? address.village;
  const street = [address.house_number, address.road].filter(Boolean).join(" ");
  const parts = [street, city, [ "MI", address.postcode ].filter(Boolean).join(" ")];
  return parts.filter(Boolean).join(", ");
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim();

  if (!query || query.length < 3) {
    return NextResponse.json({ suggestions: [] });
  }

  const params = new URLSearchParams({
    q: query,
    format: "json",
    addressdetails: "1",
    countrycodes: "us",
    viewbox: MICHIGAN_VIEWBOX,
    limit: "10",
  });

  let response: Response;
  try {
    response = await fetch(`${NOMINATIM_URL}?${params.toString()}`, {
      headers: { "User-Agent": USER_AGENT },
      signal: AbortSignal.timeout(NOMINATIM_TIMEOUT_MS),
    });
  } catch {
    // Autocomplete failing silently is the right degraded experience —
    // the user can still type a full address and submit manually.
    return NextResponse.json({ suggestions: [] });
  }

  if (!response.ok) {
    return NextResponse.json({ suggestions: [] });
  }

  const data: NominatimResult[] = await response.json();

  const suggestions = Array.from(
    new Set(
      data
        .filter((r) => r.address?.state === "Michigan" && r.address?.road)
        .map((r) => toMailingAddress(r.address!))
        .filter(Boolean)
    )
  ).slice(0, MAX_SUGGESTIONS);

  return NextResponse.json({ suggestions });
}
