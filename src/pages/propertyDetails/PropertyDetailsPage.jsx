import { useLocation } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaBed, FaChartArea } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import PriceIndexGraph from "./PriceIndexGraph";
import PopularityTrendGraph from "./PopularityTrendGraph";
import SimilarProperty from "./SimilarProperty";
import LocationMap from "./LocationMap";
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
import { MdRealEstateAgent } from "react-icons/md";
import RecommendedProperties from "../../components/Recommendations/RecommendedProperties";

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
  const topPropertyPropertyDetailRef = useRef(null);
  const recommendedPropertiesRef = useRef(null);
  const priceIndexRef = useRef(null);
  const trendsRef = useRef(null);
  const [data, setData] = useState([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] =
    useState(false);
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const navbarRef = useRef(null);
  const triggerDivRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (triggerDivRef.current && navbarRef.current) {
        const triggerDivPosition =
          triggerDivRef.current.getBoundingClientRect().bottom;
        const currentScrollPosition = window.scrollY;

        if (
          currentScrollPosition > lastScrollPosition &&
          triggerDivPosition <= 0
        ) {
          // Scrolling down past the trigger div
          setIsNavbarFixed(true);
        } else if (
          currentScrollPosition < lastScrollPosition &&
          currentScrollPosition < triggerDivRef.current.offsetTop
        ) {
          // Scrolling up and moving above the trigger div
          setIsNavbarFixed(false);
        }

        // Update last scroll position
        setLastScrollPosition(currentScrollPosition);
      }

      // New functionality
      const overviewPosition = overviewRef.current.offsetTop;
      const locationPosition = locationRef.current.offsetTop;
      const priceIndexPosition = priceIndexRef.current.offsetTop;
      const trendsPosition = trendsRef.current.offsetTop;
      const similarPosition = similarPropertyRef.current.offsetTop;
      const topPosition = topPropertyPropertyDetailRef.current.offsetTop;
      const recommendPosition = recommendedPropertiesRef.current.offsetTop;
      const currentScrollPosition = window.scrollY + 10;
      if (
        currentScrollPosition >= overviewPosition &&
        currentScrollPosition < locationPosition
      ) {
        setActiveButton("Overview");
      } else if (
        currentScrollPosition >= locationPosition &&
        currentScrollPosition < priceIndexPosition
      ) {
        setActiveButton("Location");
      } else if (
        currentScrollPosition >= priceIndexPosition &&
        currentScrollPosition < trendsPosition
      ) {
        setActiveButton("PriceIndex");
      } else if (
        currentScrollPosition >= trendsPosition &&
        currentScrollPosition < similarPosition
      ) {
        setActiveButton("Trends");
      } else if (
        currentScrollPosition >= similarPosition &&
        currentScrollPosition < topPosition
      ) {
        setActiveButton("Similar");
      } else if (
        currentScrollPosition >= topPosition &&
        currentScrollPosition < recommendPosition
      ) {
        setActiveButton("Top");
      } else if (currentScrollPosition >= topPosition) {
        setActiveButton("Recommend");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPosition, activeButton]);

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
    <div className="px-4 md:px-20 lg:px-44 py-5 dark:bg-[#0c0c0c]">
      <div>
        <div>
          <p className="font-montserrat md:text-xl text-lg font-bold">
            {squareFeetToMarla(property.area)}, {property.header}
          </p>
          <p className="font-montserrat font-normal text-base">
            {property.location}
          </p>
        </div>
        <div className="relative w-[100%] py-4">
          {property.cover_photo_url ? (
            <div className="shadow-xl bg-gray-50 dark:bg-black">
              <img
                src={property.cover_photo_url}
                alt="property"
                className="w-full md:h-[40rem] h-[10rem] object-contain rounded-lg"
              />
            </div>
          ) : (
            <div className="shadow-xl bg-gray-50 dark:bg-black">
              <img
                src="/img/NoImage.png"
                alt="dummy"
                className="w-full md:h-[40rem] h-[10rem] object-contain rounded-lg"
              />
            </div>
          )}
          <div className="absolute left-5 bottom-8 shadow-lg">
            <a href={property.url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="dark:bg-black">
                View more details
              </Button>
            </a>
          </div>
          <div className="absolute right-5 bottom-8">
            <CiHeart className="w-[30px] h-[30px] bg-gray-400 rounded-3xl text-white" />
          </div>
        </div>
        <br />
        <div className="font-montserrat flex items-center text-sm font-semibold gap-10">
          {property.bedroom && (
            <div className="flex flex-col items-center">
              <div>
                <FaBed className="w-6 h-6" />
              </div>
              <div>
                <p>{property.bedroom} Beds</p>
              </div>
            </div>
          )}
          {property.bath && (
            <div className="flex flex-col items-center">
              <div>
                <FaBath className="w-6 h-6" />
              </div>
              <div>
                <p>{property.bath} Baths</p>
              </div>
            </div>
          )}
          {property.area && (
            <div className="flex flex-col items-center">
              <div>
                <FaChartArea className="w-6 h-6" />
              </div>
              <div>
                <p>{squareFeetToMarla(property.area)}</p>
              </div>
            </div>
          )}
        </div>
        <br />
      </div>
      <div>
        <div>
          <div ref={triggerDivRef}>
            {/* The content of the trigger div goes here */}
          </div>
          <div
            className={`w-[100%] overflow-x-auto bg-black ${
              isNavbarFixed ? "fixed top-0 left-0 z-50 md:px-20 lg:px-44" : ""
            }`}
            ref={navbarRef}
          >
            <div className="font-montserrat flex justify-between gap-4 bg-black p-2">
              <Button
                variant="ghost"
                className={`w-full${
                  activeButton === "Overview"
                    ? "bg-white bg-accent rounded-3xl border-2"
                    : "bg-black text-white rounded-3xl border-2 border-none"
                }`}
                onClick={() => {
                  scrollToSection(overviewRef, "Overview");
                  setActiveButton("Overview");
                }}
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
                onClick={() => {
                  scrollToSection(locationRef, "Location");
                  setActiveButton("Location");
                }}
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
                onClick={() => {
                  scrollToSection(priceIndexRef, "PriceIndex");
                  setActiveButton("PriceIndex");
                }}
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
                onClick={() => {
                  scrollToSection(trendsRef, "Trends");
                  setActiveButton("Trends");
                }}
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
                onClick={() => {
                  scrollToSection(similarPropertyRef, "Similar");
                  setActiveButton("Similar");
                }}
              >
                <span>Similar Properties</span>
              </Button>
              <Button
                variant="ghost"
                className={`w-full${
                  activeButton === "Top"
                    ? "bg-white bg-accent rounded-3xl border-2"
                    : "bg-transparent text-white rounded-3xl border-2 border-none"
                }`}
                onClick={() => {
                  scrollToSection(topPropertyPropertyDetailRef, "Top");
                  setActiveButton("Top");
                }}
              >
                <span>Top Properties</span>
              </Button>
              <Button
                variant="ghost"
                className={`w-full${
                  activeButton === "Recommend"
                    ? "bg-white bg-accent rounded-3xl border-2"
                    : "bg-transparent text-white rounded-3xl border-2 border-none"
                }`}
                onClick={() => {
                  scrollToSection(recommendedPropertiesRef, "Recommend");
                  setActiveButton("Recommend");
                }}
              >
                <span>Recommended Properties</span>
              </Button>
            </div>
          </div>
        </div>
        <div ref={overviewRef} className="w-[100%]">
          <div>
            <p className="font-montserrat text-2xl text-[#0071BC] dark:text-white font-bold p-2 bg-gray-50 dark:bg-transparent">
              Overview
            </p>
          </div>
          <div className="p-2">
            <p className="font-montserrat font-bold">Details</p>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <div>
                <Table>
                  <div className="flex flex-col md:flex-row justify-start font-inter gap-10 text-sm">
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
                                    ? "bg-gray-100 dark:bg-black text-black dark:text-white"
                                    : ""
                                }`}
                              >
                                {capitalizeFirstLetter(item)}
                              </TableCell>
                              <TableCell
                                className={`w-[100%] ${
                                  rowIndex % 2 === 0
                                    ? "bg-gray-100 dark:bg-black text-black dark:text-white"
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
                                    ? "bg-gray-100 dark:bg-black text-black dark:text-white"
                                    : ""
                                }`}
                              >
                                {capitalizeFirstLetter(item)}
                              </TableCell>
                              <TableCell
                                className={`w-[100%] ${
                                  rowIndex % 2 === 0
                                    ? "bg-gray-100 dark:bg-black text-black dark:text-white"
                                    : ""
                                }`}
                              >
                                {property[item]
                                  ? item === "added"
                                    ? formatTimeNow(property[item])
                                    : item === "area"
                                    ? squareFeetToMarla(property[item])
                                    : item === "purpose"
                                    ? property[item].replace("_", " ")
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
                <div className="font-monsterrat text-xl font-bold">
                  <div className="flex justify-center md:justify-start items-center gap-1">
                    <MdRealEstateAgent />
                    <p>{property.agency}</p>
                  </div>
                  <div className="flex justify-center md:justify-start py-2">
                    <Button
                      onClick={openAgencyLink}
                      variant="outline"
                      className="text-[#0071BC] border-[#0071BC] hover:text-[#0071BC] dark:bg-black dark:text-white dark:border-gray-800"
                    >
                      Agency Profile
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <hr />
          <br />
          <div className="p-2">
            <p className="font-montserrat font-bold">Description</p>
            <br />
            <div
              className={`font-inter text-sm ${
                isExpanded ? "" : "line-clamp-2"
              }`}
            >
              {property.description
                .replace(/\n\n/g, "\n")
                .split("\n")
                .map((line, index) => (
                  <p key={index} className="py-2">
                    {line.trim()}
                  </p>
                ))}
            </div>
            <br />
            <div className="text-right">
              <button
                onClick={toggleExpanded}
                className="text-green-500 dark:text-gray-400"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            </div>
          </div>
          <hr />
          {property.features && property.features.length > 0 && (
            <div className="p-2">
              <p className="font-bold">Amenities</p>
              <br />
              <div className="font-inter p-2 text-black">
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
                    <button
                      className="text-green-500 dark:text-gray-400"
                      onClick={toggleShowRows}
                    >
                      {showAllRows ? "View Less" : "View More"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <br />
        <div ref={locationRef}>
          <LocationMap locationData={property.area_trends || []} />
        </div>

        <div ref={priceIndexRef}>
          <PriceIndexGraph
            city={property.city}
            type={property.type}
            location={property.location}
            area={property.area}
            purpose={property.purpose}
            areaTrendData={property.area_trends || []}
          />
        </div>
        <div ref={trendsRef}>
          <PopularityTrendGraph
            popularityTrendData={property.popularity_trends || []}
            location={property.location}
          />
        </div>
        <div ref={similarPropertyRef}>
          <SimilarProperty
            similarPropertyId={property.id}
            location={property.location}
            conversionFunction={conversionFunction}
            propertyCategory={propertyCategory}
          />
        </div>
        <div ref={topPropertyPropertyDetailRef}>
          <TopPropertyPropertyDetail conversionFunction={conversionFunction} />
        </div>
        <div ref={recommendedPropertiesRef}>
          <RecommendedProperties
            RecommendedPropertiesId={property.id}
            price={property.price}
            bath={property.bath}
            bedroom={property.bedroom}
            area={property.area}
            type={property.type}
            city_id={property.city_id}
            location_id={property.location_id}
            RecommendedPropertiesLocation={property.location}
            conversionFunction={conversionFunction}
          />
        </div>
      </div>
    </div>
  );
};
PropertyDetailsPage.propTypes = {
  conversionFunction: PropTypes.func.isRequired,
  propertyCategory: PropTypes.string,
};
export default PropertyDetailsPage;
