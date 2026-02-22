import axios, { AxiosInstance } from "axios";
import { CarrierApiError } from "@/errors/carrierapi.error";

export class FedExClient {
  private client: AxiosInstance;

  constructor(token: string) {
    this.client = axios.create({
      baseURL: "https://apis-sandbox.fedex.com",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  async post<TResponse>(
    url: string,
    payload: unknown
  ): Promise<TResponse> {
    try {
      const response = await this.client.post<TResponse>(url, payload);
      return response.data;
    } catch (error: any) {
      const status = error.response?.status ?? 500;
      const data = error.response?.data;

      throw new CarrierApiError(
        data?.errors?.[0]?.message || "FedEx API Error",
        status,
        data
      );
    }
  }
}
