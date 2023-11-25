/*
Sum up noon from 06:00 to 12:00
*/

import React, { useEffect, useState } from "react";

export default function SumMorning() {
  const [docArray, setDocArray] = useState([]);

  useEffect(() => {
    const data = async () => {
      const res = await fetch("http://localhost:3000/sumUp/sumUp_Morning");
      const data = await res.json();
      setDocArray(data);
    };
    data();
  }, []);

  return (
    <div className="secBox px-10 !pt-0 w-full max-h-96 overflow-scroll lg:max-w-xl">
      <table className="table-auto w-full">
        {/* //# SECTION 1 | ---------------------------------------- */}

        <caption className="caption-top sticky top-0 mb-2 text-[0.7rem] text-main-color bg-white py-3">
          Händelser förmiddag 06:00 - 12:00
        </caption>
        <thead className="sticky top-10 bg-white pb-3">
          <tr className="text-[0.9rem]">
            <th className="pb-3 text-start">Händelse</th>
            <th className="pb-3 text-center">Plats</th>
            <th className="pb-3 text-end">Tid</th>
          </tr>
        </thead>

        <tbody>
          {docArray.map((item) => {
            return (
              <React.Fragment key={item._id}>
                <tr className="text-[0.8rem]">
                  <td className="text-start">{item.type}</td>
                  <td className="text-center">{item.location}</td>
                  <td className="text-end">{item.time}</td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
