import { genSaltSync, compareSync, hashSync } from "bcrypt"

export function hashPassword(password: string): string {
   const salt = genSaltSync(10)
   return hashSync(password, salt)
}

export function compare(password: string, hashPassword: string): boolean {
   return compareSync(password, hashPassword)
}