import "server-only";
import { ObjectId } from "mongodb";
import { getDb } from "./mongodb";
import type { RealtorDoc, ReferralDoc } from "./types";

async function realtors() {
  const db = await getDb();
  return db.collection<RealtorDoc>("realtors");
}

async function referrals() {
  const db = await getDb();
  return db.collection<ReferralDoc>("referrals");
}

export interface CreateRealtorData {
  clerkUserId: string;
  name: string;
  email: string;
  phone: string;
  referralCode: string;
}

export async function createRealtorDoc(data: CreateRealtorData): Promise<RealtorDoc> {
  const col = await realtors();
  const now = new Date();
  const doc: RealtorDoc = {
    _id: new ObjectId(),
    clerkUserId: data.clerkUserId,
    name: data.name,
    email: data.email,
    phone: data.phone,
    referralCode: data.referralCode,
    commissionRatePercent: 2.5,
    status: "PENDING",
    payoutBankName: null,
    payoutAccountNumber: null,
    payoutAccountName: null,
    createdAt: now,
    updatedAt: now,
  };
  await col.insertOne(doc);
  return doc;
}

export async function getRealtorByClerkUserId(clerkUserId: string): Promise<RealtorDoc | null> {
  const col = await realtors();
  return col.findOne({ clerkUserId });
}

export async function findRealtorByReferralCode(referralCode: string): Promise<RealtorDoc | null> {
  const col = await realtors();
  return col.findOne({ referralCode });
}

export async function listReferralsForRealtor(realtorId: string, limit = 50): Promise<ReferralDoc[]> {
  const col = await referrals();
  return col.find({ realtorId }, { sort: { createdAt: -1 }, limit }).toArray();
}

export interface CreateReferralData {
  realtorId: string;
  leadId?: string;
  estateId?: string;
  stage: ReferralDoc["stage"];
}

export async function createReferralDoc(data: CreateReferralData): Promise<ReferralDoc> {
  const col = await referrals();
  const now = new Date();
  const doc: ReferralDoc = {
    _id: new ObjectId(),
    realtorId: data.realtorId,
    leadId: data.leadId ?? null,
    estateId: data.estateId ?? null,
    stage: data.stage,
    commissionAmountNgn: null,
    createdAt: now,
    updatedAt: now,
  };
  await col.insertOne(doc);
  return doc;
}
