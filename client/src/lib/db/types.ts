import type { ObjectId } from "mongodb";
import type { Faq, PaymentPlanOption, PlotStatus, TitleType } from "@/lib/types";

export interface PlotDoc {
  _id: ObjectId;
  plotNumber: string;
  sizeSqm: number;
  priceNgn: number;
  status: PlotStatus;
  orientation: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProgressUpdateDoc {
  _id: ObjectId;
  title: string;
  body: string;
  photos: string[] | null;
  postedAt: Date;
}

export interface EstateDoc {
  _id: ObjectId;
  slug: string;
  name: string;
  state: string;
  lga: string;
  locality: string;
  latitude: number | null;
  longitude: number | null;
  status: "PLANNING" | "ONGOING" | "DELIVERED";
  titleType: TitleType;
  startingPriceNgn: number;
  depositPercent: number;
  plotSizesSqm: number[];
  paymentPlans: PaymentPlanOption[] | null;
  features: string[] | null;
  documents: string[] | null;
  gallery: string[] | null;
  videoUrl: string | null;
  landmarks: string[] | null;
  faqs: Faq[] | null;
  seoTitle: string | null;
  seoDescription: string | null;
  plots: PlotDoc[];
  progressUpdates: ProgressUpdateDoc[];
  createdAt: Date;
  updatedAt: Date;
}

export type LeadType = "INSPECTION" | "VIRTUAL_INSPECTION" | "BROCHURE_DOWNLOAD" | "ROI_CALCULATOR" | "GENERAL";
export type LeadStatus = "NEW" | "CONTACTED" | "INSPECTION_BOOKED" | "INSPECTED" | "CONVERTED" | "LOST";

export interface LeadDoc {
  _id: ObjectId;
  name: string;
  phone: string;
  email: string | null;
  source: string | null;
  estateId: string | null;
  type: LeadType;
  status: LeadStatus;
  assignedTo: string | null;
  preferredDate: Date | null;
  timezone: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type RealtorStatus = "PENDING" | "ACTIVE" | "SUSPENDED";

export interface RealtorDoc {
  _id: ObjectId;
  clerkUserId: string;
  name: string;
  email: string;
  phone: string;
  referralCode: string;
  commissionRatePercent: number;
  status: RealtorStatus;
  payoutBankName: string | null;
  payoutAccountNumber: string | null;
  payoutAccountName: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type ReferralStage = "CLICKED" | "LEAD" | "INSPECTION" | "DEPOSIT" | "ALLOCATED";

export interface ReferralDoc {
  _id: ObjectId;
  realtorId: string;
  leadId: string | null;
  estateId: string | null;
  stage: ReferralStage;
  commissionAmountNgn: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export type PaymentProvider = "PAYSTACK" | "FLUTTERWAVE" | "BANK_TRANSFER";
export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED";
export type PaymentType = "DEPOSIT" | "INSTALMENT";

export interface PaymentDoc {
  _id: ObjectId;
  reference: string;
  provider: PaymentProvider;
  leadId: string | null;
  estateId: string | null;
  plotId: string | null;
  amountNgn: number;
  status: PaymentStatus;
  type: PaymentType;
  paidAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
