import { useEffect, useState } from "react";

//# Components
import Nav from "../components/Nav";
import ReactDatePicker from "../components/shared/ReactDatePicker";
import Trends from "../components/shared/Trends";

import SelectElement from "../components/shared/SelectElement.jsx";
import CommonnCrime from "../components/shared/CommonCrime";
import GoogleMaps from "../components/shared/GoogleMaps";

//# Functions
import parseIsoDate from "../functions/parseIsoDate.js";

//# Data
import months from "../data/dates";

//# IMG
import menuArrow from "../icons/arrow.png";
import categorysIcon from "../icons/fCrime.png";
import placeIcon from "../icons/fPlace.png";
import timePeriodIcon from "../icons/ftimePeriod.png";
import trendsIcon from "../icons/fTrends.png";
import realTimeIcon from "../icons/fRealTime.png";
import commonIcon from "../icons/fSum_data.png";
import mapIcon from "../icons/fGoogleMap.png";

//# Database Component
export default function Databas() {
  //* Handles menus
  const [showMenu, setShowMenu] = useState(true);
  const [advSearch, setAdvSearch] = useState(false);
  const [categoryArray, setCategoryArray] = useState([]);
  const [cityArray, setCityArray] = useState([]);

  //* Saves input from user
  const [category, setCategory] = useState(null);
  const [place, setPlace] = useState(null);
  const [month, setMonth] = useState(null);
  const [timePeriod, setTimePeriod] = useState({});

  //* Collect searchdata and props to components
  const [searchData, setSearchData] = useState({});

  const [run, setRun] = useState(false);

  useEffect(() => {
    const getCategorys = async () => {
      const res = await fetch("http://localhost:3000/api/categorys");
      const data = await res.json();
      let parseCategorys = data.map((category) => {
        return category._id;
      });
      setCategoryArray(parseCategorys);
    };

    const getCities = async () => {
      const res = await fetch("http://localhost:3000/api/cities");
      const data = await res.json();

      let parseCities = data.map((city) => {
        return city._id;
      });
      setCityArray(parseCities);
    };

    getCategorys();
    getCities();
  }, []);

  useEffect(() => {
    const setData = () => {
      return {
        category: category,
        place: place,
        timeSpan: month ? parseIsoDate(month) : timePeriod,
      };
    };
    setSearchData(setData);
  }, [category, place, month, timePeriod]);

  //* Controll advanced search
  function advancedSearch() {
    if (advSearch) {
      setAdvSearch(false);
    } else {
      setAdvSearch(true);
    }
  }

  return (
    <>
      <Nav></Nav>
      {/* ADDERA EV MAX-W EFTER MX-AUTO */}
      <section className="bg-mainBG w-full">
        <div className="sectionLayout">
          <div className="elementLayout1 flex justify-center flex-col">
            <div className="flex flex-wrap justify-center gap-3">
              <div>
                <SelectElement
                  options={categoryArray}
                  defaultValue={"Välj kategori"}
                  onChange={setCategory}
                />
              </div>
              <div>
                <SelectElement
                  options={cityArray}
                  onChange={setPlace}
                  defaultValue={"Sverige"}
                />
              </div>
              <div>
                {!advSearch && (
                  <SelectElement
                    options={months}
                    onChange={setMonth}
                    defaultValue={"Välj månad"}
                  />
                )}

                {advSearch && (
                  <div className="md:flex md:flex-row md:gap-3">
                    <ReactDatePicker
                      onChange={(date) =>
                        setTimePeriod((prevTimePeriod) => ({
                          ...prevTimePeriod,
                          fromDate: date,
                        }))
                      }
                    />

                    <ReactDatePicker
                      onChange={(date) =>
                        setTimePeriod((prevTimePeriod) => ({
                          ...prevTimePeriod,
                          toDate: date,
                        }))
                      }
                    />
                  </div>
                )}
                {/* //#Avancerad sökning */}
                <div className="text-right">
                  <button
                    onClick={advancedSearch}
                    className="mt-4 text-size0-p text-main-color"
                  >
                    {advSearch ? "Sök mindre" : "Avancerad sökning"}
                  </button>
                </div>
              </div>

              {/* //#Search button */}
              <div>
                <button
                  onClick={() => {
                    setRun(true);
                  }}
                  className="w-full sm:w-80 md:w-80 lg:w-64 text-white bg-main-color rounded-md h-10 mt-10 md:mt-1"
                >
                  Sök
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* DASHBOARD COMPONENTS */}
        <main className="w-full">
          {run ? (
            <>
              <div className="flex flex-wrap xl:h-1/2">
                <div className="py-12 mx-6 xl:w-1/3">
                  <Trends searchData={searchData} />
                  <CommonnCrime searchData={searchData} />
                </div>

                <div className="py-12 w-full xl:min-w-1/3 ">
                  <GoogleMaps searchData={searchData} />
                </div>
              </div>
            </>
          ) : (
            <GuideLines />
          )}
        </main>
      </section>
    </>
  );
}

