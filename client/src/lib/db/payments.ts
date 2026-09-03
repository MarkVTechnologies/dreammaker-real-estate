import "server-only";
import { ObjectId } from "mongodb";
import { getDb } from "./mongodb";
import type { PaymentDoc } from "./types";

async function payments() {
  const db = await getDb();
  return db.collection<PaymentDoc>("payments");
}

export interface CreatePaymentData {
  reference: string;
  provider: PaymentDoc["provider"];
  amountNgn: number;
  type: PaymentDoc["type"];
  estateId?: string;
  plotId?: string;
  leadId?: string;
}

export async function createPaymentDoc(data: CreatePaymentData): Promise<PaymentDoc> {
  const col = await payments();
  const now = new Date();
  const doc: PaymentDoc = {
    _id: new ObjectId(),
    reference: data.reference,
    provider: data.provider,
    amountNgn: data.amountNgn,
    type: data.type,
    estateId: data.estateId ?? null,
    plotId: data.plotId ?? null,
    leadId: data.leadId ?? null,
    status: "PENDING",
    paidAt: null,
    createdAt: now,
    updatedAt: now,
  };
  await col.insertOne(doc);
  return doc;
}

export async function markPaymentSuccessByReference(reference: string): Promise<PaymentDoc | null> {
  const col = await payments();
  const result = await col.findOneAndUpdate(
    { reference },
    { $set: { status: "SUCCESS", paidAt: new Date(), updatedAt: new Date() } },
    { returnDocument: "after" }
  );
  return result;
}
