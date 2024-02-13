import * as express from "express"
import { Express } from "express"

// MIDDLEWARE
import { auth } from "../middlewares/auth"
import { uploadImage } from "../middlewares/upload-image"


// CONTROLLER
import { createShop, updateShop, getAllShops, getOneShop } from "../controllers/shop.controller"

export const shopRoutes: Express = express()

shopRoutes.post("/create-shop", auth, uploadImage("photo_profile"), createShop)
shopRoutes.patch("/update-shop/:id", auth, uploadImage("photo_profile"), updateShop)
shopRoutes.get("/get-all-shops", getAllShops)
shopRoutes.get("/get-one-shop/:id", auth, getOneShop)