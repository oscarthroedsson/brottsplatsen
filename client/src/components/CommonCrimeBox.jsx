import { useEffect, useState } from "react";

export default function CommonCrime() {
  const [crimeThisMonth, setCrimePrevMonth] = useState([]);

  useEffect(() => {
    const crimes = async () => {
      const response = await fetch(
        "http://localhost:3000/api/common_This_Month"
      );

      if (response.ok) {
        const data = await response.json();

        setCrimePrevMonth(data[0]);
      } else {
        console.log("Server returned an error:", response.status);
      }
    };
    try {
      crimes();
    } catch (err) {
      console.log("Error in CommonCrime", err);
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="xs:w-64 infoContainer centerStart flex-col">
        <div className="mb-4">
          <p className="text-size0-p">Vanligaste brottet i</p>
          <p className="text-size1-p font-heavy-p text-main-color">JUNI</p>
        </div>
        <div>
          <p className="text-size4-p font-heavy-p">{crimeThisMonth._id}</p>
          <p className="largeP">{crimeThisMonth.count} st</p>
        </div>
      </div>
      <a href="#" className="text-size0-p text-end highlight px-2">
        Undersök de vanligaste brotten
      </a>
    </div>
  );
}
