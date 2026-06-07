import { useState } from "react";
import { Search } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { searchProjects, filterProjectsByStatus } from "../api/investorApi";

const STATUS_OPTIONS = ["All", "Open", "Closed", "Funded", "Pending"];

export default function ProjectList({ projects = [], loading }) {
  
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filtered = filterProjectsByStatus(
    searchProjects(projects, search),
    status
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 h-56 animate-pulse border border-stone-100"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                status === s
                  ? "bg-stone-900 text-white"
                  : "bg-white border border-stone-200 text-stone-500 hover:border-stone-400"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      {!loading && (
        <p className="text-stone-400 text-sm">
          {filtered.length} project{filtered.length !== 1 ? "s" : ""} found
        </p>
      )}

      {/* Project cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-stone-400">
          <p className="text-base">No projects match your search.</p>
          <button
            onClick={() => {
              setSearch("");
              setStatus("All");
            }}
            className="mt-3 text-amber-500 text-sm underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <ProjectCard key={p._id ?? p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
