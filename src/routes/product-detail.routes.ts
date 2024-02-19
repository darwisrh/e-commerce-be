import * as express from "express"
import { Express } from "express"

// MIDDLEWARES
import { auth } from "../middlewares/auth"

// CONTROLLERS
import { createProducDetail, updateProductDetail } from "../controllers/product-detail.controller"

export const detailRoutes: Express = express()

detailRoutes.post("/detail-create", auth, createProducDetail)
detailRoutes.patch("/detail-update/:id", auth, updateProductDetail)