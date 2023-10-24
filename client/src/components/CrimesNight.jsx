import location2 from "../icons/location2.svg";

import amount from "../icons/boxBrightAmount.png";
import common from "../icons/boxBrightCommon.png";
import location3 from "../icons/boxBrightLocation.png";
import records from "../icons/boxBrightRecords.png";
import nightImg from "../images/nightColored.png";
import { useEffect, useState } from "react";

export default function CrimesNight() {
  const [nightCrimes, setNightCrimes] = useState([]);
  const [commonPlace, setCommonPlace] = useState();
  const [commonCrime, setCommonCrime] = useState();

  let usp = [
    {
      img: amount,
      heading: "Antal",
      text: `Det skedde ${nightCrimes.length}st händelser i natt`,
    },
    {
      img: location3,
      heading: "Plats",
      text: `Flest händelser skedde i ${commonPlace}`,
    },
    {
      img: common,
      heading: "Vanligaste",
      text: `I natt var ${commonCrime} den vanligaste händelsen`,
    },
    {
      img: records,
      heading: "Rekord",
      text: "Lyckligtvis slogs inga rekord i natt. ",
    },
  ];

  //Get all crimes that happened to night: from 23:00 yesterday to 06:00 today
  useEffect(() => {
    const result = async () => {
      const response = await fetch("/api/night_crimes");
      const data = await response.json();
      return data;
    };
    result().then((data) => {
      setNightCrimes(data);
    });
    //calls function that sort out the most common place and crime in the nightreport
    mostCommonPlace(nightCrimes);
    mostCommonCrimes(nightCrimes);
  });

  //finds the most common place and crime in the nightreport
  function mostCommonPlace(crimeArray) {
    if (crimeArray.length > 0) {
      const result = crimeArray.reduce((acc, crime) => {
        if (acc[crime.location.name]) {
          acc[crime.location.name]++;
        } else {
          acc[crime.location.name] = 1;
        }
        return acc;
      });
      setCommonPlace(result);
    } else {
      console.log("ERROR CrimesNight -> mostCommonPlace: crimeArray is empty");
    }
  }

  //finds the most common place and crime in the nightreport
  function mostCommonCrimes(crimeArray) {
    if (crimeArray.length > 0) {
      const result = crimeArray.reduce((acc, crime) => {
        if (acc[crime.type]) {
          acc[crime.type]++;
        } else {
          acc[crime.type] = 1;
        }
        return acc;
      });
      setCommonCrime(result);
    } else {
      console.log("ERROR CrimesNight -> mostCommonCrimes: crimeArray is empty");
    }
  }

  return (
    <>
      <section className="py-24 xs:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="xl:full ">
            <div className="relative">
              <div className="lg:w-2/4">
                <hgroup>
                  <h2 className="text-base font-semibold leading-7 text-main-color">
                    Händelser mellan 23:00 och 06:00 i natt
                  </h2>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Natten gav oss
                  </p>
                </hgroup>
                <p className="mt-3 text-lg">
                  Följande händelser har rapporterats in från poliser i landet i
                  natt mellan 23:00 igår till 06:00 i morse.{" "}
                </p>
              </div>
              <div className="xs:hidden xl:flex items-center justify-center absolute left-[55rem] h-40 w-96">
                <img src={nightImg} alt="" />
              </div>
            </div>
            <div className="mx-auto mt-16 mb-24 max-w-2xl sm:my-20 lg:max-w-7xl xl:my-26">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-4xl lg:grid-cols-2 lg:gap-y-16">
                {usp.map((obj) => {
                  return (
                    <>
                      <div className="relative pl-16">
                        <dl className="">
                          <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center">
                            <img
                              src={obj.img}
                              alt=""
                              className="w-10 radius-10"
                            />
                          </div>
                        </dl>
                        <dd>
                          <h3 className="text-size3-p font-semibold leading-7 text-gray-900">
                            {obj.heading}
                          </h3>
                          <p>{obj.text}</p>
                        </dd>
                      </div>
                    </>
                  );
                })}
              </dl>
            </div>
          </div>
          <div className="twoColumn mb-16 w-full lg:flex lg:flex-wrap xl:gap-16">
            {nightCrimes.map((crime) => {
              return (
                <article
                  key={crime.id}
                  className="flex flex-col infoboxes w-full lg:w-[400px] xl:w-[350px]
                  p-4 xl:ml-auto"
                >
                  {/* Loop som går igenom alla händelser under natten */}
                  <div>
                    <h3 className="text-size1-p font-medium-p">{crime.type}</h3>
                    <hgroup className="my-2">
                      <h4 className="xs:text-size0-p w-full flex gap-1">
                        <img src={location2} alt="" className="w-4 h-4" />
                        {crime.location.name}
                      </h4>
                      <p className="xs:text-size0-p">{crime.summary}</p>
                    </hgroup>
                  </div>
                  <button className="ml-auto mt-2 align-end bg-dark-bg rounded-sm text-right w-fit px-2 py-1  text-white text-size0-p">
                    Läs mer
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
