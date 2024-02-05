import { DB } from "../utils/db"
import { IShop } from "../interfaces/shop.interface"

export function createShopService(shop: Omit<IShop, "id" | "created_at">): Promise<IShop> {
   return DB.shops.create({
      data: shop
   })
}

export function updateShopService(shop: IShop, id: number): Promise<IShop> {
   return DB.shops.update({
      where: {
         id
      },
      data: shop
   })
}

export function getAllShopsService(): Promise<IShop[]> {
   return DB.shops.findMany({
      select: {
         name: true,
         address: true,
         photo_profile: true,
         operasional_desc: true,
         created_at: true,
         id_admin: true,
         id_type: true
      }
   })
}

export function getOneShopService(id: number): Promise<IShop | null> {
   return DB.shops.findUnique({
      where: {
         id
      },
      select: {
         id: true,
         name: true,
         address: true,
         photo_profile: true,
         operasional_desc: true,
         created_at: true,
         id_admin: true,
         id_type: true,
         etalase: {
            select: {
               etalase_name: true
            }
         },
         products: {
            select: {
               name: true
            }
         },

      }
   })
}

export function getOneShopByUserId(id: number): Promise<IShop | null> {
   return DB.shops.findUnique({
      where: {
         id_admin: id
      }
   })
}

export function deleteShopService(id: number): Promise<IShop> {
   return DB.shops.delete({
      where: {
         id
      }
   })
}