/**
 * Generic interface for a carrier.
 */
import { GetRatesInput, GetRatesOutput, GetTrackingByTrackingNumberInput, GetTrackingByTrackingNumberOutput } from "@/carriers/base/types";

export interface Carrier {
  getRates(input: GetRatesInput): Promise<GetRatesOutput>;
  getTrackingByTrackingNumber(input: GetTrackingByTrackingNumberInput): Promise<GetTrackingByTrackingNumberOutput>;
}