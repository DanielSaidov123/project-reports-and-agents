import express from "express"
import { changePassword, login, returnUser, signup } from "../controllers/auth.controller.js"
import { checkAdmin, checkAuth } from "../middleware/auth.js"

const router = express.Router()

router.post("/signup",checkAuth,checkAdmin,signup)
router.post("/changePassword",checkAuth,changePassword)
router.post("/login", login)
router.get("/me", checkAuth,returnUser)

export default router