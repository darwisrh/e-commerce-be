import { IProduct, IProductDetail } from "../interfaces/product.interface"
import { DB } from "../utils/db"

export function createProductService(product: Omit<IProduct, "id">): Promise<IProduct> {
   return DB.products.create({
      data: product
   })
}

export function createProdDetailService(prodDetail: Omit<IProductDetail, "id">): Promise<IProductDetail> {
   return DB.product_details.create({
      data: prodDetail
   })
}

export function updateProductService(product: IProduct, id: number): Promise<IProduct> {
   return DB.products.update({
      where: {
         id
      },
      data: product
   })
}

export function updateProdDetailService(prodDetail: IProductDetail, id: number): Promise<IProductDetail> {
   return DB.product_details.update({
      where: {
         id
      },
      data: prodDetail
   })
}

export function getAllProductsService(): Promise<IProduct[]> {
   return DB.products.findMany({
      select: {
         id: true,
         name: true,
         price: true,
         cashback: true,
         cashback_total: true,
         sold: true,
         is_special_edition: true,
         images: true,
         id_shop: true,
         id_category: true,
         product_details: {
            select: {
               id: true,
               spec_name: true,
               spec: true,
               description: true
            }
         }
      }
   })
}

export function getOneProductService(id: number): Promise<IProduct | null> {
   return DB.products.findUnique({
      where: {
         id
      },
      select: {
         id: true,
         name: true,
         price: true,
         cashback: true,
         cashback_total: true,
         sold: true,
         is_special_edition: true,
         images: true,
         id_shop: true,
         id_category: true,
         product_details: {
            select: {
               id: true,
               spec_name: true,
               spec: true,
               description: true
            }
         }
      }
   })
}

export function deleteOneProductService(id: number): Promise<IProduct> {
   return DB.products.delete({
      where: {
         id
      }
   })
}