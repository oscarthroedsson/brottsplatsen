import wholeColl from "../config/getDataBaseData.js";

async function categorysController(req, res) {
  const doc = req.query.category;
  console.log("doc: ", doc);
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
  console.log("CrimeByType: ", result);

  res.json(result);
}

export default categorysController;
