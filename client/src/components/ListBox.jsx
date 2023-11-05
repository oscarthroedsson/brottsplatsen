import { useEffect, useState } from "react";
import arrow from "../icons/vArrow_Right.png";

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
    <div className="text-center ">
      <div className="primBox w-80 max-w-64 h-[190px]">
        <table className="table-auto max-w-64 flex flex-col text-left">
          <thead>
            <tr>
              <th className="p2 text-left">Senaste Rapporterna</th>
            </tr>
          </thead>
          <tbody>
            {latestCrimes.slice(0, 4).map((crime) => (
              <tr
                key={crime._id}
                className="listP text-left justify-between my-1 flex hover:bg-light-bg"
              >
                <td>{crime.type}</td>
                <td>{crime.location.name}</td>
                <button className=" w-5 flex items-center ">
                  <img src={arrow} alt="" />
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <a href="#" className="listP highlight">
        se de senaste 500 rapporterna
      </a>
    </div>
  );
}
