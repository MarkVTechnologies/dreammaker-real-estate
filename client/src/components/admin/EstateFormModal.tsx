"use client";

import { useState } from "react";
import { AlertCircle, Loader2, Plus, Trash2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { createEstate, createPlot, deletePlot, updateEstate, updatePlot } from "@/lib/adminApi";
import type { AdminEstate, EstateFormInput, PlotStatus, TitleType } from "@/lib/types";
import { formatNgn } from "@/lib/types";

interface EstateFormModalProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  /** Present when editing an existing estate; absent when creating a new one. */
  estate?: AdminEstate;
}

const statusOptions = ["PLANNING", "ONGOING", "DELIVERED"] as const;
const titleTypeOptions: TitleType[] = [
  "C_OF_O",
  "GAZETTE",
  "EXCISION",
  "REGISTERED_SURVEY",
  "GOVERNORS_CONSENT",
  "DEED_OF_ASSIGNMENT",
];
const plotStatusOptions: PlotStatus[] = ["AVAILABLE", "RESERVED", "SOLD"];

const inputClass =
  "w-full rounded-md border border-ink-300 bg-white px-3 py-2 text-sm outline-none focus:border-navy-700";
const labelClass = "block text-xs font-semibold uppercase tracking-wide text-ink-600";

const linesToArray = (text: string): string[] =>
  text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

const arrayToLines = (arr: string[] | null | undefined): string => (arr ?? []).join("\n");

function emptyForm(): EstateFormInput {
  return {
    slug: "",
    name: "",
    state: "",
    lga: "",
    locality: "",
    status: "ONGOING",
    titleType: "C_OF_O",
    startingPriceNgn: 0,
    depositPercent: 0,
    plotSizesSqm: [],
    paymentPlans: [],
    features: [],
    documents: [],
    gallery: [],
    videoUrl: "",
    landmarks: [],
    faqs: [],
    seoTitle: "",
    seoDescription: "",
  };
}

