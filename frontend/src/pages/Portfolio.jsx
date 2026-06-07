import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPortfolio } from "../store/investmentSlice";
import PortfolioTable from "../components/PortfolioTable";
import { TrendingUp, Briefcase } from "lucide-react";

export default function Portfolio() {
  const dispatch = useDispatch();
  const { portfolio, loading, error } = useSelector((s) => s.investments);
  console.log(portfolio)

  useEffect(() => {
    dispatch(fetchPortfolio());
  }, [dispatch]);

  const totalInvested = portfolio.reduce(
    (sum, inv) => sum + Number(inv.amountInvested ?? inv.amount ?? inv.investedAmount ?? 0),
    0
  );
  

  const fmt = (n) =>
    Number(n).toLocaleString("en-US", {
      style: "currency",
      currency: "MAD",
      maximumFractionDigits: 0,
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-800">My Portfolio</h1>
        <p className="text-stone-400 text-sm mt-1">
          Track your investments and ownership stakes.
        </p>
      </div>

      {}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 bg-amber-400 rounded-xl flex items-center justify-center shrink-0">
            <TrendingUp size={20} className="text-stone-900" />
          </div>
          <div>
            <p className="text-stone-400 text-sm">Total Invested</p>
            <p className="text-stone-800 text-xl font-bold">
              {fmt(totalInvested)}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 bg-stone-800 rounded-xl flex items-center justify-center shrink-0">
            <Briefcase size={20} className="text-white" />
          </div>
          <div>
            <p className="text-stone-400 text-sm">Projects Funded</p>
            <p className="text-stone-800 text-xl font-bold">
              {portfolio.length}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
          Failed to load portfolio: {error}
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-2xl h-52 animate-pulse border border-stone-100" />
      ) : (
        <PortfolioTable investments={portfolio} />
      )}
    </div>
  );
}
