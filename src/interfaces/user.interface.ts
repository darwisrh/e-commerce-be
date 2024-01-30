export interface IUser {
   id: number
   full_name: string
   username: string
   email: string
   age: number | null
   date_birth: Date | null
   gender: boolean | null
   phone_number: number | null
   address: string | null
   photo_profile: string | null
   created_at: Date
   updated_at: Date
}