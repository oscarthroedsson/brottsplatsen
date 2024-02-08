import location2 from "../icons/location2.svg";

import amount from "../icons/boxBrightAmount.png";
import common from "../icons/boxBrightCommon.png";
import location3 from "../icons/boxBrightLocation.png";
import records from "../icons/boxBrightRecords.png";
import nightImg from "../images/nightColored.png";
import React, { useEffect, useState } from "react";

export default function CrimesNight() {
  const [nightCrimes, setNightCrimes] = useState({ doc: [] });
  const authCode = import.meta.env.VITE_API_AUTH;
  useEffect(() => {
    try {
      const crimes = async () => {
        const response = await fetch(
          "https://brottsplatsen-555fb93c7458.herokuapp.com/api/night_crimes",
          {
            headers: {
              "x-api-key": authCode,
            },
          }
        );
        const data = await response.json();
        setNightCrimes(data[0]);
      };
      crimes();
    } catch (err) {}
  }, []);

  let usp = [
    {
      img: amount,
      heading: "Antal",
      text: `Det skedde ${nightCrimes.numOfCrimes}st händelser i natt`,
    },
    {
      img: location3,
      heading: "Plats",
      text: `Flest händelser skedde i ${nightCrimes.location}`,
    },
    {
      img: common,
      heading: "Vanligaste",
      text: `I natt var ${nightCrimes.commonType} den vanligaste händelsen`,
    },
    {
      img: records,
      heading: "Rekord",
      text: "Lyckligtvis slogs inga rekord i natt.",
    },
  ];

  return (
    <>
      <section className="sectionLayout">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="xl:full ">
            <div className="relative">
              <div className="lg:w-2/4">
                <hgroup>
                  <h2 className="text-base font-semibold leading-7 text-main-color">
                    Händelser mellan 23:00 och 06:00
                  </h2>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Natten gav oss
                  </p>
                </hgroup>
                <p className="mt-3 text-lg">
                  Följande händelser har rapporterats in från poliser i landet i
                  natt mellan 23:00 igår till 06:00 i morse.
                </p>
              </div>

              <div className="xs:hidden xl:flex items-center justify-center absolute left-[55rem] h-40 w-96">
                <img src={nightImg} alt="" />
              </div>
            </div>
            <div className="mx-auto mt-16 mb-24 max-w-2xl sm:my-20 lg:max-w-7xl xl:my-26">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-4xl lg:grid-cols-2 lg:gap-y-16">
                {usp.map((uspObj, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div className="relative pl-16 ">
                        <dl className="">
                          <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center ">
                            <img
                              src={uspObj.img}
                              alt=""
                              className="w-10 radius-10"
                            />
                          </div>
                        </dl>
                        <dd>
                          <h3 className="text-size3-p font-semibold leading-7 text-gray-900">
                            {uspObj.heading}
                          </h3>
                          <p>{uspObj.text}</p>
                        </dd>
                      </div>
                    </React.Fragment>
                  );
                })}
              </dl>
            </div>
          </div>
          <div className="mb-16 w-full lg:flex md:flex-wrap xl:gap-16">
            {nightCrimes.doc.map((crime, index) => {
              return (
                <React.Fragment key={index}>
                  <article
                    key={crime.id}
                    className="flex flex-col justify-between primBox min-h-[190px] w-full mb-5 md:w-[500px] xl:w-[350px]
                  p-4 md:m-auto md:mb-10"
                  >
                    {/* Loop som går igenom alla händelser under natten */}
                    <div>
                      <h3 className="text-size1-p font-medium-p">
                        {crime.type}
                      </h3>
                      <hgroup className="my-2">
                        <h4 className="xs:text-size0-p w-full flex gap-1">
                          <img src={location2} alt="" className="w-4 h-4" />
                          {crime.location}
                        </h4>
                        <p className="xs:text-size0-p">{crime.summary}</p>
                      </hgroup>
                    </div>
                    <button className="ml-auto mt-2 align-end bg-dark-bg rounded-sm text-right w-fit px-2 py-1  text-white text-size0-p">
                      Läs mer
                    </button>
                  </article>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
