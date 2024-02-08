import wholeColl from "../config/getDataBaseData.js";

//? vart används denna?

async function sortLatestCrime(obj) {
  const result = await wholeColl
    .aggregate([
      {
        $match: {
          type: {
            $eq: obj.category,
          },
        },
      },
      { $group: { _id: "$type", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])
    .toArray();

  return result;
}

export default sortLatestCrime;
