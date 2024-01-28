import wholeColl from "../config/getDataBaseData.js";

//obj = .category, .place, .timespan.from/to
async function mostCommonCrime(req, res) {
  const data = await wholeColl.countDocuments({});

  res.json(data);
}

export default mostCommonCrime;
