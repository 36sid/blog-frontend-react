const BASE_URL = import.meta.env.VITE_API_URL;

const authHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

export const getBlogs = async () => {
  const res = await fetch(`${BASE_URL}/blogs/`);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
};

export const getBlogById = async (id) => {
  const res = await fetch(`${BASE_URL}/blogs/${id}`);
  if (!res.ok) throw new Error("Failed to fetch blog");
  return res.json();
};

export const createBlog = async (blog, token) => {
  const res = await fetch(`${BASE_URL}/blogs/`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(blog),
  });

  if (!res.ok) throw new Error("Failed to create blog");
  return res.json();
};

export const loginUser = async (username, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ username, password }),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  return res.json(); // { access_token, token_type }
};

export const registerUser = async (username, password) => {
  const res = await fetch(`${BASE_URL}/auth/register?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
};