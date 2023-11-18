import logger from "morgan";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import { router } from "./routes/api/contacts.js";
export const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const { DB_HOST: uriDb } = process.env;
const connection = mongoose.connect(uriDb); // connection to DB

app.use(logger(formatsLogger));
const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: ["PUT", "DELETE", "PATCH"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/contacts", router);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    res.status(400).json({ message: err.message });
  } else {
    res.status(500).json({ message: err.message });
  }
});

async function startServer() {
  try {
    await connection;
    console.log("DB connected");
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  } catch (error) {
    console.log("DB not connected");
    process.exit(1);
  }
}

startServer();
