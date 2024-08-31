import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { prettyJSON } from 'hono/pretty-json';
import { config } from 'dotenv';

config(); // Load environment variables

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', prettyJSON());

// Routes
app.route('/user', userRouter);
app.route('/blog', blogRouter);

// Simple test route
app.get('/', (c) => {
  return c.json({
    msg: 'hello',
  });
});

// Start server (Hono doesn't have a built-in listen method, you deploy it differently)
export default app;
