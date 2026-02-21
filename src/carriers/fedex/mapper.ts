import { GetRatesOutput } from "@/carriers/base/types";

export function mapRatesResponse(raw: any): GetRatesOutput {
  const rateReply = raw.output?.rateReplyDetails || [];

  const rates = rateReply.map((detail: any) => ({
    service: detail.serviceType,
    cost: Number(
      detail.ratedShipmentDetails?.[0]?.totalNetCharge || 0
    ),
    currency:
      detail.ratedShipmentDetails?.[0]?.currency || "USD",
    estimatedDelivery:
      detail.commit?.dateDetail?.dayFormat || undefined,
  }));

  return { rates };
}