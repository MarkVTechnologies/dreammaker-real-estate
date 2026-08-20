/** Client-side view of the Estate entity (PRD §11.2). Mirrors server/prisma/schema.prisma. */
export type TitleType =
  | "C_OF_O"
  | "GAZETTE"
  | "EXCISION"
  | "REGISTERED_SURVEY"
  | "GOVERNORS_CONSENT"
  | "DEED_OF_ASSIGNMENT";

export const titleTypeLabel: Record<TitleType, string> = {
  C_OF_O: "C of O",
  GAZETTE: "Gazette",
  EXCISION: "Excision",
  REGISTERED_SURVEY: "Registered Survey",
  GOVERNORS_CONSENT: "Governor's Consent",
  DEED_OF_ASSIGNMENT: "Deed of Assignment",
};

export interface EstateSummary {
  slug: string;
  name: string;
  locality: string;
  lga: string;
  titleType: TitleType;
  startingPriceNgn: number;
  depositPercent: number;
  plotSizesSqm: number[];
  coverImageUrl: string;
  plotsAvailable: number;
  plotsTotal: number;
}

export function formatNgn(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}
