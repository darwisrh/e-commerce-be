import { Request, Response, NextFunction } from "express"
import { ICart } from "../interfaces/cart.interface"
import { createCartService, getAllCartsService, getOneCartService, deleteCartService } from "../services/cart.service"
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
      const { quantity, id_user }: ICart = req.body
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
         product_detail: "testing",
         total: productPrice * quantityBigint
      }
      await createCartService(cartContainer)
      res.status(200).send({
         message: "Create cart successfully"
      })
   } catch (error) {
      next(error)
   }
}

export async function getOneCart(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
   try {
      const { id } = req.params
      const idNumber: number = Number(id)

      const cart: ICart | null = await getOneCartService(idNumber)
      if (!cart) {
         return res.send({
            message: "Cart not found"
         })
      } else {
         const total: number = Number(cart.total)
         res.status(200).send({
            data: {
               ...cart,
               total
            }
         })
      }
   } catch (error) {
      next(error)
   }
}

export async function getAllCarts(_: Request, res: Response, next: NextFunction): Promise<void> {
   try {
      const carts: ICart[] = await getAllCartsService()
      res.status(200).send({
         data: carts.map(cart => {
            return {
               ...carts,
               total: Number(cart.total)
            }
         })
      })
   } catch (error) {
      next(error)
   }
}

export async function deleteOneCart(req: Request, res: Response, next: NextFunction): Promise<void> {
   try {
      const { id } = req.params
      const idNumber: number = Number(id)

      await deleteCartService(idNumber)
      res.status(200).send({
         message: "Success delete cart"
      })
   } catch (error) {
      next(error)
   }
}