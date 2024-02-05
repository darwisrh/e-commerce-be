import * as express from "express"
import { config } from "dotenv"
import { Express } from "express"

// CONFIGURATION
config()
const app: Express = express()
const port: number = Number(process.env.PORT)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/uploads", express.static("uploads"))

// ROUTES
import { authRoutes } from "./src/routes/auth.routes"
import { userRoutes } from "./src/routes/user.routes"

// Use Routes
app.use("/r/auth", authRoutes)
app.use("/r/user", userRoutes)

app.listen(port, () => {
   console.log(`Server run at : http://localhost:${port}`)
})