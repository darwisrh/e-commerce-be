import { hashPassword, compare } from "../utils/bcrypt"

const pass: string = "darwis2908"
const hashPass: string = hashPassword(pass)

const inputPass: string = "darwis2908"
const comparePass: boolean = compare(inputPass, hashPass)

if (!comparePass) {
   console.log("Password incorrect")
} else {
   console.log("Password is correct")
}