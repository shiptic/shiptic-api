import { Request, Response } from "express";
import { getRates, getTrackingByTrackingNumber } from "@/services/shipment.service";

export async function getRatesHandler(req: Request, res: Response) {
  try {
    const result = await getRates(req.body);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function getTrackingByTrackingNumberHandler(req: Request, res: Response) {
  try {
    const result = await getTrackingByTrackingNumber(req.body);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
