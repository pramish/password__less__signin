import { Router } from "express";

import { LookUpUser } from "../../controllers/user";

export const UserRouter = Router();

// User lookup
UserRouter.post("/lookup", LookUpUser);
