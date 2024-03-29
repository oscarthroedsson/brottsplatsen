import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import "../main.css";
import { useEffect, useMemo, useState } from "react";
import { fetchApi } from "../config/apiCall";

export default function WeekData() {
  const [week, setWeek] = useState([]);

  useEffect(() => {
    const getWeekData = async () => {
      const weekData = await fetchApi("api/whole_list");
      await setWeek(weekData);
    };
    try {
      getWeekData();
    } catch (err) {
      console.log("Error in CommonCrime", err);
    }
  }, []);

  const counted = useMemo(() => {
    return countPerDay();
  }, [week]);

  //SORTERA UT DE SENASTE 7 DAGARNA
  function countPerDay() {
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);

    const crimeThisWeek = week.filter((crime) => {
      const crimeDate = new Date(crime.datetime);
      return (
        crimeDate.setHours(0, 0, 0, 0) >= oneWeekAgo.setHours(0, 0, 0, 0) &&
        crimeDate.setHours(0, 0, 0, 0) <= today.setHours(0, 0, 0, 0)
      );
    });

    const crimesPerDay = crimeThisWeek.reduce((acc, crime) => {
      const crimeDay = new Date(crime.datetime).toDateString();
      if (!acc[crimeDay]) {
        acc[crimeDay] = 1;
      } else {
        acc[crimeDay]++;
      }
      return acc;
    }, {});

    const result = Object.keys(crimesPerDay).map((dayString) => {
      const date = new Date(dayString);
      const day = date.getDate(); // Få dagen som ett nummer
      const month = date.getMonth() + 1; // Få månaden som ett nummer (lägg till 1 eftersom getMonth() är nollbaserad)
      const formattedDay = `${day}/${month}`; // Skapa en sträng i formatet 'dag/månad'

      return {
        name: formattedDay,
        antal: crimesPerDay[dayString],
        sortDate: date,
      };
    });

    let sortedArray = result.sort((a, b) => a.sortDate - b.sortDate);
    sortedArray = result.map(({ name, antal }) => ({ name, antal }));

    return sortedArray;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="primBox w-80 h-[190px]">
        <p className="p2">Senaste 7 dagarna</p>
        <ResponsiveContainer width="100%" height="100%">
          {/* Barcharts length is maxed with margin. It can not get any wider */}
          <BarChart
            width={500}
            data={counted}
            margin={{
              top: 15,
              right: 5,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="0 1" />
            <XAxis dataKey="name" fontSize={11} />
            <Tooltip />
            <Bar dataKey="antal" fill="#363ABF">
              <LabelList
                dataKey="antal"
                position="inside"
                fill="#ffffff"
                fontSize={10}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* <a href="#" className="listP highlight px-2">
        Undersök mer
      </a> */}
    </div>
  );
}
