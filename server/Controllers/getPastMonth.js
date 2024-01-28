import wholeColl from "../config/getDataBaseData.js";

async function getPastMonth(req, res) {
  let from = new Date();
  from.setDate(1);
  from.setMonth(from.getMonth() - 1);

  let to = new Date(from);
  to.setMonth(to.getMonth() + 1);
  to.setDate(0);

  // let month = new Date().getMonth() + 1;

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

  res.json(result);
}

export default getPastMonth;
