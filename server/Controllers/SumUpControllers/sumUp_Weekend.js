import wholeColl from "../../config/getDataBaseData.js";

async function sumUpWeekend(req, res) {
  /*Ställ alltid in tiden/dagen +1 fram 
  vill du får ut 07:00 så ställ in 08:00
  Vill du komma åt fredag så +6 dagar inte +5 dagar
  osv
  */

  const now = new Date();
  let startDate = new Date();
  let endDate = new Date();

  // Adjust so we get friday on startDate
  startDate.setDate(now.getDate() - now.getDay() + 5); // Closest Friday
  startDate.setHours(19, 0, 0, 0); // Friday kl 18:00

  endDate.setDate(now.getDate() - now.getDay() + 8); // Closest Sunday
  endDate.setHours(0, 59, 59, 999); // Sunday kl 23:59

  console.log("startDate: ", startDate);
  console.log("endDate: ", endDate);

  const result = await wholeColl
    .aggregate([
      {
        $match: {
          datetime: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $sort: {
          datetime: -1, // Sort falling order
        },
      },
      {
        $project: {
          type: 1, // Keep 'type'
          location: "$location.name", // get 'location.name'
          time: {
            $dateToString: {
              format: "%H:%M", // Formate date to 'HH:MM'
              date: "$datetime",
            },
          },
        },
      },
    ])
    .toArray();
  console.log("RESULT: ", result);
  res.send(result);
}

export default sumUpWeekend;
