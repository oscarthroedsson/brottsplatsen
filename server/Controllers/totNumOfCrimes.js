import wholeColl from "../config/getDataBaseData.js";

//obj = .category, .place, .timespan.from/to
async function mostCommonCrime(req, res) {
  try {
    const data = await wholeColl.countDocuments({});
    res.json(data);
  } catch (err) {
    res
      .status(500)
      .send({ error: "An error occurred while processing your request." });
  }
}

export default mostCommonCrime;
