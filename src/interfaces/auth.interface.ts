export interface IAuth {
   id: number
   full_name: string
   username: string
   email: string
   password: string
   otp: string | null
   is_verify: boolean
   updated_at: Date
   id_role: number
}