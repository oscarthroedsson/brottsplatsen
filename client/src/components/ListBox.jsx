import { useEffect, useState } from "react";
import arrow from "../icons/arrow.png";

export default function ListBox() {
  const [latestCrimes, setLatestCrimes] = useState([]);

  useEffect(() => {
    const list = async () => {
      const response = await fetch("http://localhost:3000/api/whole_list");
      const data = await response.json();
      setLatestCrimes(data);
    };

    try {
      list();
    } catch (err) {
      console.log("ListBox error: ", err);
    }
  }, []);

  return (
    <div className="centerElements flex-col ">
      <div className=" p-3 infoContainer ">
        <p className="text-size0-p m-1">Senaste Rapporterna</p>
        <ul>
          {latestCrimes.slice(0, 3).map((crime) => (
            <li
              key={crime._id}
              className="text-black m-1.5 p-1 px-2 width text-size0-p bg-white flex justify-between hover:bg-light-bg"
            >
              <p>{crime.type}</p>
              <p>{crime.location.name}</p>
              <button className="bg-dark-bg rounded-sm w-5 flex items-center -rotate-90">
                <img src={arrow} alt="" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <a href="#" className="text-size0-p text-end highlight px-2">
        se de senaste 500 rapporterna
      </a>
    </div>
  );
}
