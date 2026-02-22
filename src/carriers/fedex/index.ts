import { Carrier } from "@/carriers/base/carrier.interface";
import { GetRatesInput, GetRatesOutput, GetTrackingByTrackingNumberInput, GetTrackingByTrackingNumberOutput } from "@/types/base.types";
import { FedExAuth } from "@/carriers/fedex/auth";
import { FedExClient } from "@/carriers/fedex/client";
import { FedExService } from "@/carriers/fedex/service";
import { mapRatesResponse, mapTrackingByTrackingNumberResponse } from "@/carriers/fedex/mapper";

const auth = new FedExAuth();

export const fedexCarrier: Carrier = {
  async getRates(input: GetRatesInput): Promise<GetRatesOutput> {
    const token = await auth.getAccessToken("rates");

    const client = new FedExClient(token);
    const service = new FedExService(client);

    const raw = await service.getRates(input);

    return mapRatesResponse(raw);
  },

  async getTrackingByTrackingNumber(
    input: GetTrackingByTrackingNumberInput
  ): Promise<GetTrackingByTrackingNumberOutput> {
    const token = await auth.getAccessToken("tracking");

    const client = new FedExClient(token);
    const service = new FedExService(client);

    const raw = await service.getTracking(input.trackingNumber);

    return mapTrackingByTrackingNumberResponse(raw);
  },
};