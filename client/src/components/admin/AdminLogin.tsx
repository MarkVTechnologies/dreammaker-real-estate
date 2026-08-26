"use client";

import { useState } from "react";
import { AlertCircle, Loader2, Lock } from "lucide-react";
import { adminLogin } from "@/lib/adminApi";

export function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await adminLogin(password);
      onSuccess();
    } catch {
      setError("Incorrect password.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4">
      <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-navy-700" aria-hidden="true" />
          <h1 className="font-display text-xl font-semibold text-navy-900">Admin login</h1>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="password"
            autoFocus
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-ink-300 px-3 py-2.5 text-sm outline-none focus:border-navy-700"
          />
          {error && (
            <p className="flex items-center gap-2 text-sm text-danger">
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-navy-900 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-60"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
