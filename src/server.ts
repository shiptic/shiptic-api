import "dotenv/config";
import express from "express";
import shipmentsRoute from "@/routes/shipments.route";
import healthRoute from "@/routes/health.route";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/health", healthRoute);
app.use("/shipments", shipmentsRoute);

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});