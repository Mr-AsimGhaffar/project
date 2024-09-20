import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatPrice } from "../../utlils/formatPrice";
import { formatIsoToMonthYear } from "../../utlils/formatIsoToMonthYear";
import { formatIsoToYear } from "../../utlils/formatIsoToYear";
import { useCallback, useEffect, useState } from "react";
import { fetchPricePredictor } from "../../utlils/fetchApi";

export default function PriceIndexGraph({
  city,
  type,
  location,
  area,
  purpose,
  areaTrendData,
}) {
  const [predictData, setPredictData] = useState(null);

  const fetchPredictData = useCallback(async () => {
    try {
      const data = await fetchPricePredictor({
        area,
        city,
        purpose,
        sub_location: location,
        type,
      });
      setPredictData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [area, city, purpose, location, type]);

  useEffect(() => {
    fetchPredictData();
  }, [fetchPredictData]);

  const pricePercentage = areaTrendData.index?.index_values || [];
  if (pricePercentage.length === 0) {
    return <></>;
  }
  const lastIndex = pricePercentage[pricePercentage.length - 1];
  const firstIndex = pricePercentage[0];
  const percentage =
    ((lastIndex.avg_price - firstIndex.avg_price) / firstIndex.avg_price) * 100;
  return (
    <div>
      <div>
        <p className="font-montserrat text-[#0071BC] text-2xl font-bold p-2">
          Price Index
        </p>
      </div>
      <div>
        <p className="text-3xl p-2">
          {areaTrendData.index.location.title +
            " " +
            areaTrendData.index.land_group +
            " " +
            areaTrendData.index.type.title}
        </p>
      </div>
      <div>
        <p className="text-xl p-3">PRICE (PKR)</p>
      </div>
      <div className="grid lg:grid-cols-12 grid-cols-1">
        <div className="col-span-3 text-center font-inter">
          <div>
            <p>
              Current Price (
              {formatIsoToMonthYear(
                areaTrendData.index.index_values[0].month_year
              )}
              )
            </p>
            <p className="text-[#0071BC] font-bold">
              PKR {formatPrice(areaTrendData.index.avg_price)}
            </p>
          </div>
          <div className="py-2">
            <p>Predicted Price</p>
            <p className="text-[#0071BC] font-bold">
              PKR {predictData ? formatPrice(predictData) : "Loading..."}
            </p>
            <hr />
          </div>
          <div className="py-4">
            <p>
              Price Change (
              {formatIsoToMonthYear(lastIndex.month_year) +
                " - " +
                formatIsoToMonthYear(firstIndex.month_year)}
              )
            </p>

            <p className="text-[#0071BC] text-2xl font-bold">
              PKR {formatPrice(firstIndex.avg_price - lastIndex.avg_price)} (
              {Math.abs(percentage).toFixed(2)}%)
            </p>
          </div>
          <div className="flex justify-between p-2 bg-gray-50 dark:bg-black text-black dark:text-white">
            <div>
              <p>6 months ago</p>
              <p>12 months ago</p>
              <p>24 months ago</p>
            </div>
            <div>
              <p>
                {formatPrice(
                  areaTrendData.index.change_percentage_by_price.six_months_ago
                    ?.avg_price
                )}
              </p>
              <p>
                {formatPrice(
                  areaTrendData.index.change_percentage_by_price.one_year_ago
                    ?.avg_price
                )}
              </p>
              <p>
                {formatPrice(
                  areaTrendData.index.change_percentage_by_price.two_year_ago
                    ?.avg_price
                )}
              </p>
            </div>
          </div>
        </div>
        <div
          className="col-span-9 text-black py-2"
          style={{ width: "100%", height: "100%" }}
        >
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              width={900}
              height={400}
              data={areaTrendData.index.index_values
                .map((item) => ({
                  name: formatIsoToYear(item.month_year),
                  price: item.avg_price,
                }))
                .reverse()}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                domain={[0, "dataMax"]}
                type="number"
                tickFormatter={formatPrice}
                width={100}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#0071BC"
                dot={false}
                activeDot={{ r: 7 }}
                strokeWidth={3}
                formatter={(value) => value.toLocaleString()}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
PriceIndexGraph.propTypes = {
  city: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  area: PropTypes.number.isRequired,
  purpose: PropTypes.string.isRequired,
  areaTrendData: PropTypes.array.isRequired,
};
