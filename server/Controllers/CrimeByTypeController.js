import wholeColl from "../config/getDataBaseData.js";

async function categorysController(req, res) {
  console.log("--------------------");
  console.log("categorysController was run");
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
  console.log("CrimeByType: ", result);

  res.json(result);
}

export default categorysController;
