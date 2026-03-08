import { Report } from "../db/tableReports.js";
import fs from "fs";
import csvParser from "csv-parser";
export const createReportForm = async (req, res) => {
  try {
    const { category, urgency, message, sourceType } = req.body;
    if (!category || !urgency || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const userId = req.user.id;
    console.log(userId);
    if (!userId) {
      return res.status(401).json({ error: "token id not defind" });
    }
    const report = await Report.create({
      userId,
      category,
      urgency,
      message,
      sourceType: sourceType || "agent",
    });

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createReportCsv = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Csv is nod defind" });
    }
    const userId = req.user.id;
    console.log(userId);
    if (!userId) {
      return res.status(401).json({ error: "token id not defind" });
    }
    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on("data", (row) => {
        results.push(row);
      })
      .on("end", async () => {
        const reports = await Promise.all(
          results.map((row) =>
            Report.create({
              userId,
              category: row.category,
              urgency: row.urgency,
              message: row.message,
              sourceType: "csv",
            }),
          ),
        );
        fs.unlinkSync(req.file.path);
        res.json({ reports });
      });
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

export const getReportBiId = async (req,res)=>{
  try {
    const role = req.user.role 
    
    const id =req.params.id
    
    const report = await Report.findOne({_id:id})

    if(!report){
      return res.status(404).json({error : "report is not defind"})
     };

    if(req.user.id !==report.userId){
      return res.status(403).json({error : "You do not have permission to access this report"})

     };
    
     res.status(200).json(report)
  } catch (error) {
    res.status(500).json({ error: error.message });
    
  }
}