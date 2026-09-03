import "server-only";
import { ObjectId } from "mongodb";
import { getDb } from "./mongodb";
import type { LeadDoc, LeadType } from "./types";

async function leads() {
  const db = await getDb();
  return db.collection<LeadDoc>("leads");
}

export interface CreateLeadData {
  name: string;
  phone: string;
  email?: string;
  source?: string;
  estateId?: string;
  type: LeadType;
  preferredDate?: Date;
  timezone?: string;
}

export async function createLeadDoc(data: CreateLeadData): Promise<LeadDoc> {
  const col = await leads();
  const now = new Date();
  const doc: LeadDoc = {
    _id: new ObjectId(),
    name: data.name,
    phone: data.phone,
    email: data.email ?? null,
    source: data.source ?? null,
    estateId: data.estateId ?? null,
    type: data.type,
    status: "NEW",
    assignedTo: null,
    preferredDate: data.preferredDate ?? null,
    timezone: data.timezone ?? null,
    createdAt: now,
    updatedAt: now,
  };
  await col.insertOne(doc);
  return doc;
}

export async function getLeadDocById(id: string): Promise<LeadDoc | null> {
  if (!ObjectId.isValid(id)) return null;
  const col = await leads();
  return col.findOne({ _id: new ObjectId(id) });
}
