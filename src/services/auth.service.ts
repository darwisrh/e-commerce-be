import { DB } from "../utils/db"
import { IAuth } from "../interfaces/auth.interface"
import { encrypt } from "../utils/bcrypt"
import { sendEmail } from "../utils/send-email"
import { OTPGenerator } from "../utils/send-email"

export function registerService(user: IAuth): Promise<IAuth> {
   const { password, email } = user
   const hashedPassword: string = encrypt(password)
   const otpCode: string = OTPGenerator().toUpperCase()
   sendEmail(email, otpCode)
   const dataUser: IAuth = {
      ...user,
      password: hashedPassword,
      otp: otpCode,
      is_verify: false,
      id_role: 1
   }
   return DB.users.create({
      data: dataUser
   })
}

export function resendOTP(otp: string, email: string, id: number): Promise<IAuth> {
   sendEmail(email, otp)
   return DB.users.update({
      where: {
         id
      },
      data: {
         is_verify: false,
         otp
      }
   })
}

export function getUserByEmail(email: string): Promise<IAuth | null> {
   return DB.users.findUnique({
      where: {
         email
      }
   })
}

export function getUserById(id: number): Promise<IAuth | null> {
   return DB.users.findUnique({
      where: {
         id
      }
   })
}

export function verifyEmailService(email: string): Promise<IAuth> {
   return DB.users.update({
      where: {
         email
      },
      data: {
         is_verify: true,
         otp: null
      }
   })
}

export function expiredOTP(email: string): Promise<IAuth> {
   return DB.users.update({
      where: {
         email
      },
      data: {
         is_verify: false,
         otp: null
      }
   })
}