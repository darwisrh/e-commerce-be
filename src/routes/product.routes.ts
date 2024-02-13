import * as express from "express"
import { Express } from "express"

// MIDDLEWARES
import { auth } from "../middlewares/auth"
import { uploadImage } from "../middlewares/upload-image"

// CONTROLLERS
import { createProduct, getAllProducts, getOneProducts, createProdDetail, updateProdDetail } from "../controllers/product.controller"

export const prodRoutes: Express = express()

prodRoutes.post("/create-product", auth, uploadImage("images"), createProduct)
prodRoutes.post("/create-prodDetail", auth, createProdDetail)
prodRoutes.get("/get-all-products", auth, getAllProducts)
prodRoutes.get("/get-one-product/:id", auth, getOneProducts)
prodRoutes.patch("/update-product/:id", auth, updateProdDetail)