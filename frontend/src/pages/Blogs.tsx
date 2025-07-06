import { BlogSkeleton } from "../components/skeleton";
import { Appbar } from "../components/ui/appBar"
import { BlogCard } from "../components/ui/blogCard"
import { useBlogs } from "../hooks"

export const Blogs =() =>{
    const {loading, blogs} = useBlogs();

    if(loading){
        return (
    <div>
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
    </div>
);
}
    return(
        <div>
        <Appbar/>
        <div className="flex justify-start w-full pl-80">
            <div className="grid grid-cols-1 gap-6 max-w-xl pl-1">
            {blogs.slice().reverse().map(blog => <BlogCard
            authorName={blog.author.name || "Anonymous"}
            title={blog.title}
            content={blog.content}
            publishedDate={"5th july"}
            id={blog.id}

            />)}
            </div>
        </div>
        </div>
        
    )
}