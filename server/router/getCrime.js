import express from "express";
const router = express.Router();

// import wholeColl from "../config/getDataBaseData";
import { totNumOfCrimes, getDashBoard } from "../Controllers/getDataDB.js";
import trendsController from "../Controllers/trendsController.js";
import commonCrimeController from "../Controllers/commonCrimeController.js";
import coordinatesController from "../Controllers/coordinatesController.js";
import sortLatestCrime from "../Controllers/sortLatestCrime.js";

//get
router.get("/api/data", (req, res, next) => {
  console.log("GET: reciveOne got called");
  res.send({ msg: "get skickade tillbaka något" });
  next();
});

router.get("/api/TotalNumOfCrimes", totNumOfCrimes);

router.post("/api/dashboard", getDashBoard);

//# | inte  implementerade med client
router.get("api/get_trends", trendsController);

router.get("/api/common_crime", commonCrimeController);

router.get("/api/cordinates_crime", coordinatesController);

router.get("/api/sort_latest_crime", sortLatestCrime);

//post

export default router;
