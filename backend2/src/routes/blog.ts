import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { sign } from 'hono/jwt'


import { verify } from 'hono/jwt'


export const BlogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
        params: string
    },
    Variables: {
      userId:string
    }
}>()


BlogRoute.get('/getall', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const users = await prisma.post.findMany({
        select: {
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
    return c.json({ users });
})

BlogRoute.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())


    const postId = c.req.param('id');
    try {
        const users = await prisma.post.findFirst({
            where: {
                id: postId
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({ users });
    }
    catch (e) {
        console.log(e);
        c.status(411);
        return c.text('Invalid')
    }

})


BlogRoute.use('/*', async (c, next) => {
	const token = c.req.header('authorization')||"";
	if (!token) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}


	const user = await verify(token, c.env.JWT_SECRET);
    
    console.log(user);
	if (user) {
		c.set('userId', user.id);
	    await next()
	}
    else{
        c.status(401);
		return c.json({ error: "unauthorized" });
    }
	
})


BlogRoute.post('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId
		}
	});
	return c.json({
		id: post.id,
        user_id: userId
	});
})




BlogRoute.delete("/delete/:id", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())


    const token = c.req.header("authorization")
    if (!token) {
        return c.json({ msg: "Authentication token is missing" });

    }

    let userId;
    try {
        const decoded = await verify(token, c.env.JWT_SECRET);
        userId = decoded.id;
    } catch (e) {
        return c.json({ msg: "Invalid or expired token" });

    }

    const postId = await c.req.param("id");
    try {
      
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        });

        if (!post) {
            return c.json({ msg: "Post not found" });

        }

        if (post.authorId !== userId) {
            return c.json({ msg: "User not authorized to delete this post" });

        }
        console.log(post.authorId);
        console.log(userId);

        await prisma.post.delete({
            where: {
                id: postId
            }
        });

        return c.json({ message: "Successfully deleted blog" });
    } catch (e) {
        console.log(e);
        return c.json({ msg: "Failed to delete post" });
    }
});


BlogRoute.put('/update/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const token = c.req.header("authorization");
    if (!token) {
        return c.json({ msg: "Authentication token is missing" });
    }

    let userId;
    try {
        const decoded = await verify(token, c.env.JWT_SECRET);
        userId = decoded.id;
    } catch (e) {
        return c.json({ msg: "Invalid or expired token" });
    }

    const postId = c.req.param("id");
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        });

        if (!post) {
            return c.json({ msg: "Post not found" });
        }

        if (post.authorId !== userId) {
            return c.json({ msg: "User not authorized to update this post" });
        }

        // Parse the request body
        const { title, content } = await c.req.json();

        await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                title: title || post.title,
                content: content || post.content
            }
        });

        return c.json({ message: "Successfully updated post" });
    } catch (e) {
        console.log(e);
        return c.json({ msg: "Failed to update post" });
    }
});