import wholeColl from "../config/getDataBaseData.js";

async function categorysController(req, res) {
  const doc = req.query.category;

  const result = await wholeColl
    .aggregate([
      {
        $match: {
          type: { $eq: doc },
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
