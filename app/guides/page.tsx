import { getAllGuides } from "@/lib/guides";
import GuidesList from "@/components/GuidesList";

export const metadata = {
  title: "Michigan Homebuying Guides — MichiganHomeBuyerHQ",
};

export default function GuidesIndex() {
  const guides = getAllGuides();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="font-display text-3xl text-pine mb-2">Guides</h1>
      <p className="text-slate mb-10">
        Every guide answers one question. No fluff, no sales pitch.
      </p>
      <GuidesList guides={guides} />
    </div>
  );
}
