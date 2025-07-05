import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { PrismaClient } from './generated/prisma/edge'
import { withAccelerate, WithAccelerateOptions } from '@prisma/extension-accelerate'
import { sign, decode, verify } from 'hono/jwt'
import { signinInput,createBlogInput, updateBlogInput} from '@abhiyuck/commonzod2'
import { cors } from 'hono/cors'
const app = new Hono<{
  Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
      DIRECT_URL: string
  }
}>()
app.use("/*", cors())
app.route("/api/v1/user", userRouter)
app.route("api/v1/blog", blogRouter)


app.use('api/v1/post*', async (c, next)=>{
  const header = c.res.header("Authorization") || "";
  const token = header
  const response = await verify(token, c.env.JWT_SECRET)
  if(response.id){
    await next()

  }else{
    c.status(403)
    return c.json({error: "unauthorized"})
  }
}) 

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// app.post('/api/v1/signup' , async (c) =>{

//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate())
//   try{
//   const body = await c.req.json()
//   const user = await prisma.user.create({
//     data: {
//       email: body.email,
//       password: body.password,
//       name: body.name
//     }
//   })
//   const token = await sign({id: user.id}, c.env.JWT_SECRET)
//   return c.json({
//     jwt: token
//   })
// }

//   catch(e){
//     c.status(403)
//   return c.json({
//     "error": "invalid and already exist"
//   })
//   }
  
// })

// app.post('/api/v1/signin' ,async (c) => {
//   const prisma = new PrismaClient({
//     //@ts-ignore
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate())

//   const body = await c.req.json();
//   const user = await prisma.user.findFirst({
//     where : {
//       email : body.email,
//       password: body.password
//     }
// })
  
//   if(!user){
//     c.status(403)
//     return c.json({
//       error: "not found in db"
//     })
//   }
//   else{
//     const jwt = await sign({id: user.id}, c.env.JWT_SECRET)
//     return c.json({"jwt": jwt})
//   }

  
// })


export default app