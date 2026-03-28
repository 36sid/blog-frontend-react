import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogs, createBlog } from "../api/api";

function Home() {
    const [blogs, setBlogs] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const fetchBlogs = async () => {
        const data = await getBlogs();
        setBlogs(data);
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await createBlog({ title, content });

        setTitle("");
        setContent("");
        await fetchBlogs();
    };

    const truncateContent = (text, maxLength = 150) => {
        if (!text) return "";
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 ">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold tracking-tight">
                        <span className="text-indigo-400"> {"</> Dev"}</span>Diary
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Documenting the journey, one entry at a time.
                    </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 min-h-screen">
                    {/* Create Blog Section */}
                    <div className="xl:col-span-2 h-fit sticky top-8">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300">
                            <div className="flex items-center mb-6">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Create New Blog</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Blog Title</label>
                                    <input
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                        placeholder="Enter an engaging title..."
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                                    <textarea
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none bg-gray-50 focus:bg-white"
                                        placeholder="Share your thoughts..."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        rows="8"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg text-white font-medium"
                                >
                                    🚀 Publish Blog
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Blogs Section */}
                    <div className="xl:col-span-2">
                        <div className="mb-8">
                            <div className="flex items-center">
                                <h2 className="text-3xl font-bold text-gray-900">Recent Blogs</h2>
                            </div>
                        </div>

                        {blogs.length === 0 ? (
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-16 text-center border border-white/20">
                                <div className="w-20 h-20 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No blogs yet</h3>
                                <p className="text-gray-600 text-lg">Create your first blog post to get started!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-1 gap-8">
                                {blogs.map(blog => (
                                    <Link key={blog.id} to={`/blog/${blog.id}`}>
                                        <div className="bg-gray-200 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl border border-white/20 p-6 transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col cursor-pointer group">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="text-right">
                                                    <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                                                        {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                    </div>
                                                    <div className="text-xs text-gray-400">
                                                        {new Date(blog.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                                {blog.title}
                                            </h3>

                                            <p className="text-gray-600 text-sm flex-grow mb-4 line-clamp-3 leading-relaxed">
                                                {truncateContent(blog.content)}
                                            </p>

                                            <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:text-blue-700 transition-colors">
                                                <span>Read More</span>
                                                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
