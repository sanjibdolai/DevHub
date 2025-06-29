import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Comment {
    id: string;
    author: string;
    content: string;
    date: string;
}

export interface Blog {
    id: string; // changed from number to string for UUID support
    title: string;
    content: string;
    author: string;
    date: string;
    image?: string;
    comments?: Comment[];
}

export interface BlogsResponse {
    data: Blog[];
    total: number;
}

export const blogsApi = createApi({
    reducerPath: 'blogsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
    endpoints: (builder) => ({
        getBlogs: builder.query<BlogsResponse, { page: number; limit: number }>({
            query: ({ page, limit }) => `blogs?_page=${page}&_limit=${limit}`,
            transformResponse: (response: Blog[], meta) => {
                const total = Number(meta?.response?.headers.get('x-total-count')) || response.length;
                return { data: response, total };
            },
        }),
        getBlogById: builder.query<Blog, string>({
            query: (id) => `blogs/${id}`,
        }),
        addBlog: builder.mutation<Blog, Partial<Blog>>({
            query: (body) => ({
                url: 'blogs',
                method: 'POST',
                body,
            }),
        }),
        updateBlog: builder.mutation<Blog, { id: string; data: Partial<Blog> }>({
            query: ({ id, data }) => ({
                url: `blogs/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        deleteBlog: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({
                url: `blogs/${id}`,
                method: 'DELETE',
            }),
        }),
        addComment: builder.mutation<Blog, { blogId: string; comment: Comment }>({
            async queryFn({ blogId, comment }, _queryApi, _extraOptions, fetchWithBQ) {
                // Fetch the blog
                const blogRes = await fetchWithBQ(`blogs/${blogId}`);
                if (!blogRes.data) return { error: blogRes.error as unknown };
                const blog = blogRes.data as Blog;
                const updatedComments = [...(blog.comments || []), comment];
                // Update the blog with new comments
                const updateRes = await fetchWithBQ({
                    url: `blogs/${blogId}`,
                    method: 'PUT',
                    body: { ...blog, comments: updatedComments },
                });
                if (!updateRes.data) return { error: updateRes.error as unknown };
                return { data: updateRes.data as Blog };
            },
        }),
    }),
});

export const {
    useGetBlogsQuery,
    useGetBlogByIdQuery,
    useAddBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
    useAddCommentMutation,
} = blogsApi;
