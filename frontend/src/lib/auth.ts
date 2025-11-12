const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function signup(payload: { email: string; password: string; firstName?: string; lastName?: string }) {
  const res = await fetch(`${API}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to signup");
  }
  const data = await res.json();
  if (data.token) localStorage.setItem("token", data.token);
  return data;
}

export async function signin(payload: { email: string; password: string }) {
  const res = await fetch(`${API}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to signin");
  }
  const data = await res.json();
  if (data.token) localStorage.setItem("token", data.token);
  return data;
}

export async function getMe() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const res = await fetch(`${API}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.user;
}

export function signout() {
  localStorage.removeItem("token");
}
