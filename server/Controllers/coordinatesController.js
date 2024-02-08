import wholeColl from "../config/getDataBaseData.js";
import searchQuery from "../utils/createMatchQuery.js";
//.category, .place, .timespan.from/to
async function cordinatesCrime(req, res) {
  const obj = req.body;

  //# Create a dynamic matchiquery depending of the data we get in!
  let query = searchQuery(obj);

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
            lat: {
              $arrayElemAt: ["$coordinates", 0],
            },
            lng: {
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
            lat: { $first: "$lat" },
            lng: { $first: "$lng" },
          },
        },
        { $sort: { count: -1 } },
      ])
      .toArray();

    res.json(result);
  } catch (err) {
    res
      .status(500)
      .send({ error: "An error occurred while processing your request." });
  }
}

export default cordinatesCrime;
