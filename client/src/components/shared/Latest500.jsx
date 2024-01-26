import { useEffect, useState } from "react";
import dates from "../../data/dates.js";

function Latest500({ searchData }) {
  // Takes in the search criterias from the user
  const [latestCrimes, setLatestCrime] = useState([]);
  const [sortedCrimes, setSortedCrimes] = useState([]);
  const [sortedByPlace, setSortedByPlace] = useState([]);
  const [seeSpecifics, setSeeSpecifics] = useState(null);

  //# Fetch the latest 500 crimes
  useEffect(() => {
    const data = async () => {
      const response = await fetch("http://localhost:3000/api/whole_list");
      const result = await response.json();
      setLatestCrime(result);
    };
    data();
  });

  //# Sort the crimes by category
  //Madde: detta behöver inte ligga i en useEffect, kan ligga som en vanlig funktion alternativt att du bryter ut själva sorteringen till en egen funktion som du sen anropar i samma useEffet där du hämtar datan. Onödigt att ha latestCrimes som egen state, du kan spara bara den sorterade ist
  //! Får för många re-renders om jag tar bort useEffect Kolla mer på maddes kommentar och försök städa upp
  useEffect(() => {
    // Filters
    const sorted = latestCrimes
      .filter(
        (crime) =>
          crime.type === searchData.category &&
          crime.location.name !== searchData.place
      )
      .sort((a, b) => {
        // Konvertera datumsträngarna till Date-objekt
        const dateA = new Date(a.datetime);
        const dateB = new Date(b.datetime);

        // Jämför datum först
        if (dateA > dateB) return -1;
        if (dateA < dateB) return 1;

        if (dateA.getTime() > dateB.getTime()) return -1;
        if (dateA.getTime() < dateB.getTime()) return 1;

        return 0; //No changes if date and time are the same
      });
    setSortedCrimes(sorted);

    //create a specific list for every crime in specific place
    const specificPlace = latestCrimes.filter((crime) => {
      return (
        crime.location.name === searchData.place &&
        crime.type === searchData.category
      );
    });
    setSortedByPlace(specificPlace);
  }, [latestCrimes]); // Kör denna useEffect när latestCrimes uppdateras

  //# Format the dateformat
  function formatDate(dateString) {
    //get the year in 2 digits.. instead of 2023 -> 23
    const year = new Intl.DateTimeFormat("sv-SE", { year: "2-digit" }).format(
      new Date(dateString)
    );
    //get the month in text from dates array och förkortar till 3 bokstäver
    const month = dates[new Date(dateString).getMonth()].slice(0, 3);
    // get the day in 2 digits.. instead of 1 -> 01
    const day = new Intl.DateTimeFormat("sv-SE", { day: "2-digit" }).format(
      new Date(dateString)
    );

    //returns following format DD/MM/YY -> 01 April 2022
    return `${day} ${month} ${year}`;
  }

  //# Format the timeformat
  function formatTime(dateString) {
    //get the hour in 2 digits.. instead of 1 -> 01
    const hour = new Date(dateString).getHours().toString().padStart(2, "0");
    //get the minutes in 2 digits.. instead of 1 -> 01
    const min = new Date(dateString).getMinutes().toString().padStart(2, "0");
    //returns following format HH:MM -> 01:01
    return `${hour}:${min}`;
  }

  function toggleCrimeSummary(crimeID) {
    console.log("crimeID :", crimeID);
    if (seeSpecifics === crimeID) {
      // Dölj sammanfattningen om samma crime klickas igen
      setSeeSpecifics(null);
    } else {
      // Visa ny sammanfattning
      setSeeSpecifics(crimeID);
    }
  }

  return (
    <>
      <div className="">
        <div className="">
          <table className="table-auto py-2 w-full secBox max-h-96 lg:max-h-52 h-full">
            <thead className="sticky top-0 bg-white">
              <tr>
                <th className="py-3">Händelse</th>
                <th>Plats</th>
                <th>Tid</th>
                <th>Datum</th>
              </tr>
            </thead>
            <tbody className="">
              {sortedByPlace.length === 0 ? (
                <tr className="text-[1rem] text-center">
                  <td colSpan="4">
                    <p className="p-2 text-[0.9rem]">
                      Ingen specifik plats valdes eller så hittade vi inte{" "}
                      {searchData.category} i {searchData.place}
                    </p>
                  </td>
                </tr>
              ) : (
                sortedByPlace.map((crime) => {
                  //gör tr bakgrundsfärgen till röd om det är en brott som skett samma månad som man söker på
                  const trClass =
                    crime.dateTime === searchData.date ? "bg-[#eef4ff]" : "";
                  return (
                    <>
                      <tr
                        className={`text-[0.75rem] text-center p-10 border-[#a7befa] border-b-[0.5px] hover:bg-[#c8d9fd] ${trClass}`}
                      >
                        <td className="pl-2">{crime.type}</td>
                        <td className="py-2">{crime.location.name}</td>
                        <td className="py-2">{formatTime(crime.datetime)}</td>
                        <td className={`pr-2`}>{formatDate(crime.datetime)}</td>
                      </tr>
                      <div>
                        <p className="py-2">{crime.summary}</p>
                      </div>
                    </>
                  );
                })
              )}
              <tr className="text-center sticky top-10 bg-white">
                <td colSpan="4">
                  <p className="py-3 ">Alla andra städer</p>
                </td>
              </tr>
              {sortedCrimes.map((crime) => {
                return (
                  <>
                    <tr
                      onClick={() => toggleCrimeSummary(crime._id)}
                      key={crime._id}
                      className="text-[0.75rem] text-center p-10 hover:bg-[#eef4ff] border-b-[0.5px]"
                    >
                      <td className="pl-2">{crime.type}</td>
                      <td className="py-2">{crime.location.name}</td>
                      <td className="py-2">{formatTime(crime.datetime)}</td>
                      <td className="pr-2">{formatDate(crime.datetime)}</td>
                    </tr>
                    {seeSpecifics === crime._id && (
                      <tr className="p-4 bg-[#eef4ff]">
                        <td
                          colSpan="4"
                          className=" p-2 text-[0.75rem] text-start"
                        >
                          {crime.summary}
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Latest500;
