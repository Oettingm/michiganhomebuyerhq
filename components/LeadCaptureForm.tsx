"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function LeadCaptureForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p className="text-paper font-medium max-w-md mx-auto">
        Thanks! Check your email — the guide is on its way.
      </p>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 justify-center"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          aria-label="Name"
          className="flex-1 px-4 py-3 rounded-sm text-ink"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          aria-label="Email address"
          required
          className="flex-1 px-4 py-3 rounded-sm text-ink"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-amber text-pine-dark font-semibold px-6 py-3 rounded-sm hover:bg-amber-light transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Sending…" : "Send it to me"}
        </button>
      </form>
      {status === "error" && errorMessage && (
        <p className="text-amber-light text-sm mt-3">{errorMessage}</p>
      )}
    </div>
  );
}
