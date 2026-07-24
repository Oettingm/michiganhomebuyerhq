import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

export type Lead = {
  name: string;
  email: string;
  submittedAt: string;
};

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, "[]", "utf8");
  }
}

export function getAllLeads(): Lead[] {
  ensureDataFile();
  try {
    return JSON.parse(fs.readFileSync(LEADS_FILE, "utf8")) as Lead[];
  } catch {
    return [];
  }
}

export function findRecentLeadByEmail(email: string, withinMs: number): Lead | undefined {
  const cutoff = Date.now() - withinMs;
  return getAllLeads().find(
    (lead) =>
      lead.email.toLowerCase() === email.toLowerCase() &&
      new Date(lead.submittedAt).getTime() > cutoff
  );
}

export function addLead(lead: Lead) {
  ensureDataFile();
  const leads = getAllLeads();
  leads.push(lead);
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf8");
}
