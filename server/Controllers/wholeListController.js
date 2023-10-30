import wholeColl from "../config/getDataBaseData.js";

async function wholeList(req, res) {
  console.log("--------------------");
  console.log("getMostCommon was run");
  const result = await wholeColl
    .find(
      {},
      { projection: { _id: 1, type: 1, "location.name": 1 } },
      { $sort: { count: -1 } }
    )
    .toArray();

  res.send(result);
}

export default wholeList;
