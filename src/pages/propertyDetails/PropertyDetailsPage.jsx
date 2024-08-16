import { useLocation } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { BiSolidDirections } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import PriceIndexGraph from "./PriceIndexGraph";
import PopularityTrendGraph from "./PopularityTrendGraph";
import SimilarProperty from "./SimilarProperty";
import LocationMap from "./LocationMap";
// import SkeletonCard from "../../components/skeleton/Skeleton";
import {
  fetchPropertyDetails,
  fetchPropertyRecommendations,
} from "../../utlils/fetchApi";
import PropTypes from "prop-types";
import { formatTimeNow } from "../../utlils/formatTimeNow";
import { squareFeetToMarla } from "../../utlils/squareFeetToMarla";
import TopPropertyPropertyDetail from "../../components/topProperties/TopPropertyPropertyDetail";
import { appContext } from "../../contexts/Context";
import Spinner from "../../components/spinner/Spinner";

const PropertyDetailsPage = ({ conversionFunction, propertyCategory }) => {
  const simpleContext = useContext(appContext);

  const [activeButton, setActiveButton] = useState("Overview");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllRows, setShowAllRows] = useState(false);
  const initialRowCount = 2;
  const location = useLocation();
  const { id } = location.state || { id: location.pathname.split("/").pop() };
  const overviewRef = useRef(null);
  const locationRef = useRef(null);
  const similarPropertyRef = useRef(null);
  const priceIndexRef = useRef(null);
  const trendsRef = useRef(null);
  const [data, setData] = useState([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] =
    useState(false);

  const loadRecommendationsData = useCallback(async () => {
    try {
      if (data.length === 0) {
        return;
      }
      const property = data[0];

      const response = await fetchPropertyRecommendations({
        queries: [property.location_id],
        propertyCategory,
      });
      if (response == null) {
        return;
      }

      // Only update the state if the data is different
      if (
        JSON.stringify(response.properties) !==
        JSON.stringify(simpleContext.appState.topBestProperty)
      ) {
        simpleContext.setAppState((s) => ({
          ...s,
          topBestProperty: response.properties,
        }));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [data, simpleContext.appState.selectedSuggestions, propertyCategory]);

  useEffect(() => {
    loadRecommendationsData();
  }, [loadRecommendationsData, data]);

  const fetchData = useCallback(async () => {
    try {
      setIsLoadingRecommendations(true);
      const propertyDetails = await fetchPropertyDetails(id);
      setData(propertyDetails);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoadingRecommendations(false); // Set loading to false after the fetch
    }
  }, [id]);
  useEffect(() => {
    fetchData();
  }, [fetchData, id]);

  const property = data[0];

  if (data.length === 0 || isLoadingRecommendations) {
    return <Spinner />;
  }

  const scrollToSection = (ref, buttonName) => {
    setActiveButton(buttonName);
    ref.current.scrollIntoView({ behavior: "smooth" });
  };
  const toggleExpanded = () => setIsExpanded(!isExpanded);
  const toggleShowRows = () => setShowAllRows(!showAllRows);
  function capitalizeFirstLetter(str) {
    if (typeof str !== "string" || str.length === 0) {
      return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const openAgencyLink = () => {
    window.open(property.agency_profile_url, "_blank");
  };

  return (
    <div className="px-4 md:px-20 lg:px-44 py-5">
      {/* <h1>{property.header}</h1> */}
      <div>
        <div>
          <p className="md:text-xl text-lg font-bold">
            {squareFeetToMarla(property.area)}, Brand New House For Sale in{" "}
            {property.location}
          </p>
          <p>{property.location}</p>
        </div>
        <div className="relative w-[100%]">
          {property.cover_photo_url ? (
            <div>
              <img
                src={property.cover_photo_url}
                alt="property"
                className="w-full md:h-[40rem] h-[10rem] object-fit rounded-t-md"
              />
            </div>
          ) : (
            <img
              src="/img/NoImage.png"
              alt="dummy"
              className="w-full h-96 object-fit rounded-t-md"
            />
          )}
          <div className="absolute left-5 bottom-5">
            <a href={property.url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">View more details</Button>
            </a>
          </div>
          <div className="absolute right-5 bottom-5">
            <CiHeart className="w-[30px] h-[30px] bg-gray-400 rounded-3xl text-white" />
          </div>
        </div>
        <br />
        <div className="flex gap-10">
          {property.bedroom && (
            <div className="flex flex-row items-center gap-1">
              <FaBed />
              <p>{property.bedroom}</p>
            </div>
          )}
          {property.bath && (
            <div className="flex flex-row items-center gap-1">
              <FaBath />
              <p>{property.bath}</p>
            </div>
          )}
          {property.area && (
            <div className="flex flex-row items-center gap-1">
              <BiSolidDirections />
              <p>{squareFeetToMarla(property.area)}</p>
            </div>
          )}
        </div>
        <br />
      </div>
      <div>
        <div className="w-[100%] overflow-x-auto">
          <div className="flex flex-col md:flex-row justify-between gap-4 bg-black p-2">
            <Button
              variant="ghost"
              className={`w-full${
                activeButton === "Overview"
                  ? "bg-white bg-accent rounded-3xl border-2"
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
                  ? "bg-white bg-accent rounded-3xl border-2"
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
                  ? "bg-white bg-accent rounded-3xl border-2"
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
                  ? "bg-white bg-accent rounded-3xl border-2"
                  : "bg-transparent text-white rounded-3xl border-2 border-none"
              }`}
              onClick={() => scrollToSection(trendsRef, "Trends")}
            >
              <span>Trends</span>
            </Button>
            <Button
              variant="ghost"
              className={`w-full${
                activeButton === "Similar"
                  ? "bg-white bg-accent rounded-3xl border-2"
                  : "bg-transparent text-white rounded-3xl border-2 border-none"
              }`}
              onClick={() => scrollToSection(similarPropertyRef, "Similar")}
            >
              <span>Similar Properties</span>
            </Button>
          </div>
        </div>
        <div ref={overviewRef} className="w-[100%]">
          <div className="bg-gray-100">
            <p className="text-2xl text-black p-2">Overview</p>
          </div>
          <div className="p-2">
            <p className="font-bold">Details</p>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <div>
                <Table>
                  <div className="flex flex-col md:flex-row justify-start gap-10">
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
                                  rowIndex % 2 === 0
                                    ? "bg-gray-100 text-black"
                                    : ""
                                }`}
                              >
                                {capitalizeFirstLetter(item)}
                              </TableCell>
                              <TableCell
                                className={`${
                                  rowIndex % 2 === 0
                                    ? "bg-gray-100 text-black"
                                    : ""
                                }`}
                              >
                                {property[item]
                                  ? item === "price"
                                    ? conversionFunction(property[item])
                                    : item === "type"
                                    ? property[item].replace("_", " ")
                                    : item === "location"
                                    ? property[item]
                                        .split(",")
                                        .slice(0, 2)
                                        .join(",") + "..."
                                    : property[item]
                                  : "-"}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </div>
                    <div>
                      <TableBody>
                        {Object.keys(property)
                          .filter((key) =>
                            ["area", "purpose", "bedroom", "added"].includes(
                              key
                            )
                          )
                          .map((item, rowIndex) => (
                            <TableRow key={item} className="border-none">
                              <TableCell
                                className={`${
                                  rowIndex % 2 === 0
                                    ? "bg-gray-100 text-black"
                                    : ""
                                }`}
                              >
                                {capitalizeFirstLetter(item)}
                              </TableCell>
                              <TableCell
                                className={`w-[100%] ${
                                  rowIndex % 2 === 0
                                    ? "bg-gray-100 text-black"
                                    : ""
                                }`}
                              >
                                {property[item]
                                  ? item === "added"
                                    ? formatTimeNow(property[item])
                                    : item === "area"
                                    ? squareFeetToMarla(property[item])
                                    : property[item]
                                  : "-"}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </div>
                  </div>
                </Table>
              </div>
              {property.agency && (
                <div className="text-center">
                  <p>{property.agency}</p>
                  <Button className="py-2" onClick={openAgencyLink}>
                    Agency Profile
                  </Button>
                </div>
              )}
            </div>
          </div>
          <hr />
          <br />
          <div className="p-2">
            <p className="font-bold">Description</p>
            <br />
            <p className={`${isExpanded ? "" : "line-clamp-2"}`}>
              {property.description}
            </p>
            <br />
            <div className="text-right">
              <button onClick={toggleExpanded} className="text-green-500">
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            </div>
          </div>
          <hr />
          {property.features && property.features.length > 0 && (
            <div className="p-2">
              <p className="font-bold">Amenities</p>
              <br />
              <div className="p-2 text-black">
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
          )}
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
            conversionFunction={conversionFunction}
            propertyCategory={propertyCategory}
          />
        </div>
      </div>
      <div>
        <TopPropertyPropertyDetail conversionFunction={conversionFunction} />
      </div>
    </div>
  );
};
PropertyDetailsPage.propTypes = {
  conversionFunction: PropTypes.func.isRequired,
  propertyCategory: PropTypes.string.isRequired,
};
export default PropertyDetailsPage;
