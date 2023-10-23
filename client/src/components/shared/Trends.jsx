import { useEffect, useState } from "react";

export default function Trends() {
  const [trendsArray, setTrendsArray] = useState([]);

  useEffect(() => {
    const data = async () => {
      const response = await fetch("http://localhost:3000/api/get_trends", {});
      const result = await response.json();
      setTrendsArray(result);
    };
  }, []);
  return <></>;
}
