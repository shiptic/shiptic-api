import { Request, Response } from "express";
import { getRates } from "@/services/shipment.service";

export async function getRatesHandler(req: Request, res: Response) {
  try {
    const result = await getRates(req.body);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}