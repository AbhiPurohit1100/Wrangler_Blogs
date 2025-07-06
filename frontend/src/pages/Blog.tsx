import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import { FullBlog } from "../components/ui/fullBlog";
import { BlogSkeleton } from "../components/skeleton";

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({ id: id || "" });

    if (loading || !blog || (Array.isArray(blog) && blog.length === 0)) {
        return (
            <div>
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
            </div>
        );
    }

    // If blog is an array, use the first item; otherwise, use blog as is
    const blogData = Array.isArray(blog) ? blog[0] : blog;

    return (
        <div>
            <FullBlog blog={blogData} />
        </div>
    );
};