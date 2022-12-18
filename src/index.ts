import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";

import { router } from "./api/routes";

import { CONFIG } from "./config";

export const app: Application = express();

app.use(helmet());

app.use(express.json());

app.use(cors({ origin: CONFIG.CLIENT_URL }));

app.use("/", router);
