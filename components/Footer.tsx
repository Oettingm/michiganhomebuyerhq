export default function Footer() {
  return (
    <footer className="bg-pine-dark text-paper/70 mt-24">
      <div className="max-w-5xl mx-auto px-6 py-10 text-sm leading-relaxed">
        <p className="font-display text-paper text-lg mb-3">MichiganHomeBuyerHQ</p>
        <p className="max-w-2xl mb-4">
          Free, plain-language homebuying education for Michigan. This site is for
          informational purposes only and is not a commitment to lend.
        </p>
        {/* Compliance review pending — confirm exact required wording with
            Best Interest Financial's compliance team before this goes live
            on the real domain */}
        <p className="text-xs text-paper/50 max-w-2xl mb-2">
          Matthew Oetting, Executive Loan Officer — NMLS #1639468. Best
          Interest Financial (BIF Mortgage), Company NMLS #2469842.
          Licensed in Michigan, Pennsylvania, Florida, Georgia, Texas,
          Colorado, Minnesota, and Ohio.
        </p>
        <p className="text-xs text-paper/50 max-w-2xl">
          Equal Housing Opportunity. This website is for informational
          purposes only and does not constitute a commitment to lend or an
          offer to extend credit. All loan programs are subject to
          borrower qualification, credit approval, and underwriting
          guidelines, and are not available in all states. Rates, terms,
          and program availability are subject to change without notice.
        </p>
      </div>
    </footer>
  );
}
