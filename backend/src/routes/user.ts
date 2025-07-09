import { Hono } from "hono"
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";

import { signinInput,createBlogInput, updateBlogInput, signupInput} from '@abhiyuck/commonzod2'

export const userRouter = new Hono<{
  Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
      DIRECT_URL: string
  }
}>()
userRouter.post('/signup' , async (c) =>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try{
  const body = await c.req.json()
  const {success} = signupInput.safeParse(body)

  if(!success){
    c.status(404)
    return c.json({
      msg: "input meathod not correct"
    })
  }
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
      name: body.name
    }
  })
  const token = await sign({id: user.id}, c.env.JWT_SECRET)
  return c.json({
    jwt: token
  })
}

  catch(e){
    c.status(403)
  return c.json({
    "error": "invalid and already exist"
  })
  } 
})

userRouter.post('/signin' ,async (c) => {
  const prisma = new PrismaClient({
    //@ts-ignore
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const {success} = signinInput.safeParse(body)

  if(!success){
    c.status(404)
    return c.json({
      msg: "input meathod not correct"
    })
  }
  const user = await prisma.user.findFirst({
    where : {
      email : body.email,
      password: body.password
    }
})
  
  if(!user){
    c.status(403)
    return c.json({
      error: "not found in db"
    })
  }
  else{
    const jwt = await sign({id: user.id}, c.env.JWT_SECRET)
    return c.json({"jwt": jwt})
  }  
})

