import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useGetBlogByIdQuery, useAddCommentMutation } from "../../../store/api/blogsApi";
import { useGetDevelopersQuery } from "../../../store/api/developersApi";
import { useAuth } from "../../../store/useAuth";
import CommentForm from "../../../components/comment/CommentForm";
import ReactMarkdown from "react-markdown";

const BlogDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: blog, isLoading } = useGetBlogByIdQuery(id ?? "");
    const { user } = useAuth();
    const { data: devData, isLoading: devLoading } = useGetDevelopersQuery({ page: 1, limit: 1000 });
    const [addComment] = useAddCommentMutation();
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);

    if (isLoading || !blog || devLoading) return <div className="text-center py-16">Loading...</div>;

    // Find the developer who authored the blog
    const authorDev = devData?.data?.find(dev => dev.uid === blog.author);
    const canEdit = user && blog.author === user.uid;

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !comment.trim()) return;
        setSubmitting(true);
        await addComment({
            blogId: blog.id,
            comment: {
                id: Date.now().toString(),
                author: user.uid || "Anonymous",
                content: comment,
                date: new Date().toISOString().slice(0, 10),
            },
        });
        setComment("");
        setSubmitting(false);
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
            <p className="text-gray-500 mb-2">
                By {authorDev ? authorDev.name : blog.author}
                {blog.date && <> on {blog.date}</>}
            </p>
            <div className="prose dark:prose-invert mb-8">
                <ReactMarkdown>{blog.content}</ReactMarkdown>
            </div>
            {/* Show edit/delete only if user is the author */}
            {canEdit && (
                <div className="flex gap-2 mb-6">
                    <button className="px-4 py-2 bg-yellow-500 text-white rounded" onClick={() => navigate(`/blogs/${blog.id}/edit`)}>Edit</button>
                    {/* Add delete logic as needed */}
                </div>
            )}
            <h3 className="text-xl font-bold mb-2">Comments</h3>
            <div className="space-y-4 mb-6">
                {(blog.comments || []).map(c => {
                    // Try to find developer by email
                    const commentDev = devData?.data?.find(dev => dev.uid === c.author);
                    return (
                        <div key={c.id} className="p-3 border rounded bg-gray-50 dark:bg-gray-800">
                            <div className="text-sm font-semibold">
                                {commentDev ? commentDev.name : c.author} <span className="text-xs text-gray-400">{c.date}</span>
                            </div>
                            <div className="text-gray-700 dark:text-gray-200">{c.content}</div>
                        </div>
                    );
                })}
            </div>
            {user && (
                <CommentForm
                    comment={comment}
                    setComment={setComment}
                    onSubmit={handleAddComment}
                    submitting={submitting}
                />
            )}
            {!user && <div className="text-gray-500 mt-4">Login to comment.</div>}
        </div>
    );
};

export default BlogDetailPage;
