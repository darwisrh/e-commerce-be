import * as express from "express"
import { Express } from "express"

// MIDDLEWARES
import { auth } from "../middlewares/auth"

// CONTROLLERS
import { createCart, getAllCarts, getOneCart, deleteOneCart } from "../controllers/cart.contoller"

export const cartRoutes: Express = express()

cartRoutes.post("/create-cart/:id", auth, createCart)
cartRoutes.get("/get-all-carts", auth, getAllCarts)
cartRoutes.get("/get-one-cart/:id", auth, getOneCart)
cartRoutes.delete("/delete-cart/:id", auth, deleteOneCart)