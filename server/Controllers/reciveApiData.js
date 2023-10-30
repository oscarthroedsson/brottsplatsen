import fetch from "node-fetch"; //importerar fetch för att kunna hämta data från api
import createNewDocument from "../models/newDocumentSchema.js"; //skapar ett nytt dok för mongoDB
import wholeColl from "../config/getDataBaseData.js"; //hämtar hela collectionen jag vill söka i från mongoDB

async function reciveApiData() {
  console.log("--------------------");
  console.log("Controllers | Getting data from the police");

  //try to fetch data from api
  try {
    const response = await fetch("https://polisen.se/api/events", {
      method: "GET",
      headers: {
        "User-Agent": "Oscar Throedsson", //tell the api who I am
      },
    });
    //transform data from API to JSON
    const data = await response.json();

    //Go threw every object in the array
    for (const element of data) {
      //create a new document for mongoDB and run threw a schema
      const event = createNewDocument(element);

      //check if the document already exists in the database
      await wholeColl.findOne({ _id: element.id }).then((res) => {
        if (!res) {
          //add object to database
          wholeColl.insertOne(event);
        }
      });
    }
  } catch (e) {
    //? | Skicka mail om att det inte fungerar?
    console.log("ERROR API: ", e);
  }
  //set 30min timer after the code has run- the code is re-run after 30min
  setTimeout(reciveApiData, 20000);
}

reciveApiData();
