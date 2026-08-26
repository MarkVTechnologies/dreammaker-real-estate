import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";

import { adminRouter } from "./routes/admin.js";
import { bookingsRouter } from "./routes/bookings.js";
import { estatesRouter } from "./routes/estates.js";
import { leadsRouter } from "./routes/leads.js";
import { paymentsRouter } from "./routes/payments.js";
import { realtorsRouter } from "./routes/realtors.js";
import { webhooksRouter } from "./routes/webhooks.js";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN?.split(",") ?? "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

// Webhooks need the raw body for signature verification — mounted before json().
app.use("/webhooks", express.raw({ type: "application/json" }), webhooksRouter);

app.use(express.json());

// PRD §11.3: rate-limited public forms.
const publicFormLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 30 });
app.use(["/leads", "/realtors/signup"], publicFormLimiter);

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/admin", adminRouter);
app.use("/estates", estatesRouter);
app.use("/leads", leadsRouter);
app.use("/realtors", realtorsRouter);
app.use("/bookings", bookingsRouter);
app.use("/payments", paymentsRouter);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const port = Number(process.env.PORT) || 4200;
app.listen(port, () => {
  console.log(`DreamMaker API listening on :${port}`);
});
