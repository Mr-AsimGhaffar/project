import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card } from "@/components/ui/card";

const data = [
  {
    name: "Jan",
    uv: 4000,
    pv: 6400,
    amt: 2400,
  },
  {
    name: "Feb",
    uv: 3000,
    pv: 4985,
    amt: 2210,
  },
  {
    name: "March",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "April",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "May",
    uv: 1890,
    pv: 1000,
    amt: 2181,
  },
  {
    name: "June",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "July",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function App() {
  return (
    <main>
      <Card>
        <BarChart
          width={800}
          height={565}
          data={data}
          margin={{
            top: 100,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={50}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 25, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="pv" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
      </Card>
    </main>
  );
}
