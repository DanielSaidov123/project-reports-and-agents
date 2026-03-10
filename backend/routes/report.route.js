import express from "express";
import { createReportCsv, createReportForm, filterReport, getReportBiId, getReportsAgent } from "../controllers/report.controller.js";
import { checkAuth } from "../middleware/auth.js";

const router = express.Router();

router.post('/create/form', checkAuth, createReportForm);
router.post('/create/csv', checkAuth, createReportCsv); 
router.get('/filter', checkAuth, filterReport);
router.get('/', checkAuth, getReportsAgent);
router.get('/:id', checkAuth, getReportBiId);

export default router;