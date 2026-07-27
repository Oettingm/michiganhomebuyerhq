import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-pine text-paper">
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="font-display text-xl tracking-tight">
          Michigan<span className="text-amber-light">HomeBuyer</span>HQ
        </Link>
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <Link href="/guides" className="hover:text-amber-light transition">
            Guides
          </Link>
          <Link href="/calculators" className="hover:text-amber-light transition">
            Calculators
          </Link>
          <Link href="/down-payment-assistance" className="hover:text-amber-light transition">
            DPA Finder
          </Link>
          <Link href="/faq" className="hover:text-amber-light transition">
            FAQ
          </Link>
          <Link href="/about" className="hover:text-amber-light transition">
            About
          </Link>
        </nav>
      </div>
      {/* Signature shoreline divider — a topographic line standing in for
          Michigan's coast, the one recurring motif across the site */}
      <svg
        className="shoreline"
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,12 C60,4 120,20 180,10 C240,2 300,18 360,8 C420,2 480,16 540,10 C600,4 660,18 720,8 C780,2 840,14 900,10 C960,6 1020,18 1080,8 C1130,2 1170,14 1200,10"
          fill="none"
          stroke="#C88A2E"
          strokeWidth="2"
        />
      </svg>
    </header>
  );
}
