import { Express } from "express"
import * as express from "express"

// MIDDLEWARES
import { auth } from "../middlewares/auth"
import { uploadImage } from "../middlewares/upload-image"

// CONTROLLERS
import { createComment, editComment, getAllCommentByProduct } from "../controllers/comment.controller"

// ROUTES
export const commRoutes: Express = express()

commRoutes.post("/create-comment", auth, uploadImage("images"), createComment)
commRoutes.patch("/edit-comment/:id", auth, uploadImage("images"), editComment)
commRoutes.get("/get-all-comments/:id", auth, getAllCommentByProduct)