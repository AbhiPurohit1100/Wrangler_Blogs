import { Link } from "react-router-dom"

interface BlogCardProps{
    authorName:string,
    title:string,
    content:string,
    publishedDate:string,
    id:string
}

export const BlogCard=({
    authorName,
    title,
    content,
    publishedDate,
    id,

}:BlogCardProps)=>{
    
    return <Link to={`/blog/${id}`}>
    
    <div className="p-4 border-b border-slate-200 pb-4  w-screen max-w-screen-md">
        <div className="flex">
            
            <Avatar name={authorName}/> 
            
            
            <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
            {authorName}
            </div>
            <div className="flex justify-center flex-col pl-2 ">
                <Circle/>
            </div>
            <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
            {publishedDate}
            </div>
            
        </div>
        <div className="text-xl font-semibold pt-2">
            {title}
        </div>
        <div className=" text-xl font-thin">
            {content.slice(0,100)+"....."}
        </div>
        <div className="text-slate-400 text-sm font-thin pt-4">
            {`${Math.ceil(content.length/100)} minute(s) read`}
        </div>
     
    </div>
    </Link>
}

export function  Avatar({name,size="small"}:{name:string,size?:"small" | "big"}){
    
return <div className={`relative inline-flex items-center justify-center ${size==="small"?"w-6 h-6": "w-10 h-10"} overflow-hidden rounded-full bg-gray-600`}>
    <span className={`${size==="small"?"text-xs": "text-md"}text-xs font-extralight text-gray-600 dark:text-gray-300`}>{name[0]}</span>
</div>

}


function Circle(){
    return <div className="h-1 w-1 rounded-full bg bg-slate-400">

    </div>
}