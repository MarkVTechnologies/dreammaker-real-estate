import type { AdminEstate, EstateFormInput, PlotRecord, PlotStatus } from "./types";

async function adminFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api/admin${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (res.status === 401) throw new AdminAuthError();
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed (${res.status})`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export class AdminAuthError extends Error {
  constructor() {
    super("Not authenticated");
  }
}

export const adminLogin = (password: string) =>
  adminFetch<{ ok: true }>("/login", { method: "POST", body: JSON.stringify({ password }) });

export const adminLogout = () => adminFetch<{ ok: true }>("/logout", { method: "POST" });

export const adminCheckSession = () => adminFetch<{ ok: true }>("/session");

export const listAdminEstates = () => adminFetch<AdminEstate[]>("/estates");

export const createEstate = (data: EstateFormInput) =>
  adminFetch<AdminEstate>("/estates", { method: "POST", body: JSON.stringify(data) });

export const updateEstate = (id: string, data: Partial<EstateFormInput>) =>
  adminFetch<AdminEstate>(`/estates/${id}`, { method: "PATCH", body: JSON.stringify(data) });

export const deleteEstate = (id: string) => adminFetch<void>(`/estates/${id}`, { method: "DELETE" });

export interface PlotFormInput {
  plotNumber: string;
  sizeSqm: number;
  priceNgn: number;
  status: PlotStatus;
  orientation?: string | null;
}

export const createPlot = (estateId: string, data: PlotFormInput) =>
  adminFetch<PlotRecord>(`/estates/${estateId}/plots`, { method: "POST", body: JSON.stringify(data) });

export const updatePlot = (plotId: string, data: Partial<PlotFormInput>) =>
  adminFetch<PlotRecord>(`/plots/${plotId}`, { method: "PATCH", body: JSON.stringify(data) });

export const deletePlot = (plotId: string) => adminFetch<void>(`/plots/${plotId}`, { method: "DELETE" });
