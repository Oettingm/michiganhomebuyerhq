import { getAllFaqs } from "@/lib/faqs";
import FaqHub from "@/components/FaqHub";

export const metadata = {
  title: "Frequently Asked Questions — MichiganHomeBuyerHQ",
};

export default function FaqPage() {
  const faqs = getAllFaqs();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="font-display text-3xl text-pine mb-2">
        Frequently asked questions
      </h1>
      <p className="text-slate mb-10">
        Every question pulled straight from our guides, grouped by topic.
        Click one to read the full article it came from.
      </p>
      <FaqHub faqs={faqs} />
    </div>
  );
}
