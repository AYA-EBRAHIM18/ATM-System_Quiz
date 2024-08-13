import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: { updatedAt: false },
    versionKey: false,
  }
);

export const Account = model("Account", schema);
