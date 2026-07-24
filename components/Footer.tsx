export default function Footer() {
  return (
    <footer className="bg-pine-dark text-paper/70 mt-24">
      <div className="max-w-5xl mx-auto px-6 py-10 text-sm leading-relaxed">
        <p className="font-display text-paper text-lg mb-3">MichiganHomeBuyerHQ</p>
        <p className="max-w-2xl mb-4">
          Free, plain-language homebuying education for Michigan. This site is for
          informational purposes only and is not a commitment to lend.
        </p>
        {/* Placeholder — replace with your compliance-approved footer language
            (NMLS #, Equal Housing Opportunity, licensing states, etc.) before launch */}
        <p className="text-xs text-paper/50">
          [Compliance footer placeholder — confirm exact required language with your
          compliance contact before this site goes live: NMLS ID, Equal Housing
          Opportunity notice, licensed-states list, company NMLS #.]
        </p>
      </div>
    </footer>
  );
}
