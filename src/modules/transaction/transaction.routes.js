import { Router } from "express";

import { protectedRoutes } from "../user/user.controllers.js";
import { transactionHistory } from "./transaction.controllers.js";

const transactionRouter = Router();

transactionRouter.get("/", protectedRoutes, transactionHistory);

export default transactionRouter;
