import { useEffect, useState } from "react";

export default function SumUpTable({ timeOfDay, apiCall }) {
  const [docArray, setDocArray] = useState([]);
  const authCode = import.meta.env.VITE_API_AUTH;

  useEffect(() => {
    let ignore = false;

    const data = async () => {
      const res = await fetch(
        `https://brottsplatsen-555fb93c7458.herokuapp.com/sumUp/${apiCall}`,
        {
          method: "GET",
          headers: {
            "x-api-key": authCode,
          },
        }
      );

      if (!ignore) {
        const data = await res.json();
        setDocArray(data);
      }
    };
    data();

    //clean up function
    return () => {
      ignore = true;
    };
  }, []);

  if (docArray.length < 1) {
    return null;
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
          {docArray.length > 0
            ? docArray.map((item) => {
                return (
                  <tr className="text-[0.8rem] mx-2" key={item._id}>
                    <td className="text-start">{item.type}</td>
                    <td className="text-center">{item.location}</td>
                    <td className="text-end">{item.time}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
}
