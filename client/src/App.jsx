import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Nav from "./components/nav";
import ListBox from "./components/ListBox";
import CommonCrimeBox from "./components/CommonCrimeBox";
import WeekData from "./components/WeekData";

import CrimesNight from "./components/CrimesNight";
import ListCategorys from "./components/CrimeCategorys";
import UspSection from "./components/UspSection";

let timeStamp = new Date();
let hour = timeStamp.getHours();
let renderNightCrimes = hour > 6 && hour < 12;

function App() {
  const [latestCrimes, setLastestCrimes] = useState([]);
  const [numOfCrimes, setNumOfCrimes] = useState(0);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/Total_Num_Of_Crimes"
        );
        const data = await res.json();
        setNumOfCrimes(data);
      } catch (err) {
        console.error("useEffect app.js got error: ", err);
      }
    };

    fetchData();

    //clean up function
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <Nav></Nav>
      <header className=" .elementLayout1 xs:w-full xs:m-0 xs:rounded-lg headerBg">
        <div className="xs:text-center">
          <p className="p1 text-center py-4">
            <span className="highlight">Brottskollen.se</span> ger dig
          </p>
          <hgroup>
            <h1 className="h1T text-center">Statistik på Polisens händelser</h1>
            <p className="p1 text-center py-6">helt ocencuerat</p>
          </hgroup>
        </div>
        <div className="text-center">
          <p className="h2T text-text-color">{numOfCrimes}</p>
          <p>rapporterade händelser i år</p>
        </div>
        <section className="xs:top-16 md:top-20 flex-wrap flex-auto xsRelative flex items-center">
          <ListBox />
          <CommonCrimeBox />
          <WeekData />
        </section>
      </header>

      <main className="xs:mt-50 sm:mt-40 md:mt-35 lg:mt-25 xl:mt-25 mx-auto py-24 xs:py-32 max-w-7xl">
        {renderNightCrimes && <CrimesNight />}

        <ListCategorys />

        <section>
          <UspSection />
        </section>
        {!renderNightCrimes && <CrimesNight />}
      </main>
      <footer></footer>
      <ul>
        {latestCrimes.map((info) => {
          return <li key={info.id}>{info.type}</li>;
        })}
      </ul>
    </>
  );
}

export default App;
