import "server-only";
import { ObjectId } from "mongodb";
import type { z } from "zod";
import { getDb } from "./mongodb";
import type { EstateDoc, PlotDoc } from "./types";
import type { AdminEstate, EstateDetail, EstateSummary, PlotRecord } from "@/lib/types";
import type { estateSchema, plotSchema } from "@/lib/adminSchemas";

type EstateInput = z.infer<typeof estateSchema>;
type PlotInput = z.infer<typeof plotSchema>;

/** Drops undefined keys so a partial $set never tries to write `undefined` into Mongo. */
function withoutUndefined<T extends Record<string, unknown>>(data: T): Partial<T> {
  return Object.fromEntries(Object.entries(data).filter(([, v]) => v !== undefined)) as Partial<T>;
}

async function estates() {
  const db = await getDb();
  return db.collection<EstateDoc>("estates");
}

function plotCounts(plots: PlotDoc[]) {
  return {
    plotsAvailable: plots.filter((p) => p.status === "AVAILABLE").length,
    plotsTotal: plots.length,
  };
}

function toSummary(doc: EstateDoc): EstateSummary {
  const gallery = doc.gallery ?? [];
  return {
    slug: doc.slug,
    name: doc.name,
    locality: doc.locality,
    lga: doc.lga,
    titleType: doc.titleType,
    startingPriceNgn: doc.startingPriceNgn,
    depositPercent: doc.depositPercent,
    plotSizesSqm: doc.plotSizesSqm,
    coverImageUrl: gallery[0] ?? "",
    ...plotCounts(doc.plots),
  };
}

function toDetail(doc: EstateDoc): EstateDetail {
  return {
    id: doc._id.toHexString(),
    slug: doc.slug,
    name: doc.name,
    state: doc.state,
    lga: doc.lga,
    locality: doc.locality,
    status: doc.status,
    titleType: doc.titleType,
    startingPriceNgn: doc.startingPriceNgn,
    depositPercent: doc.depositPercent,
    plotSizesSqm: doc.plotSizesSqm,
    paymentPlans: doc.paymentPlans,
    features: doc.features,
    documents: doc.documents,
    gallery: doc.gallery,
    videoUrl: doc.videoUrl,
    landmarks: doc.landmarks,
    faqs: doc.faqs,
    seoTitle: doc.seoTitle,
    seoDescription: doc.seoDescription,
    ...plotCounts(doc.plots),
  };
}

function toPlotRecord(plot: PlotDoc): PlotRecord {
  return {
    id: plot._id.toHexString(),
    plotNumber: plot.plotNumber,
    sizeSqm: plot.sizeSqm,
    priceNgn: plot.priceNgn,
    status: plot.status,
    orientation: plot.orientation,
  };
}

function toAdminEstate(doc: EstateDoc): AdminEstate {
  return {
    id: doc._id.toHexString(),
    slug: doc.slug,
    name: doc.name,
    state: doc.state,
    lga: doc.lga,
    locality: doc.locality,
    status: doc.status,
    titleType: doc.titleType,
    startingPriceNgn: doc.startingPriceNgn,
    depositPercent: doc.depositPercent,
    plotSizesSqm: doc.plotSizesSqm,
    paymentPlans: doc.paymentPlans,
    features: doc.features,
    documents: doc.documents,
    gallery: doc.gallery,
    videoUrl: doc.videoUrl,
    landmarks: doc.landmarks,
    faqs: doc.faqs,
    seoTitle: doc.seoTitle,
    seoDescription: doc.seoDescription,
    plots: doc.plots.map(toPlotRecord),
  };
}

export async function listEstateSummaries(): Promise<EstateSummary[]> {
  const col = await estates();
  const docs = await col.find({}, { sort: { createdAt: -1 } }).toArray();
  return docs.map(toSummary);
}

export async function getEstateDetailBySlug(slug: string): Promise<EstateDetail | null> {
  const col = await estates();
  const doc = await col.findOne({ slug });
  return doc ? toDetail(doc) : null;
}

export async function getEstateDocById(id: string): Promise<EstateDoc | null> {
  if (!ObjectId.isValid(id)) return null;
  const col = await estates();
  return col.findOne({ _id: new ObjectId(id) });
}

export async function listAdminEstates(): Promise<AdminEstate[]> {
  const col = await estates();
  const docs = await col.find({}, { sort: { createdAt: -1 } }).toArray();
  return docs.map(toAdminEstate);
}

