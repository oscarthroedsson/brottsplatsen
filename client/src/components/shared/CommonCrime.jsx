//Förse med ett listformat

import { useEffect, useState } from "react";

export default function CommonCrime({ searchData }) {
  const [array, setArray] = useState([]);

  useEffect(() => {
    const data = async () => {
      // console.log("Sends: ", searchData);
      /*det vore nice att wrappa all api logik i en gemensam metod så du slipper sätta headers och method varje gång. 
      Den kan ansvara för felhantering och sen reeturnera det färdiga json objektet*/
      //? Gå igenom detta med Madde mer noggrant
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
    <div className="max-h-96 lg:max-h-52">
      <div className="overflow-auto p-5 evenShadow rounded-xl secBox max-h-96 lg:max-h-52">
        <h3 className="">Områden där {searchData.category} är vanligast</h3>

        <table className="w-full overflow-scroll max-h-96 lg:max-h-52">
          <thead className="">
            <tr className="">
              <th className="text-left pl-1">Stad</th>
              <th>Antal (st)</th>
            </tr>
          </thead>

          <tbody>
            {array.map((e) => {
              const trClass =
                e.type === searchData.category ? "bg-[#eef4ff]" : "";
              return (
                <>
                  <tr
                    key={e.id}
                    className={`hover:bg-light-bg h-[35px] border-solid border-b-[1px] border-light-bg text-[0.75rem] ${trClass}`}
                  >
                    <td className="pl-1">{e._id}</td>
                    <td className="text-center">{e.count} st</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
