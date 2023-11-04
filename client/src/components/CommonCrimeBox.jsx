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
    <div className="text-center">
      <div className="primBox w-80 text-left">
        <div className="mb-4">
          <p className="p2">Vanligaste brottet i</p>
          <p className="p1 highlight">JUNI</p>
        </div>
        <div>
          <p className="text-size4-p font-heavy-p">{crimeThisMonth._id}</p>
          <p className="largeP">{crimeThisMonth.count} st</p>
        </div>
      </div>
      <a href="#" className="listP highlight">
        Undersök de vanligaste brotten
      </a>
    </div>
  );
}
