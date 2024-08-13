import { Account } from "../../../database/models/account.model.js";
import { Transaction } from "../../../database/models/transaction.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utilities/appError.js";

const transactionHistory = catchError(async (req, res, next) => {
  let account = await Account.findOne({ user: req.user.id });
  if (!account) return next(new AppError("Account Not Found", 404));
  const transactions = await Transaction.find({
    account: account._id,
  });
  res.json({ Message: "success", transactions });
});

export { transactionHistory };
