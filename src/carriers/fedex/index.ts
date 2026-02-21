import { Carrier } from "../base/carrier.interface";
import { GetRatesInput, GetRatesOutput } from "../base/types";
import { FedExAuth } from "./auth";
import { getRatesRequest } from "./client";
import { mapRatesResponse } from "./mapper";

const auth = new FedExAuth();

export const fedexCarrier: Carrier = {
  async getRates(input: GetRatesInput): Promise<GetRatesOutput> {
    const token = await auth.getAccessToken();
    const raw = await getRatesRequest(input, token);
    return mapRatesResponse(raw);
  },
};