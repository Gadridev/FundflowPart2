import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../store/projectSlice";
import { fetchPortfolio } from "../store/investmentSlice";
import DashboardStats from "../components/DashboardStats";
import ProjectCard from "../components/ProjectCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const { list: projects, loading } = useSelector((s) => s.projects);
  const { portfolio } = useSelector((s) => s.investments);
  const { balance } = useSelector((s) => s.wallet);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchPortfolio());
  }, [dispatch]);

  const totalInvested =
    portfolio.length === 0
      ? 0
      : portfolio.reduce(
          (sum, inv) =>
            sum + Number(inv.amountInvested ?? inv.amount ?? inv.investedAmount ?? 0),
          0
        );
  const portfolioValue = totalInvested + Number(balance);

  
  const openProjects = projects
    .filter((p) => p.status?.toLowerCase() === "open")
    .slice(0, 3);

  return (
    <div className="space-y-8">
      {}
      <div>
        <h1 className="text-2xl font-bold text-stone-800">
          Welcome back, {user?.name ?? "Investor"} 👋
        </h1>
        <p className="text-stone-400 text-sm mt-1">
          Here's your investment overview.
        </p>
      </div>

      {/* Stats grid */}
      <DashboardStats
        balance={balance}
        totalInvested={totalInvested}
        projectCount={portfolio.length}
        portfolioValue={portfolioValue}
      />

      {/* Open projects preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-stone-700 font-semibold text-base">
            Open Projects
          </h2>
          <Link
            to="/projects"
            className="flex items-center gap-1 text-amber-600 text-sm font-medium hover:text-amber-700 transition-colors"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-56 rounded-2xl bg-stone-100 animate-pulse"
              />
            ))}
          </div>
        ) : openProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {openProjects.map((p) => (
              <ProjectCard key={p._id ?? p.id} project={p} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center text-stone-400 border border-stone-100">
            No open projects at the moment.
          </div>
        )}
      </div>
    </div>
  );
}
