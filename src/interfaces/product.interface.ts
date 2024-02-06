export interface IProduct {
   id: number
   name: string
   price: bigint
   cashback: bigint | null
   cashback_total: bigint | null
   sold: number | null
   is_special_edition: boolean
   images: string
   id_shop: number
   id_category: number
}

export interface IProductDetail {
   id: number
   description: string
   spec_name: string
   spec: string
   id_product: number
}