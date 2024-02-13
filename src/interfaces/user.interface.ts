export interface IUser {
   id: number
   full_name: string
   username: string
   email: string
   age: number | null
   date_birth: Date | null
   gender: boolean | null
   phone_number: string | null
   address: string | null
   photo_profile: string | null
   is_verify: boolean
   created_at: Date
   updated_at: Date
}