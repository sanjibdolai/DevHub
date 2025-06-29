import { useState } from "react";
import { useGetBlogsQuery } from "../../store/api/blogsApi";
import { useGetDevelopersQuery } from "../../store/api/developersApi";
import Card from "../../components/card";
import LoadingSpinner from "../../components/loading-spinner";
import type { Developer } from "../../store/api/developersApi";
import { useAuth } from "../../store/useAuth";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "../../components/pagination/Pagination";
import { useNavigate } from "react-router";
import ReactMarkdown from "react-markdown";

const blogsPerPage = 6;

const BlogsPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetBlogsQuery({ page, limit: blogsPerPage });
  // Fetch all developers (adjust limit as needed)
  const { data: devData } = useGetDevelopersQuery({ page: 1, limit: 1000 });
  const navigate = useNavigate();
  const { user } = useAuth();
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / blogsPerPage);

  // Map developer id to developer object
  const devMap: Record<string, Developer> = devData?.data?.reduce((acc: Record<string, Developer>, dev: Developer) => {
    if (dev.uid) {
      acc[dev.uid] = dev;
    }
    return acc;
  }, {}) || {};

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blogs</h1>
        {user && (
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            onClick={() => navigate("/blogs/create")}
          >
            + Create Blog
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {(data?.data || []).length === 0 && !isLoading ? (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-12 w-full">
            No blogs found.
          </div>
        ) : (data?.data || []).map((blog) => {
          // If blog.author is a developer id, use it; otherwise, fallback to name
          const dev = devMap[blog.author];
          return (
            <Card key={blog.id} className="overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm">
                  By {dev ? (
                    <span className="font-semibold text-indigo-700 dark:text-indigo-400 cursor-pointer" onClick={() => navigate(`/developers/${dev.uid}`)}>
                      {dev.name}
                    </span>
                  ) : blog.author} on {blog.date}
                </p>
                <p className="text-gray-700 dark:text-gray-200 line-clamp-3"><ReactMarkdown>{blog.content}</ReactMarkdown></p>
                <button
                  className="mt-4 text-indigo-600 hover:underline font-semibold"
                  onClick={() => navigate(`/blogs/${blog.id}`)}
                >
                  Read More
                </button>
              </div>
            </Card>
          );
        })}
      </div>
      {isLoading && <LoadingSpinner />}

      {/* Pagination */}
      {totalPages > 1 && (data?.data?.length ?? 0) > 0 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} />
            </PaginationItem>
            {/* Page number buttons with ellipsis for many pages */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p =>
                p === 1 ||
                p === totalPages ||
                (p >= page - 1 && p <= page + 1)
              )
              .reduce((acc, p, idx, arr) => {
                if (idx > 0 && p - arr[idx - 1] > 1) {
                  acc.push('ellipsis');
                }
                acc.push(p);
                return acc;
              }, [] as (number | 'ellipsis')[])
              .map((p, idx) =>
                p === 'ellipsis' ? (
                  <PaginationItem key={"ellipsis-" + idx}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <PaginationLink isActive={page === p} onClick={() => setPage(p as number)}>{p}</PaginationLink>
                  </PaginationItem>
                )
              )
            }
            <PaginationItem>
              <PaginationNext onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default BlogsPage;