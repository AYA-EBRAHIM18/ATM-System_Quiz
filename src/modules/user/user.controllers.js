import { User } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";
import jwt from "jsonwebtoken";
import { AppError } from "../../utilities/appError.js";
import bcrypt from "bcrypt";

const register = catchError(async (req, res, next) => {
  ch;
  let user = new User(req.body);
  await user.save();
  let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json({ message: "success", token });
});
const login = catchError(async (req, res, next) => {
  let user = await User.findOne({ username: req.body.username });

  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ message: "Success", token });
  }
  next(new AppError("Incorrect Email or Password.", 401));
});
const protectedRoutes = catchError(async (req, res, next) => {
  //check token ?exists or not
  let { token } = req.headers;
  if (!token) next(new AppError("Token Not Provided.", 401));
  let userPayload = null;
  //verify token
  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) return next(new AppError(err, 404));
    userPayload = payload;
  });
  //check if user exists in the db
  let user = await User.findById(userPayload.userId);
  if (!user) return next(new AppError("User Not Found.", 404));

  req.user = user;
  next();
});
export { register, login, protectedRoutes };
