import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function PriceIndexGraph({ areaTrendData }) {
  const pricePercentage = areaTrendData.index.index_values || [];
  console.log(pricePercentage);
  if (pricePercentage.length === 0) {
    return <></>;
  }
  const lastIndex = pricePercentage[pricePercentage.length - 1];
  const firstIndex = pricePercentage[0];
  const percentage =
    ((lastIndex.avg_price - firstIndex.avg_price) / firstIndex.avg_price) * 100;

  function formatIsoToMonthYear(isoDateString) {
    const date = new Date(isoDateString);
    const options = { year: "numeric", month: "long" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }
  function formatPrice(price) {
    return price.toLocaleString("en-US");
  }
  function formatIsoToYear(isoDateString) {
    const date = new Date(isoDateString);
    const options = { year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }
  return (
    <div>
      <div className="bg-gray-50">
        <hr />
        <p className="text-2xl p-2">Price Index</p>
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
      <div className="flex justify-between">
        <div className="w-[30%] text-center">
          <p>Current Price (May 2024)</p>
          <p>PKR {formatPrice(areaTrendData.index.avg_price)}</p>
          <br />
          <hr />
          <div>
            <br />
            <p>
              Price Change (
              {formatIsoToMonthYear(lastIndex.month_year) +
                " - " +
                formatIsoToMonthYear(firstIndex.month_year)}
              )
            </p>
            <br />
            <p className="text-green-500 text-2xl font-bold">
              PKR {formatPrice(firstIndex.avg_price - lastIndex.avg_price)} (
              {Math.abs(percentage).toFixed(2)}%)
            </p>
          </div>
          <br />
          <div className="flex justify-between p-2 bg-gray-50">
            <div>
              <p>6 months ago</p>
              <p>12 months ago</p>
              <p>24 months ago</p>
            </div>
            <div>
              <p>
                {formatPrice(
                  areaTrendData.index.change_percentage_by_price.six_months_ago
                    .avg_price
                )}
              </p>
              <p>
                {formatPrice(
                  areaTrendData.index.change_percentage_by_price.one_year_ago
                    .avg_price
                )}
              </p>
              <p>
                {formatPrice(
                  areaTrendData.index.change_percentage_by_price.two_year_ago
                    .avg_price
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="w-[70%]">
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
              stroke="green"
              dot={false}
              activeDot={{ r: 7 }}
              strokeWidth={3}
            />
          </LineChart>
        </div>
      </div>
    </div>
  );
}
PriceIndexGraph.propTypes = {
  areaTrendData: PropTypes.string.isRequired,
};
