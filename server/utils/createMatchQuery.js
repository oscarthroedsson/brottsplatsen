// # | Takes in a object and returns a varible to make a dynamic search query in mongoDB

function createMatchQuery(obj) {
  const matchQuery = {};

  if (obj.category) {
    matchQuery["type"] = obj.category;
  }

  if (obj.place) {
    matchQuery["location.name"] = obj.place;
  }
  if (obj.timeSpan) {
    matchQuery["datetime"] = {
      ...matchQuery["datetime"],
      $gte: new Date(obj.timeSpan.fromDate),
      $lte: new Date(obj.timeSpan.toDate),
    };
  }
  return matchQuery;
}

export default createMatchQuery;
