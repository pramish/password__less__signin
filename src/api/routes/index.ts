import { Router } from "express";

import { AuthRouter } from "./auth";

export const router = Router();

// Auth router
router.use("/auth", AuthRouter);
