import { useEffect, useState } from "react";

export default function ListBox() {
  const [latestCrimes, setLatestCrimes] = useState([]);
  const authCode = import.meta.env.VITE_API_AUTH;
  useEffect(() => {
    const list = async () => {
      const response = await fetch("http://localhost:3000/api/whole_list", {
        headers: {
          "x-api-key": authCode,
        },
      });
      const data = await response.json();
      setLatestCrimes(data);
    };
    list();
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
