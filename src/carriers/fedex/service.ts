import { FedExClient } from "./client";
import { GetRatesInput } from "@/types/base.types";
import { Rates } from "@/types/fedex/rate.types";
import { TrackingByTrackingNumber } from "@/types/fedex/tracking.types";

export class FedExService {
  constructor(private fedExClient: FedExClient) {}

  async getRates(input: GetRatesInput) {
    const payload: Rates = {
      accountNumber: {
        value: process.env.FEDEX_ACCOUNT_NUMBER,
      },
      rateRequestControlParameters: {
        returnTransitTimes: true,
      },
      requestedShipment: {
        shipper: {
          address: {
            streetLines: [input.fromAddress.street],
            city: input.fromAddress.city,
            stateOrProvinceCode: input.fromAddress.state,
            postalCode: input.fromAddress.zip,
            countryCode: input.fromAddress.country || "US",
            residential: false,
          },
        },
        recipient: {
          address: {
            streetLines: [input.toAddress.street],
            city: input.toAddress.city,
            stateOrProvinceCode: input.toAddress.state,
            postalCode: input.toAddress.zip,
            countryCode: input.toAddress.country || "US",
          },
        },
        preferredCurrency: "USD",
        rateRequestType: ["ACCOUNT"],
        pickupType: "DROPOFF_AT_FEDEX_LOCATION",
        shipDateStamp: new Date().toISOString().split("T")[0],
        requestedPackageLineItems: [
          {
            weight: {
              units: "LB",
              value: input.weight,
            },
          },
        ],
        packagingType: "YOUR_PACKAGING",
      },
      processingOptions: ["INCLUDE_PICKUPRATES"],
      carrierCodes: ["FDXE", "FDXG"],
    };

    return this.fedExClient.post("/rate/v1/rates/quotes", payload);
  }

  async getTracking(trackingNumber: string) {
    const payload: TrackingByTrackingNumber = {
      includeDetailedScans: false,
      trackingInfo: [
        {
          trackingNumberInfo: {
            trackingNumber,
          },
        },
      ],
    };

    return this.fedExClient.post("/track/v1/trackingnumbers", payload);
  }
}