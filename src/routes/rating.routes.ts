import { Express } from "express"
import * as express from "express"

// MIDDLEWARES
import { auth } from "../middlewares/auth"

// CONTROLLERS
import { createRating, deleteRating, getRatingByProduct } from "../controllers/rating.controller"

// ROUTES
export const rateRoutes: Express = express()

rateRoutes.post("/create-rate", auth, createRating)
rateRoutes.get("/get-all-rates/:id", auth, getRatingByProduct)
rateRoutes.delete("/delete-rate/:id", auth, deleteRating)