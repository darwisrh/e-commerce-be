import {
   registerService,
   getUserByEmail,
   getUserById,
   resendOTP,
   expiredOTP,
   verifyEmailService
} from "../services/auth.service"
// import { compare } from "bcrypt"
import { ObjectSchema, ValidationError } from "joi"
import * as joi from "joi"
import { IAuth } from "../interfaces/auth.interface"
import { Request, Response, NextFunction } from "express"
import { OTPGenerator } from "../utils/send-email"
import { compare } from "bcrypt"
import * as jwt from "jsonwebtoken"

interface ValError {
   error: ValidationError | undefined
}

export async function register(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
   const scheme: ObjectSchema<IAuth> = joi.object({
      full_name: joi.string().required(),
      username: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().min(6).required()
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
      const requestData: IAuth = req.body
      const { email }: IAuth = req.body
      const requestDataContainer: IAuth = {
         ...requestData,
         email
      }
      const user: IAuth | null = await getUserByEmail(email)
      if (user) {
         return res.send({
            message: "This user is already exist, try another email!"
         })
      } else {
         await registerService(requestDataContainer)
         res.status(200).send({
            message: "New user created, check your email to get OTP"
         })
      }
   } catch (error) {
      next(error)
   }
}

export async function resendOtp(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
   const scheme: ObjectSchema<IAuth> = joi.object({
      email: joi.string().email().required()
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
      const { email }: IAuth = req.body
      const { id } = req.params
      const idNumber: number = Number(id)
      const otpCode: string = OTPGenerator().toUpperCase()

      const user: IAuth | null = await getUserById(idNumber)
      if (!user) {
         return res.status(400).send({
            message: "User not found"
         })
      }

      const lastOTPtime: number = Number(user.updated_at)
      const currentTime: number = Number(new Date())
      if (lastOTPtime && currentTime - lastOTPtime < 60000) {
         return res.status(403).send({
            message: "Wait for 1 minute before resend OTP!!"
         })
      } else {
         await resendOTP(otpCode, email, idNumber)
         res.status(200).send({
            message: "Check your email to get OTP code"
         })
      }
   } catch (error) {
      next(error)
   }
}

export async function verifyEmail(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
   const scheme: ObjectSchema<IAuth> = joi.object({
      email: joi.string().email().required(),
      otp: joi.string().required()
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
      const { email, otp }: IAuth = req.body

      const user: IAuth | null = await getUserByEmail(email)
      if (!user) {
         return res.send({
            message: "User not found!"
         })
      }

      // Generate error if OTP expired after 5 minutes
      const OTPupdatedAt: number = Number(user.updated_at)
      const currentTime: number = Number(new Date())

      if (currentTime - OTPupdatedAt > 5 * 60 * 1000) {
         await expiredOTP(email)
         return res.send({
            message: "Your OTP is already expired"
         })
      } else if (otp !== user.otp) {
         return res.send({
            message: "OTP invalid"
         })
      } else {
         await verifyEmailService(email)
         res.status(200).send({
            message: "User verified"
         })
      }
   } catch (error) {
      next(error)
   }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
   const scheme: ObjectSchema<IAuth> = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(6).required()
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
      const { email, password }: IAuth = req.body

      const user: IAuth | null = await getUserByEmail(email)
      if (!user) {
         return res.send({
            message: "User not found, make sure your register first"
         })
      }

      const dataUser: Omit<
         IAuth,
         "username" |
         "password" |
         "updated_at" |
         "is_verify" |
         "id_role" |
         "otp"
      > = {
         id: user.id,
         full_name: user.full_name,
         email: user.email
      }
      const secretKey: string = process.env.SECRET_KEY || "secret"

      const isPassword: Promise<boolean> = compare(password, user.password)
      if (!isPassword) {
         return res.send({
            message: "Password incorrect"
         })
      } else {
         const token: string = jwt.sign(dataUser, secretKey)
         res.status(200).send({
            data: {
               id: user.id,
               full_name: user.full_name,
               username: user.username,
               email: user.email,
               role: user.id_role
            },
            token: token
         })
      }
   } catch (error) {
      next(error)
   }
}