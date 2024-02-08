export interface IComment {
   id: number
   comment: string
   images: string | null
   id_user: number
   id_other_user: number | null
   id_product: number
}