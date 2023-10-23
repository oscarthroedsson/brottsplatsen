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
      <div className="xs:w-64 infoContainer">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 15,
              right: 20,
              left: -10,
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
      <a href="#" className="text-size0-p highlight px-2">
        Undersök mer
      </a>
    </div>
  );
}
