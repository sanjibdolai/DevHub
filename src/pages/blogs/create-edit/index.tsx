import { useAddBlogMutation, useUpdateBlogMutation, useGetBlogByIdQuery } from "../../../store/api/blogsApi";
import { useAuth } from "../../../store/useAuth";
import { useNavigate, useParams } from "react-router";
import BlogForm from "../../../components/form/BlogForm";
import { useState } from "react";

const BlogFormPage = ({ isEdit = false }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const blogId = isEdit && id ? id : "";
    const { data: blog, isLoading, isError } = useGetBlogByIdQuery(blogId, { skip: !isEdit || !id });
    const [addBlog, { isLoading: isAdding }] = useAddBlogMutation();
    const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (values: { title: string; content: string }) => {
        setSubmitError(null);
        try {
            if (!user) return;
            if (isEdit && id) {
                await updateBlog({
                    id,
                    data: {
                        ...values,
                        author: blog?.author || user.uid || undefined,
                        date: blog?.date || new Date().toISOString().slice(0, 10),
                        comments: blog?.comments || [],
                    }
                }).unwrap();
            } else {
                await addBlog({
                    ...values,
                    author: user.uid || undefined,
                    date: new Date().toISOString().slice(0, 10),
                    comments: [],
                }).unwrap();
            }
            setSuccess(true);
            setTimeout(() => navigate("/blogs"), 1200);
        } catch (e) {
            const errorMsg = (e && typeof e === 'object' && 'data' in e && e.data && typeof e.data === 'object' && 'message' in e.data)
                ? (e as { data: { message: string } }).data.message
                : (e instanceof Error ? e.message : "Failed to submit blog.");
            setSubmitError(errorMsg);
        }
    };

    if (isEdit && isLoading) return <div className="py-16"><span className="block mx-auto"><BlogForm isEdit initialValues={{ title: '', content: '' }} onSubmit={() => {}} /></span></div>;
    if (isEdit && isError) return <div className="text-center text-red-500 py-16">Blog not found or failed to load.</div>;

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            {submitError && <div className="mb-4 text-red-500 text-center">{submitError}</div>}
            {success && <div className="mb-4 text-green-600 text-center">Blog saved successfully!</div>}
            <BlogForm
                initialValues={isEdit && blog ? { title: blog.title, content: blog.content } : undefined}
                onSubmit={handleSubmit}
                isEdit={isEdit}
                isSubmitting={isAdding || isUpdating}
            />
        </div>
    );
};

export default BlogFormPage;