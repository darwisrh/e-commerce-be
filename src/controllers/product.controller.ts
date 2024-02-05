import { Response, NextFunction } from "express"
import { IProduct } from "../interfaces/product.interface"
import { createProductService } from "../services/product.service"
import * as joi from "joi"

interface ValError {
   error: joi.ValidationError | undefined
}

const port: string = process.env.PORT || "3000"

export async function createProduct(req: any, res: Response, next: NextFunction): Promise<Response | undefined> {
   const scheme: joi.ObjectSchema<IProduct> = joi.object({
      name: joi.string().required(),
      price: joi.number().required(),
      cashback: joi.number(),
      cashback_total: joi.number(),
      sold: joi.number(),
      is_special_edition: joi.boolean().required(),
      images: joi.string(),
      id_shop: joi.number().required(),
      id_category: joi.number().required()
   })

   const { error }: ValError = scheme.validate(req.body)

   if (error) {
      return res.send({
         error: {
            message: error.details[0].message
         }
      })
   }
   try {
      const images = []
      const requestData: IProduct = req.body
      const imageRequest = req.files
      const { id_shop, id_category, is_special_edition, price }: IProduct = req.body

      for (let i = 0; i < imageRequest.length; i++) {
         const path = `http://localhost:${port}/${imageRequest[i].path}`
         images.push(path)
      }

      const requestDataContainer: IProduct = {
         ...requestData,
         images: String(images),
         price: Number(price),
         id_category: Number(id_category),
         id_shop: Number(id_shop),
         is_special_edition: Boolean(is_special_edition)
      }

      await createProductService(requestDataContainer)
      res.status(200).send({
         message: "Create product successfully"
      })
   } catch (error) {
      next(error)
   }
}