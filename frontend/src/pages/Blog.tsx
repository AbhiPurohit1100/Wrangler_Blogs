import { BlogSkeleton } from "../components/skeleton";
import { FullBlog } from "../components/ui/fullBlog"
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom"

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({ id: id || "" });

    if (loading) {
        return <div><BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton/>
        </div>;
    }
    if (!blog) {
        return <div>Blog not found</div>;
    }
    return (
        <div>
            <FullBlog blog={blog} />
        </div>
    );
}