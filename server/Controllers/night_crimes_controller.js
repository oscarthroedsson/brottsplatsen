import wholeColl from "../config/getDataBaseData.js";

async function getNightCrimes(req, res) {
  let startDay = new Date();
  let oneDayBack = startDay.getDate() - 1;
  startDay = startDay.setDate(oneDayBack);
  let from = new Date(startDay);
  from.setUTCHours(23, 0, 0);

  let to = new Date();
  to.setUTCHours(6, 0, 0);

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
        $facet: {
          mostCommonType: [
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
          ],
          mostCommonLocation: [
            {
              $group: {
                _id: "$location.name",
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
          ],
          totalCrimes: [
            {
              $group: {
                _id: null,
                count: { $sum: 1 },
              },
            },
          ],
          doc: [
            {
              $group: {
                _id: "$_id",
                type: { $first: "$type" },
                summary: { $first: "$summary" },
                datetime: { $first: "$datetime" },
                location: { $first: "$location.name" },
              },
            },
            { $sort: { count: -1 } },
          ],
        },
      },
      {
        $project: {
          commonType: { $arrayElemAt: ["$mostCommonType._id", 0] },
          commonLocation: { $arrayElemAt: ["$mostCommonLocation._id", 0] },
          numOfCrimes: { $arrayElemAt: ["$totalCrimes.count", 0] },
          doc: "$doc",
        },
      },
    ])
    .toArray();

  if (result === null || result.length === 0) {
    res.json({ message: "No crimes during the night" });
    return;
  }

  // Output should be in the format you described

  res.json(result);
}

export default getNightCrimes;
