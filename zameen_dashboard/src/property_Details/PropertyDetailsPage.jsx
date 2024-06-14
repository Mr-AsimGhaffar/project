import { useLocation } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { BiSolidDirections } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import PriceIndexGraph from "./PriceIndexGraph";
import PopularityTrendGraph from "./PopularityTrendGraph";

const PropertyDetailsPage = () => {
  const [activeButton, setActiveButton] = useState("Overview");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllRows, setShowAllRows] = useState(false);
  const initialRowCount = 2;
  const location = useLocation();
  const { property } = location.state;
  const overviewRef = useRef(null);
  const locationRef = useRef(null);
  const financeRef = useRef(null);
  const priceIndexRef = useRef(null);
  const trendsRef = useRef(null);

  const scrollToSection = (ref, buttonName) => {
    setActiveButton(buttonName);
    ref.current.scrollIntoView({ behavior: "smooth" });
  };
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  const toggleShowRows = () => {
    setShowAllRows(!showAllRows);
  };
  function capitalizeFirstLetter(str) {
    if (typeof str !== "string" || str.length === 0) {
      return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function formatPrice(numericValue) {
    const mapping = {
      Crore: 10000000,
      Lakh: 100000,
      Thousand: 1000,
    };
    let unit, value;
    if (numericValue >= mapping.Crore) {
      unit = "Crore";
      value = numericValue / mapping.Crore;
    } else if (numericValue >= mapping.Lakh) {
      unit = "Lakh";
      value = numericValue / mapping.Lakh;
    } else {
      unit = "Thousand";
      value = numericValue / mapping.Thousand;
    }
    return `${value.toFixed(2)} ${unit}`;
  }

  function formatTimeFromNow(epochTimeInSeconds) {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const elapsedTimeInSeconds = currentTimeInSeconds - epochTimeInSeconds;
    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;

    if (elapsedTimeInSeconds < minute) {
      return "Just now";
    } else if (elapsedTimeInSeconds < hour) {
      const minutes = Math.floor(elapsedTimeInSeconds / minute);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (elapsedTimeInSeconds < day) {
      const hours = Math.floor(elapsedTimeInSeconds / hour);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (elapsedTimeInSeconds < month) {
      const days = Math.floor(elapsedTimeInSeconds / day);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (elapsedTimeInSeconds < year) {
      const months = Math.floor(elapsedTimeInSeconds / month);
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    } else {
      const years = Math.floor(elapsedTimeInSeconds / year);
      return `${years} ${years === 1 ? "year" : "years"} ago`;
    }
  }

  return (
    <div>
      {/* <h1>{property.header}</h1> */}
      <div>
        <div className="relative w-[50%]">
          <img src={property.cover_photo_url} alt="property" />
          <div className="absolute right-5 bottom-5">
            <CiHeart className="w-[30px] h-[30px] bg-gray-400 rounded-3xl text-white" />
          </div>
        </div>
        <br />
        <div className="flex justify-left gap-10">
          <div className="flex flex-col items-center">
            <FaBed />
            <p>{property.bedroom}</p>
          </div>
          <div className="flex flex-col items-center">
            <FaBath />
            <p>{property.bath}</p>
          </div>
          <div className="flex flex-col items-center">
            <BiSolidDirections />
            <p>{property.area}</p>
          </div>
        </div>
        <br />
      </div>
      <div>
        <div className="w-[100%] overflow-x-auto">
          <div className="flex justify-between gap-4 bg-black p-2">
            <Button
              variant="ghost"
              className={`w-full${
                activeButton === "Overview"
                  ? "bg-white bg-accent text-black rounded-3xl border-2"
                  : "bg-black text-white rounded-3xl border-2 border-none"
              }`}
              onClick={() => scrollToSection(overviewRef, "Overview")}
            >
              <span>Overview</span>
            </Button>
            <Button
              variant="ghost"
              className={`  w-full${
                activeButton === "Location"
                  ? "bg-white bg-accent text-black rounded-3xl border-2"
                  : "bg-inherit text-white rounded-3xl border-2 border-none"
              }`}
              onClick={() => scrollToSection(locationRef, "Location")}
            >
              <span>Location & Nearby</span>
            </Button>
            <Button
              variant="ghost"
              className={`w-full${
                activeButton === "Finance"
                  ? "bg-white bg-accent text-black rounded-3xl border-2"
                  : "bg-transparent text-white rounded-3xl border-2 border-none"
              }`}
              onClick={() => scrollToSection(financeRef, "Finance")}
            >
              <span>Home Finance</span>
            </Button>
            <Button
              variant="ghost"
              className={`w-full${
                activeButton === "PriceIndex"
                  ? "bg-white bg-accent text-black rounded-3xl border-2"
                  : "bg-transparent text-white rounded-3xl border-2 border-none"
              }`}
              onClick={() => scrollToSection(priceIndexRef, "PriceIndex")}
            >
              <span>Price Index</span>
            </Button>
            <Button
              variant="ghost"
              className={`w-full${
                activeButton === "Trends"
                  ? "bg-white bg-accent text-black rounded-3xl border-2"
                  : "bg-transparent text-white rounded-3xl border-2 border-none"
              }`}
              onClick={() => scrollToSection(trendsRef, "Trends")}
            >
              <span>Trends</span>
            </Button>
          </div>
        </div>
        <div ref={overviewRef} className="w-[100%]">
          <div className="bg-gray-50">
            <p className="text-2xl p-2">Overview</p>
          </div>
          <div className="p-2">
            <p className="font-bold">Details</p>
            <div>
              <Table>
                <div className="flex justify-start gap-10">
                  <div>
                    <TableBody>
                      {Object.keys(property)
                        .filter((key) =>
                          ["type", "price", "location", "bath"].includes(key)
                        )
                        .map((item, rowIndex) => (
                          <TableRow key={item} className="border-none">
                            <TableCell
                              className={`${
                                rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                              }`}
                            >
                              {capitalizeFirstLetter(item)}
                            </TableCell>
                            <TableCell
                              className={`${
                                rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                              }`}
                            >
                              {item === "price"
                                ? formatPrice(property[item])
                                : property[item]}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </div>
                  <div>
                    <TableBody>
                      {Object.keys(property)
                        .filter((key) =>
                          ["area", "purpose", "bedroom", "added"].includes(key)
                        )
                        .map((item, rowIndex) => (
                          <TableRow key={item} className="border-none">
                            <TableCell
                              className={`${
                                rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                              }`}
                            >
                              {capitalizeFirstLetter(item)}
                            </TableCell>
                            <TableCell
                              className={`${
                                rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                              }`}
                            >
                              {item === "added"
                                ? formatTimeFromNow(property[item])
                                : property[item]}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </div>
                </div>
              </Table>
            </div>
          </div>
          <hr />
          <br />
          <div className="p-2">
            <p className={`${isExpanded ? "" : "line-clamp-2"}`}>
              {property.desc}
            </p>
            <br />
            <div className="text-right">
              <button onClick={toggleExpanded} className="text-green-500">
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            </div>
          </div>
          <hr />
          <div className="p-2">
            <p className="font-bold">Amenities</p>
            <div className="p-2">
              <Table>
                <TableBody>
                  {property.features
                    .slice(
                      0,
                      showAllRows ? property.features.length : initialRowCount
                    )
                    .map((item, index) => (
                      <TableRow
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } "border-none"`}
                      >
                        <TableCell>{item.category}</TableCell>
                        {item.features.map((text, index) => (
                          <TableCell key={index}>{text}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              {property.features.length > initialRowCount && (
                <div className="mt-2 text-right">
                  <button className="text-green-500" onClick={toggleShowRows}>
                    {showAllRows ? "View Less" : "View More"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <br />
        <div ref={locationRef} className="p-4">
          <h2>Location & Nearby</h2>
          <p>Details of Location & Nearby...</p>
        </div>
        <div ref={financeRef} className="p-4">
          <h2>Home Finance</h2>
          <p>Details of Home Finance...</p>
        </div>
        <div ref={priceIndexRef} className="p-4">
          <PriceIndexGraph areaTrendData={property.area_trends} />
        </div>
        <div ref={trendsRef} className="p-4">
          <PopularityTrendGraph
            popularityTrendData={property.popularity_trends}
            location={property.location}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
