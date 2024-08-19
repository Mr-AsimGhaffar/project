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
        <p className="font-montserrat text-[#0071BC] text-2xl font-bold p-2">
          Trends - Most Searched Locations in {location}
        </p>
      </div>
      <div>
        <div className="flex flex-col md:flex-row p-2">
          <div className="flex flex-col lg:flex-row justify-start md:justify-end gap-2 mb-4 md:mb-0">
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
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/4 text-center flex flex-col gap-2 mb-4 md:mb-0">
            <p>Rank</p>
            {data.map((item, index) => (
              <p key={index}>{index + 1}</p>
            ))}
          </div>
          <div className="w-full md:w-1/4 flex flex-col gap-2 mb-4 md:mb-0 md:text-left text-center">
            <p>LOCALITY</p>
            {data.map((item) => (
              <p key={item.id}>{item.title}</p>
            ))}
          </div>
          <div className="w-full md:w-1/2">
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
                  <Bar dataKey="percentage" fill="#0071BC" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="w-full md:w-1/4 text-center flex flex-col gap-2">
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
