import { Router } from "express";

import { SignInController } from "../../controllers/auth/SignIn";
import { SignUpController } from "../../controllers/auth/SignUp";

export const AuthRouter = Router();
// SignIn
AuthRouter.post("/signin", SignInController);

// SignUp
AuthRouter.post("/signup", SignUpController);
