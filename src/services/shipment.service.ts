import { carrierRegistry } from "@/carriers/registry";
import { GetRatesInput } from "@/carriers/base/types";

export async function getRates(input: GetRatesInput) {
  const carrier = carrierRegistry[input.carrier];

  if (!carrier) {
    throw new Error("Unsupported carrier");
  }

  return carrier.getRates(input);
}