import wholeColl from "../config/getDataBaseData.js";

async function wholeList(req, res) {
  const result = await wholeColl.find({}, { $sort: { count: -1 } }).toArray();

  res.send(result);
}

export default wholeList;
