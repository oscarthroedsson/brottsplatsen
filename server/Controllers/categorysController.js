import wholeColl from "../config/getDataBaseData.js";

async function categorysController(req, res) {
  const result = await wholeColl
    .aggregate([
      {
        $group: {
          _id: "$type",
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

export default categorysController;
