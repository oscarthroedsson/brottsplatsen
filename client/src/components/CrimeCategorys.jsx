/*Visar en lista av alla händelser och låter besökaren se alla brott korrelerade till händelsen*/
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import clock from "../icons/fillTimeMain.png";
import calander from "../icons/fillDateDark.png";
import destination from "../icons/location2.svg";
import SelectElement from "./shared/SelectElement";
import arrowLeft from "../icons/fillArrowLeftMain.png";
import arrowRight from "../icons/fillArrowRightMain.png";
import police from "../images/police.png";

export default function ListCategorys() {
  //Nya state för pagination
  const [choosedCategory, setCategory] = useState("");
  const [sortedCrimes, setSortedCrimes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [minListItem, setMinListItem] = useState(0);
  const [maxListItem, setMaxListItem] = useState(3);
  const [numOfPages, setNumOfPages] = useState(0);
  let maxPages = 3;
  let numOfBoxes = 3;

  //Det fungerar med följande state

  //* Sort and updates everytime a category is choosed
  useEffect(() => {
    const sorted = crimes.filter((c) => c.type === choosedCategory);
    setSortedCrimes(sorted);
    setNumOfPages(sorted.length / maxPages);
  }, [setCategory, choosedCategory]);

  if (numOfPages < 1) {
    setNumOfPages(1);
  }

  function goForward() {
    console.log("+", currentPage);
    if (maxListItem + numOfBoxes <= sortedCrimes.length) {
      setCurrentPage(currentPage + 1);
      setMinListItem(minListItem + numOfBoxes);
      setMaxListItem(maxListItem + numOfBoxes);
    }
  }

  function goBackward() {
    console.log("-", currentPage);
    if (minListItem - numOfBoxes >= 0) {
      setCurrentPage(currentPage - 1);
      setMinListItem(minListItem - numOfBoxes);
      setMaxListItem(maxListItem - numOfBoxes);
    }
  }

  return (
    <>
      <section className="py-24 xs:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative lg:twoColumn mb-16">
            <div className="w-full lg:w-1/2">
              <hgroup className="pt-10  lg:max-w-sm">
                <h2 className="text-base font-semibold leading-7 text-main-color">
                  Statistik och Information
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Polisens brottskategorier
                </p>
              </hgroup>
              <p className="mt-3 text-lg">
                Undersök alla inrapporterade händelser via kategorilistan. Via
                listan kan du se alla brottskategorier som polisen använder.
              </p>
            </div>
            <div className="xs:hidden xl:flex items-center justify-center absolute left-[55rem] top-20 h-40 w-96">
              <img src={police} alt="" />
            </div>
          </div>
          <SelectElement
            options={categoryList}
            onChange={setCategory}
            defaultValue="Välj kategori"
          />
          <div className="centerElements flex-wrap mt-16">
            <ul className="flex flex-wrap spreadCenter lg:gap-3 w-full">
              {sortedCrimes ? (
                sortedCrimes
                  .filter((c) => c.type === choosedCategory)
                  .slice(minListItem, maxListItem)
                  .map((crime) => {
                    return (
                      <>
                        <li
                          className="w-full lg:w-[400px] xl:w-[350px]"
                          key={crime.id}
                        >
                          <CrimeBox crime={crime} />
                        </li>
                      </>
                    );
                  })
              ) : (
                <p>Loading</p>
              )}
            </ul>
            <div
              className={`flex mt-10 align-center p-2 ${
                choosedCategory === "" ? "hidden" : ""
              }`}
            >
              <button
                onClick={goBackward}
                className={`${currentPage - 1 === numOfPages ? "hidden" : ""}`}
              >
                <img src={arrowLeft} alt="" className={`w-5 hover:w-6`} />
              </button>
              <p className="mx-5">
                {currentPage}/{numOfPages}
              </p>
              <button
                onClick={goForward}
                className={`${currentPage - 1 === numOfPages ? "hidden" : ""}`}
              >
                <img src={arrowRight} alt="" className={`w-5 hover:w-6`} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function CrimeBox({ crime }) {
  const date = new Date(crime.datetime);
  const hour = date.getHours() + 1;
  const min = date.getMinutes() + 1;
  const month = date.getMonth() + 1;
  const day = date.getDay() + 1;

  return (
    <Link to={`/brott/${crime.type}/${crime.location.name}/${crime.id}`}>
      <div className="infoboxes spreadStart flex-col mb-3 p-5 h-[150px]">
        <header className="mb-5">
          <img src="" alt="" />
          <hgroup className=" flex-col mb-3">
            <h2 className="text-size1-p font-semi-p">{crime.type}</h2>
            <p className="text-size0-p">{crime.summary}</p>
          </hgroup>
        </header>
        <footer className="overflow-auto justify-between w-full">
          <ul className="spreadStart text-sm">
            <li className="centerElements gap-2">
              <img src={clock} alt="" className="w-4" /> {hour}:{min}
            </li>
            <li className="centerElements gap-2">
              <img src={calander} alt="" className="w-4" /> {day}/{month}
            </li>
            <li className="centerElements gap-2 w-fit">
              <img src={destination} alt="" className="w-4" />
              {crime.location.name}
            </li>
          </ul>
        </footer>
      </div>
    </Link>
  );
}
