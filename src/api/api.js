const BASE_URL = import.meta.env.VITE_API_URL;

export const getBlogs = async () => {
  const res = await fetch(`${BASE_URL}/blogs`);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
};

export const createBlog = async (blog) => {
  const res = await fetch(`${BASE_URL}/blogs/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  });

  if (!res.ok) throw new Error("Failed to create blog");
  return res.json();
};