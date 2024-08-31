import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { UserRoute } from './routes/user'  // Import the route correctl
import { BlogRoute } from './routes/blog'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

app.get('/', (c) => {
  return c.json({msg:"hello"})
})

app.use('/*', cors())
app.route("/user", UserRoute);  
app.route("/blog", BlogRoute);
// Use UserRoute for the /api/v1/user endpoint

export default app
