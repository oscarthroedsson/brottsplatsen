import wholeColl from "../../config/getDataBaseData.js";

async function sumUpMorning(req, res) {
  /*Ställ alltid in tiden/dagen +1 fram 
  vill du får ut 07:00 så ställ in 08:00
  Vill du komma åt fredag så +6 dagar inte +5 dagar
  osv
  */

  const startDate = new Date();
  startDate.setHours(7, 0, 0).toLocaleString("sv-SE");
  const endDate = new Date();
  endDate.setHours(13, 0, 0).toLocaleString("sv-SE");

  try {
    const result = await wholeColl
      .aggregate([
        {
          $match: {
            datetime: {
              $gte: startDate, // Startdatum
              $lte: endDate, // Slutdatum
            },
          },
        },
        {
          $sort: {
            datetime: -1, // Sorterar i fallande ordning baserat på 'datetime'
          },
        },
        {
          $project: {
            type: 1, // Behåller 'type'
            location: "$location.name", // Hämtar 'location.name'
            time: {
              $dateToString: {
                format: "%H:%M", // Formaterar datum till 'HH:MM'
                date: "$datetime",
              },
            },
          },
        },
      ])
      .toArray();

    res.json(result);
  } catch (error) {
    console.error("Error in sumUpAfterNoon:", error);
    res
      .status(500)
      .send({ error: "An error occurred while processing your request." });
  }
}

export default sumUpMorning;
