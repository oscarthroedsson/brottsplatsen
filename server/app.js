import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import express from "express";
import connectToDatabase from "./config/connectToDb.js";
import "./Controllers/reciveApiData.js";
import indexRouter from "./router/getCrime.js";

// Aktivera CORS för alla rutter (inte rekommenderat för produktion)

const app = express();
const port = 3000;
// Connect to MongoDB | config -> connectToDb.js
connectToDatabase();

// app.use("/", routes);

app.use(cors());
app.use(express.json());
app.use("/", indexRouter);
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(port, () => {
  const filename = process.argv[2];
  if (filename) {
    import(`./${filename}`).catch((err) => {
      console.error(`Failed to load file ${filename}:`, err);
    });
  } else {
    console.log("No specific filename provided to run.");
  }
});

export default app;
