import wholeColl from "../config/getDataBaseData.js";

//.category, .place, .timespan.from/to
async function trendsController(req, res) {
  const obj = req.body;
  const { timeSpan } = obj;

  let from = new Date(timeSpan.fromDate);
  let to = new Date(timeSpan.toDate);

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
        },
        { $group: { _id: "$type", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 3 },
      ])
      .toArray();

    res.json(result);
  } catch (err) {
    res
      .status(500)
      .send({ error: "An error occurred while processing your request." });
  }
}

export default trendsController;
