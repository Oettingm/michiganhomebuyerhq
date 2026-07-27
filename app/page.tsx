import Link from "next/link";
import Image from "next/image";
import { getAllGuides } from "@/lib/guides";
import LeadCaptureForm from "@/components/LeadCaptureForm";

const HERO_PHOTOS = [
  { src: "/images/detroit-skyline.jpg", alt: "The Detroit skyline" },
  { src: "/images/grand-rapids.jpg", alt: "Downtown Grand Rapids, Michigan" },
  { src: "/images/joe-louis-detroit.jpg", alt: "The Spirit of Detroit / Joe Louis Fist monument" },
  { src: "/images/lake-michigan-sunset.jpg", alt: "Sunset over Lake Michigan" },
];

export default function Home() {
  const guides = getAllGuides();

  return (
    <>
      {/* Hero — the thesis: the question every visitor actually has */}
      <section className="bg-paper">
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <p className="text-amber font-medium tracking-wide uppercase text-xs mb-4">
                A free Michigan homebuying resource
              </p>
              <h1 className="font-display text-4xl md:text-5xl text-pine leading-tight mb-6">
                Can I actually afford this house?
              </h1>
              <p className="text-slate text-lg mx-auto lg:mx-0 max-w-2xl mb-8">
                Plain-language guides, real calculators, and down payment assistance
                programs specific to Michigan — no application, no pressure, no
                jargon.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Link
                  href="/calculators"
                  className="bg-pine text-paper px-6 py-3 rounded-sm font-medium hover:bg-pine-light transition"
                >
                  See what you can afford
                </Link>
                <Link
                  href="/guides"
                  className="border border-pine text-pine px-6 py-3 rounded-sm font-medium hover:bg-pine hover:text-paper transition"
                >
                  Browse the guides
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {HERO_PHOTOS.map((photo) => (
                <div
                  key={photo.src}
                  className="relative aspect-square rounded-sm overflow-hidden border border-pine/10"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 260px, 45vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
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
