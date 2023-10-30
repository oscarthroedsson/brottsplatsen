import wholeColl from "../config/getDataBaseData.js";

//obj = .category, .place, .timespan.from/to
async function mostCommonCrime(req, res) {
  console.log("--------------------");
  console.log("sortLatestCrime was run");

  const data = await wholeColl.countDocuments({});

  res.json(data);
}

export default mostCommonCrime;
