import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogs } from "../api/api";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const data = await getBlogs();
      const foundBlog = data.find(b => b.id == id);
      setBlog(foundBlog);
      setLoading(false);
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-2xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-gray-600 mb-6">Blog not found.</p>
          <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium mb-8 inline-block transition-colors">
          ← Back to Blogs
        </Link>

        <article className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="p-12">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{blog.title}</h1>
                <p className="text-gray-600 text-lg">
                  Published on {new Date(blog.created_at).toLocaleDateString()} at {new Date(blog.created_at).toLocaleTimeString()}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                {blog.content}
              </div>
            </div>
          </div>
        </article>

        <div className="mt-8">
          <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
            ← Back to Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
