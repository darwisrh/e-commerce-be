import { DB } from "../utils/db"
import { ICart } from "../interfaces/cart.interface"

export function createCartService(cart: Omit<ICart, "id">): Promise<ICart> {
   return DB.carts.create({
      data: cart
   })
}

export function deleteCartService(id: number): Promise<ICart> {
   return DB.carts.delete({
      where: {
         id
      }
   })
}

export function getAllCartsService(): Promise<ICart[]> {
   return DB.carts.findMany({
      select: {
         id: true,
         product_name: true,
         product_detail: true,
         quantity: true,
         total: true,
         id_user: true
      }
   })
}

export function getOneCartService(id: number): Promise<ICart | null> {
   return DB.carts.findUnique({
      where: {
         id
      },
      select: {
         id: true,
         product_name: true,
         product_detail: true,
         quantity: true,
         total: true,
         id_user: true
      }
   })
}