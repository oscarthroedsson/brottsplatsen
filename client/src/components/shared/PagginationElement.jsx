import { useEffect, useState } from "react";

import clock from "../icons/fillTimeMain.png";
import calander from "../icons/fillDateDark.png";
import destination from "../icons/location2.svg";
import arrowLeft from "../icons/fillArrowLeftMain.png";
import arrowRight from "../icons/fillArrowRightMain.png";

export default function PagginationElement() {
  const [choosedCategory, setCategory] = useState("");
  const [sortedCrimes, setSortedCrimes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [minListItem, setMinListItem] = useState(0);
  const [maxListItem, setMaxListItem] = useState(3);
  const [numOfPages, setNumOfPages] = useState(0);
  let maxPages = 3;
  let numOfBoxes = 3;

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
  );
}
