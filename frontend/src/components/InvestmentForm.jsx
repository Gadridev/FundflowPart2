import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { invest } from "../store/investmentSlice";
import { fetchPortfolio } from "../store/investmentSlice";
import { deductBalance } from "../store/walletSlice";

export default function InvestmentForm({ projectId, onSuccess }) {
  const dispatch = useDispatch();
  const { investLoading, investError } = useSelector((s) => s.investments);
  const balance = useSelector((s) => s.wallet.balance);
  

  const [amount, setAmount] = useState("");
  const [localError, setLocalError] = useState("");
  const [success, setSuccess] = useState(false);

  const fmt = (n) =>
    Number(n ?? 0).toLocaleString("en-US", {
      style: "currency",
      currency: "MAD",
      maximumFractionDigits: 0,
    });

  async function handleSubmit() {
    const value = Number(amount);
    if (!value || value <= 0) {
      return setLocalError("Please enter a valid amount.");
    }
    if (value > balance) {
      return setLocalError("Insufficient wallet balance.");
    }
    setLocalError("");

    const result = await dispatch(invest({ projectId, amount: value }));

    if (invest.fulfilled.match(result)) {
      
      dispatch(deductBalance(value));
      
      dispatch(fetchPortfolio());
      setSuccess(true);
      setAmount("");
      if (onSuccess) onSuccess();
    }
  }

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <p className="text-green-700 font-semibold text-lg">
          Investment successful! 🎉
        </p>
        <p className="text-green-600 text-sm mt-1">
          Your portfolio has been updated.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-4 text-sm text-green-600 underline"
        >
          Invest again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm space-y-4">
      <h3 className="text-stone-800 font-semibold text-base">
        Invest in this project
      </h3>

      <div className="flex items-center gap-2 text-sm text-stone-500">
        <span>Available balance:</span>
        <span className="text-amber-600 font-semibold">{fmt(balance)}</span>
      </div>

      <input
        type="number"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
          setLocalError("");
        }}
        placeholder="Amount (MAD)"
        min={1}
        className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
      />

      {(localError || investError) && (
        <p className="text-red-500 text-xs">{localError || investError}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={investLoading || !amount}
        className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-stone-900 font-semibold rounded-xl text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {investLoading ? "Processing..." : "Confirm Investment"}
      </button>
    </div>
  );
}
