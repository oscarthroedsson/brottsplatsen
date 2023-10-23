import wholeColl from "../config/getDataBaseData.js";

async function sortLatestCrime(obj) {
  // console.log(obj);
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

  console.log("trends | Result: ", result);

  return result;
}

export default sortLatestCrime;
