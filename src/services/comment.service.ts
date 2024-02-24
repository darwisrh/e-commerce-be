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

export function getAllCommentByReply(): Promise<IComment[]> {
   return DB.comments.findMany({
      select: {
         id: true,
         comment: true,
         images: true,
         id_user: true,
         id_other_user: true,
         id_product: true,
         other_user: true,
         user: {
            select: {
               comment: {
                  select: {
                     images: true,
                     comment: true
                  }
               }
            }
         }
      }
   })
}