import { Request, Response, NextFunction } from "express"
import * as joi from "joi"
import { IRating } from "../interfaces/rating.interface"
import { createRatingService, getAllRatingsByProductId, deleteRatingService, getOneRatingService } from "../services/rating.service"

interface ValErr {
   error: joi.ValidationError | undefined
}

export async function createRating(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
   const scheme: joi.ObjectSchema<IRating> = joi.object({
      rate: joi.number().required()
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
      const requestData: IRating = req.body
      await createRatingService(requestData)
      res.sendStatus(200).send({
         message: "Success create rating"
      })
   } catch (error) {
      next(error)
   }
}

export async function getRatingByProduct(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
   try {
      const { id } = req.params
      const idNumber: number = Number(id)
      const ratings: IRating[] = await getAllRatingsByProductId(idNumber)

      if (!ratings) {
         return res.send({
            message: "Ratings not found"
         })
      } else {
         res.status(200).send({
            data: {
               ratings
            }
         })
      }
   } catch (error) {
      next(error)
   }
}

export async function deleteRating(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
   try {
      const { id } = req.params
      const idNumber: number = Number(id)

      const rating: IRating | null = await getOneRatingService(idNumber)
      if (!rating) {
         return res.send({
            message: "Rating not found"
         })
      } else {
         await deleteRatingService(idNumber)
         res.status(200).send({
            message: "Success delete rating"
         })
      }
   } catch (error) {

   }
}