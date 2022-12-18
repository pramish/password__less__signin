import { Router } from "express";

import { AuthRouter } from "./auth";
import { UserRouter } from "./user";

export const router = Router();

// Auth router
router.use("/auth", AuthRouter);

// User router
router.use("/users", UserRouter);
