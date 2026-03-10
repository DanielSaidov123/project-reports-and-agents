import { Report } from "../db/tableReports.js";
import { parse } from "csv-parse/sync";
export const createReportForm = async (req, res) => {
  try {
    
    const { category, urgency, message, sourceType } = req.body;

    if (!category || !urgency || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const userId = req.user.id;

    let imagePath = null;

    if (req.files && req.files.image) {
      const image = req.files.image;

      imagePath = "uploads/" + Date.now() + "-" + image.name;

      await image.mv(imagePath);
    }

    const report = await Report.create({
      userId,
      category,
      urgency,
      message,
      imagePath,
      sourceType: sourceType || "agent",
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const createReportCsv = async (req, res) => {
  try {
    if (!req.files || !req.files.file) { 
      return res.status(400).json({ error: "CSV file is required" });
    }

    const csvFile = req.files.file; 
    const userId = req.user.id;

    const fileContent = csvFile.data.toString("utf8");

    const rows = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    const reportsToCreate = rows.map((row) => ({
      userId,
      category: row.category,
      urgency: row.urgency,
      message: row.message,
      sourceType: "csv",
    }));

    const reports = await Report.insertMany(reportsToCreate);

    res.status(201).json({ count: reports.length, reports });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const filterReport = async (req, res) => {
  try {
    const role = req.user.role;

    if (!role) {
      return res.status(401).json({ error: "token is not defind" });
    }

    let report;

    if (role === "admin") {
      report = await Report.find();
    } else {
      report = await Report.find({ userId: req.user.id });
    }

    if (req.query.category) {
      report = report.filter((r) => r.category === req.query.category);
    }

    if (req.query.urgency) {
      report = report.filter((r) => r.urgency === req.query.urgency);
    }

    if (req.query.agentCode && role === "admin") {
      report = report.filter((r) => r.agentCode === req.query.agentCode);
    }

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getReportBiId = async (req, res) => {
  try {
    const role = req.user.role;

    const id = req.params.id;

    const report = await Report.findOne({ _id: id });

    if (!report) {
      return res.status(404).json({ error: "report is not defind" });
    }
    if (role === "agent") {
      if (req.user.id !== report.userId) {
        return res
          .status(403)
          .json({ error: "You do not have permission to access this report" });
      }
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getReportsAgent = async (req ,res)=>{
  try {
    const userId = req.user.id

    const reports = await Report.find({userId})

    if (reports.length<=0) {
      return res.status(401).json({error : "Id is not defind"})
    }
    res.status(200).json(reports)
    
  } catch (error) {
    
  }
}