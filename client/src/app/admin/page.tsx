"use client";

import { useEffect, useState } from "react";
import { LogOut, Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { EstateFormModal } from "@/components/admin/EstateFormModal";
import { adminCheckSession, adminLogout, deleteEstate, listAdminEstates } from "@/lib/adminApi";
import type { AdminEstate } from "@/lib/types";
import { formatNgn } from "@/lib/types";

type AuthState = "checking" | "signedOut" | "signedIn";

export default function AdminPage() {
  const [auth, setAuth] = useState<AuthState>("checking");
  const [estates, setEstates] = useState<AdminEstate[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<AdminEstate | "new" | null>(null);

  useEffect(() => {
    adminCheckSession()
      .then(() => setAuth("signedIn"))
      .catch(() => setAuth("signedOut"));
  }, []);

  async function refresh() {
    setLoading(true);
    try {
      const fresh = await listAdminEstates();
      setEstates(fresh);
      // Keep an open edit modal in sync with newly-saved plot/estate data.
      setEditing((current) => {
        if (!current || current === "new") return current;
        return fresh.find((e) => e.id === current.id) ?? current;
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (auth === "signedIn") refresh();
  }, [auth]);

  async function handleDelete(estate: AdminEstate) {
    if (!confirm(`Delete "${estate.name}"? This also removes its plots. This cannot be undone.`)) return;
    await deleteEstate(estate.id);
    refresh();
  }

  if (auth === "checking") return null;

  if (auth === "signedOut") {
    return <AdminLogin onSuccess={() => setAuth("signedIn")} />;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-bold text-navy-900">Manage estates</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={refresh}
            className="inline-flex items-center gap-1.5 rounded-md border border-navy-200 px-3 py-2 text-sm font-medium text-navy-700 hover:bg-navy-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} aria-hidden="true" />
            Refresh
          </button>
          <button
            onClick={() => setEditing("new")}
            className="inline-flex items-center gap-1.5 rounded-md bg-gold-500 px-4 py-2 text-sm font-semibold text-navy-950 hover:bg-gold-600"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            New estate
          </button>
          <button
            onClick={() => adminLogout().then(() => setAuth("signedOut"))}
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-ink-600 hover:bg-navy-50"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign out
          </button>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-navy-100 bg-white">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase tracking-wide text-ink-600">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">From</th>
              <th className="px-4 py-3">Plots</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {estates.map((estate) => (
              <tr key={estate.id} className="border-b border-navy-50 last:border-0">
                <td className="px-4 py-3 font-medium text-navy-900">{estate.name}</td>
                <td className="px-4 py-3 text-ink-600">
                  {estate.locality}, {estate.lga}
                </td>
                <td className="px-4 py-3 text-ink-600">{estate.status}</td>
                <td className="px-4 py-3 tabular-nums text-ink-600">{formatNgn(estate.startingPriceNgn)}</td>
                <td className="px-4 py-3 tabular-nums text-ink-600">
                  {estate.plots.filter((p) => p.status === "AVAILABLE").length} of {estate.plots.length}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditing(estate)}
                      className="rounded-md p-1.5 text-navy-700 hover:bg-navy-50"
                      aria-label={`Edit ${estate.name}`}
                    >
                      <Pencil className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      onClick={() => handleDelete(estate)}
                      className="rounded-md p-1.5 text-ink-500 hover:bg-danger/10 hover:text-danger"
                      aria-label={`Delete ${estate.name}`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {estates.length === 0 && !loading && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-ink-600">
                  No estates yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <EstateFormModal
          open
          onClose={() => setEditing(null)}
          estate={editing === "new" ? undefined : editing}
          onSaved={() => {
            refresh();
          }}
        />
      )}
    </div>
  );
}
