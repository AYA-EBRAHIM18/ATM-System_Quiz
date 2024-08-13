import { Router } from "express";
import {
  createAcc,
  deposit,
  getBalance,
  withdraw,
} from "./account.controllers.js";
import { protectedRoutes } from "../user/user.controllers.js";

const accountRouter = Router();

accountRouter.post("/", protectedRoutes, createAcc);
accountRouter.post("/deposit", protectedRoutes, deposit);
accountRouter.post("/withdraw", protectedRoutes, withdraw);
accountRouter.get("/", protectedRoutes, getBalance);
export default accountRouter;
