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

import readRSSFeed from "../Controllers/rssDebateArticles.js";
import rssPressArticles from "../Controllers/rssPressArticles.js";

//get

//# | inte  implementerade med client
router.get("/api/Total_Num_Of_Crimes", totNumOfCrimes);
router.get("/api/whole_list", wholeList);
router.get("/api/get_past_month", getPastMonth);
router.get("/api/sort_latest_crime", sortLatestCrime);
router.get("/api/night_crimes", nightCrimes);
router.get("/api/common_This_Month", commonThisMonth);
router.get("/api/categorys", categorysController);
router.get("/api/cities", citiesController);
router.get("/api/crime_by_category", crimeByTypeController);

//Read RSS feed
router.get("/rss/debate_articles", readRSSFeed); //get debate articles from police
router.get("/rss/press_articles", rssPressArticles); //get pressmeddelanden from police

//post Database controllers
router.post("/api/get_trends", trendsController); //sending post cuse handle data is easier
router.post("/api/common_crime", commonCrimeController); //sending post cuse handle data is easier
router.post("/api/cordinates_crime", coordinatesController); //sending post cuse handle data is easier

export default router;
