import * as express from "express"
import { Express } from "express"

// MIDDLEWARES
import { auth } from "../middlewares/auth"
import { uploadImage } from "../middlewares/upload-image"

// CONTROLLERS
import { createProduct } from "../controllers/product.controller"

export const prodRoutes: Express = express()

prodRoutes.post("/create-product", auth, uploadImage("images"), createProduct)