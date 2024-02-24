import { Response, NextFunction } from "express"
import * as jwt from "jsonwebtoken"

export function auth(req: any, res: Response, next: NextFunction): Response | undefined {
   const authHeader: string | undefined = req.header("Authorization")
   const token: string | undefined = authHeader && authHeader.split(" ")[1]

   if (!token) {
      return res.status(400).send({
         message: "Unauthorized"
      })
   }

   try {
      const secret: string = process.env.SECRET_KEY || "secret"
      jwt.verify(token, secret, (err: any): Response | undefined => {
         if (err) {
            return res.status(403).send({
               message: "Invalid token"
            })
         }
         next()
      })
   } catch (error) {
      next(error)
      res.send({
         message: "Internal server error"
      })
   }
}