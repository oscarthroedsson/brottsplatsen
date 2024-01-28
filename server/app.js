import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import express from "express";
import connectToDatabase from "./config/connectToDb.js";
import "./Controllers/reciveApiData.js";
import indexRouter from "./router/getCrime.js";

//env nyckel
const authKey = process.env.API_KEY;
const portKey = process.env.PORT;
// Aktivera CORS för alla rutter (inte rekommenderat för produktion)

const app = express();
const port = portKey || 3000;

// Connect to MongoDB | config -> connectToDb.js
connectToDatabase();

//validatet every API auth code that is sent with the API
const validateApiKey = (req, res, next) => {
  console.log("VALIDATE APUIKEY");
  const authKey = process.env.API_AUTH;
  console.log("authKey BAJS: ", authKey);

  const apiKey =
    req.headers["x-api-key"] || req.query.apiKey || req.body.apiKey;
  console.log("apiKey BAJS: ", apiKey);

  if (apiKey && apiKey === authKey) {
    next(); // to the next middlewear
  } else {
    res.status(401).json({ message: "Ogiltig eller saknad API-nyckel" });
  }
};

// app.use("/", routes);
app.use(cors());
app.use(express.json());
app.use(validateApiKey);
app.use("/", indexRouter);
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
