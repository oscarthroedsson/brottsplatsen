import wholeColl from "../config/getDataBaseData.js";

async function categorysController(req, res) {
  console.log("--------------------");
  console.log("categorysController was run");

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
