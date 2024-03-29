import wholeColl from "../config/getDataBaseData.js";

//obj = .category, .place, .timespan.from/to
async function mostCommonCrime(req, res) {
  const obj = req.body;

  const from = new Date(obj.timeSpan.fromDate);
  const to = new Date(obj.timeSpan.toDate);

  try {
    const result = await wholeColl
      .aggregate([
        {
          $match: {
            datetime: {
              $gte: from,
              $lte: to,
            },
          },
          $match: {
            type: obj.category,
          },
        },
        { $group: { _id: "$location.name", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ])
      .toArray();

    res.json(result);
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while processing your request." });
  }
}

export default mostCommonCrime;
