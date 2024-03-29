import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage,
});

dotenv.config({
  path: path.resolve(__dirname, "./.env"),
});

const app = express();
const PORT = process.env.PORT || 8000;

const connect = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected !!`);
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

connect();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Adjust the path to your client's dist directory
const clientDistPath = path.resolve(__dirname, '..', '..', 'demo_project', 'client', 'dist');
app.use(express.static(clientDistPath));

const statusSchema = new mongoose.Schema({
  selectId: String,
  type: String,
  tableData: Object,
  notification: [
    {
      label: String,
      value: Boolean,
    },
  ],
});

const Status = mongoose.model("Status", statusSchema);

app.post(
  "/api/v1/save-status",
  async (req, res) => {
    try {
      const { notification, selectId, type } = req.body;

      const status = await Status.create({
        selectId,
        type,
        notification,
      });

      res.status(200).json({
        status,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: error.message,
      });
    }
  }
);

app.post("/api/v1/save-all-data", async (req, res) => {
  try {
    const tableData = req.body;

    const status = await Status.create({
      tableData,
    });

    res.status(200).json({
      status,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("*", (req, res) => {
  // Adjust the path to your client's index.html file
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`⚙️ Server is running at port : ${PORT}`);
});
