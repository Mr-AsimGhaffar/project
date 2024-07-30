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
import { FaBath, FaBed } from "react-icons/fa";
import { BiSolidDirections } from "react-icons/bi";
import { DatePickerWithRange } from "../components/ui/DateRangePicker";
import { Button } from "../components/ui/button";
import { formatTimeNow } from "../utlils/formatTimeNow";
import { squareFeetToMarla } from "../utlils/squareFeetToMarla";
import { toast } from "react-toastify";

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
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isVisibleSuggestions, setIsVisibleSuggestions] = useState(false);

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
    if (simpleContext.appState.selectedSuggestions.length === 0) {
      toast.error("Please select a location from the suggestions.", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
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
        start_date,
        end_date
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

  const handleDateChange = (start, end) => {
    setStartDate(start ? new Date(start) : null);
    setEndDate(end ? new Date(end) : null);
  };

  const handleSearch = async (sort_by = sortBy, sort_order = sortOrder) => {
    if (simpleContext.appState.selectedSuggestions.length === 0) {
      toast.error("Please select a location from the suggestions.", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    try {
      simpleContext.setAppState((s) => ({ ...s, loading: true }));
      const data = await searchCityData(
        selectedCity,
        simpleContext.appState.selectedSuggestions,
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
      simpleContext.appState.selectedSuggestions,
      page_number,
      sortBy,
      sortOrder,
      propertyCategory,
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
        const suggestions = await fetchSearchSuggestions(
          selectedCity,
          newValue
        );
        setSuggestions(suggestions);
        setSelectedIndex(-1);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (!simpleContext.appState.selectedSuggestions.includes(suggestion)) {
      simpleContext.setAppState((s) => ({
        ...s,
        selectedSuggestions: [
          ...simpleContext.appState.selectedSuggestions,
          suggestion,
        ],
      }));
    }
    setSearchTerm("");
    setSuggestions([]);
  };

  const removeSuggestion = (suggestion) => {
    simpleContext.setAppState((s) => ({
      ...s,
      selectedSuggestions: simpleContext.appState.selectedSuggestions.filter(
        (item) => item !== suggestion
      ),
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault(); // Prevent form submission
      handleSuggestionClick(suggestions[selectedIndex]);
      setSelectedIndex(-1); // Reset the selected index after selection
    }
  };

  const handleSortChange = (sort_by, sort_order) => {
    setSortBy(sort_by);
    setSortOrder(sort_order);
    handleSearch(sort_by, sort_order);
  };

  const handleDateSortChange = (sortOrder) => {
    handleSortChange("added", sortOrder);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".suggestions-container")) {
        setIsVisibleSuggestions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <main className="px-44">
      <div>
        <div className="text-lg font-bold">
          <span>{formatPrice(totalCount)} Results</span>{" "}
          <span className="text-sm text-gray-500">
            in {simpleContext.appState.selectedSuggestions.join(", ")}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-5 grid-cols-1 gap-4 py-4">
          <div className="relative">
            <div className=" w-[100%]">
              <Input
                value={searchTerm}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
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
            <div className="absolute z-10 text-black">
              {suggestions.length > 0 && (
                <ul className="bg-white border border-gray-300 w-full rounded-3xl">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className={`p-2 cursor-pointer hover:bg-gray-200 text-sm ${
                        index === selectedIndex ? "bg-gray-200" : ""
                      }`}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {simpleContext.appState.selectedSuggestions.length > 0 && (
              <div className="mt-2 flex flex-wrap suggestions-container">
                {simpleContext.appState.selectedSuggestions.length > 2 &&
                !isVisibleSuggestions ? (
                  <div
                    className="bg-gray-200 p-2 mr-2 mb-2 rounded cursor-pointer text-xs text-black"
                    onClick={() => setIsVisibleSuggestions(true)}
                  >
                    x{simpleContext.appState.selectedSuggestions.length}
                  </div>
                ) : (
                  <div>
                    {simpleContext.appState.selectedSuggestions.map(
                      (suggestion, index) => (
                        <div
                          key={index}
                          className="bg-gray-200 p-2 mr-2 mb-2 rounded cursor-pointer text-xs text-black"
                          onClick={() => removeSuggestion(suggestion)}
                        >
                          {suggestion}
                        </div>
                      )
                    )}
                  </div>
                )}
                {isVisibleSuggestions && (
                  <div className="absolute z-10 w-full text-black">
                    {simpleContext.appState.selectedSuggestions.map(
                      (suggestion, index) => (
                        <div
                          key={index}
                          className="bg-gray-200 p-2 mr-2 mb-2 rounded cursor-pointer text-xs"
                          onClick={() => removeSuggestion(suggestion)}
                        >
                          {suggestion}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            )}
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
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <div>
            <HeaderFilter onSortChange={handleSortChange} />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className={`px-4 py-2 rounded-3xl border-2 ${
                sortBy === "added" && sortOrder === "ASC"
                  ? "bg-gray-800 text-white"
                  : ""
              }`}
              type="button"
              onClick={() => handleDateSortChange("ASC")}
            >
              Date Asc
            </Button>
            <Button
              variant="outline"
              className={`px-4 py-2 rounded-3xl border-2 ${
                sortBy === "added" && sortOrder === "DESC"
                  ? "bg-gray-800 text-white"
                  : ""
              }`}
              type="button"
              onClick={() => handleDateSortChange("DESC")}
            >
              Date Desc
            </Button>
          </div>
        </div>
      </form>
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
          Array.from({ length: cardData.length }).map((_, index) => (
            <div key={index} className="flex items-center justify-center">
              <div className="flex flex-col items-center">
                <Skeleton className="h-[125px] w-[250px] rounded-xl bg-gradient-to-br from-blue-200 to-blue-300 animate-pulse" />
                <div className="space-y-2 py-2">
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
                        Added: {formatTimeNow(item.added)}
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
                              <p>{squareFeetToMarla(item.area)}</p>
                            </div>
                          )}
                        </div>
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
                        {item.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Link>
              <CardDescription>
                {item.description.length > 100 && (
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
