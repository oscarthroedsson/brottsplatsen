import wholeColl from "../config/getDataBaseData.js";

async function getCities(req, res) {
  try {
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
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while processing your request." });
  }
}

export default getCities;
