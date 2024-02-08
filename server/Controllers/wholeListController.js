import wholeColl from "../config/getDataBaseData.js";

async function wholeList(req, res) {
  try {
    const result = await wholeColl.find({}, { $sort: { count: -1 } }).toArray();
    res.send(result);
  } catch (err) {
    res
      .status(500)
      .send({ error: "An error occurred while processing your request." });
  }
}

export default wholeList;
