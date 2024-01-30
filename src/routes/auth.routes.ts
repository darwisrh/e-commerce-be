import { Express } from "express"
import * as express from "express"

// CONTROLLERS
import { register, resendOtp, verifyEmail, login } from "../controllers/auth.controller"

// ROUTES
export const authRoutes: Express = express()

authRoutes.post("/register", register)
authRoutes.patch("/resend-otp/:id", resendOtp)
authRoutes.patch("/verify-email", verifyEmail)
authRoutes.post("/login", login)