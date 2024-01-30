import * as multer from "multer"
import { StorageEngine } from "multer"

export function uploadImage(image: string) {
   const storage: StorageEngine = multer.diskStorage({
      destination: (req, file, cb) => {
         cb(null, "uploads")
      },
      filename: (req, file, cb) => {
         cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ''))
      }
   })

   function fileFilter(req: any, file: any, cb: any): void {
      if (file.fieldname === image) {
         if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = {
               message: "Only images are allowed"
            }
            return cb(new Error("Only images are allowed"), false)
         }
      }
      cb(null, true)
   }

   const maxSize: number = 10 * 1000 * 1000

   const upload = multer({
      storage,
      fileFilter,
      limits: {
         fileSize: maxSize
      }
   }).array(image)

   return (req: any, res: any, next: any) => {
      upload(req, res, (err) => {
         if (req.fileValidationError) {
            return res.status(400).send(req.fileValidationError)
         }

         if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
               return res.status(400).send({
                  message: 'Max file size 10MB'
               })
            }
            return res.status(400).send(err)
         }
         return next()
      })
   }
}