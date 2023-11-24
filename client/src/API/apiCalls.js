const countCrimes = async () => {
  console.log("APICALLS | countCrimes was initiated");
  try {
    const res = await fetch("http://localhost:3000/api/TotalNumOfCrimes");
    const data = await res.json();
    return data.numOfCrimes;
  } catch (err) {
    console.error("APICALLS | THERE WAS AN ERROR: ", err);
    return null;
  }
};

export default countCrimes;
