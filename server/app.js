import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectToDatabase from "./config/connectToDb.js";
import "./Controllers/reciveApiData.js";
import indexRouter from "./router/getCrime.js";
import cors from "cors";

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

app.listen(port);

export default app;
