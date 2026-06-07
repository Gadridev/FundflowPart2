import api from "./axios.js";

export async function listMyProjects() {
  const { data } = await api.get("/projects/mine");
  return data;
}
export async function getAllProject() {
  const { data } = await api.get("/projects");
  return data;
}