import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatDateToMonthYear } from "../../utlils/dateToMonthYear";

export default function PopularityTrendGraph({
  popularityTrendData,
  location,
}) {
  const months = Object.keys(popularityTrendData.trends || {});
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  if (months.length === 0) {
    return <></>;
  }
  const data = popularityTrendData.trends[selectedMonth];

  const performance = (position, prev_position) => {
    return prev_position - position === 0
      ? "No Change"
      : prev_position - position;
  };
  const itemHeight = 30;
  const paddingHeight = 80;
  const chartHeight = data.length * itemHeight + paddingHeight;
  return (
    <div>
      <div className="bg-gray-50">
        <hr />
        <p className="text-2xl text-black p-2">
          Trends - Most Searched Locations in {location}
        </p>
      </div>
      <div>
        <div>
          <div className="p-4 gap-2 flex justify-end">
            {months.map((item) => (
              <Button
                key={item}
                onClick={function () {
                  setSelectedMonth(item);
                }}
              >
                {formatDateToMonthYear(item)}
              </Button>
            ))}
          </div>
        </div>
        <div className="p-5 flex justify-between gap-20">
          <div className="w[10%] text-center flex flex-col gap-2">
            <p>Rank</p>
            {data.map((item, index) => (
              <p key={index}>{index + 1}</p>
            ))}
          </div>
          <div className="w-[30%] flex flex-col gap-2">
            <p>LOCALITY</p>
            {data.map((item) => (
              <p key={item.id}>{item.title}</p>
            ))}
          </div>
          <div className="w-[50%]">
            <p>PERCENTAGE OF TOTAL SEARCHES (%)</p>
            <div className="text-black">
              <ResponsiveContainer width="100%" height={chartHeight}>
                <BarChart
                  layout="vertical"
                  data={data.map((item) => ({
                    name: item.search_percentage.toFixed(1),
                    percentage: item.search_percentage,
                  }))}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="percentage" fill="green" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="w-[20%] text-center flex flex-col gap-2">
            <p>PERFORMANCE</p>
            {data.map((item) => (
              <p key={item.id}>
                {performance(item.position, item.prev_position)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

PopularityTrendGraph.propTypes = {
  popularityTrendData: PropTypes.array.isRequired,
  location: PropTypes.string.isRequired,
};
