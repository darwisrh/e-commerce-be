import { DB } from "../utils/db"
import { IRating } from "../interfaces/rating.interface"
import { Prisma } from "@prisma/client"

export function createRatingService(rate: Omit<IRating, "id">): Promise<IRating> {
   return DB.ratings.create({
      data: rate
   })
}

export function getAllRatingsByProductId(id: number): Promise<IRating[]> {
   return DB.$queryRaw(
      Prisma.sql`SELECT * FROM ratings WHERE id_product = ${id}`
   )
}

export function deleteRatingService(id: number): Promise<IRating> {
   return DB.ratings.delete({
      where: {
         id
      }
   })
}

export function getOneRatingService(id: number): Promise<IRating | null> {
   return DB.ratings.findUnique({
      where: {
         id
      }
   })
}