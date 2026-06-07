import mongoose, { type Document, model, Schema, type Types } from "mongoose";

export interface ITransaction {
  amount: number;
  createdAt?: Date;
}

export interface IWallet extends Document {
  userId: Types.ObjectId;
  balance: number;
  transactions?: ITransaction[];
  createdAt?: Date;
  updatedAt?: Date;
}
const walletSchema = new Schema<IWallet>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    transactions: [
      {
        amount: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);
export const Wallet = model<IWallet>("Wallet", walletSchema);
