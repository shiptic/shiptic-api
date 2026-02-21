import { Carrier } from "@/carriers/base/carrier.interface";
import { GetRatesInput, GetRatesOutput } from "@/carriers/base/types";
import { FedExAuth } from "@/carriers/fedex/auth";
import { getRatesRequest } from "@/carriers/fedex/client";
import { mapRatesResponse } from "@/carriers/fedex/mapper";

const auth = new FedExAuth();

export const fedexCarrier: Carrier = {
  async getRates(input: GetRatesInput): Promise<GetRatesOutput> {
    const token = await auth.getAccessToken();
    const raw = await getRatesRequest(input, token);
    return mapRatesResponse(raw);
  },
};