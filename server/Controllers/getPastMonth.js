import wholeColl from "../config/getDataBaseData.js";

async function getPastMonth(req, res) {
  console.log("getPastMonth got called");
  let from = new Date();
  from.setDate(1);
  from.setMonth(from.getMonth() - 1);

  let to = new Date(from);
  to.setMonth(to.getMonth() + 1);
  to.setDate(0);

  let month = new Date().getMonth() + 1;

  console.log("Past month | from: ", from);
  console.log("Past month | to: ", to);

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
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 1,
      },
    ])
    .toArray();
  console.log("result: ", result);

  res.json(result);
}

export default getPastMonth;
