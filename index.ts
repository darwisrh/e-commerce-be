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
import { shopRoutes } from "./src/routes/shop.routes"
import { prodRoutes } from "./src/routes/product.routes"
import { cartRoutes } from "./src/routes/cart.routes"
import { commRoutes } from "./src/routes/comment.routes"
import { rateRoutes } from "./src/routes/rating.routes"
import { detailRoutes } from "./src/routes/product-detail.routes"

// Use Routes
app.use("/r/auth", authRoutes)
app.use("/r/user", userRoutes)
app.use("/r/shop", shopRoutes)
app.use("/r/product", prodRoutes)
app.use("/r/cart", cartRoutes)
app.use("/r/comment", commRoutes)
app.use("/r/rate", rateRoutes)
app.use("/r/detail", detailRoutes)

app.listen(port, () => {
   console.log(`Server run at : http://localhost:${port}`)
})