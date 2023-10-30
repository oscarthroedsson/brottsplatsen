import wholeColl from "../config/getDataBaseData.js";

//.category, .place, .timespan.from/to
async function trendsController(req, res) {
  const obj = req.body;

  const { timeSpan } = obj;

  let from = new Date(timeSpan.fromDate);
  let to = new Date(timeSpan.toDate);
  console.log({ from, to });

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
}

export default trendsController;
