import { Router } from "express";
import { getRatesHandler } from "@/controllers/shipments.controller";

const router = Router();

router.post("/rates", getRatesHandler);

export default router;