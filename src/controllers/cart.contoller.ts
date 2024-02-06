import { Request, Response, NextFunction } from "express"
import { ICart } from "../interfaces/cart.interface"
import { createCartService } from "../services/cart.service"
import { getOneProductService } from "../services/product.service"
import * as joi from "joi"
import { IProduct } from "../interfaces/product.interface"

interface ValErr {
   error: joi.ValidationError | undefined
}

export async function createCart(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
   const shceme: joi.ObjectSchema<ICart> = joi.object({
      quantity: joi.number().required(),
      id_user: joi.number().required()
   })

   const { error }: ValErr = shceme.validate(req.body)

   if (error) {
      return res.send({
         error: {
            message: error.details[0].message
         }
      })
   }

   try {
      const { quantity, id_user, product_detail }: ICart = req.body
      const { id } = req.params
      const idNumber: number = Number(id)

      const product: IProduct | null = await getOneProductService(idNumber)
      if (!product) {
         return res.send({
            message: "Product not found"
         })
      }

      const productPrice: bigint = product.price
      const quantityBigint: bigint = BigInt(quantity)

      const cartContainer: Omit<ICart, "id"> = {
         quantity: Number(quantity),
         id_user: Number(id_user),
         product_name: product.name,
         product_detail,
         total: productPrice * quantityBigint
      }
      await createCartService(cartContainer)
   } catch (error) {
      next(error)
   }
}