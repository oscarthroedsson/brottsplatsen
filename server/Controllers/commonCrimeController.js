import wholeColl from "../config/getDataBaseData.js";

//obj = .category, .place, .timespan.from/to
async function mostCommonCrime(obj) {
  console.log("mostCommonCrime", obj);
  let from = new Date(obj.timeSpan.fromDate);
  let to = new Date(obj.timeSpan.toDate);

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
      { $limit: 5 },
    ])
    .toArray();
  console.log("MOST COMMON", result);
}

export default mostCommonCrime;
