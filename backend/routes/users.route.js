import express from "express"
import { getUsers } from "../controllers/users.controller.js"
import { checkAdmin, checkAuth } from "../middleware/auth.js"
 

const router = express.Router()
 

router.get('/' ,checkAuth,checkAdmin,getUsers )

export default router