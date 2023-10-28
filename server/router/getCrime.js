import express from "express";
const router = express.Router();

// import wholeColl from "../config/getDataBaseData";
import totNumOfCrimes from "../Controllers/totNumOfCrimes.js";
import wholeList from "../Controllers/wholeListController.js";
import trendsController from "../Controllers/trendsController.js";
import getPastMonth from "../Controllers/getPastMonth.js";
import commonCrimeController from "../Controllers/commonCrimeController.js";
import coordinatesController from "../Controllers/coordinatesController.js";
import sortLatestCrime from "../Controllers/sortLatestCrime.js";
import nightCrimes from "../Controllers/night_crimes_controller.js";
import commonThisMonth from "../Controllers/commonThisMonth.js";
import categorysController from "../Controllers/categorysController.js";
import crimeByTypeController from "../Controllers/CrimeByTypeController.js";
import citiesController from "../Controllers/citiesController.js";

//get

//# | inte  implementerade med client
router.get("/api/Total_Num_Of_Crimes", totNumOfCrimes);

router.get("/api/whole_list", wholeList);

router.get("/api/get_trends", trendsController);

router.get("/api/get_past_month", getPastMonth);

router.get("/api/common_crime", commonCrimeController);

router.get("/api/cordinates_crime", coordinatesController);

router.get("/api/sort_latest_crime", sortLatestCrime);

router.get("/api/night_crimes", nightCrimes);

router.get("/api/common_This_Month", commonThisMonth);

router.get("/api/categorys", categorysController);

router.get("/api/cities", citiesController);

router.get("/api/crime_by_category", crimeByTypeController);

//post

export default router;
