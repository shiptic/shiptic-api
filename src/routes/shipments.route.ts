import { Router } from "express";
import { getRatesHandler, getTrackingByTrackingNumberHandler } from "@/controllers/shipments.controller";

const router = Router();

router.post("/rates", getRatesHandler);
router.post("/tracking", getTrackingByTrackingNumberHandler);

export default router;