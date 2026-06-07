import asyncHandler from "express-async-handler";
import type { NextFunction, Request, Response } from "express";
import { Wallet } from "../models/Wallet.model.js";
import { AppError } from "../utils/AppError.js";

export const getMe = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const userId = req.user!.id;
  let wallet = await Wallet.findOne({ userId });
  
  if (!wallet) {
    wallet = await Wallet.create({ userId, balance: 0, transactions: [] });
  }

  res.status(200).json({
    status: "success",
    data: { wallet },
  });
});

export const topUp = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const { amount } = req.body as { amount: number };
  const userId = req.user!.id;

  let wallet = await Wallet.findOne({ userId });
  if (!wallet) {
    wallet = await Wallet.create({ userId, balance: 0, transactions: [] });
  }

  wallet.balance += amount;
  
  // Add transaction to history
  const transaction = { amount, createdAt: new Date() };
  if (!wallet.transactions) wallet.transactions = [];
  wallet.transactions.push(transaction);
  
  await wallet.save();

  res.status(200).json({
    status: "success",
    data: { 
      balance: wallet.balance,
      transaction,
    },
  });
});

