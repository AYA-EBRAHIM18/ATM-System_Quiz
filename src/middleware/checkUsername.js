import { User } from "../../database/models/user.model.js";
import { AppError } from "../utilities/appError.js";

export const checkUsername = async (req, res, next) => {
  let isFound = await User.findOne({ username: req.body.username });
  if (isFound) return next(new AppError("Username Already Exists", 404));
  next();
};
