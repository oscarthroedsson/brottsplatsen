import wholeColl from "../config/getDataBaseData.js";

async function categorysController(req, res) {
  const doc = req.query.category;

  try {
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
  } catch (err) {
    res
      .status(500)
      .send({ error: "An error occurred while processing your request." });
  }
}

export default categorysController;
