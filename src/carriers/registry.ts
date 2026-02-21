import { fedexCarrier } from "./fedex";

export const carrierRegistry = {
  fedex: fedexCarrier,
} as const;

export type CarrierType = keyof typeof carrierRegistry;