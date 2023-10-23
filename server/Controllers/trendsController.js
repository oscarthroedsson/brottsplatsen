import wholeColl from "../config/getDataBaseData.js";

//.category, .place, .timespan.from/to
async function getMostCommon(obj) {
  // console.log(obj);
  let from = new Date(obj.timeSpan.fromDate);
  let to = new Date(obj.timeSpan.toDate);

  console.log("trends | from: ", from);
  console.log("trends | to: ", to);

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
      { $limit: 5 },
    ])
    .toArray();

  console.log("trends | Result: ", result);

  return result;
}

export default getMostCommon;
