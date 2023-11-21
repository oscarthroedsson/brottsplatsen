import { useEffect, useState } from "react";

import StackedBarChart from "./StackedBarChart";

export default function Trends({ searchData }) {
  const [trendsArray, setTrendsArray] = useState();
  // console.log(searchData);

  useEffect(() => {
    const data = async () => {
      const response = await fetch("http://localhost:3000/api/get_trends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchData),
      });

      const result = await response.json();
      setTrendsArray(result);
    };
    data();
  }, []);

  function dateToString() {
    const fromDate = new Date(searchData.timeSpan.fromDate);
    let toDate = new Date(searchData.timeSpan.toDate);

    // Kontrollera om toDate är den första dagen i nästa månad
    if (toDate.getDate() === 1) {
      toDate = new Date(toDate.getFullYear(), toDate.getMonth(), 0); // Sätt toDate till den sista dagen i föregående månad
    }

    const formatNumber = (num) => (num < 10 ? `0${num}` : num); // Lägger till en nolla framför enkelsiffriga nummer

    const fromDateString = `${fromDate.getFullYear()}-${formatNumber(
      fromDate.getMonth() + 1
    )}-${formatNumber(fromDate.getDate())}`;
    const toDateString = `${toDate.getFullYear()}-${formatNumber(
      toDate.getMonth() + 1
    )}-${formatNumber(toDate.getDate())}`;

    return `${fromDateString} - ${toDateString}`;
  }
  dateToString(searchData);

  return (
    <>
      <div className="evenShadow p-5 rounded-xl secBox h-fit">
        <div>
          <p className="font-semibold text-[black]">Trender mellan:</p>
          <div className="p2 text-main-color">{dateToString()}</div>
        </div>
        {trendsArray && <StackedBarChart trendsArray={trendsArray} />}
      </div>
    </>
  );
}
