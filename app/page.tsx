import Link from "next/link";
import Image from "next/image";
import { getAllGuides } from "@/lib/guides";
import LeadCaptureForm from "@/components/LeadCaptureForm";

const COAST_TO_COAST_PHOTOS = [
  {
    src: "/images/lake-michigan-sunset.jpg",
    alt: "Sunset over Lake Michigan",
    caption: "Lake Michigan",
    secondary: false,
  },
  {
    src: "/images/detroit-skyline.jpg",
    alt: "The Detroit skyline at dusk",
    caption: "Detroit",
    secondary: false,
  },
  {
    src: "/images/grand-rapids.jpg",
    alt: "Downtown Grand Rapids, Michigan",
    caption: "Grand Rapids",
    secondary: false,
  },
  {
    src: "/images/joe-louis-detroit.jpg",
    alt: "The Spirit of Detroit statue in downtown Detroit",
    caption: "Spirit of Detroit",
    secondary: true,
  },
];

export default function Home() {
  const guides = getAllGuides();

  return (
    <>
      {/* Hero — the thesis: the question every visitor actually has,
          set over a Michigan skyline so the site reads as local from
          the first screen */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/detroit-skyline.jpg"
            alt="The Detroit skyline at dusk"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-pine-dark/80 via-pine-dark/70 to-pine-dark/90" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
          <p className="text-amber-light font-medium tracking-wide uppercase text-xs mb-4">
            A free Michigan homebuying resource
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-paper leading-tight mb-6">
            Can I actually afford this house?
          </h1>
          <p className="text-paper/80 text-lg max-w-2xl mx-auto mb-8">
            Plain-language guides, real calculators, and down payment assistance
            programs specific to Michigan — no application, no pressure, no
            jargon.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/calculators"
              className="bg-amber text-pine-dark px-6 py-3 rounded-sm font-medium hover:bg-amber-light transition"
            >
              See what you can afford
            </Link>
            <Link
              href="/guides"
              className="border border-paper text-paper px-6 py-3 rounded-sm font-medium hover:bg-paper hover:text-pine transition"
            >
              Browse the guides
            </Link>
          </div>
        </div>
      </section>

      {/* Michigan, Coast to Coast — a quick photo strip reinforcing this
          isn't a single-metro-area site */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="font-display text-2xl text-pine mb-2">
          Michigan, Coast to Coast
        </h2>
        <p className="text-slate mb-8 max-w-2xl">
          From the Lake Michigan shoreline to downtown Detroit — this site
          covers the whole state, not just one metro area.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-start">
          {COAST_TO_COAST_PHOTOS.map((photo) => (
            <div key={photo.src}>
              <div
                className={`relative rounded-sm overflow-hidden border border-pine/10 ${
                  photo.secondary ? "aspect-[4/3]" : "aspect-[3/4]"
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <p className="text-xs text-slate text-center mt-2">{photo.caption}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured guides — pulled live from content/guides */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="font-display text-2xl text-pine mb-8">Start here</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="block border border-pine/10 rounded-sm p-6 hover:border-amber transition group"
            >
              <p className="text-xs uppercase tracking-wide text-amber font-medium mb-2">
                {guide.category}
              </p>
              <h3 className="font-display text-lg text-pine mb-2 group-hover:text-amber transition">
                {guide.title}
              </h3>
              <p className="text-slate text-sm leading-relaxed">
                {guide.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Lead capture — a free guide, not "Apply Now" */}
      <section className="bg-pine text-paper">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="font-display text-2xl mb-3">
            Get the full Michigan Buyer&rsquo;s Guide
          </h2>
          <p className="text-paper/70 mb-6">
            Every program, every calculator, every county — in one free PDF.
          </p>
          <LeadCaptureForm />
        </div>
      </section>
    </>
  );
}
