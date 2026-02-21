/**
 * Generic types for all carrier req/res
 */
import { CarrierType } from "@/carriers/registry";

export interface Address {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country?: string;
}

export interface GetRatesInput {
  carrier: CarrierType;
  fromAddress: Address;
  toAddress: Address;
  weight: number; // in lbs
}

export interface Rate {
  service: string;
  cost: number;
  currency: string;
  estimatedDelivery?: string;
}

export interface GetRatesOutput {
  rates: Rate[];
}