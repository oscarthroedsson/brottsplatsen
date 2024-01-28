import wholeColl from "../config/getDataBaseData.js";

async function sortLatestCrime(obj) {
  // let from = new Date(obj.timeSpan.fromDate);
  // let to = new Date(obj.timeSpan.toDate);

  const result = await wholeColl
    .aggregate([
      {
        $match: {
          type: {
            $eq: obj.category,
          },
        },
      },
      { $group: { _id: "$type", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])
    .toArray();

  return result;
}

export default sortLatestCrime;
