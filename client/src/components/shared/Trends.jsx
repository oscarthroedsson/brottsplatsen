import { useEffect, useState } from "react";

import StackedBarChart from "./StackedBarChart";

export default function Trends({ searchData }) {
  const [trendsArray, setTrendsArray] = useState();

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

  return (
    <>
      <div className="max-w-min py-12">
        <div className="p-5 evenShadow rounded-xl ">
          <p className="text-size1-p">
            <b>Trend:</b>
            {/* {advSearch
              ? `${timePeriod.fromDate} - ${timePeriod.toDate} `
            : month}*/}
          </p>
          <p className="text-size0-p">
            {/* i <span className="text-main-color font-heavy-p">{place}</span> */}
          </p>
          {trendsArray && <StackedBarChart trendsArray={trendsArray} />}
        </div>
      </div>
    </>
  );
}
