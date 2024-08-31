import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const userRouter = new Hono();
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

userRouter.post('/signup', async (c) => {
  const { name, email, password } = await c.req.json();

  try {
    const user = await prisma.user.create({
      data: { name, email, password },
    });

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign({ id: user.id }, process.env.SECRET);

    return c.json({ token, user: userResponse });
  } catch (e) {
    console.error(e);
    return c.json('Invalid', 411);
  }
});

userRouter.post('/signin', async (c) => {
  const { email, password } = await c.req.json();

  const user = await prisma.user.findUnique({
    where: { email, password },
  });

  if (!user) {
    return c.json({ error: 'User not exists' }, 403);
  }

  const userResponse = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const token = jwt.sign({ id: user.id }, process.env.SECRET);

  return c.json({ token, user: userResponse });
});

export default userRouter;
