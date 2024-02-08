import wholeColl from "../config/getDataBaseData.js";

async function categorysController(_req, res) {
  try {
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
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while processing your request." });
  }
}

export default categorysController;
