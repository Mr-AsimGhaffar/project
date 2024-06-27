import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useContext } from "react";
import { appContext } from "@/contexts/Context";
import { Skeleton } from "./ui/skeleton";
import { Card } from "./ui/card";

export default function Graphs() {
  const simpleContext = useContext(appContext);
  const graphData = Object.keys(simpleContext.appState.graphData).map(
    (key) => ({
      name: key,
      value: simpleContext.appState.graphData[key],
    })
  );

  const { loading } = simpleContext.appState;

  return (
    <main>
      {loading ? (
        Array.from({ length: 1 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-4 py-10">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))
      ) : graphData.length > 0 ? (
        <Card>
          <div>
            <p className="text-xl font-bold text-center">Showing Properties</p>
          </div>
          <BarChart
            width={1300}
            height={565}
            data={graphData}
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
              tickFormatter={(name) => name.slice(0, 3)}
              scale="point"
              padding={{ left: 25, right: 10 }}
            />
            <YAxis
              domain={["dataMin", "dataMax"]}
              tickCount={10}
              ticks={[
                100, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000,
              ]}
            />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="value" fill="#8884d8" background={{ fill: "#eee" }} />
          </BarChart>
        </Card>
      ) : (
        <p></p>
      )}
    </main>
  );
}
