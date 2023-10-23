import wholeColl from "../config/getDataBaseData.js";

//obj = .category, .place, .timespan.from/to
async function mostCommonCrime(obj) {
  console.log("mostCommonCrime", obj);
  let from = new Date(obj.timeSpan.fromDate);
  let to = new Date(obj.timeSpan.toDate);

  const data = await wholeColl.countDocuments({});
  const result = await data.JSON();

  return result;
}

export default mostCommonCrime;
