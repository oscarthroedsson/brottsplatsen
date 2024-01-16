import { useState, useEffect } from "react";

import Nav from "./components/nav";
import ListBox from "./components/ListBox";
import CommonCrimeBox from "./components/CommonCrimeBox";
import WeekData from "./components/LatestSevendays";

import CrimesNight from "./components/CrimesNight";
import ListCategorys from "./components/CrimeCategorys";
import NewsDebate from "./components/NewsDebate";
import UspSection from "./components/UspSection";
import NewsPress from "./components/NewsPress";
import Footer from "./components/footer";
import SumUpTable from "./components/sumComponens/SumUpTable";

let timeStamp = new Date();
let hour = timeStamp.getHours();
let renderNightCrimes = hour > 6 && hour < 12;

function App() {
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
      <Nav />
      <div className="bg-[#FAFAFA]">
        <header className="headerBg w-full py-20 xl:py-32 h-[580px] xl:h-[600px]">
          <div className="elementLayout1 text-center">
            <p className="text-center py-4">
              <span className="highlight font-bold">Brottskollen.se</span> ger
              dig
            </p>
            <hgroup>
              <h1 className="h1T text-center">
                Statistik på Polisens händelser
              </h1>
              <p className="p1 text-center py-6">helt ocencuerat</p>
            </hgroup>
          </div>
          <div className="text-center">
            <p className="h2T text-text-color">{numOfCrimes}</p>
            <p>rapporterade händelser i år</p>
          </div>
          <section className="xs:top-24 sm:top-20 md:top-36 lg:top-32 xl:top-20 flex flex-wrap xsRelative">
            <ListBox />
            <CommonCrimeBox />
            <WeekData />
          </section>
        </header>

        <main className="xs:mt-50 sm:mt-50 md:mt-30 lg:mt-25 xl:mt-25 mx-auto py-24 xs:py-32">
          <section className="flex flex-wrap justify-center w-full gap-10  my-10 p-8 lg:px-20 lg:py-10 ">
            <SumUpTable
              timeOfDay="06:00 - 12:00"
              apiCall="sumUp_Morning"
              noDataMsg=""
            />
            <SumUpTable
              timeOfDay="12:00 - 16:00"
              apiCall="sumUp_Afternoon"
              noDataMsg=""
            />
            <SumUpTable
              timeOfDay="16:00 - 23:59"
              apiCall="sumUp_Evning"
              noDataMsg=""
            />
            <SumUpTable
              timeOfDay="under nuvarande vecka"
              apiCall="sumUp_Week"
              noDataMsg=""
            />
          </section>

          {renderNightCrimes && <CrimesNight />}

          <ListCategorys />
          <NewsDebate />

          <UspSection />

          <NewsPress />
          {!renderNightCrimes && <CrimesNight />}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