export async function createEstateDoc(data: EstateInput): Promise<AdminEstate | { error: "duplicate_slug" }> {
  const col = await estates();
  const existing = await col.findOne({ slug: data.slug });
  if (existing) return { error: "duplicate_slug" };

  const now = new Date();
  const doc: EstateDoc = {
    _id: new ObjectId(),
    slug: data.slug,
    name: data.name,
    state: data.state,
    lga: data.lga,
    locality: data.locality,
    latitude: null,
    longitude: null,
    status: data.status,
    titleType: data.titleType,
    startingPriceNgn: data.startingPriceNgn,
    depositPercent: data.depositPercent,
    plotSizesSqm: data.plotSizesSqm,
    paymentPlans: data.paymentPlans ?? null,
    features: data.features ?? null,
    documents: data.documents ?? null,
    gallery: data.gallery ?? null,
    videoUrl: data.videoUrl ?? null,
    landmarks: data.landmarks ?? null,
    faqs: data.faqs ?? null,
    seoTitle: data.seoTitle ?? null,
    seoDescription: data.seoDescription ?? null,
    plots: [],
    progressUpdates: [],
    createdAt: now,
    updatedAt: now,
  };
  await col.insertOne(doc);
  return toAdminEstate(doc);
}

export async function updateEstateDoc(
  id: string,
  data: Partial<EstateInput>
): Promise<AdminEstate | null> {
  if (!ObjectId.isValid(id)) return null;
  const col = await estates();
  const result = await col.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { ...withoutUndefined(data), updatedAt: new Date() } },
    { returnDocument: "after" }
  );
  return result ? toAdminEstate(result) : null;
}

export async function deleteEstateDoc(id: string): Promise<void> {
  if (!ObjectId.isValid(id)) return;
  const col = await estates();
  await col.deleteOne({ _id: new ObjectId(id) });
}

export async function addPlotToEstate(
  estateId: string,
  data: PlotInput
): Promise<PlotRecord | null | { error: "duplicate_plot_number" }> {
  if (!ObjectId.isValid(estateId)) return null;
  const col = await estates();
  const duplicate = await col.findOne({
    _id: new ObjectId(estateId),
    plots: { $elemMatch: { plotNumber: data.plotNumber } },
  });
  if (duplicate) return { error: "duplicate_plot_number" };

  const now = new Date();
  const plot: PlotDoc = {
    _id: new ObjectId(),
    plotNumber: data.plotNumber,
    sizeSqm: data.sizeSqm,
    priceNgn: data.priceNgn,
    status: data.status,
    orientation: data.orientation ?? null,
    createdAt: now,
    updatedAt: now,
  };
  const result = await col.updateOne(
    { _id: new ObjectId(estateId) },
    { $push: { plots: plot }, $set: { updatedAt: now } }
  );
  if (result.matchedCount === 0) return null;
  return toPlotRecord(plot);
}

export async function updatePlotById(
  plotId: string,
  data: Partial<PlotInput>
): Promise<PlotRecord | null> {
  if (!ObjectId.isValid(plotId)) return null;
  const col = await estates();
  const objectId = new ObjectId(plotId);

  const setFields: Record<string, unknown> = { "plots.$.updatedAt": new Date() };
  for (const [key, value] of Object.entries(withoutUndefined(data))) {
    setFields[`plots.$.${key}`] = value;
  }

  const result = await col.findOneAndUpdate(
    { "plots._id": objectId },
    { $set: setFields },
    { returnDocument: "after" }
  );
  if (!result) return null;
  const plot = result.plots.find((p) => p._id.equals(objectId));
  return plot ? toPlotRecord(plot) : null;
}

export async function deletePlotById(plotId: string): Promise<void> {
  if (!ObjectId.isValid(plotId)) return;
  const col = await estates();
  await col.updateOne(
    { "plots._id": new ObjectId(plotId) },
    { $pull: { plots: { _id: new ObjectId(plotId) } } }
  );
}

/** Marks a plot SOLD by id — used by the payment webhook. Returns the owning estate id, if found. */
export async function markPlotSold(plotId: string): Promise<void> {
  if (!ObjectId.isValid(plotId)) return;
  const col = await estates();
  await col.updateOne(
    { "plots._id": new ObjectId(plotId) },
    { $set: { "plots.$.status": "SOLD", "plots.$.updatedAt": new Date() } }
  );
}
