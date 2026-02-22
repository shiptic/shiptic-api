import { Carrier } from "@/carriers/base/carrier.interface";
import { GetRatesInput, GetRatesOutput, GetTrackingByTrackingNumberInput, GetTrackingByTrackingNumberOutput } from "@/carriers/base/types";
import { FedExAuth } from "@/carriers/fedex/auth";
import { getRatesRequest, getTrackingByTrackingNumberRequest } from "@/carriers/fedex/client";
import { mapRatesResponse, mapTrackingByTrackingNumberResponse } from "@/carriers/fedex/mapper";

const auth = new FedExAuth();

export const fedexCarrier: Carrier = {
  async getRates(input: GetRatesInput): Promise<GetRatesOutput> {
    const token = await auth.getAccessToken();
    const raw = await getRatesRequest(input, token);
    return mapRatesResponse(raw);
  },

  async getTrackingByTrackingNumber(input: GetTrackingByTrackingNumberInput): Promise<GetTrackingByTrackingNumberOutput> {
    const token = await auth.getAccessToken();
    const raw = await getTrackingByTrackingNumberRequest(input, token);
    return mapTrackingByTrackingNumberResponse(raw);
  },
};
