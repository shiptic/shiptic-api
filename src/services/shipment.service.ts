import { carrierRegistry } from "@/carriers/registry";
import { GetRatesInput, GetTrackingByTrackingNumberInput } from "@/types/base.types";

export async function getRates(input: GetRatesInput) {
  const carrier = carrierRegistry[input.carrier];

  if (!carrier) {
    throw new Error("Unsupported carrier");
  }

  return carrier.getRates(input);
}

export async function getTrackingByTrackingNumber(input: GetTrackingByTrackingNumberInput) {
  const carrier = carrierRegistry[input.carrier];

  if (!carrier) {
    throw new Error("Unsupported carrier");
  }

  return carrier.getTrackingByTrackingNumber(input);
}
