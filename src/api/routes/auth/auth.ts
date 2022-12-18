import { Router } from "express";

import { SignInController } from "../../controllers/auth/SignIn";

export const AuthRouter = Router();
// Auth SignIn
AuthRouter.post("/signin", SignInController);
