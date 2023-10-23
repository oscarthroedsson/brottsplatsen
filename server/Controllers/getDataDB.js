import fetch from "node-fetch"; //importerar fetch för att kunna hämta data från api
import wholeColl from "../config/getDataBaseData.js"; //hämtar hela collectionen jag vill söka i från mongoDB
import getTrends from "../Controllers/functions/trends.js"; //hämtar funktionen getMostCommon som hämtar de 5 vanligaste brotten
import commonCrime from "../Controllers/functions/mostCommonCrime.js";
import cordinatesCrime from "../Controllers/functions/cordinatesCrime.js";

//! | Ej klar
const reciveOne = async function (req, res) {
  try {
    console.log("reciveOne got called");
  } catch (e) {
    //? | Skicka mail om att det inte fungerar?
    console.log("ERROR API: ", e.message);
  } finally {
    close.client();
  }
};

//! | Ej klar
export const reciveAll = async function (req, res) {
  console.log("reciveAll got called");
};

//fungerar
export const totNumOfCrimes = async function (req, res, next) {
  const numOfCrimes = await wholeColl.countDocuments();
  res.json({ numOfCrimes });
};

// TODO | fixa följande funktioner
// TODO | getTrends() | commonCrime | cordinatesCrime | sortLatestCrime
//req = .category, .place, .timespan.from/to
export const getDashBoard = async function (req, res, next) {
  const result = null;
  const trends = await getTrends(req.body);
  const common = await commonCrime(req.body);
  const crimeCordinates = cordinatesCrime(req.body);
  // const sortLatestCrime = sortLatestCrime(req.body);

  //# | Hämta all data här, men skriv funktionaliteten i functions i controllers
};

export default reciveOne;
