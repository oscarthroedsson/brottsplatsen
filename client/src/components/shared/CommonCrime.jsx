//Förse med ett listformat
import { useEffect, useState } from "react";

export default function CommonCrime({ searchData }) {
  const [array, setArray] = useState([]);

  useEffect(() => {
    const data = async () => {
      console.log("Sends: ", searchData);
      const response = await fetch("http://localhost:3000/api/common_crime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchData),
      });
      const result = await response.json();
      setArray(result);
    };
    data();
  }, []);

  return (
    <div className="">
      <div className="p-5 evenShadow rounded-xl">
        <h3 className="mb-8">Områden där Misshandel är vanligast</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left pl-1">Stad</th>
              <th>Antal(st)</th>
            </tr>
          </thead>
          <tbody>
            {array.map((e) => {
              return (
                <tr
                  key={e.id}
                  className="hover:bg-light-bg h-[35px] border-solid border-b-[1px] border-light-bg"
                >
                  <td className="pl-1">{e._id}</td>
                  <td className="text-center">{e.count} st</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
