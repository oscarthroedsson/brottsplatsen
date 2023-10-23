import { useEffect, useState } from "react";

export default function LatestCrime() {
  const [latestCrimes, setLatestCrime] = useState([]);

  useEffect(() => {
    const data = async () => {
      const response = await fetch("http://localhost:3000/api/get_trends", {});
      const result = await response.json();
      setLatestCrime(result);
    };
  }, []);

  return <></>;
}
