/*
Sums up the weekened:
From: fre 18:00 -> To: Sun 23:59
*/

/*
Sum up noon from 06:00 to 12:00
*/

import { useEffect, useState } from "react";

export default function SumWeekend() {
  const [docArray, setDocArray] = useState([]);

  useEffect(() => {
    const data = async () => {
      const res = await fetch("http://localhost:3000/sumUp/sumUp_Weekend");
      const data = await res.json();
      setDocArray(data);
    };
    data();
  }, []);

  return (
    <div className="secBox px-10 !pt-0 w-full max-h-96 overflow-scroll lg:max-w-xl">
      {docArray.length <= 0 ? (
        <>
          <div className="h-96 flex justify-center">
            <h1 className="text-[0.9rem] my-auto">
              Vi vet att du längar tills fredag, snart så
            </h1>
          </div>
        </>
      ) : (
        <table className="table-auto w-full ">
          <caption className="caption-top sticky top-0 mb-2 text-[0.7rem] text-main-color bg-white py-3 pb-5">
            Händelser Helgen Fre 18:00 - Sön 23:59
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
                <>
                  <tr className="text-[0.8rem]">
                    <td key={item._id} className="text-start">
                      {item.type}
                    </td>
                    <td className="text-center">{item.location}</td>
                    <td className="text-end">{item.time}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
