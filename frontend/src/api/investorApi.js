import api from "./axios.js";
import { listMyProjects } from "./projectsApi.js";

export async function listProjects() {
  try {
    const { data } = await api.get("/projects");
    console.log(data)
    return data;
  } catch (error) {
    if (error.response?.status === 404) {
      return await listMyProjects();
    }
    throw error;
  }
}

export async function getProjectById(projectId) {
  try {
    const { data } = await api.get(`/projects/${projectId}`);
    return data;
  } catch (error) {
    if (error.response?.status === 404) {
      const result = await listMyProjects();
      const project = result.data?.projects?.find(
        (p) => p._id === projectId || p.id === projectId
      );
      if (project) return { status: "success", data: { project } };
    }
    throw error;
  }
}

export async function investInProject(projectId, payload) {
  const { data } = await api.post(`/projects/${projectId}/invest`, payload);
  return data;
}

export async function fetchInvestorPortfolio() {
  const { data } = await api.get("/investments/me");
  return data;
}

export async function topUpWallet(amount) {
  const { data } = await api.post("/wallet/top-up", { amount });
  return data;
}

export async function getWallet() {
  const { data } = await api.get("/wallet/me");
  return data;
}

export async function fetchProjectInvestors(projectId) {
  const { data } = await api.get(`/projects/${projectId}/investors`);
  return data;
}

export async function fetchOwnerInvestorPortfolio(projectId, investorId) {
  const { data } = await api.get(
    `/projects/${projectId}/investors/${investorId}/portfolio`
  );
  return data;
}

export function searchProjects(projects = [], searchTerm = "") {
  const query = String(searchTerm).trim().toLowerCase();
  if (!query) return projects;
  return projects.filter((p) =>
    `${p.title ?? ""} ${p.description ?? ""}`.toLowerCase().includes(query)
  );
}

export function filterProjectsByStatus(projects = [], status) {
  if (!status || status.toLowerCase() === "all") return projects;
  return projects.filter(
    (p) => p.status?.toLowerCase() === status.toLowerCase()
  );
}
