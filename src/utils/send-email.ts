import { SendMailOptions, createTransport } from "nodemailer"
import { generate } from "otp-generator"

const user: string | undefined = process.env.EMAIL
const pass: string | undefined = process.env.APP_PASSWORD

export function OTPGenerator(): string {
   return generate(5)
}

export function sendEmail(email: string, otp: string): void {
   const mailOption: SendMailOptions = {
      from: user,
      to: email,
      subject: "Your OTP",
      text: `Don't share your OTP to anybody: ${otp}`
   }

   const transporter = createTransport({
      service: "gmail",
      auth: {
         user,
         pass
      }
   })

   transporter.sendMail(mailOption, (err: any, info: any) => {
      if (err) {
         console.log(err)
      } else {
         console.log(`Success sent email: ${info.response}`)
      }
   })
}