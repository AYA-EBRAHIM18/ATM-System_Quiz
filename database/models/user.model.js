import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
const schema = new Schema(
  {
    username: String,
    password: String,
  },
  {
    timestamps: { updatedAt: false },
    versionKey: false,
  }
);
schema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 8);
});

export const User = model("User", schema);
