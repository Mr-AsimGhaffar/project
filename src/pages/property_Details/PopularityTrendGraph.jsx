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
  return (
    <div>
      <div className="bg-gray-50">
        <hr />
        <p className="text-2xl p-2">
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
            {/* <Button>May 2024</Button>
            <Button>Apr 2024</Button>
            <Button>Mar 2024</Button>
            <Button>Feb 2024</Button>
            <Button>Jan 2024</Button>
            <Button>Dec 2023</Button>
            <Button>Nov 2023</Button>
            <Button>Oct 2023</Button>
            <Button>Sep 2023</Button>
            <Button>Aug 2023</Button>
            <Button>Jul 2023</Button>
            <Button>Jun 2023</Button> */}
          </div>
        </div>
        <div className="p-5 flex justify-between gap-20">
          <div className="w[10%] text-center flex flex-col gap-2">
            <p>Rank</p>
            {data.map((item, index) => (
              <p key={index}>{index + 1}</p>
            ))}
            {/* <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p> */}
          </div>
          <div className="w-[30%] flex flex-col gap-2">
            <p>LOCALITY</p>
            {data.map((item) => (
              <p key={item.id}>{item.title}</p>
            ))}
            {/* <p>Bahria Enclave</p>
            <p>Bahria Garden City</p>
            <p>Bahria Golf City</p>
            <p>Bahria Enclave 2</p>
            <p>Bahria Oriental Garden</p>
            <p>Pearl Square Residency</p>
            <p>Grande Palladium</p>
            <p>Avenue Villas</p>
            <p>Defence View Mall</p> */}
          </div>
          <div className="w-[50%]">
            <p>PERCENTAGE OF TOTAL SEARCHES (%)</p>
            <div>
              <ResponsiveContainer width="100%" height={400}>
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
            {/* <p>No Change</p>
            <p>No Change</p>
            <p>No Change</p>
            <p>No Change</p>
            <p>No Change</p>
            <p>+1</p>
            <p>-1</p>
            <p>New Entry</p>
            <p>New Entry</p> */}
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
