import { useEffect, useState } from "react";
const apikey = import.meta.env.VITE_API_AUTH;

export default function SumUpTable({ timeOfDay, apiCall, noDataMsg }) {
  const [docArray, setDocArray] = useState([]);

  useEffect(() => {
    let ignore = false;
    const data = async () => {
      const res = await fetch(
        `http://localhost:3000/sumUp/${apiCall}?auth=${apikey}`
      );
      const data = await res.json();
      setDocArray(data);
    };
    data();

    //clean up function
    return () => {
      ignore = true;
    };
  }, []);

  if (docArray.length < 1) {
    return;
  }

  return (
    <div className=" bg-light-bg px-5 w-full max-h-96 overflow-scroll lg:max-w-xl rounded-md">
      <table className="table-auto border-separate border-spacing-2 w-full pb-5">
        <caption className="caption-top py-3 scroll-py-3 text-[0.7rem] text-main-color bg-light-bg">
          Händelser {timeOfDay}
        </caption>

        <thead className="sticky top-0 bg-light-bg">
          <tr className="">
            <th className="py-3 text-start">Händelse</th>
            <th className="py-3 text-center">Plats</th>
            <th className="py-3 text-end">Tid</th>
          </tr>
        </thead>

        <tbody className="pb-2">
          {docArray.map((item) => {
            return (
              <tr className="text-[0.8rem] mx-2" key={item._id}>
                <td className="text-start">{item.type}</td>
                <td className="text-center">{item.location}</td>
                <td className="text-end">{item.time}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
