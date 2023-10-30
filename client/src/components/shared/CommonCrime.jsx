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
    <>
      <div>
        <h3 className="mb-8">Områden där Misshandel är vanligast</h3>
        <div>
          <ul
            key={array.id}
            className="flex gap-2 text-size0-p border-b-2 border-normal-border pb-2 "
          >
            {array.map((e) => {
              return (
                <>
                  <li key={e.id}>{e._id}</li>
                  <p>{e.count} st</p>
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
