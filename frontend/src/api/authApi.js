import api from "./axios.js";

export async function register(body) {
  const { data } = await api.post("/auth/register", {
    role: "project_owner",
    ...body,
  });
  return data;
}

export async function login(credentials) {
  const { data } = await api.post("/auth/login", credentials);
  return data;
}

export async function getMe() {
  const { data } = await api.get("/auth/me");
  return data;
}
