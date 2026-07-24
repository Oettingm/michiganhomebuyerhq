import fs from "fs";
import path from "path";

// Leads themselves live in ConvertKit now — this file is purely a
// short-lived spam guard (same email can't resubmit within the window)
// and is pruned on every write so it doesn't grow forever.
const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "recent-submissions.json");
const PRUNE_AFTER_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

type Submission = { email: string; submittedAt: string };

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, "[]", "utf8");
}

function readAll(): Submission[] {
  ensureFile();
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8")) as Submission[];
  } catch {
    return [];
  }
}

export function hasRecentSubmission(email: string, withinMs: number): boolean {
  const cutoff = Date.now() - withinMs;
  return readAll().some(
    (s) => s.email === email && new Date(s.submittedAt).getTime() > cutoff
  );
}

export function recordSubmission(email: string) {
  const cutoff = Date.now() - PRUNE_AFTER_MS;
  const pruned = readAll().filter(
    (s) => new Date(s.submittedAt).getTime() > cutoff
  );
  pruned.push({ email, submittedAt: new Date().toISOString() });
  ensureFile();
  fs.writeFileSync(FILE, JSON.stringify(pruned, null, 2), "utf8");
}
