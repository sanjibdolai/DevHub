import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactMarkdown from "react-markdown";
import Button from "../button";

interface BlogFormValues {
  title: string;
  content: string;
}

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
});

interface BlogFormProps {
  initialValues?: BlogFormValues;
  onSubmit: (values: BlogFormValues) => void;
  isEdit?: boolean;
  isSubmitting?: boolean;
}

const BlogForm: React.FC<BlogFormProps> = ({ initialValues, onSubmit, isEdit, isSubmitting }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<BlogFormValues>({
    resolver: yupResolver(schema),
    defaultValues: initialValues || { title: "", content: "" },
  });
  const content = watch("content");
  const [preview, setPreview] = React.useState(false);

  // Save raw markdown as entered
  const handleRawSubmit = (values: BlogFormValues) => {
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit(handleRawSubmit)} className="space-y-6">
      <label htmlFor="blog-title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Title</label>
      <input
        id="blog-title"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        placeholder="Blog Title"
        autoFocus
        aria-invalid={!!errors.title}
        {...register("title")}
      />
      {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      <label htmlFor="blog-content" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Content</label>
      <textarea
        id="blog-content"
        className="w-full px-3 py-2 border border-gray-300 rounded-md min-h-[200px]"
        placeholder="Write your blog in markdown..."
        aria-invalid={!!errors.content}
        {...register("content")}
      />
      {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
      <div className="flex gap-2">
        <Button type="button" variant="secondary" onClick={() => setPreview(p => !p)} disabled={isSubmitting}>
          {preview ? "Edit" : "Preview"}
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? (isEdit ? "Updating..." : "Publishing...") : (isEdit ? "Update" : "Publish")}
        </Button>
      </div>
      {preview && (
        <div className="mt-8 p-4 border rounded bg-white dark:bg-gray-800 max-h-96 overflow-auto">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )}
    </form>
  );
};

export default BlogForm;
