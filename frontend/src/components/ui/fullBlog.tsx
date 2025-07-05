import { Appbar } from "./appBar"
import type { Blog } from "../../hooks"
import { Avatar } from "./blogCard"

export const FullBlog =({blog} :{blog: Blog}) =>{
    return (
        <div>
            <Appbar></Appbar>
            <div className="flex justify-center pl-10">
        <div className="grid grid-cols-12 w-full px-10 pt-10">
            <div className="col-span-10">
                <div className="text-3xl font-extrabold">
                    {blog.title}
                    

                </div>
                <div className="pt-2 text-slate-600">
                    {blog.createdAt}
                </div>
                <div className="font-bold">
                    {blog.content}
                </div>
            </div>
            <div className="col-span-2">
                <div className="grid grid-cols-6">
                    <div className="col-span-1">
                    <Avatar name={blog.author.name || "Anonymous"}></Avatar>
                    </div>
                    <div className="flex col-span-5">
                        Author
                </div>
                </div>
                
                <div className="text-3xl">
                    {blog.author.name || "Anonymous"}
                </div>
                
            </div>

        </div>
        </div>
        </div>
    )

}