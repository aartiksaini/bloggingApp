import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import { env } from 'hono/adapter'


export const UserRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
}>()

UserRoute.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
  

    try {
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password
            }
        })
        const userResponse = {
            id: user.id,
            name: user.name,
            email: user.email,
        };
        const { JWT_SECRET } = env(c)
       
        
        const token = await sign({ id: user.id },c.env.JWT_SECRET);
        return c.json({
            token: token,
            user: userResponse
        })
    } catch (e) {
        console.log(e);
        c.status(411);
        return c.text('Invalid')
    }
})

UserRoute.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();


    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password
        }
    })
    if (!user) {
        c.status(403);
        return c.json({ error: "user not exists" })
    }

    const userResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
    };
    const token = await sign({ id: user.id },c.env.JWT_SECRET);
    return c.json({
        token: token,
        user: userResponse
    })
})