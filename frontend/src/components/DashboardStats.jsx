import { Wallet, TrendingUp, Briefcase, DollarSign } from "lucide-react";

function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div className="bg-white rounded-2xl p-6 flex items-center gap-5 shadow-sm border border-stone-100">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${accent}`}
      >
        <Icon size={22} className="text-white" />
      </div>
      <div>
        <p className="text-stone-400 text-sm">{label}</p>
        <p className="text-stone-800 text-2xl font-bold mt-0.5">{value}</p>
      </div>
    </div>
  );
}

export default function DashboardStats({
  balance,
  totalInvested,
  projectCount,
  portfolioValue,
}) {
  const fmt = (n) =>
    Number(n ?? 0).toLocaleString("en-US", {
      style: "currency",
      currency: "MAD",
      maximumFractionDigits: 0,
    });

  const stats = [
    {
      icon: Wallet,
      label: "Available Balance",
      value: fmt(balance),
      accent: "bg-amber-400",
    },
    {
      icon: TrendingUp,
      label: "Total Invested",
      value: fmt(totalInvested),
      accent: "bg-stone-800",
    },
    {
      icon: Briefcase,
      label: "Projects Funded",
      value: projectCount ?? 0,
      accent: "bg-amber-500",
    },
    {
      icon: DollarSign,
      label: "Portfolio Value",
      value: fmt(portfolioValue),
      accent: "bg-stone-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {stats.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>
  );
}
