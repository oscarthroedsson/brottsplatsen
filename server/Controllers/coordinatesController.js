import wholeColl from "../config/getDataBaseData.js";
import searchQuery from "../utils/createMatchQuery.js";
//.category, .place, .timespan.from/to
async function cordinatesCrime(req, res) {
  console.log("--------------------");
  console.log("cordinatesCrime was run");
  const obj = req.body;

  //# Create a dynamic matchiquery depending of the data we get in!
  let query = searchQuery(obj);
  console.log("query", query);

  try {
    const result = await wholeColl
      .aggregate([
        {
          $match: query,
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
    console.log("CoordinatesController Result: ", result);
    res.json(result);
  } catch (err) {
    console.log("cordinatesCrime | ERROR: ", err);
  }
}

export default cordinatesCrime;
