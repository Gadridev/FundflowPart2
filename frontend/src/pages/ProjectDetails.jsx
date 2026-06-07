import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectById, clearSelected } from "../store/projectSlice";
import InvestmentForm from "../components/InvestmentForm";
import { ArrowLeft, Users, Target } from "lucide-react";

const STATUS_STYLE = {
  open: "bg-green-100 text-green-700",
  closed: "bg-red-100 text-red-600",
  funded: "bg-amber-100 text-amber-700",
  pending: "bg-stone-100 text-stone-500",
};

export default function ProjectDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selected: project, loading, error } = useSelector((s) => s.projects);

  useEffect(() => {
    dispatch(fetchProjectById(id));
    return () => dispatch(clearSelected());
  }, [id, dispatch]);

  const fmt = (n) =>
    Number(n ?? 0).toLocaleString("en-US", {
      style: "currency",
      currency: "MAD",
      maximumFractionDigits: 0,
    });

  if (loading) {
    return (
      <div className="space-y-5 max-w-4xl">
        <div className="h-8 bg-stone-100 rounded-xl animate-pulse w-1/3" />
        <div className="h-48 bg-stone-100 rounded-2xl animate-pulse" />
        <div className="h-36 bg-stone-100 rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="text-center py-24 text-stone-400">
        <p className="text-base">Project not found.</p>
        <button
          onClick={() => navigate("/projects")}
          className="mt-3 text-amber-500 underline text-sm"
        >
          Back to projects
        </button>
      </div>
    );
  }

  const progress = project.capital > 0 ? Math.min((project.currentAmount / project.capital) * 100, 100) : 0;
  const status = project.status?.toLowerCase();
  const canInvest = status === "open";

  return (
    <div className="space-y-6 max-w-4xl">
      {}
      <button
        onClick={() => navigate("/projects")}
        className="flex items-center gap-2 text-stone-500 hover:text-stone-800 text-sm transition-colors"
      >
        <ArrowLeft size={16} /> Back to projects
      </button>

      {}
      <div className="flex items-start gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-stone-800 flex-1">
          {project.title}
        </h1>
        <span
          className={`text-xs font-medium px-3 py-1.5 rounded-full capitalize ${
            STATUS_STYLE[status] ?? STATUS_STYLE.pending
          }`}
        >
          {status}
        </span>
      </div>

      {}
      <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
        <h2 className="text-stone-700 font-semibold mb-3">About</h2>
        <p className="text-stone-500 text-sm leading-relaxed">
          {project.description}
        </p>
      </div>

      {}
      <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm space-y-4">
        <h2 className="text-stone-700 font-semibold">Funding Progress</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-stone-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-stone-400 text-xs mb-1">
              <Target size={13} /> Raised
            </div>
            <p className="text-stone-800 font-bold text-lg">{fmt(project.currentAmount)}</p>
          </div>
          <div className="bg-stone-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-stone-400 text-xs mb-1">
              <Target size={13} /> Target
            </div>
            <p className="text-stone-800 font-bold text-lg">{fmt(project.capital)}</p>
          </div>
        </div>

        <div className="h-3 bg-stone-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-400 rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-amber-600 font-bold text-xl">
          {progress.toFixed(1)}% funded
        </p>
      </div>

      {}
      {canInvest ? (
        <InvestmentForm projectId={project._id} />
      ) : (
        <div className="bg-stone-50 rounded-2xl p-6 text-center text-stone-400 text-sm border border-stone-100">
          This project is not open for investment.
        </div>
      )}
    </div>
  );
}
