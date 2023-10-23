import wholeColl from "../config/getDataBaseData.js";
//.category, .place, .timespan.from/to
async function cordinatesCrime(obj) {
  console.log("cordinatesCrime", obj);

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
      {
        $addFields: {
          coordinates: {
            $split: ["$location.gps", ","],
          },
        },
      },
      {
        $addFields: {
          lon: {
            $arrayElemAt: ["$coordinates", 0],
          },
          lat: {
            $arrayElemAt: ["$coordinates", 1],
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          url: { $first: "$url" },
          location: { $first: "$location.name" },
          type: { $first: "$type" },
          lon: { $first: "$lon" },
          lat: { $first: "$lat" },
        },
      },
      { $sort: { count: -1 } },
    ])
    .toArray();

  console.log("CordinatesCrime | Result: ", result);

  return result;
}

export default cordinatesCrime;
