import { Request, Response, NextFunction } from "express"
import { IShop } from "../interfaces/shop.interface"
import { IUser } from "../interfaces/user.interface"
import * as joi from "joi"
import { ValidationError, ObjectSchema } from "joi"
import { createShopService, getOneShopService, updateShopService, getAllShopsService, getOneShopByUserId } from "../services/shop.service"
import { getOneUserService } from "../services/user.service"

const port: string = process.env.PORT || "3000"

interface ValError {
   error: ValidationError | undefined
}

export async function createShop(req: any, res: Response, next: NextFunction): Promise<Response | undefined> {
   const shceme: ObjectSchema<IShop> = joi.object({
      name: joi.string().required(),
      address: joi.string().required(),
      photo_profile: joi.string(),
      id_admin: joi.number().required(),
      operasional_desc: joi.string()
   })

   const { error }: ValError = shceme.validate(req.body)

   if (error) {
      return res.send({
         error: {
            message: error.details[0].message
         }
      })
   }
   try {
      const requestData: IShop = req.body
      const photo: string = req.files[0].path
      const { id_admin }: IShop = req.body
      const idNumber: number = Number(id_admin)

      const user: IUser | null = await getOneUserService(idNumber)
      const shop: IShop | null = await getOneShopByUserId(idNumber)

      if (!user) {
         return res.send({
            message: "User not found"
         })
      } else if (user.is_verify === false) {
         return res.send({
            message: "Verify your email before create shop!!"
         })
      } else if (shop) {
         return res.send({
            message: "You already have a shop!!, delete first to make new or edit the current shop!!"
         })
      }

      const requestDataContainer: IShop = {
         ...requestData,
         photo_profile: `http://localhost:${port}/${photo}`,
         id_admin: Number(id_admin),
         id_type: 1
      }

      await createShopService(requestDataContainer)
      res.status(200).send({
         message: "Shop successfully created"
      })

   } catch (error) {
      next(error)
   }
}

export async function updateShop(req: any, res: Response, next: NextFunction): Promise<Response | undefined> {
   const shceme: ObjectSchema<IShop> = joi.object({
      name: joi.string().required(),
      address: joi.string().required(),
      photo_profile: joi.string(),
      operasional_desc: joi.string()
   })

   const { error }: ValError = shceme.validate(req.body)

   if (error) {
      return res.send({
         error: {
            message: error.details[0].message
         }
      })
   }

   try {
      const requestData: IShop = req.body
      const photo: string = req.files[0].path
      const { id } = req.params
      const idNumber: number = Number(id)

      const shop: IShop | null = await getOneShopService(idNumber)
      if (!shop) {
         return res.send({
            message: "Shop not found!!"
         })
      }

      const requestDataContainer: IShop = {
         ...requestData,
         photo_profile: `http://localhost:${port}/${photo}`
      }

      await updateShopService(requestDataContainer, idNumber)
      res.status(200).send({
         message: "Update shop successfully!"
      })
   } catch (error) {
      next(error)
   }
}

export async function getAllShops(_: Request, res: Response, next: NextFunction): Promise<void> {
   try {
      const shops: IShop[] = await getAllShopsService()
      res.status(200).send({
         data: {
            shops
         }
      })
   } catch (error) {
      next(error)
   }
}

export async function getOneShop(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
   try {
      const { id } = req.params
      const idNumber: number = Number(id)
      const shop: IShop | null = await getOneShopService(idNumber)
      if (!shop) {
         return res.send({
            message: "Shop not found!"
         })
      } else {
         res.status(200).send({
            data: {
               shop
            }
         })
      }
   } catch (error) {
      next(error)
   }
}