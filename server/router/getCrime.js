import express from "express";
const router = express.Router();

// import wholeColl from "../config/getDataBaseData";
import { totNumOfCrimes, getDashBoard } from "../Controllers/getDataDB.js";

//get
router.get("/api/data", (req, res, next) => {
  console.log("GET: reciveOne got called");
  res.send({ msg: "get skickade tillbaka något" });
  next();
});

router.get("/api/TotalNumOfCrimes", totNumOfCrimes);

// getDashBoard //TODO | redo it to a get..
router.post("/api/dashboard", getDashBoard);
//post

export default router;
