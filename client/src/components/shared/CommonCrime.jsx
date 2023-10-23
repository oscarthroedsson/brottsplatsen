//Förse med ett listformat

import { useEffect, useState } from "react";

export default function CommonCrime(prop) {
  const [array, setArray] = useState([]);

  useEffect(() => {
    const data = async () => {
      const response = fetch("http://localhost:3000/api/common_crime", {});
      const result = await response.json();
      setArray(result);
    };
  }, []);

  return (
    <>
      {/* <div>
        <h3 className="mb-8">Områden där Misshandel är vanligast</h3>
        <ul className="flex gap-2 text-size0-p border-b-2 border-normal-border pb-2 ">
          {filteredData.map((e) => {
            return (
              <>
                <li key={e.id}>{e.location.name}</li>
                <p>Snittet är {e.length} i månaden</p>
              </>
            );
          })}
          ;<li>Stockholm</li>
          <li>Göteborg</li>
          <li>Malmö</li>
        </ul>
        <ul className="flex gap-2 text-size0-p border-b-2 border-normal-border pb-2 mt-5">
          <li>Stockholm</li>
          <li>Göteborg</li>
          <li>Malmö</li>
        </ul>
      </div> */}
    </>
  );
}