function GuideLines() {
  const features = [
    {
      name: "Händelser",
      description:
        "Händelser är en lista av kategorier baserat på hur Polisen sorterar sina händelser. Vi listar enbart de händelser som vi har i våran databas. Välj en kategori för specifik sökning, väljer du ingen söker vi på alla kategorier vi har och sorterar det. ",
      icon: categorysIcon,
    },
    {
      name: "Plats",
      description:
        "Välj en plats för att få unik data om just den platsen. Väljer du ingen plats så söker vi på händelse i hela Sverige.",
      icon: placeIcon,
    },
    {
      name: "Tidsperiod",
      description:
        "Välj en unik månad som du vill se data om. Väljer du en månad så söker vi på den månaden under det aktiva året. Vill du göra en bredare sökning så välj avancerad sökning och tidsperioden du är intresserad över. ",
      icon: timePeriodIcon,
    },
  ];

  const apa = [
    {
      name: "Trender",
      description: "Se vilka trender som finns baserat på dina sökalternativ.",
      icon: trendsIcon,
    },
    {
      name: "Senaste",
      description:
        "Du får en lista på de 500 senaste händelserna som du kan skumma igenom",
      icon: realTimeIcon,
    },
    {
      name: "Vanligaste",
      description: "Se vilka områden där händelsen är vanligast förekommande",
      icon: commonIcon,
    },
    {
      name: "Kartan",
      description:
        "Få en interaktion med med kartan för att se vart händelserna förekom.",
      icon: mapIcon,
    },
  ];
  return (
    <>
      <section>
        <hr />
        <div className="mt-26">
          <div className="mx-auto max-w-7xl px-2">
            <div className="mx-auto elementLayout1 lg:text-center">
              <h2 className="highlight">Databasen för</h2>
              <p className="h2T mt-2 font-bold tracking-tight text-gray-900 sm:text-4xl">
                Polisens händelser
              </p>
              <p className="mt-6 text-gray-600">
                Vi övervakar Polisens data i realtid, och uppdaterar dig
                regelbundet med de senaste rapporterna om deras verksamhet. Vårt
                mål är att hålla dig alltid informerad och uppdaterad om vad som
                händer hos Polisen
              </p>
            </div>
            <div className="flex flex-wrap">
              <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-7xl">
                <dl className="grid xs:px-5 max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:gap-y-16">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-16">
                      <dt className="text-base font-semibold text-gray-900">
                        <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center">
                          <img src={feature.icon} alt="" />
                        </div>
                        {feature.name}
                      </dt>
                      <dd className="mt-2 text-base leading-7 text-gray-600">
                        {feature.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-7xl">
                <dl className="grid xs:px-5 max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:gap-y-16">
                  {apa.map((feature) => (
                    <div key={feature.name} className="relative pl-16">
                      <dt className="text-base font-semibold leading-7 text-gray-900">
                        <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center">
                          <img src={feature.icon} alt="" />
                        </div>
                        {feature.name}
                      </dt>
                      <dd className="mt-2 text-base leading-7 text-gray-600">
                        {feature.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
