import { DB } from "../utils/db"
import { IComment } from "../interfaces/comment.interface"
import { Prisma } from "@prisma/client"

export function createCommentService(comment: Omit<IComment, "id">): Promise<IComment> {
   return DB.comments.create({
      data: comment
   })
}

export function editCommentService(comment: IComment, id: number): Promise<IComment> {
   return DB.comments.update({
      where: {
         id
      },
      data: comment
   })
}

export function getAllCommentByIdProduct(id: number): Promise<IComment[]> {
   return DB.$queryRaw(
      Prisma.sql`SELECT * FROM comments WHERE id_product = ${id}`
   )
}