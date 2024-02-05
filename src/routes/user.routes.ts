import { Express } from "express"
import * as express from "express"

// MIDDLEWARE
import { auth } from "../middlewares/auth"
import { uploadImage } from "../middlewares/upload-image"

// CONTROLLERS
import { getAllUser, getOneUser, updateUser } from "../controllers/user.controller"

// ROUTES
export const userRoutes: Express = express()

userRoutes.get("/get-all-user", auth, getAllUser)
userRoutes.get("/get-one-user/:id", auth, getOneUser)
userRoutes.patch("/update-user/:id", auth, uploadImage("photo_profile"), updateUser)