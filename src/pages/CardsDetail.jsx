import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useContext, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { appContext } from "@/contexts/Context";
import HeaderPrice from "./searchResultHeader/HeaderPrice";
import HeaderBeds from "./searchResultHeader/HeaderBeds";
import HeaderProperty from "./searchResultHeader/HeaderProperty";
import HeaderFilter from "./searchResultHeader/HeaderFilter";
import Paging from "@/components/Paging";
import { saveToLocalStorage } from "@/utlils/SaveLocalStorage";
import { Input } from "@/components/ui/input";
import { formatPrice } from "../utlils/formatPrice";
import Recommended from "../components/cardsDetails/Recommended";
import { fetchSearchSuggestions, searchCityData } from "../utlils/fetchApi";
import PropTypes from "prop-types";
import { formatTimeFromNow } from "../utlils/UnixEpochTimeConverter";
import { FaBath, FaBed } from "react-icons/fa";
import { BiSolidDirections } from "react-icons/bi";
import { DatePickerWithRange } from "../components/ui/DateRangePicker";

const CardsDetail = ({ conversionFunction, propertyCategory }) => {
  const simpleContext = useContext(appContext);
  const [expandedCards, setExpandedCards] = useState({});
  const [searchTerm, setSearchTerm] = useState(
    simpleContext.appState.searchTerm
  );
  const [selectedCity, setSelectedCity] = useState("");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [sortBy, setSortBy] = useState("id");
  const [suggestions, setSuggestions] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // const isInitialRender = useRef(true);

  const {
    cardData,
    loading,
    pageData: { total_count: totalCount },
  } = simpleContext.appState;

  const cleanValue = (value) => (value ? value.replace(/,/g, "") : "");

  const fetchCityData = async (
    city,
    query,
    page_number,
    sort_by,
    sort_order,
    propertyCategory,
    start_date,
    end_date
  ) => {
    try {
      simpleContext.setAppState((s) => ({ ...s, loading: true }));

      const {
        selectedAmountMin,
        selectedAmountMax,
        selectBeds,
        propertyState,
      } = simpleContext.appState;

      const filters = {
        price_min: cleanValue(selectedAmountMin),
        price_max: cleanValue(selectedAmountMax),
        bedrooms: selectBeds.trim(),
        property_type:
          propertyState.selectedSubProperty ??
          propertyState.selectedPropertyType,
      };

      const data = await searchCityData(
        city,
        query,
        page_number,
        sort_by,
        sort_order,
        filters,
        propertyCategory,
        start_date ? start_date.toISOString() : "",
        end_date ? end_date.toISOString() : ""
      );
      const { properties, total_count, page_size } = data;
      simpleContext.setAppState((s) => ({
        ...s,
        cardData: properties,
        pageData: { total_count: Number(total_count), page_number },
        isApiCall: true,
        totalPages: Math.ceil(Number(total_count) / Number(page_size)),
        currentPage: page_number,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      simpleContext.setAppState((s) => ({ ...s, loading: false }));
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    simpleContext.setAppState((s) => ({
      ...s,
      searchTerm: searchTerm,
    }));
  }, [searchTerm, simpleContext]);

  // useEffect(() => {
  //   if (!isInitialRender.current) {
  //     fetchCityData(
  //       selectedCity,
  //       searchTerm || "",
  //       simpleContext.appState.currentPage,
  //       sortBy,
  //       sortOrder
  //     );
  //   } else {
  //     isInitialRender.current = false;
  //   }
  // }, [
  //   simpleContext.appState.selectedAmountMin,
  //   simpleContext.appState.selectedAmountMax,
  //   simpleContext.appState.selectBeds,
  //   simpleContext.appState.propertyState,
  // ]);

  const handleToggleExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSearch = async (sort_by = sortBy, sort_order = sortOrder) => {
    try {
      simpleContext.setAppState((s) => ({ ...s, loading: true }));
      const data = await searchCityData(
        selectedCity,
        searchTerm || "",
        1,
        sort_by,
        sort_order,
        {
          price_min: cleanValue(simpleContext.appState.selectedAmountMin),
          price_max: cleanValue(simpleContext.appState.selectedAmountMax),
          bedrooms: simpleContext.appState.selectBeds.trim(),
          property_type:
            simpleContext.appState.propertyState.selectedSubProperty,
        },
        propertyCategory,
        startDate ? startDate.toISOString() : "",
        endDate ? endDate.toISOString() : ""
      );

      const { properties, total_count, page_size, page_number } = data;

      simpleContext.setAppState((s) => ({
        ...s,
        cardData: properties,
        pageData: { total_count: Number(total_count), page_number },
        isApiCall: true,
        totalPages: Math.ceil(Number(total_count) / Number(page_size)),
        currentPage: page_number,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      simpleContext.setAppState((s) => ({ ...s, loading: false }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };
  const handlePageChange = (page_number) =>
    fetchCityData(
      selectedCity,
      searchTerm,
      page_number,
      sortBy,
      sortOrder,
      startDate ? startDate.toISOString() : "",
      endDate ? endDate.toISOString() : ""
    );

  const handleChange = async (e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    setSelectedCity(selectedCity);
    simpleContext.setAppState((s) => ({
      ...s,
      searchTerm: newValue,
    }));
    saveToLocalStorage("searchTerm", newValue);
    if (newValue.length > 2) {
      try {
        const suggestions = await fetchSearchSuggestions(newValue);
        setSuggestions(suggestions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  const handleSortChange = (sort_by, sort_order) => {
    setSortBy(sort_by);
    setSortOrder(sort_order);
    handleSearch(sort_by, sort_order);
  };

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <main>
      <div>
        <div className="text-lg font-bold">
          <span>{formatPrice(totalCount)} Results</span>{" "}
          <span className="text-sm text-gray-500">
            in {simpleContext.appState.searchTerm}
          </span>
        </div>
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-6 grid-cols-1 gap-4">
          <div className="relative">
            <div className=" w-[100%]">
              <Input
                value={searchTerm}
                onChange={handleChange}
                type="text"
                placeholder="Search Here..."
                className="rounded-3xl border-2 pr-12"
              />
            </div>
            <div>
              <div className="absolute inset-y-0 right-2 flex items-center pl-3">
                <CiSearch
                  onClick={handleSubmit}
                  className="text-orange-500 w-5 h-5 cursor-pointer"
                />
              </div>
              <div className="absolute inset-y-0 w-[1px] h-[20px] mt-3 right-10 bg-gray-400"></div>
            </div>
            <div className="absolute z-10">
              {suggestions.length > 0 && (
                <ul className="bg-white border border-gray-300 w-full rounded-3xl">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div>
            <HeaderPrice />
          </div>
          <div>
            <HeaderBeds />
          </div>
          <div>
            <HeaderProperty />
          </div>
          <div>
            <DatePickerWithRange onChange={handleDateChange} />
          </div>
          <div>
            <HeaderFilter onSortChange={handleSortChange} />
          </div>
        </div>
      </form>
      <br />
      <div className="flex justify-left gap-6">
        <div>
          <Recommended />
        </div>
        {/* <div>
          <Popular />
        </div>
        <div>
          <Nearest />
        </div> */}
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6 py-5">
        {loading ? (
          Array.from({ length: 1 }).map((_, index) => (
            <div key={index} className="flex items-center justify-center">
              <div className="flex flex-col items-center">
                <Skeleton className="h-[125px] w-[250px] rounded-xl bg-gradient-to-br from-blue-200 to-blue-300 animate-pulse" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px] bg-gradient-to-r from-green-200 to-green-300 animate-ping" />
                  <Skeleton className="h-4 w-[200px] bg-gradient-to-r from-yellow-200 to-yellow-300 animate-ping" />
                </div>
              </div>
            </div>
          ))
        ) : cardData.length === 0 && simpleContext.appState.isApiCall ? (
          <div className="col-span-3 text-center py-10 text-2xl font-bold">
            No result found. Try again
          </div>
        ) : (
          cardData.map((item) => (
            <Card
              key={item.id}
              className={`relative ${
                expandedCards[item.id] ? "h-auto" : "h-auto"
              }`}
            >
              <Link to={`/property/${item.id}`} state={{ id: item.id }}>
                {item.cover_photo_url ? (
                  <img
                    src={item.cover_photo_url}
                    alt="photo"
                    className="w-full h-52 object-fit rounded-t-md"
                  />
                ) : (
                  <img
                    src="/img/NoImage.png"
                    alt="dummy"
                    className="w-full h-52 object-fit rounded-t-md"
                  />
                )}
                <CardHeader>
                  <div>
                    <div className="flex justify-between item-center">
                      <CardTitle className="text-base font-semibold">
                        {item.header}
                      </CardTitle>
                      {/* <LuDollarSign /> */}
                    </div>
                    <div className="py-2">
                      <CardDescription>
                        Added: {formatTimeFromNow(item.added)}
                      </CardDescription>
                    </div>
                    <div className="py-2">
                      <CardDescription className="text-2xl font-bold">
                        {conversionFunction(item.price)} PKR
                      </CardDescription>
                      <CardDescription
                        className={`overflow-hidden ${
                          expandedCards[item.id]
                            ? "line-clamp-none"
                            : "line-clamp-2"
                        }`}
                      >
                        {item.desc}
                      </CardDescription>
                    </div>
                    <div className="py-2">
                      <CardDescription>
                        <div className="flex justify-left gap-3 text-xs">
                          {item.bedroom && (
                            <div className="flex flex-row items-center gap-1">
                              <FaBed />
                              <p>{item.bedroom}</p>
                            </div>
                          )}
                          {item.bath && (
                            <div className="flex flex-row items-center gap-1">
                              <FaBath />
                              <p>{item.bath}</p>
                            </div>
                          )}
                          {item.area && (
                            <div className="flex flex-row items-center gap-1">
                              <BiSolidDirections />
                              <p>{item.area.split(" ")[0]} Marla</p>
                            </div>
                          )}
                        </div>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Link>
              <CardDescription>
                {item.desc.length > 100 && (
                  <button
                    onClick={() => handleToggleExpand(item.id)}
                    className="text-sm underline p-6 py-3"
                  >
                    {expandedCards[item.id] ? "See less" : "See more"}
                  </button>
                )}
              </CardDescription>
            </Card>
          ))
        )}
      </div>
      <div className="mt-2">
        <Paging
          currentPage={simpleContext.appState.currentPage}
          totalPages={simpleContext.appState.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
};
CardsDetail.propTypes = {
  conversionFunction: PropTypes.func.isRequired,
  propertyCategory: PropTypes.string.isRequired,
};
export default CardsDetail;
