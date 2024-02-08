import fetch from "node-fetch";
import { parseStringPromise } from "xml2js";

//TODO res är undefined fixa

async function rssPressArticles(_req, res) {
  console.log("rssDebateArticles was CALLED");

  const url =
    "http://polisen.se/aktuellt/rss/hela-landet/pressmeddelanden-hela-landet/";

  try {
    const response = await fetch(url);
    const data = await response.text();

    //tranform xml2js string to a clean array.
    let debateArticalsArray = await parseXml2jsFormatToNormalArray(data);

    res.send(debateArticalsArray);
  } catch (error) {
    console.log("Error in rssPressArticles | ", error);
  }
}
rssPressArticles();

async function parseXml2jsFormatToNormalArray(data) {
  let cleanArray = [];
  try {
    //parse the xml2j string
    const result = await parseStringPromise(data);

    //get relevant data out of the string
    const items = result.rss.channel[0].item;

    //sort an array with correct items for the client and returns it
    return (cleanArray = items.map((e) => {
      return {
        title: e.title[0],
        description: e.description[0],
        pubDate: e.pubDate[0],
        link: e.link[0],
      };
    }));
  } catch (err) {
    console.log(`Error while trying to sort the XML2j data, ${err}`);
  }
}

export default rssPressArticles;
