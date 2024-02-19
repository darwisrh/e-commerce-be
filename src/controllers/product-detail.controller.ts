import { Request, Response, NextFunction } from "express"
import * as joi from "joi"
import { createProdDetailService, updateProdDetailService } from "../services/product.service"
import { IProductDetail } from "../interfaces/product.interface"

interface ValError {
   error: joi.ValidationError | undefined
}

export async function createProducDetail(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
   const scheme: joi.ObjectSchema<IProductDetail> = joi.object({
      description: joi.string().required(),
      spec_name: joi.string().required(),
      spec: joi.string().required(),
      id_product: joi.number().required()
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
      const { description, spec, spec_name, id_product }: IProductDetail = req.body
      const requestContainer: Omit<IProductDetail, "id"> = {
         description,
         spec,
         spec_name,
         id_product
      }
      await createProdDetailService(requestContainer)
      res.status(200).send({
         message: "Successfully create detail product"
      })
   } catch (error) {
      next(error)
   }
}

export async function updateProductDetail(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
   const scheme: joi.ObjectSchema<IProductDetail> = joi.object({
      description: joi.string().required(),
      spec_name: joi.string().required(),
      spec: joi.string().required()
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
      const requestData: IProductDetail = req.body
      const { id } = req.params
      const idNumber: number = Number(id)

      await updateProdDetailService(requestData, idNumber)
      res.status(200).send({
         message: "Successfully update detail product"
      })
   } catch (error) {
      next(error)
   }
}