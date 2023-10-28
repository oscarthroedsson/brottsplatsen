import wholeColl from "../config/getDataBaseData.js";
async function commonThisMonth(req, res) {
  const from = new Date();
  from.setDate(1);
  from.setUTCHours(0, 0, 0, 0);

  const to = new Date();
  to.setMonth(to.getMonth() + 1);
  to.setDate(0);
  to.setUTCHours(23, 59, 59, 999);

  console.log("------ commonThisMonth got called ------");
  console.log("From: ", from);
  console.log("To: ", to);
  console.log("----------------------");

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

export default commonThisMonth;
