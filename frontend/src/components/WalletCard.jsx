import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { topUp } from "../store/walletSlice";
import { Plus, ArrowUpCircle } from "lucide-react";

const QUICK_AMOUNTS = [500, 1000, 2000, 5000];

export default function WalletCard() {
  const dispatch = useDispatch();
  const { balance, history, loading, error } = useSelector((s) => s.wallet);

  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);

  const fmt = (n) =>
    Number(n ?? 0).toLocaleString("en-US", {
      style: "currency",
      currency: "MAD",
      maximumFractionDigits: 0,
    });

  async function handleTopUp() {
    const value = Number(amount);
    if (!value || value <= 0) return;

    const result = await dispatch(topUp(value));
    if (topUp.fulfilled.match(result)) {
      setAmount("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  }

  return (
    <div className="space-y-6">
      {}
      <div className="bg-stone-900 rounded-2xl p-8 text-white">
        <p className="text-stone-400 text-sm mb-2">Available Balance</p>
        <p className="text-4xl font-bold text-amber-400">{fmt(balance)}</p>
        <p className="text-stone-500 text-xs mt-3">
          Funds available for investment
        </p>
      </div>

      {}
      <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm space-y-4">
        <h3 className="text-stone-800 font-semibold">Top Up Wallet</h3>

        {}
        <div className="flex gap-2 flex-wrap">
          {QUICK_AMOUNTS.map((q) => (
            <button
              key={q}
              onClick={() => setAmount(String(q))}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                amount === String(q)
                  ? "bg-amber-400 text-stone-900 border-amber-400"
                  : "border-stone-200 text-stone-500 hover:border-amber-300 hover:text-stone-800"
              }`}
            >
              {fmt(q)}
            </button>
          ))}
        </div>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Or enter a custom amount"
          min={1}
          className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
        />

        {error && <p className="text-red-500 text-xs">{error}</p>}
        {success && (
          <p className="text-green-600 text-xs">
            ✓ Wallet topped up successfully!
          </p>
        )}

        <button
          onClick={handleTopUp}
          disabled={loading || !amount}
          className="w-full flex items-center justify-center gap-2 py-3 bg-amber-400 hover:bg-amber-500 text-stone-900 font-semibold rounded-xl text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={16} />
          {loading ? "Processing..." : "Add Funds"}
        </button>
      </div>

      {/* Transaction history */}
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100">
          <h3 className="text-stone-800 font-semibold">Transaction History</h3>
        </div>
        {history.length === 0 ? (
          <p className="text-stone-400 text-sm text-center py-12">
            No transactions yet.
          </p>
        ) : (
          <ul className="divide-y divide-stone-50">
            {history.map((tx, i) => (
              <li
                key={tx._id ?? i}
                className="flex items-center justify-between px-6 py-4"
              >
                <div className="flex items-center gap-3">
                  <ArrowUpCircle size={18} className="text-green-500 shrink-0" />
                  <div>
                    <p className="text-stone-700 text-sm font-medium">Top Up</p>
                    <p className="text-stone-400 text-xs">
                      {tx.createdAt
                        ? new Date(tx.createdAt).toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "—"}
                    </p>
                  </div>
                </div>
                <span className="text-green-600 font-semibold text-sm">
                  +{Number(tx.amount ?? 0).toLocaleString("en-US", {
                    style: "currency",
                    currency: "MAD",
                    maximumFractionDigits: 0,
                  })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
