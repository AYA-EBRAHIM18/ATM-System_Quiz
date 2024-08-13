import accountRouter from "./account/account.routes.js";
import transactionRouter from "./transaction/transaction.routes.js";
import userRouter from "./user/user.routes.js";

export const bootstrapJs = (app) => {
  app.use("/api/auth", userRouter);
  app.use("/api/accounts", accountRouter);
  app.use("/api/transactions", transactionRouter);
};
