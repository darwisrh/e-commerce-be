import { Request, Response, NextFunction } from "express"
import { IProduct, IProductDetail } from "../interfaces/product.interface"
import { createProductService, createProdDetailService, getAllProductsService, getOneProductService, updateProdDetailService, deleteOneProductService } from "../services/product.service"
import * as joi from "joi"

interface ValError {
   error: joi.ValidationError | undefined
}

const port: string = process.env.PORT || "3000"

export async function createProduct(req: any, res: Response, next: NextFunction): Promise<Response | undefined> {
   const productScheme: joi.ObjectSchema<IProduct> = joi.object({
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

   const { error }: ValError = productScheme.validate(req.body)

   if (error) {
      return res.send({
         error: {
            message: error.details[0].message
         }
      })
   }

   try {
      const images: object[] = []
      const imageRequest: any[] = req.files
      const {
         name,
         price,
         sold,
         is_special_edition,
         id_shop,
         id_category,
         cashback,
         cashback_total
      }: IProduct = req.body

      for (let i = 0; i < imageRequest.length; i++) {
         const path = {
            img: `http://localhost:${port}/${imageRequest[i].path}`
         }
         images.push(path)
      }

      const productContainer: Omit<IProduct, "id"> = {
         name,
         price: price,
         sold: Number(sold),
         is_special_edition: Boolean(is_special_edition),
         cashback: cashback,
         cashback_total: cashback_total,
         id_category: Number(id_category),
         id_shop: Number(id_shop),
         images: JSON.stringify(images)
      }
      await createProductService(productContainer)
      res.status(200).send({
         message: "Success create product"
      })
   } catch (error) {
      next(error)
   }
}

export async function createProdDetail(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
   const productScheme: joi.ObjectSchema<IProductDetail> = joi.object({
      description: joi.string().required(),
      spec_name: joi.string().required(),
      spec: joi.string().required(),
      id_product: joi.number().required(),
      user: joi.object()
   })

   const { error }: ValError = productScheme.validate(req.body)

   if (error) {
      return res.send({
         error: {
            message: error.details[0].message
         }
      })
   }

   try {
      const requestData: IProductDetail = req.body
      await createProdDetailService(requestData)
      res.status(200).send({
         message: "Successfully create product detail"
      })
   } catch (error) {
      next(error)
   }
}

export async function getAllProducts(_: Request, res: Response, next: NextFunction): Promise<void> {
   try {
      const products: IProduct[] = await getAllProductsService()
      res.status(200).send({
         data: products.map(product => {
            return {
               ...product,
               price: String(product.price),
               cashback: String(product.cashback),
               cashback_total: String(product.cashback_total),
               images: JSON.parse(product.images)
            }
         })
      })
   } catch (error) {
      next(error)
   }
}

export async function getOneProducts(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
   try {
      const { id } = req.params
      const idNumber: number = Number(id)

      const product: IProduct | null = await getOneProductService(idNumber)
      if (!product) {
         return res.send({
            message: "Product not found"
         })
      } else {
         const price: number = Number(product.price)
         const cashback: number = Number(product.cashback)
         const cashback_total: number = Number(product.cashback_total)
         const images: object[] = JSON.parse(product.images)
         res.status(200).send({
            data: {
               ...product,
               price,
               cashback,
               cashback_total,
               images
            }
         })
      }
   } catch (error) {
      next(error)
   }
}

export async function updateProdDetail(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
   const scheme: joi.ObjectSchema<IProductDetail> = joi.object({
      description: joi.string().required(),
      spec: joi.string().required(),
      spec_name: joi.string().required()
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
         message: "Success update product detail"
      })
   } catch (error) {
      next(error)
   }
}

export async function deleteOneProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
   try {
      const { id } = req.params
      const idNumber: number = Number(id)

      await deleteOneProductService(idNumber)
      res.status(200).send({
         message: "Success delete product"
      })
   } catch (error) {
      next(error)
   }
}