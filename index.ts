import * as express from "express"
import { config } from "dotenv"
import { Express } from "express"

config()
const app: Express = express()
const port: number = Number(process.env.PORT)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ROUTES
import { authRoutes } from "./src/routes/auth.routes"

// Use Routes
app.use("/r/auth", authRoutes)

app.listen(port, () => {
   console.log(`Server run at : http://localhost:${port}`)
})