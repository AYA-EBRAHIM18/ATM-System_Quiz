import { Account } from "../../../database/models/account.model.js";
import { Transaction } from "../../../database/models/transaction.model.js";
import { User } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utilities/appError.js";

const createAcc = catchError(async (req, res, next) => {
  let userAcc = new Account({ user: req.user.id });
  await userAcc.save();

  res.json({ message: "success", userAcc });
});
const deposit = catchError(async (req, res, next) => {
  let account = await Account.findOne({ user: req.user.id });
  if (!account) return next(new AppError("Account Not Found", 404));
  account.balance += req.body.amount;
  await account.save();
  const transaction = new Transaction({
    account: account._id,
    type: "deposit",
    amount: req.body.amount,
  });
  await transaction.save();

  res.json({ message: "Deposit successful", balance: account.balance });
});
const withdraw = catchError(async (req, res, next) => {
  let account = await Account.findOne({ user: req.user.id });
  if (!account) return next(new AppError("Account Not Found", 404));
  account.balance -= req.body.amount;
  await account.save();
  const transaction = new Transaction({
    account: account._id,
    type: "withdraw",
    amount: req.body.amount,
  });
  await transaction.save();

  res.json({ message: "Deposit successful", balance: account.balance });
});

const getBalance = catchError(async (req, res, next) => {
  let account = await Account.findOne({ user: req.user.id });
  if (!account) return next(new AppError("Account Not Found", 404));
  res.json({ message: "success", balance: account.balance });
});
export { createAcc, deposit, withdraw, getBalance };
