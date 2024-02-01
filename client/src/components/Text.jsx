/*
1. Kollar om jag har place om inte, tilldelar jag "Sverige"
2. Initierar get() och retunerar hela listan
3. Skapar en funktion som räknar ut alla parametrar för att kunna skriva texten
och använder dekonstruktion för att retunera relevanta variabler för texten

-> Läs vad varje funktion gör i kommentarerna i calculateText()
*/

function Text({ searchData }) {
  const authCode = import.meta.env.VITE_API_AUTH;
  if (searchData.place == null) {
    searchData.place = "Sverige";
  }

  //--------------------------------------------------------------------------------

  //gets the whole list
  async function get() {
    const res = await fetch(
      "https://brottsplatsen-555fb93c7458.herokuapp.com/api/whole_list",
      {
        headers: {
          "x-api-key": authCode,
        },
      }
    );
    const data = await res.json();
    return data;
  }
  //initiate the fetch funciton/arrow function

  //--------------------------------------------------------------------------------

  //calculate every parameter for the text
  const { percentage, catIndex } = function calculateText() {
    //sorterar hur många gånger ett brott finns i listan
    const commonList = function summaryEveryCategory(data) {
      console.log(data);
      let result = data.reduce((acc, curr) => {
        if (curr.type) {
          const index = acc.findIndex((item) => item.type === curr.type);
          if (index !== -1) {
            acc[index].count++; // increment count
          } else {
            acc.push({ type: curr.type, count: 1 }); // new item
          }
        }

        return acc;
      }, []);
      return result;
    };

    //sorterar listan i fallande ordning
    const sortedList = commonList.sort((a, b) => b.count - a.count);
    let percentage = null;
    for (let i = 0 < sortedList.length; i++; ) {
      if (sortedList[i].type === searchData.category) {
        percentage = parseFloat(
          (sortedList[i].count / data.length) * 100
        ).toFixed(2);
      }
    }

    //kollar vilket index kategorin har i listan som användaren har valt
    let catIndex =
      commonList.findIndex((category) => category.type === "Brand") + 1;

    return percentage, catIndex;
  };

  return (
    <div>
      <p>
        {searchData.category} har rapporterats 231 gånger mellan
        tidsintervallet: 1 Januari 2023 tills idag i {searchData.place}.{" "}
        {searchData.category} står för {percentage}% av alla rapporter som har
        kommit in via polisen.
      </p>
      <p>
        Det gör att {searchData.category} hamnar på en plats {catIndex}e plats
        bland de vanligaste händelserna som rapporteras in av polisen i
        {searchData.place}.
      </p>
      {/* //# Har inte tillräckligt med data att använda bortkommenterad fras */}
      {/* <p>
        Sen förra månaden har det skett en negativ utveckling i
        {searchData.place} och denna trenden har vi sett sen datum intervallet.
      </p> 
      <p>Det är vanligast att misshandel rapporteras i {searchData.place}. </p>
      */}
    </div>
  );
}

export default Text;
