import { Request, Response, NextFunction } from "express"
import * as joi from "joi"
import { IComment } from "../interfaces/comment.interface"
import { createCommentService, editCommentService, getAllCommentByIdProduct } from "../services/comment.service"

interface ValErr {
   error: joi.ValidationError | undefined
}

const port: string = process.env.PORT || "3000"

export async function createComment(req: any, res: Response, next: NextFunction): Promise<Response | undefined> {
   const scheme: joi.ObjectSchema<IComment> = joi.object({
      comment: joi.string().required(),
      images: joi.string()
   })

   const { error }: ValErr = scheme.validate(req.body)

   if (error) {
      return res.send({
         error: {
            message: error.details[0].message
         }
      })
   }

   try {
      const imgContainer: string[] = []
      const { comment, id_other_user, id_user, id_product }: IComment = req.body
      const images = req.files

      for (let i = 0; i < images.length; i++) {
         const path: string = `http://localhost:${port}/${images[i].path}`
         imgContainer.push(path)
      }

      const requestContainer: Omit<IComment, "id"> = {
         comment,
         images: JSON.stringify(imgContainer),
         id_other_user: Number(id_other_user),
         id_product: Number(id_product),
         id_user: Number(id_user)
      }
      await createCommentService(requestContainer)
      res.status(200).send({
         message: "Success create comment"
      })
   } catch (error) {
      next(error)
   }
}

export async function editComment(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
   const scheme: joi.ObjectSchema<IComment> = joi.object({
      comment: joi.string().required(),
      images: joi.string()
   })

   const { error }: ValErr = scheme.validate(req.body)

   if (error) {
      return res.send({
         error: {
            message: error.details[0].message
         }
      })
   }

   try {
      const requestData: IComment = req.body
      const { id } = req.params
      const idNumber: number = Number(id)

      await editCommentService(requestData, idNumber)
      res.status(200).send({
         message: "Success edit comment"
      })
   } catch (error) {
      next(error)
   }
}

export async function getAllCommentByProduct(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
   try {
      const { id } = req.params
      const idNumber: number = Number(id)
      const comments: IComment[] = await getAllCommentByIdProduct(idNumber)

      if (!comments) {
         return res.send({
            message: "Comments not found"
         })
      }

      res.status(200).send({
         data: {
            comments
         }
      })
   } catch (error) {
      next(error)
   }
}