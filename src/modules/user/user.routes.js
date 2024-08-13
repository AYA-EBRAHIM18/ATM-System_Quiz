import { Router } from "express";
import { login, register } from "./user.controllers.js";
import { checkUsername } from "../../middleware/checkUsername.js";

const userRouter = Router();

userRouter.post("/register", checkUsername, register);
userRouter.post("/login", login);
export default userRouter;
