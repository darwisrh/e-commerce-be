import { IUser } from "../interfaces/user.interface"
import { Request, Response, NextFunction } from "express"
import { getAllUserService, getOneUserService, updateUserService } from "../services/user.service"
import * as joi from "joi"
import { ValidationError, ObjectSchema } from "joi"

const port: number = Number(process.env.PORT) || 3000

interface ValError {
   error: ValidationError | undefined
}

export async function getAllUser(_: Request, res: Response, next: NextFunction): Promise<void> {
   try {
      const users: IUser[] = await getAllUserService()
      res.status(200).send({
         data: {
            users
         }
      })
   } catch (error) {
      next(error)
   }
}

export async function getOneUser(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
   try {
      const { id } = req.params
      const idNumber: number = Number(id)

      const user: IUser | null = await getOneUserService(idNumber)
      if (!user) {
         return res.send({
            message: "User not found"
         })
      } else {
         res.status(200).send({
            data: {
               user
            }
         })
      }
   } catch (error) {
      next(error)
   }
}

export async function updateUser(req: any, res: Response, next: NextFunction): Promise<Response | undefined> {
   const scheme: ObjectSchema<IUser> = joi.object({
      full_name: joi.string().required(),
      username: joi.string().required(),
      age: joi.number(),
      date_birth: joi.string(),
      gender: joi.boolean(),
      phone_number: joi.number(),
      address: joi.string(),
      photo_profile: joi.string()
   })

   const { error }: ValError = scheme.validate(req.body)

   if (error) {
      return res.send({
         error: {
            message: error.details[0].message
         }
      })
   }

   try {
      const newData: IUser = req.body
      const photoProfile: string = req.files[0].path
      const { id } = req.params
      const idNumber: number = Number(id)
      const { date_birth } = req.body

      // Try get user
      const user: IUser | null = await getOneUserService(idNumber)
      if (!user) {
         return res.send({
            message: "User not found"
         })
      }

      const newDataContainer: IUser = {
         ...newData,
         photo_profile: `http://localhost:${port}/${photoProfile}`,
         phone_number: Number(newData.phone_number),
         gender: Boolean(newData.gender),
         date_birth: new Date(date_birth),
         age: Number(newData.age)
      }

      const updateData: IUser = await updateUserService(newDataContainer, idNumber)
      res.status(200).send({
         data: {
            updateData
         }
      })
   } catch (error) {
      next(error)
   }
}