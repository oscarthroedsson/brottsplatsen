import { useEffect, useState } from "react";
import dates from "../data/dates.js";

export default function CommonCrime() {
  //state handle the crime that is most common this month
  const [commonCrimeThisMonth, setCommonCrimeThisMonth] = useState([]);

  const authCode = import.meta.env.VITE_API_AUTH;

  useEffect(() => {
    const crimes = async () => {
      const response = await fetch(
        "https://brottsplatsen-555fb93c7458.herokuapp.com/api/common_This_Month",
        {
          headers: {
            "x-api-key": authCode,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCommonCrimeThisMonth(data[0]);
      }
    };

    try {
      crimes();
    } catch (err) {
      console.log("Error in CommonCrime", err);
    }
  }, []);

  //Getting the current month in text-format from dates.js
  const month = dates[new Date().getMonth()];

  return (
    <div className="text-center w-80 ">
      <div className="primBox max-w-64 h-[190px] text-left ">
        <div className="mb-4">
          <p className="p2">Vanligaste brottet i</p>
          <p className="p1 highlight">{month}</p>
        </div>
        <div>
          <p className="text-size4-p font-heavy-p">
            {commonCrimeThisMonth._id}
          </p>
          <p className="largeP">{commonCrimeThisMonth.count} st</p>
        </div>
      </div>
      {/* <a href="#" className="listP highlight">
        Undersök de vanligaste brotten
      </a> */}
    </div>
  );
}
