import { Hono } from "hono"
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, decode, verify } from "hono/jwt";

import { signinInput,createBlogInput, updateBlogInput} from '@abhiyuck/commonzod2'
export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
      userId: string
    }
}>
//to check for verification in every route of blog
blogRouter.use('/*', async (c, next) =>{
  const authHeader = c.req.header("Authorization") || ""
  const user = await verify(authHeader,c.env.JWT_SECRET)
  if(user){
    c.set("userId", String(user.id));
    await next();
  }else{
    c.status(403);
    return c.json({
      message: "you're not logged in"
    })
  }
});

//for posting 
blogRouter.post('/' , async (c) =>{
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try{
    const body = await c.req.json()
    const {success} = createBlogInput.safeParse(body)
    if(!success){
      c.status(404)
      return c.json({
        msg:"wrong inputs"
      })
    }
    const authorId = c.get("userId")
    const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId
    }
  })
  return c.json({
    blog: blog
  })

  }
  catch(e){
    c.status(411)
    return ({
        "message": "something went wrong"
    })
  }
})

//for updating post values
blogRouter.put('/' , async (c) =>{
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const body = await c.req.json()
  const {success} = updateBlogInput.safeParse(body)
    if(!success){
      c.status(404)
      return c.json({
        msg:"wrong inputs"
      })
    }
  const blog = await prisma.post.update({
    where: {
      id: body.id,
    },
    data :{
        title: body.title,
        content: body.content,
    }
  })
  return c.json({
    "reponse": blog,
  })
})



blogRouter.get('/bulk' , async (c) =>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs = await prisma.post.findMany({
      select:{
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true
          }
        }
      }
    })

  return c.json({
    "allBlogs": blogs
  })
})



blogRouter.get('/:id' , async (c) =>{
  const id = c.req.param("id")
  const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const blog = await prisma.post.findFirst({
      where :{
        id: id
      },
      select :{
        id: true,
        title: true,
        content: true,
        createdAt: true,
        author : {
          select :{
            name : true
          }
        }
      }
    })
  return c.json({
    blog
  })
})