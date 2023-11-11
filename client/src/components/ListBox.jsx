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
      <div className="primBox w-80 h-[190px]">
        <table className="w-full flex-col text-left">
          <thead>
            <tr>
              <th className="p2 text-left">Senaste Rapporterna</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {latestCrimes.slice(0, 5).map((crime) => (
              <tr key={crime._id} className="listP">
                <td>{crime.type}</td>
                <td>{crime.location.name}</td>
                <td className="text-right">
                  <img src={arrow} alt="" className="w-3" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <a href="#" className="listP highlight">
        se de senaste 500 rapporterna
      </a> */}
    </div>
  );
}
