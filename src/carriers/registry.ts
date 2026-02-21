import { fedexCarrier } from "@/carriers/fedex";

export const carrierRegistry = {
  fedex: fedexCarrier,
} as const;

export type CarrierType = keyof typeof carrierRegistry;