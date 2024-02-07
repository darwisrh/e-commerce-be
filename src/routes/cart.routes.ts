import * as express from "express"
import { Express } from "express"

// MIDDLEWARES
import { auth } from "../middlewares/auth"

// CONTROLLERS
import { createCart } from "../controllers/cart.contoller"

export const cartRoutes: Express = express()

cartRoutes.post("/create-cart", auth, createCart)