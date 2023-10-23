import { useState } from "react";
import Nav from "../components/Nav";

import menuArrow from "../icons/arrow.png";
import SelectElement from "../components/shared/SelectElement.jsx";
import data from "../data/jsonAPI"; //Byt ut mot API/back-end
import categorys from "../data/categorys";
import months from "../data/dates";
import ReactDatePicker from "../components/shared/ReactDatePicker";
import StackedBarChart from "../components/shared/StackedBarChart";
import List from "../components/shared/List";

import apiCalls from "../API/apiCalls";
import { getDashboard } from "../API/apiCalls";
import parseIsoDate from "../functions/parseIsoDate.js";

export default function Databas() {
  //* Handles menus
  const [showMenu, setShowMenu] = useState(true);
  const [advSearch, setAdvSearch] = useState(false);

  //* Saves input from user
  const [category, setCategory] = useState(null);
  const [place, setPlace] = useState(null);
  const [month, setMonth] = useState(null);
  const [timePeriod, setTimePeriod] = useState({});

  const [run, setRun] = useState(false);

  //* Example data for stacked Bar Chart
  let valueOne = 242;
  let valueTwo = 256;
  let valueThree = 321;

  //* parse Dates

  //* Tries the API
  async function tryAPI() {
    let inputObject = {
      category: category,
      place: place,
      timeSpan: month ? parseIsoDate(month) : timePeriod,
    };

    const data = await getDashboard(inputObject);
    const result = JSON.stringify(data);
  }

  //* Controll search menu
  function searchFilter() {
    if (showMenu) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  }

  //* Controll advanced search
  function advancedSearch() {
    if (advSearch) {
      setAdvSearch(false);
    } else {
      setAdvSearch(true);
    }
  }

  const dataCitites = new Set();
  data.forEach((e) => dataCitites.add(e.location.name));
  let cities = Array.from(dataCitites);

  return (
    <>
      <Nav></Nav>
      {/* ADDERA EV MAX-W EFTER MX-AUTO */}
      <section className="py-20 xs:py-32">
        <div className="mx-auto  min-w-full px-6 lg:px-8 flex flex-wrap">
          <aside className="max-w-sm">
            <div>
              <h1 className="text-base font-semibold leading-7 text-indigo-600">
                Databas för brottsrapporter
              </h1>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Sök med dina kriterier
              </p>
              <p>Info text här</p>
            </div>
            <div className="flex flex-col justify-center align-center py-12">
              <button
                onClick={searchFilter}
                className="flex align-center justify-center gap-3 font-medium-p mb-2"
              >
                Sökfilter <img src={menuArrow} alt="" className="w-4 h-4" />
              </button>
              {showMenu && (
                <div className="centerElements flex-col p-5 bg-light-bg border-[1px] border-t-2 border-t-main-color border-x-normal-border rounded-b-lg">
                  <div className="w-full">
                    <div className="mb-5 text-size1-p">
                      <SelectElement
                        options={categorys}
                        defaultValue={"Välj kategori"}
                        onChange={setCategory}
                      />
                    </div>
                    <div className="mb-5 text-size1-p">
                      <SelectElement
                        options={cities}
                        onChange={setPlace}
                        defaultValue={"Sverige"}
                      />
                    </div>

                    {!advSearch && (
                      <div className="mb-5 text-size1-p">
                        <SelectElement
                          options={months}
                          onChange={setMonth}
                          defaultValue={"Välj månad"}
                        />
                      </div>
                    )}

                    {advSearch && (
                      <div className="mt-5">
                        <div className="text-size1-p w-full">
                          <p className="pl-1 mb-1">Från:</p>
                          <ReactDatePicker
                            onChange={(date) =>
                              setTimePeriod((prevTimePeriod) => ({
                                ...prevTimePeriod,
                                fromDate: date,
                              }))
                            }
                          />
                        </div>
                        <div className="text-size1-p mt-5 w-full">
                          <p className="pl-1 mb-1">Till:</p>
                          <ReactDatePicker
                            onChange={(date) =>
                              setTimePeriod((prevTimePeriod) => ({
                                ...prevTimePeriod,
                                toDate: date,
                              }))
                            }
                          />
                        </div>
                      </div>
                    )}

                    {/* VALIDERINGSCOMPONENT */}
                    <button
                      onClick={advancedSearch}
                      className="block mt-4 text-size0-p text-main-color"
                    >
                      {" "}
                      {advSearch ? "Sök mindre" : "Avancerad sökning"}
                    </button>
                    <button
                      onClick={() => {
                        setRun(true);
                        tryAPI();
                      }}
                      className="mt-8 w-full text-white bg-main-color py-2 rounded-md sm:max-w-xs"
                    >
                      Sök <img src="" alt="" />
                    </button>
                  </div>
                </div>
              )}
              <div className="text-center mx-auto py-32 xs:py-32">
                <p>
                  <b>{category}</b> har rapporterats 231 gånger mellan
                  tidsintervallet: 1 Januari 2023 tills idag i <b>{place}</b>.
                  <b>{category}</b> står för 23% av alla rapporter som har
                  kommit in via polisen.
                </p>
                <p>
                  Det gör att <b>{category}</b> hamnar på en 3e plats bland de
                  vanligaste händelserna som rapporteras in av polisen i{" "}
                  <b>{place}</b>.
                </p>
                <p>
                  Sen förra månaden har det skett en negativ utveckling i{" "}
                  <b>{place}</b> och denna trenden har vi sett sen datum
                  intervallet.
                </p>
                <p>
                  Det är vanligast att misshandel rapporteras i <b>{place}</b>.{" "}
                </p>
              </div>
            </div>
          </aside>
          <main className="max-w-full">
            <div className="max-w-min">
              <div className="p-5 evenShadow rounded-xl ">
                <p className="text-size1-p">
                  <b>Trend:</b>{" "}
                  {advSearch
                    ? `${timePeriod.fromDate} - ${timePeriod.toDate} `
                    : month}
                </p>
                <p className="text-size0-p">
                  i{" "}
                  <span className="text-main-color font-heavy-p">{place}</span>
                </p>
                <StackedBarChart
                  valueOne={valueOne}
                  valueTwo={valueTwo}
                  valueThree={valueThree}
                />
              </div>
              <div className="">
                {run && (
                  <List
                    place={place}
                    category={category}
                    fromDate={timePeriod.fromDate}
                    toDate={timePeriod.toDate}
                  />
                )}
              </div>
            </div>
            <div>{/* google maps */}</div>
            <div>{/* common list */}</div>
          </main>
        </div>
      </section>
    </>
  );
}
