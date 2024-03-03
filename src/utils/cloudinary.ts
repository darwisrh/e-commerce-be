import { v2 } from "cloudinary"

v2.config({
   cloud_name: process.env.CLOUD_NAME,
   api_key: process.env.API_KEY,
   api_secret: process.env.API_SECRET
})

export async function cloudUploadImage(img: string[]): Promise<void> {
   img.map((img) => {
      v2.uploader.upload(img, { folder: "E-Commerce" }, (err, res) => {
         if (err) {
            throw err
         }
         console.log("Success upload, result: " + res?.secure_url)
      })
   })
}