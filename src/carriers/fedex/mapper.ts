import { GetRatesOutput } from "../base/types";

export function mapRatesResponse(raw: any): GetRatesOutput {
  const rateReply = raw.output?.rateReplyDetails || [];

  const rates = rateReply.map((detail: any) => ({
    service: detail.serviceType,
    cost: Number(
      detail.ratedShipmentDetails?.[0]?.totalNetCharge?.amount || 0
    ),
    currency:
      detail.ratedShipmentDetails?.[0]?.totalNetCharge?.currency || "USD",
    estimatedDelivery:
      detail.commit?.dateDetail?.dayFormat || undefined,
  }));

  return { rates };
}