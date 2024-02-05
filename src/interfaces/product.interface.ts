export interface IProduct {
   name: string
   price: number
   cashback: number | null
   cashback_total: number | null
   sold: number | null
   is_special_edition: boolean
   images: string
   id_shop: number
   id_category: number
}

export interface IProductDetail {
   description: string
   spec_name: string
   spec: string
   id_product: number
}