import express from "express"
import { createReportCsv, createReportForm, filterReport, getReportBiId } from "../controllers/report.controller.js"
import { checkAuth } from "../middleware/auth.js"
 import multer from "multer";


const router = express.Router()
const upload = multer({ dest: "uploads/" });

router.get('/:id' ,checkAuth, getReportBiId)
router.post('/create/form' ,checkAuth,createReportForm)
router.post('/create/csv' ,checkAuth,upload.single("file"),createReportCsv)
router.get('/filter' ,checkAuth, filterReport)

export default router