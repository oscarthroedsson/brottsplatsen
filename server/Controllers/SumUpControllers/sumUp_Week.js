import wholeColl from "../../config/getDataBaseData.js";

async function sumUpWeek(req, res) {
  /*Ställ alltid in tiden/dagen +1 fram 
  vill du får ut 07:00 så ställ in 08:00
  Vill du komma åt fredag så +6 dagar inte +5 dagar
  osv
  */

  const now = new Date();
  let startDate = new Date();
  let endDate = new Date();

  // Adjust so we get friday on startDate
  startDate.setDate(now.getDate() - now.getDay() + 1); // Closest Monday
  startDate.setHours(0, 0, 0, 0); // Friday kl 18:00

  endDate.setDate(now.getDate() - now.getDay() + 8); // Closest Sunday
  endDate.setHours(23, 59, 59); // Sunday kl 23:59

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
          type: 1, // Behåll 'type'
          location: "$location.name", // Hämta 'location.name'
          date: {
            $dateToString: {
              format: "%H:%M %d/%m", // Formatera datum till 'HH:MM dd/mm'
              date: "$datetime",
            },
          },
        },
      },
    ])
    .toArray();
  console.log("RESULT: ", result);
  res.json(result);
}

export default sumUpWeek;
