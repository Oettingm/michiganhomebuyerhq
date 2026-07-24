import { getAllLeads } from "@/lib/leads";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Leads — Admin",
  robots: "noindex, nofollow",
};

function formatTimestamp(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function AdminLeadsPage() {
  const leads = getAllLeads().slice().reverse();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="font-display text-3xl text-pine mb-2">Leads</h1>
      <p className="text-slate mb-10">
        {leads.length} signup{leads.length === 1 ? "" : "s"} captured from the
        homepage guide form.
      </p>

      {leads.length === 0 ? (
        <p className="text-slate">No leads yet.</p>
      ) : (
        <div className="border border-pine/10 rounded-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-pine/10 bg-pine/[0.04] text-left">
                <th className="px-4 py-3 font-medium text-pine">Name</th>
                <th className="px-4 py-3 font-medium text-pine">Email</th>
                <th className="px-4 py-3 font-medium text-pine">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, i) => (
                <tr key={`${lead.email}-${lead.submittedAt}`} className={i > 0 ? "border-t border-pine/10" : ""}>
                  <td className="px-4 py-3 text-ink">{lead.name || "—"}</td>
                  <td className="px-4 py-3 text-ink font-mono">{lead.email}</td>
                  <td className="px-4 py-3 text-slate">{formatTimestamp(lead.submittedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
