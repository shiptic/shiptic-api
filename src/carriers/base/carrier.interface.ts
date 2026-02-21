/**
 * Generic interface for a carrier.
 */
import { GetRatesInput, GetRatesOutput } from "./types";

export interface Carrier {
  getRates(input: GetRatesInput): Promise<GetRatesOutput>;
}