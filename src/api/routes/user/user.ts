import { Router } from "express";

import { SignInController } from "../../controllers/auth/SignIn";

export const UserRouter = Router();

// User lookup
UserRouter.post("/lookup", SignInController);
