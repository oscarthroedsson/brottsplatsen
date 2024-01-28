import wholeColl from "../config/getDataBaseData.js";

async function getCities(req, res) {
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
