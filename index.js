import express from "express";
import "dotenv/config";
import { dbConnection } from "./database/dbConnection.js";
import cors from "cors";
import errorHandler from "./src/middleware/globalErrorHandling.js";
import { bootstrapJs } from "./src/modules/bootstrap.js";
import { AppError } from "./src/utilities/appError.js";

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

bootstrapJs(app);
app.use("*", (req, res, next) => {
  next(new AppError(`Route Not Found ${req.originalUrl}`, 404));
});
app.use(errorHandler);
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
