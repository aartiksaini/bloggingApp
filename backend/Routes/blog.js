import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const blogRouter = new Hono();
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

// Authentication middleware
const auth = async (c, next) => {
  const token = c.req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return c.json({ message: 'No token provided' }, 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    c.req.user = decoded;
    await next();
  } catch (error) {
    return c.json({ message: 'Invalid token' }, 401);
  }
};

// Routes
blogRouter.get('/getall', async (c) => {
  const users = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return c.json({ users });
});

blogRouter.get('/:id', async (c) => {
  const postId = c.req.param('id');
  try {
    const post = await prisma.post.findFirst({
      where: { id: postId },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({ post });
  } catch (e) {
    console.log(e);
    return c.json({ msg: 'Invalid' }, 411);
  }
});

blogRouter.post('/', auth, async (c) => {
  const { title, content } = await c.req.json();
  const authorId = c.req.user.id;

  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId,
    },
  });

  return c.json({
    id: post.id,
    user_id: authorId,
  });
});

blogRouter.delete('/delete/:id', auth, async (c) => {
  const postId = c.req.param('id');
  const userId = c.req.user.id;

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return c.json({ msg: 'Post not found' });
    }

    if (post.authorId !== userId) {
      return c.json({ msg: 'User not authorized to delete this post' });
    }

    await prisma.post.delete({
      where: { id: postId },
    });

    return c.json({ message: 'Successfully deleted blog' });
  } catch (e) {
    console.log(e);
    return c.json({ msg: 'Failed to delete post' });
  }
});

blogRouter.put('/update/:id', auth, async (c) => {
  const postId = c.req.param('id');
  const { title, content } = await c.req.json();
  const userId = c.req.user.id;

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return c.json({ msg: 'Post not found' });
    }

    if (post.authorId !== userId) {
      return c.json({ msg: 'User not authorized to update this post' });
    }

    await prisma.post.update({
      where: { id: postId },
      data: {
        title: title || post.title,
        content: content || post.content,
      },
    });

    return c.json({ message: 'Successfully updated post' });
  } catch (e) {
    console.log(e);
    return c.json({ msg: 'Failed to update post' });
  }
});

export default blogRouter;
