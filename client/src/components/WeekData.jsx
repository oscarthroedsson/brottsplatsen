import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../main.css";
const data = [
  {
    name: "26/6",
    pv: 200,
    amt: 300,
  },
  {
    name: "27/6",
    pv: 200,
    amt: 300,
  },
  {
    name: "28/6",
    pv: 200,
    amt: 300,
  },
  {
    name: "29/6",
    pv: 200,
    amt: 300,
  },
  {
    name: "30/6",
    pv: 200,
    amt: 300,
  },
  {
    name: "31/6",
    pv: 200,
    amt: 300,
  },
  {
    name: "01/6",
    pv: 200,
    amt: 300,
  },
];

export default function WeekData() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="primBox w-80 h-[190px]">
        <ResponsiveContainer width="100%" height="100%">
          {/* Barcharts length is maxed with margin. It can not get any wider */}
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 15,
              right: 5,
              left: -30,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Bar dataKey="pv" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <a href="#" className="listP highlight px-2">
        Undersök mer
      </a>
    </div>
  );
}
