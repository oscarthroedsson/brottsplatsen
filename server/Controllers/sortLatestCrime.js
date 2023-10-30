import wholeColl from "../config/getDataBaseData.js";

async function sortLatestCrime(obj) {
  console.log("--------------------");
  console.log("sortLatestCrime was run");
  let from = new Date(obj.timeSpan.fromDate);
  let to = new Date(obj.timeSpan.toDate);

  console.log("trends | from: ", from);
  console.log("trends | to: ", to);

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
