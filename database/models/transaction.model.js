import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    account: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
    type: { type: String, enum: ["deposit", "withdraw"], required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: { updatedAt: false },
    versionKey: false,
  }
);

export const Transaction = model("Transaction", schema);