export function EstateFormModal({ open, onClose, onSaved, estate }: EstateFormModalProps) {
  const isEditing = Boolean(estate);
  const [form, setForm] = useState<EstateFormInput>(() =>
    estate
      ? {
          slug: estate.slug,
          name: estate.name,
          state: estate.state,
          lga: estate.lga,
          locality: estate.locality,
          status: estate.status,
          titleType: estate.titleType,
          startingPriceNgn: estate.startingPriceNgn,
          depositPercent: estate.depositPercent,
          plotSizesSqm: estate.plotSizesSqm,
          paymentPlans: estate.paymentPlans,
          features: estate.features,
          documents: estate.documents,
          gallery: estate.gallery,
          videoUrl: estate.videoUrl ?? "",
          landmarks: estate.landmarks,
          faqs: estate.faqs,
          seoTitle: estate.seoTitle ?? "",
          seoDescription: estate.seoDescription ?? "",
        }
      : emptyForm()
  );
  const [plotSizesText, setPlotSizesText] = useState(estate?.plotSizesSqm.join(", ") ?? "");
  const [paymentPlansText, setPaymentPlansText] = useState(
    JSON.stringify(estate?.paymentPlans ?? [], null, 2)
  );
  const [faqsText, setFaqsText] = useState(JSON.stringify(estate?.faqs ?? [], null, 2));
  const [galleryText, setGalleryText] = useState(arrayToLines(estate?.gallery));
  const [featuresText, setFeaturesText] = useState(arrayToLines(estate?.features));
  const [documentsText, setDocumentsText] = useState(arrayToLines(estate?.documents));
  const [landmarksText, setLandmarksText] = useState(arrayToLines(estate?.landmarks));

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Plot management (edit mode only)
  const [newPlot, setNewPlot] = useState({ plotNumber: "", sizeSqm: "", priceNgn: "", status: "AVAILABLE" as PlotStatus });
  const [plotBusy, setPlotBusy] = useState(false);

  function update<K extends keyof EstateFormInput>(key: K, value: EstateFormInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    let paymentPlans, faqs;
    try {
      paymentPlans = JSON.parse(paymentPlansText || "[]");
      faqs = JSON.parse(faqsText || "[]");
    } catch {
      setError("Payment plans and FAQs must be valid JSON arrays.");
      return;
    }

    const plotSizesSqm = plotSizesText
      .split(",")
      .map((s) => Number(s.trim()))
      .filter((n) => Number.isFinite(n) && n > 0);

    const payload: EstateFormInput = {
      ...form,
      plotSizesSqm,
      paymentPlans,
      faqs,
      gallery: linesToArray(galleryText),
      features: linesToArray(featuresText),
      documents: linesToArray(documentsText),
      landmarks: linesToArray(landmarksText),
      videoUrl: form.videoUrl || null,
      seoTitle: form.seoTitle || null,
      seoDescription: form.seoDescription || null,
    };

    setSaving(true);
    try {
      if (isEditing && estate) {
        await updateEstate(estate.id, payload);
      } else {
        await createEstate(payload);
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save estate.");
    } finally {
      setSaving(false);
    }
  }

  async function handleAddPlot() {
    if (!estate || !newPlot.plotNumber || !newPlot.sizeSqm || !newPlot.priceNgn) return;
    setPlotBusy(true);
    try {
      await createPlot(estate.id, {
        plotNumber: newPlot.plotNumber,
        sizeSqm: Number(newPlot.sizeSqm),
        priceNgn: Number(newPlot.priceNgn),
        status: newPlot.status,
      });
      setNewPlot({ plotNumber: "", sizeSqm: "", priceNgn: "", status: "AVAILABLE" });
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add plot.");
    } finally {
      setPlotBusy(false);
    }
  }

  async function handlePlotStatusChange(plotId: string, status: PlotStatus) {
    await updatePlot(plotId, { status });
    onSaved();
  }

  async function handleDeletePlot(plotId: string) {
    await deletePlot(plotId);
    onSaved();
  }

  return (
    <Modal open={open} onClose={onClose} title={isEditing ? `Edit ${estate?.name}` : "New estate"}>
      <form onSubmit={handleSubmit} className="max-h-[70vh] space-y-5 overflow-y-auto pr-1">
        <div className="grid grid-cols-2 gap-3">
          <label className="col-span-2">
            <span className={labelClass}>Slug</span>
            <input
              className={`${inputClass} mt-1`}
              value={form.slug}
              onChange={(e) => update("slug", e.target.value)}
              pattern="[a-z0-9-]+"
              required
              disabled={isEditing}
            />
          </label>
          <label className="col-span-2">
            <span className={labelClass}>Name</span>
            <input
              className={`${inputClass} mt-1`}
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              required
            />
          </label>
          <label>
            <span className={labelClass}>State</span>
            <input className={`${inputClass} mt-1`} value={form.state} onChange={(e) => update("state", e.target.value)} required />
          </label>
          <label>
            <span className={labelClass}>LGA</span>
            <input className={`${inputClass} mt-1`} value={form.lga} onChange={(e) => update("lga", e.target.value)} required />
          </label>
          <label className="col-span-2">
            <span className={labelClass}>Locality</span>
            <input
              className={`${inputClass} mt-1`}
              value={form.locality}
              onChange={(e) => update("locality", e.target.value)}
              required
            />
          </label>
          <label>
            <span className={labelClass}>Status</span>
            <select
              className={`${inputClass} mt-1`}
              value={form.status}
              onChange={(e) => update("status", e.target.value as EstateFormInput["status"])}
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className={labelClass}>Title type</span>
            <select
              className={`${inputClass} mt-1`}
              value={form.titleType}
              onChange={(e) => update("titleType", e.target.value as TitleType)}
            >
              {titleTypeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className={labelClass}>Starting price (₦)</span>
            <input
              type="number"
              className={`${inputClass} mt-1`}
              value={form.startingPriceNgn}
              onChange={(e) => update("startingPriceNgn", Number(e.target.value))}
              required
              min={0}
            />
          </label>
          <label>
            <span className={labelClass}>Deposit %</span>
            <input
              type="number"
              className={`${inputClass} mt-1`}
              value={form.depositPercent}
              onChange={(e) => update("depositPercent", Number(e.target.value))}
              required
              min={0}
              max={100}
            />
          </label>
          <label className="col-span-2">
            <span className={labelClass}>Plot sizes (sqm, comma separated)</span>
            <input
              className={`${inputClass} mt-1`}
              value={plotSizesText}
              onChange={(e) => setPlotSizesText(e.target.value)}
              placeholder="300, 500, 1000"
            />
          </label>
          <label className="col-span-2">
            <span className={labelClass}>Video URL (YouTube, optional)</span>
            <input
              className={`${inputClass} mt-1`}
              value={form.videoUrl ?? ""}
              onChange={(e) => update("videoUrl", e.target.value)}
            />
          </label>
        </div>

        <label className="block">
          <span className={labelClass}>Gallery image paths (one per line)</span>
          <textarea
            className={`${inputClass} mt-1 h-20 font-mono text-xs`}
            value={galleryText}
            onChange={(e) => setGalleryText(e.target.value)}
            placeholder="/images/estates/my-estate/photo-1.jpg"
          />
        </label>

        <label className="block">
          <span className={labelClass}>Highlights / features (one per line)</span>
          <textarea
            className={`${inputClass} mt-1 h-20`}
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
          />
        </label>

        <label className="block">
          <span className={labelClass}>Title documents (one per line)</span>
          <textarea
            className={`${inputClass} mt-1 h-16`}
            value={documentsText}
            onChange={(e) => setDocumentsText(e.target.value)}
          />
        </label>

        <label className="block">
          <span className={labelClass}>Landmarks (one per line)</span>
          <textarea
            className={`${inputClass} mt-1 h-16`}
            value={landmarksText}
            onChange={(e) => setLandmarksText(e.target.value)}
          />
        </label>

        <label className="block">
          <span className={labelClass}>Payment plans (JSON array)</span>
          <textarea
            className={`${inputClass} mt-1 h-24 font-mono text-xs`}
            value={paymentPlansText}
            onChange={(e) => setPaymentPlansText(e.target.value)}
            placeholder='[{"name":"1 Plot","sizeSqm":500,"priceNgn":5000000}]'
          />
        </label>

        <label className="block">
          <span className={labelClass}>FAQs (JSON array)</span>
          <textarea
            className={`${inputClass} mt-1 h-24 font-mono text-xs`}
            value={faqsText}
            onChange={(e) => setFaqsText(e.target.value)}
            placeholder='[{"q":"...","a":"..."}]'
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label>
            <span className={labelClass}>SEO title</span>
            <input className={`${inputClass} mt-1`} value={form.seoTitle ?? ""} onChange={(e) => update("seoTitle", e.target.value)} />
          </label>
          <label>
            <span className={labelClass}>SEO description</span>
            <input
              className={`${inputClass} mt-1`}
              value={form.seoDescription ?? ""}
              onChange={(e) => update("seoDescription", e.target.value)}
            />
          </label>
        </div>

        {isEditing && estate && (
          <div className="rounded-lg border border-navy-100 bg-navy-50 p-4">
            <p className="text-sm font-semibold text-navy-900">Plots</p>
            <ul className="mt-2 space-y-1.5">
              {estate.plots.map((plot) => (
                <li key={plot.id} className="flex items-center gap-2 rounded-md bg-white px-2.5 py-1.5 text-sm">
                  <span className="font-medium text-navy-900">{plot.plotNumber}</span>
                  <span className="text-ink-600">
                    {plot.sizeSqm}sqm · {formatNgn(plot.priceNgn)}
                  </span>
                  <select
                    className="ml-auto rounded border border-ink-300 px-2 py-1 text-xs"
                    value={plot.status}
                    onChange={(e) => handlePlotStatusChange(plot.id, e.target.value as PlotStatus)}
                  >
                    {plotStatusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => handleDeletePlot(plot.id)}
                    className="text-ink-500 hover:text-danger"
                    aria-label={`Delete plot ${plot.plotNumber}`}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </li>
              ))}
              {estate.plots.length === 0 && <li className="text-sm text-ink-600">No plots yet.</li>}
            </ul>

            <div className="mt-3 flex flex-wrap items-end gap-2">
              <input
                placeholder="Plot #"
                className="w-24 rounded-md border border-ink-300 px-2 py-1.5 text-sm"
                value={newPlot.plotNumber}
                onChange={(e) => setNewPlot((p) => ({ ...p, plotNumber: e.target.value }))}
              />
              <input
                placeholder="Size sqm"
                type="number"
                className="w-24 rounded-md border border-ink-300 px-2 py-1.5 text-sm"
                value={newPlot.sizeSqm}
                onChange={(e) => setNewPlot((p) => ({ ...p, sizeSqm: e.target.value }))}
              />
              <input
                placeholder="Price ₦"
                type="number"
                className="w-32 rounded-md border border-ink-300 px-2 py-1.5 text-sm"
                value={newPlot.priceNgn}
                onChange={(e) => setNewPlot((p) => ({ ...p, priceNgn: e.target.value }))}
              />
              <button
                type="button"
                onClick={handleAddPlot}
                disabled={plotBusy}
                className="inline-flex items-center gap-1 rounded-md bg-navy-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-navy-800 disabled:opacity-60"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                Add plot
              </button>
            </div>
          </div>
        )}

        {error && (
          <p className="flex items-center gap-2 text-sm text-danger">
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3 border-t border-navy-100 pt-4">
          <button type="button" onClick={onClose} className="rounded-md px-4 py-2 text-sm font-medium text-ink-600 hover:bg-navy-50">
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-md bg-gold-500 px-5 py-2 text-sm font-semibold text-navy-950 hover:bg-gold-600 disabled:opacity-60"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {isEditing ? "Save changes" : "Create estate"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
