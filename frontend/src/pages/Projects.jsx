import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../store/projectSlice";
import ProjectList from "../components/ProjectList";

export default function Projects() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((s) => s.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-800">Projects</h1>
        <p className="text-stone-400 text-sm mt-1">
          Browse and invest in available projects.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
          Failed to load projects: {error}
        </div>
      )}

      <ProjectList projects={list} loading={loading} />
    </div>
  );
}
