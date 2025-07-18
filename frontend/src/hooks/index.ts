import { useEffect, useState } from "react";

import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog{
    "content" : string,
    "title" : string,
    "id" : string,
    "createdAt" : string,
    "author": {
        "name" : string
    }
}

export const useBlog = ({id} : {id:string}) =>{
    const [loading , setLoading] = useState(true)
    const [blog, setBlog] = useState<Blog[] | undefined>()

    useEffect(() =>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}` , {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(response =>{
            setBlog(response.data.blog)
            setLoading(false)
        })

    },[id])

    return{
        loading,
        blog,
    }
}

export const useBlogs = () =>{
    const [loading , setLoading] = useState(true)
    const [blogs, setBlogs] = useState<Blog[]>([])

    useEffect(() =>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk` , {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(response =>{
            setBlogs(response.data.allBlogs)
            setLoading(false)
        })

    },[])

    return{
        loading,
        blogs,
    }
}



