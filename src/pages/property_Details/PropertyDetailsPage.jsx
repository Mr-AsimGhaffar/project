import { useLocation } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { BiSolidDirections } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import PriceIndexGraph from "./PriceIndexGraph";
import PopularityTrendGraph from "./PopularityTrendGraph";
import SimilarProperty from "./SimilarProperty";
import { formatTimeFromNow } from "@/utlils/UnixEpochTimeConverter";
import LocationMap from "./LocationMap";

const PropertyDetailsPage = () => {
  const [activeButton, setActiveButton] = useState("Overview");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllRows, setShowAllRows] = useState(false);
  const initialRowCount = 2;
  const location = useLocation();
  const { id } = location.state || {};
  const overviewRef = useRef(null);
  const locationRef = useRef(null);
  const similarPropertyRef = useRef(null);
  const priceIndexRef = useRef(null);
  const trendsRef = useRef(null);
  const [data, setData] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_URL}/property/${id}`);
        const jsonData = await response.json();
        setData(jsonData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const property = data[0];
  if (data.length === 0) {
    return <p>loading...</p>;
  }

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

  return (
    <div>
      {/* <h1>{property.header}</h1> */}
      <div>
        <hr />
        <div>
          <p className="text-xl font-bold">
            {property.area}, Brand New House For Sale in {property.location}
          </p>
          <p>{property.location}</p>
        </div>
        <div className="relative w-[100%]">
          <img
            src={property.cover_photo_url}
            alt="property"
            className="w-[100%] h-[800px]"
          />
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
            <Button
              variant="ghost"
              className={`w-full${
                activeButton === "Finance"
                  ? "bg-white bg-accent text-black rounded-3xl border-2"
                  : "bg-transparent text-white rounded-3xl border-2 border-none"
              }`}
              onClick={() => scrollToSection(similarPropertyRef, "Similar")}
            >
              <span>Similar Properties</span>
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
          <LocationMap locationData={property.area_trends || []} />
        </div>

        <div ref={priceIndexRef} className="p-4">
          <PriceIndexGraph areaTrendData={property.area_trends || []} />
        </div>
        <div ref={trendsRef} className="p-4">
          <PopularityTrendGraph
            popularityTrendData={property.popularity_trends || []}
            location={property.location}
          />
        </div>
        <div ref={similarPropertyRef} className="p-4">
          <SimilarProperty
            similarPropertyId={property.id}
            location={property.location}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;