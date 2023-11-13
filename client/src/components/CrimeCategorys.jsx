/*Visar en lista av alla händelser och låter besökaren se alla brott korrelerade till händelsen*/
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import crimeIcon from "../icons/vCrime.png";
import clock from "../icons/vTime.png";
import calander from "../icons/vDate.png";
import destination from "../icons/vPlace_ping.png";
import backwardIcon from "../icons/vBackwardArrow.svg";
import forwardIcon from "../icons/vForwardArrow.svg";
import SelectElement from "./shared/SelectElement";
import police from "../images/police.png";

export default function ListCategorys() {
  //Nya state för pagination
  const [choosedCategory, setCategory] = useState("");
  const [sortedCrimes, setSortedCrimes] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [minListItem, setMinListItem] = useState(0);
  const [maxListItem, setMaxListItem] = useState(3);
  const [numOfPages, setNumOfPages] = useState(0);
  let maxPages = 3;
  let numOfBoxes = 3;

  //Det fungerar med följande state

  //* Sort and updates everytime a category is choosed
  useEffect(() => {
    const categorys = async () => {
      const result = await fetch("http://localhost:3000/api/categorys");

      const data = await result.json();

      //gör om en array med objekt till array med strängar
      const arraySorted = data.map((crime) => {
        return crime._id;
      });

      setCategoryList(arraySorted);
    };

    categorys();
  }, []);

  useEffect(() => {
    const crimes = async () => {
      const result = await fetch(
        `http://localhost:3000/api/crime_by_category?category=${choosedCategory}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await result.json();

      setSortedCrimes(data);
    };

    crimes();
  }, [choosedCategory]);

  //Runs when sortedCrimes is updated and sets the number of pages for pagination
  useEffect(() => {
    setNumOfPages(sortedCrimes.length / maxPages);
  }, [sortedCrimes]);

  if (numOfPages < 1) {
    setNumOfPages(1);
  }

  function goForward() {
    if (maxListItem + numOfBoxes <= sortedCrimes.length) {
      setCurrentPage(currentPage + 1);
      setMinListItem(minListItem + numOfBoxes);
      setMaxListItem(maxListItem + numOfBoxes);
    }
  }

  function goBackward() {
    if (minListItem - numOfBoxes >= 0) {
      setCurrentPage(currentPage - 1);
      setMinListItem(minListItem - numOfBoxes);
      setMaxListItem(maxListItem - numOfBoxes);
    }
  }

  return (
    <>
      <section className="sectionLayout">
        <div className="elementLayout1">
          <div className="relative lg:twoColumn mb-16">
            <div className="w-full lg:w-1/2">
              <hgroup className="pt-10 lg:max-w-sm">
                <h2 className="">Statistik och Information</h2>
                <p className="h2T mt-2 font-bold text-gray-90">
                  Polisens händelser
                </p>
              </hgroup>
              <p className="mt-3">
                Undersök alla inrapporterade händelser via kategorilistan. Via
                listan kan du se alla brottskategorier som polisen använder.
              </p>
            </div>
            <div className="xs:hidden xl:flex items-center justify-center absolute left-[55rem] top-20 h-40 w-96">
              <img src={police} alt="" />
            </div>
          </div>
          {categoryList.length > 1 ? (
            <SelectElement
              options={categoryList}
              onChange={setCategory}
              defaultValue="Välj kategori"
            />
          ) : (
            <p>Loading...</p>
          )}

          <div className="centerElements flex-wrap mt-16">
            <ul className="flex flex-wrap spreadCenter lg:gap-3 w-full">
              {sortedCrimes.length >= 1
                ? sortedCrimes.slice(minListItem, maxListItem).map((crime) => {
                    return (
                      <>
                        <li
                          className="w-full lg:w-[400px] xl:w-[350px]"
                          key={crime._id}
                        >
                          <CrimeBox crime={crime} />
                        </li>
                      </>
                    );
                  })
                : null}
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
                <img src={backwardIcon} alt="" className={`w-5 hover:w-6`} />
              </button>
              <p className="mx-5">
                {currentPage}/{Math.floor(numOfPages)}
              </p>
              <button
                onClick={goForward}
                className={`${currentPage - 1 === numOfPages ? "hidden" : ""}`}
              >
                <img src={forwardIcon} alt="" className={`w-5 hover:w-6`} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function CrimeBox({ crime }) {
  return (
    <Link to={`/brott/${crime.type}/${crime.location.name}/${crime._id}`}>
      <div className="primBox spreadStart flex-col mb-3 p-5 h-[160px]">
        <header className="mb-5 px-5 flex align-center justify-center relative">
          <img
            src={crimeIcon}
            alt="icon of handcuffs"
            className="w-5 absolute left-[-0.3rem] top-[0.1rem]"
          />
          <hgroup className="overflow-scroll">
            <h2 className="text-size1-p font-semi-p">{crime.type}</h2>
            <p className="text-size0-p">{crime.summary}</p>
          </hgroup>
        </header>
        <footer className="overflow-auto justify-between w-full">
          <ul className="spreadStart text-sm">
            <li className="centerElements gap-2">
              <img src={clock} alt="" className="w-4" />
              {new Date(crime.datetime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </li>
            <li className="centerElements gap-2">
              <img src={calander} alt="" className="w-4" />{" "}
              {new Date(crime.datetime).toLocaleDateString("sv-SE", {
                year: "2-digit",
                month: "2-digit",
              })}
            </li>
            <li className="centerElements gap-2 w-fit">
              <img src={destination} alt="" className="w-3" />
              {crime.location.name}
            </li>
          </ul>
        </footer>
      </div>
    </Link>
  );
}
