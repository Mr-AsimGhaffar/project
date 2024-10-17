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
import displayFirstName from "../../utlils/displayFirstName";
import { PieChart, Pie, Cell } from "recharts";

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

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div>
      <div className="hidden md:block">
        <div>
          <p className="font-montserrat text-[#0071BC] dark:text-white text-2xl font-bold p-2">
            Trends - Most Searched Locations in {displayFirstName(location)}
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
          <div className="flex flex-col md:flex-row gap-4 font-inter text-sm">
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
      <div className="p-2 block md:hidden">
        <div className="py-4">
          <p className="font-montserrat text-[#0071BC] text-2xl font-bold">
            Trends
          </p>
          <p className="py-4 font-montserrat text-lg">
            Percentage of Total Searches by Location
          </p>
        </div>
        <div className="py-4 flex items-center gap-2 overflow-x-auto hide-scrollbar">
          {months.map((item) => (
            <Button
              key={item}
              onClick={function () {
                setSelectedMonth(item);
              }}
              className="rounded-3xl bg-gray-100 text-black hover:bg-gray-300 active:text-white"
            >
              {formatDateToMonthYear(item)}
            </Button>
          ))}
        </div>
        <div className="p-4 rounded-md border">
          <div className="flex justify-center items-center h-full">
            <PieChart width={400} height={400}>
              <Pie
                data={data.map((item) => ({
                  name: item.search_percentage.toFixed(1),
                  value: item.search_percentage,
                }))}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="flex flex-col text-center gap-4">
            {data.map((item) => (
              <p className="rounded-md bg-gray-100 p-2 w-full" key={item.id}>
                {item.title}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

PopularityTrendGraph.propTypes = {
  popularityTrendData: PropTypes.object.isRequired,
  location: PropTypes.string.isRequired,
};
