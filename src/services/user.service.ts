import { DB } from "../utils/db"
import { IUser } from "../interfaces/user.interface"

export function getOneUserService(id: number): Promise<IUser | null> {
   return DB.users.findUnique({
      where: {
         id
      },
      select: {
         id: true,
         full_name: true,
         username: true,
         email: true,
         age: true,
         date_birth: true,
         gender: true,
         phone_number: true,
         address: true,
         photo_profile: true,
         created_at: true,
         updated_at: true,
         roles: {
            select: {
               role_name: true
            }
         },
         shop: {
            select: {
               photo_profile: true,
               name: true
            }
         }
      }
   })
}

export function getAllUserService(): Promise<IUser[]> {
   return DB.users.findMany({
      select: {
         id: true,
         full_name: true,
         username: true,
         email: true,
         age: true,
         date_birth: true,
         gender: true,
         phone_number: true,
         address: true,
         photo_profile: true,
         created_at: true,
         updated_at: true
      }
   })
}

export function updateUserService(user: IUser, id: number): Promise<IUser> {
   return DB.users.update({
      where: {
         id
      },
      data: user
   })
}