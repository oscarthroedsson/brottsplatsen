import wholeColl from "../config/getDataBaseData.js";

async function getCities(req, res) {
  console.log("--------------------");
  console.log("getCities was run");
  const result = await wholeColl
    .aggregate([
      {
        $group: {
          _id: "$location.name",
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ])
    .toArray();

  res.json(result);
}

export default getCities;
