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

  const [categoryList, setCategoryList] = useState([]);

  const [crimeArray, setCrimeArray] = useState([]);
  const [numOfPages, setNumOfPages] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [minListItem, setMinListItem] = useState(0);
  const [maxListItem, setMaxListItem] = useState(3);

  const maxPages = 3; //Controlls the visuall for the user to see how many pages there is to see of the crimes
  const numOfBoxes = 3; // Controlls how many crime boxes is shown on every pagination page.

  //Get every type of crime that is in the DB

  useEffect(() => {
    const categorys = async () => {
      const result = await fetch("http://localhost:3000/api/categorys");
      const data = await result.json();
      const categorys = data.map((category) => {
        return category._id;
      });
      setCategoryList(categorys);
    };
    categorys();
  }, []); // Getting the categorys i have in the DB so user can choose

  // When cateogory is choosen, we run this and fetch all relevant crimes.
  const crimes = async (categoryChoice) => {
    const result = await fetch(
      // Get every crime that has the same type as the category choosen
      `http://localhost:3000/api/crime_by_category?category=${categoryChoice}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await result.json();
    console.log("data: ", data.length);
    console.log("maxPages: ", maxPages);
    await setNumOfPages(data.length / maxPages); // We find out how many  pages we  are going to have in our pagination.
    await setCrimeArray(data);
    console.log("numOfPages: ", numOfPages); //
  };

  // Logic so the user can go forward in the pagination
  function goForward() {
    //If-statement let user go forward if they are not on the last page
    if (maxListItem + numOfBoxes <= crimeArray.length) {
      setCurrentPage(currentPage + 1);
      setMinListItem(minListItem + numOfBoxes);
      setMaxListItem(maxListItem + numOfBoxes);
    }
  }
  // Logic so the user can go backward in the pagination
  function goBackward() {
    //If-statement let user go back if they are not on the first page
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
              onChange={crimes}
              defaultValue="Välj kategori"
            />
          ) : (
            <p>Loading...</p>
          )}

          <div className="centerElements flex-wrap mt-16">
            <ul className="flex flex-wrap spreadCenter lg:gap-3 w-full">
              {/* If crime array has items it going to show pagination of the crimes */}
              {crimeArray
                ? crimeArray.slice(minListItem, maxListItem).map((crime) => {
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
                : ""}
            </ul>
            {/* Arrows that controll the pagination */}
            {crimeArray.length > 0 ? (
              <div className={`flex mt-10 align-center p-2`}>
                <button
                  onClick={goBackward}
                  className={`${currentPage === 1 ? "hidden" : ""}`}
                >
                  <img src={backwardIcon} alt="" className={`w-5 hover:w-6`} />
                </button>

                <p className="mx-5">
                  {currentPage}/{Math.floor(crimeArray.length / maxPages)}
                </p>

                <button
                  onClick={goForward}
                  className={`${
                    currentPage === Math.floor(numOfPages) ? "hidden" : ""
                  }`}
                >
                  <img src={forwardIcon} alt="" className={`w-5 hover:w-6`} />
                </button>
              </div>
            ) : null}
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
