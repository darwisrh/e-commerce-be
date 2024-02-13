import { encrypt, compare } from "../utils/bcrypt"

const pass: string = "inipassword"
const enc = encrypt(pass)

const comp: boolean = compare("oihuu", enc)

if (!comp) {
   console.log("Password incorrect")
} else {
   console.log("Password match")
}