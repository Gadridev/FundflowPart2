import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const STATUS_STYLE = {
  open: "bg-green-100 text-green-700",
  closed: "bg-red-100 text-red-600",
  funded: "bg-amber-100 text-amber-700",
  pending: "bg-stone-100 text-stone-500",
};

export default function ProjectCard({ project }) {
  const navigate = useNavigate();

  const fmt = (n) =>
    Number(n).toLocaleString("en-US", {
      style: "currency",
      currency: "MAD",
      maximumFractionDigits: 0,
    });

  const progress = project.capital > 0 ? Math.min((project.currentAmount / project.capital) * 100, 100) : 0;
  const status = project.status?.toLowerCase();

  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
      {}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-stone-800 font-semibold text-base leading-snug line-clamp-2">
          {project.title}
        </h3>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap capitalize ${
            STATUS_STYLE[status] ?? STATUS_STYLE.pending
          }`}
        >
          {status}
        </span>
      </div>

      {}
      <p className="text-stone-400 text-sm line-clamp-2 leading-relaxed">
        {project.description}
      </p>

      {}
      <div>
        <div className="flex justify-between text-xs text-stone-400 mb-1.5">
          <span>Raised: {fmt(project.currentAmount)}</span>
          <span className="font-medium text-stone-600">
            {progress.toFixed(0)}%
          </span>
        </div>
        <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-400 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-stone-400 mt-1.5">Target: {fmt(project.capital)}</p>
      </div>

      {}
      <button
        onClick={() => navigate(`/projects/${project._id}`)}
        className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-stone-900 text-white text-sm font-medium hover:bg-stone-700 transition-colors"
      >
        View Details <ArrowRight size={15} />
      </button>
    </div>
  );
}
