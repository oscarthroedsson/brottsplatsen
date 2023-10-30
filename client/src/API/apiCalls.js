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

export const getDashboard = async (infoObj) => {
  try {
    const res = await fetch("http://localhost:3000/api/dashboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(infoObj),
    });

    //# | will hold the big objekt  with all data;
    const data = await res.json();
  } catch (err) {
    console.error("apiCalls | THERE WAS AN ERROR: ", err);
  }
};

// const getOneEvent = () => {
//   console.log("APICALLS | getOneEvent was initiated");

//   fetch("http://localhost:3000/api/data")
//     .then((respond) => {
//       console.log("apiCalls | then1");
//       console.log("RESPOND: ", respond);
//       return respond;
//     })
//     .catch((err) => {
//       console.log("apiCalls | error after then2");
//       console.log(err);
//     });
// };
export default countCrimes;
