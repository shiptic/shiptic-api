import axios from "axios";
import { GetRatesInput } from "../base/types";
import { Rates } from "./rate_types";

export async function getRatesRequest(
  input: GetRatesInput,
  token: string
) {
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
          residential: false
        }
      },
      recipient: {
        address: {
          streetLines: [input.toAddress.street],
          city: input.toAddress.city,
          stateOrProvinceCode: input.toAddress.state,
          postalCode: input.toAddress.zip,
          countryCode: input.toAddress.country || "US"
        }
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
          }
        },
      ],
      packagingType: "YOUR_PACKAGING",
    },
    processingOptions: ["INCLUDE_PICKUPRATES"],
    carrierCodes: ["FDXE", "FDXG"]
  };

  try {
    const response = await axios.post(
      "https://apis-sandbox.fedex.com/rate/v1/rates/quotes",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;

  } catch (error: any) {
    console.error("FEDEX ERROR:");
    console.error(JSON.stringify(error.response?.data, null, 2));
    throw error;
  }
}