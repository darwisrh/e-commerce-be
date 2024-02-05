import { IProduct, IProductDetail } from "../interfaces/product.interface"
import { DB } from "../utils/db"

export function createProductService(product: IProduct): Promise<IProduct> {
   return DB.products.create({
      data: product
   })
}

export function createProdDetailService(prodDetail: IProductDetail): Promise<IProductDetail> {
   return DB.product_details.create({
      data: prodDetail
   })
}