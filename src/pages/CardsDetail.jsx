import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { CiSearch } from "react-icons/ci";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { appContext } from "@/contexts/Context";
import HeaderPrice from "./searchResultHeader/HeaderPrice";
import HeaderBeds from "./searchResultHeader/HeaderBeds";
import HeaderProperty from "./searchResultHeader/HeaderProperty";
import HeaderFilter from "./searchResultHeader/HeaderFilter";
import HeaderArea from "./searchResultHeader/HeaderArea";
import Paging from "@/components/Paging";
import { saveToLocalStorage } from "@/utlils/SaveLocalStorage";
import { Input } from "@/components/ui/input";
import { formatPrice } from "../utlils/formatPrice";
import {
  fetchPropertyRecommendations,
  fetchSearchSuggestions,
  searchCityData,
} from "../utlils/fetchApi";
import PropTypes from "prop-types";
import { FaBath, FaBed } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { BiSolidDirections } from "react-icons/bi";
import { DatePickerWithRange } from "../components/ui/DateRangePicker";
import { formatTimeNow } from "../utlils/formatTimeNow";
import { squareFeetToMarla } from "../utlils/squareFeetToMarla";
import { toast } from "react-toastify";
import TopPropertyArea from "../components/topProperties/TopPropertyArea";
import displayFirstName from "../utlils/displayFirstName";
import HeaderOwnerDetail from "./searchResultHeader/HeaderOwnerDetail";
import firstLetterUpperCase from "../utlils/firstLetterUpperCase";
import HeaderCity from "./searchResultHeader/HeaderCity";
import formatDate from "../utlils/formatDate";

const CardsDetail = ({ conversionFunction, propertyCategory }) => {
  const abortController = new AbortController();
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);
  const simpleContext = useContext(appContext);
  const [expandedCards, setExpandedCards] = useState({});
  const [searchTerm, setSearchTerm] = useState(
    simpleContext.appState.searchTerm
  );
  const [sortOrder, setSortOrder] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortByDate, setSortByDate] = useState("added");
  const [sortOrderDate, setSortOrderDate] = useState("DESC");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isVisibleSuggestions, setIsVisibleSuggestions] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const mounted = useRef(false);
  const navigate = useNavigate();

  const {
    cardData,
    loading,
    pageData: { total_count: totalCount },
    propertyState,
  } = simpleContext.appState;

  const cleanValue = (value) => (value ? value.replace(/,/g, "") : "");

  const selectedCity = simpleContext.appState.selectedCity;
  const selectedSuggestions = useMemo(
    () =>
      simpleContext.appState.selectedSuggestions.map(
        (suggestion) => suggestion.id
      ),
    [simpleContext.appState.selectedSuggestions]
  );
  const loadRecommendationsData = useCallback(async () => {
    try {
      const data = await fetchPropertyRecommendations({
        city: selectedCity,
        queries: selectedSuggestions,
        propertyCategory,
        property_type:
          propertyState.selectedSubProperty ||
          propertyState.selectedPropertyType,
      });
      if (data == null) {
        return;
      }

      // Only update the state if the data is different
      if (
        JSON.stringify(data.properties) !==
        JSON.stringify(simpleContext.appState.topBestProperty)
      ) {
        simpleContext.setAppState((s) => ({
          ...s,
          topBestProperty: data.properties,
        }));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [selectedCity, selectedSuggestions, propertyCategory, propertyState]);

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
    if (isRequestInProgress) return; // Prevent new requests while one is in progress
    setIsRequestInProgress(true);
    const {
      selectedAmountMin,
      selectedAmountMax,
      selectBeds,
      propertyState,
      selectedAreaMin,
      selectedAreaMax,
      is_agency,
    } = simpleContext.appState;
    if (
      simpleContext.appState.selectedSuggestions.length === 0 &&
      searchTerm != ""
    ) {
      toast.error("Please select a location from the suggestions.", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    try {
      simpleContext.setAppState((s) => ({ ...s, loading: true }));

      const filters = {
        price_min: cleanValue(selectedAmountMin),
        price_max: cleanValue(selectedAmountMax),
        bedrooms: selectBeds.trim(),
        property_type:
          propertyState.selectedSubProperty ||
          propertyState.selectedPropertyType,
        area_max: selectedAreaMax || "",
        area_min: selectedAreaMin || "",
        is_posted_by_agency: is_agency,
      };

      const queryString = new URLSearchParams();

      if (simpleContext.appState.selectedCity) {
        queryString.set("city", simpleContext.appState.selectedCity);
      }

      if (simpleContext.appState.selectedSuggestions.length > 0) {
        queryString.set(
          "location_ids",
          simpleContext.appState.selectedSuggestions
            .map((suggestion) => suggestion.name.split(",")[0])
            .join(",")
        );
      }

      if (filters.price_min) {
        queryString.set("price_min", filters.price_min);
      }

      if (filters.price_max) {
        queryString.set("price_max", filters.price_max);
      }

      if (filters.area_min) {
        queryString.set("area_min", filters.area_min);
      }

      if (filters.area_max) {
        queryString.set("area_max", filters.area_max);
      }

      if (filters.property_type) {
        queryString.set("propertyType", filters.property_type);
      }

      if (filters.bedrooms) {
        queryString.set("beds", filters.bedrooms);
      }

      if (filters.is_posted_by_agency) {
        queryString.set("agency", filters.is_posted_by_agency.toString());
      }

      if (sort_by) {
        queryString.set("sort_by", sort_by);
      }
      if (sort_order) {
        queryString.set("sort_order", sort_order);
      }
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);
      if (formattedStartDate) {
        queryString.set("startDate", formattedStartDate);
      }
      if (formattedEndDate) {
        queryString.set("end_date", formattedEndDate);
      }

      const data = await searchCityData(
        simpleContext.appState.selectedCity,
        simpleContext.appState.selectedSuggestions.map(
          (suggestion) => suggestion.id
        ),
        page_number,
        sort_by,
        sort_order,
        filters,
        propertyCategory,
        start_date,
        end_date
      );
      const { properties, total_count, page_size } = data ?? {
        properties: [],
        total_count: 0,
        page_size: 10,
      };
      simpleContext.setAppState((s) => ({
        ...s,
        cardData: properties,
        pageData: { total_count: Number(total_count), page_number },
        isApiCall: true,
        totalPages: Math.ceil(Number(total_count) / Number(page_size)),
        currentPage: page_number,
        loading: data == null,
      }));
      navigate(`/search-results?${queryString.toString()}`, {
        state: {
          cardData: properties,
          totalCount: total_count,
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      simpleContext.setAppState((s) => ({ ...s, loading: false }));
    } finally {
      setIsRequestInProgress(false);
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

  const handleSearch = async (
    sort_by = sortBy || "added",
    sort_order = sortOrder || "DESC"
  ) => {
    if (isRequestInProgress) return; // Prevent new requests while one is in progress
    setIsRequestInProgress(true);
    const {
      selectedAmountMin,
      selectedAmountMax,
      selectBeds,
      propertyState,
      selectedAreaMin,
      selectedAreaMax,
      is_agency,
    } = simpleContext.appState;
    if (
      simpleContext.appState.selectedSuggestions.length === 0 &&
      searchTerm != ""
    ) {
      toast.error("Please select a location from the suggestions.", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    try {
      simpleContext.setAppState((s) => ({ ...s, loading: true }));
      const filters = {
        price_min: cleanValue(selectedAmountMin),
        price_max: cleanValue(selectedAmountMax),
        area_min: selectedAreaMin,
        area_max: selectedAreaMax,
        bedrooms: selectBeds.trim(),
        is_posted_by_agency: is_agency,
        property_type:
          propertyState.selectedSubProperty ||
          propertyState.selectedPropertyType,
      };
      const queryString = new URLSearchParams();

      if (simpleContext.appState.selectedCity) {
        queryString.set("city", simpleContext.appState.selectedCity);
      }

      if (simpleContext.appState.selectedSuggestions.length > 0) {
        queryString.set(
          "location_ids",
          simpleContext.appState.selectedSuggestions
            .map((suggestion) => suggestion.name.split(",")[0])
            .join(",")
        );
      }

      if (filters.price_min) {
        queryString.set("price_min", filters.price_min);
      }

      if (filters.price_max) {
        queryString.set("price_max", filters.price_max);
      }

      if (filters.area_min) {
        queryString.set("area_min", filters.area_min);
      }

      if (filters.area_max) {
        queryString.set("area_max", filters.area_max);
      }

      if (filters.property_type) {
        queryString.set("propertyType", filters.property_type);
      }

      if (filters.bedrooms) {
        queryString.set("beds", filters.bedrooms);
      }

      if (filters.is_posted_by_agency) {
        queryString.set("agency", filters.is_posted_by_agency.toString());
      }

      if (sort_by) {
        queryString.set("sort_by", sort_by);
      }
      if (sort_order) {
        queryString.set("sort_order", sort_order);
      }
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);
      if (formattedStartDate) {
        queryString.set("startDate", formattedStartDate);
      }
      if (formattedEndDate) {
        queryString.set("end_date", formattedEndDate);
      }

      const data = await searchCityData(
        simpleContext.appState.selectedCity,
        simpleContext.appState.selectedSuggestions.map(
          (suggestion) => suggestion.id
        ),
        1,
        sort_by,
        sort_order,
        filters,
        propertyCategory,
        startDate ? startDate.toDateString() : "",
        endDate ? endDate.toDateString() : ""
      );
      const { properties, total_count, page_size, page_number } = data ?? {
        properties: [],
        total_count: 0,
        page_size: 10,
      };

      simpleContext.setAppState((s) => ({
        ...s,
        cardData: properties,
        pageData: { total_count: Number(total_count), page_number },
        isApiCall: true,
        totalPages: Math.ceil(Number(total_count) / Number(page_size)),
        currentPage: page_number,
        loading: data == null,
      }));
      navigate(`/search-results?${queryString.toString()}`, {
        state: {
          cardData: properties,
          totalCount: total_count,
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      simpleContext.setAppState((s) => ({ ...s, loading: false }));
    } finally {
      setIsRequestInProgress(false);
    }
  };

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    handleSortChange();
  }, [
    simpleContext.appState.selectedAmountMin,
    simpleContext.appState.selectedAmountMax,
    simpleContext.appState.selectBeds,
    simpleContext.appState.propertyState.selectedPropertyType,
    simpleContext.appState.propertyState.selectedSubProperty,
    simpleContext.appState.selectedAreaMin,
    simpleContext.appState.selectedAreaMax,
    startDate,
    endDate,
    simpleContext.appState.selectedSuggestions,
    propertyCategory,
    simpleContext.appState.is_agency,
  ]);

  useEffect(() => {
    loadRecommendationsData();
  }, [selectedSuggestions, propertyCategory, propertyState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };
  const handlePageChange = (page_number) => {
    fetchCityData(
      simpleContext.appState.selectedCity,
      simpleContext.appState.selectedSuggestions,
      page_number,
      sortBy || "added",
      sortOrder || "DESC",
      propertyCategory,
      startDate ? startDate.toISOString() : "",
      endDate ? endDate.toISOString() : ""
    );
  };

  const handleChange = async (e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    simpleContext.setAppState((s) => ({
      ...s,
      searchTerm: newValue,
    }));
    saveToLocalStorage("searchTerm", newValue);
    if (newValue.length > 2) {
      try {
        const suggestions = await fetchSearchSuggestions(
          simpleContext.appState.selectedCity,
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

  const handleSortChange = (newSortBy) => {
    let newSortOrder = sortOrder;
    let newSortOrderDate = sortOrderDate;
    let newSortByValue = sortBy;
    let newSortByDateValue = sortByDate;

    if (newSortBy === "price") {
      if (sortBy === "price") {
        if (sortOrder === "ASC") {
          newSortOrder = "DESC";
        } else if (sortOrder === "DESC") {
          newSortOrder = null;
          newSortByValue = null;
        } else {
          newSortOrder = "ASC";
        }
      } else {
        newSortByValue = "price";
        newSortOrder = "ASC";
      }
    } else if (newSortBy === "added") {
      if (sortByDate === "added") {
        if (sortOrderDate === "ASC") {
          newSortOrderDate = "DESC";
        } else if (sortOrderDate === "DESC") {
          newSortOrderDate = null;
          newSortByDateValue = null;
        } else {
          newSortOrderDate = "ASC";
        }
      } else {
        newSortByDateValue = "added";
        newSortOrderDate = "ASC";
      }
    }

    // Determine the sort and order strings to pass to handleSearch
    const sort = [];
    const order = [];

    if (newSortByValue) {
      sort.push(newSortByValue);
      order.push(newSortOrder);
    }
    if (newSortByDateValue) {
      sort.push(newSortByDateValue);
      order.push(newSortOrderDate);
    }

    setSortBy(newSortByValue);
    setSortOrder(newSortOrder);
    setSortByDate(newSortByDateValue);
    setSortOrderDate(newSortOrderDate);

    handleSearch(sort.join(","), order.join(","));
  };

  useEffect(() => {
    const sort = [];
    const order = [];

    if (sortBy) {
      sort.push(sortBy);
      order.push(sortOrder);
    }
    if (sortByDate) {
      sort.push(sortByDate);
      order.push(sortOrderDate);
    }
  }, [sortBy, sortOrder, sortByDate, sortOrderDate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      emptySearchString();
      if (!event.target.closest(".suggestions-container")) {
        setIsVisibleSuggestions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const emptySearchString = () => {
    setSearchTerm("");
    setSuggestions([]);
  };

  const displayText =
    propertyState.selectedSubProperty || propertyState.selectedPropertyType;
  const capitalizedText = firstLetterUpperCase(displayText);

  return (
    <main className="px-4 md:px-20 lg:px-44 py-5">
      <div>
        <div className="text-lg font-bold">
          <span>{formatPrice(totalCount)} Results</span>{" "}
        </div>
      </div>
      <div>
        {simpleContext.appState.selectedSuggestions.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2 suggestions-container">
            {simpleContext.appState.selectedSuggestions.length > 5 &&
            !isVisibleSuggestions ? (
              <>
                <div>
                  <div className="flex items-center gap-2 relative bg-gray-200 p-2 cursor-pointer text-xs text-black rounded-full shadow-md hover:bg-gray-300 transition-colors duration-300">
                    <span>
                      {
                        simpleContext.appState.selectedSuggestions[0].name.split(
                          ","
                        )[0]
                      }
                    </span>
                    <div>
                      <RxCross2
                        onClick={() =>
                          removeSuggestion(
                            simpleContext.appState.selectedSuggestions[0]
                          )
                        }
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="bg-[#0071BC] p-2 rounded-full cursor-pointer text-xs text-white shadow-md hover:bg-blue-600 transition-colors duration-300"
                  onClick={() => setIsVisibleSuggestions(true)}
                >
                  +{simpleContext.appState.selectedSuggestions.length - 1} more
                </div>
              </>
            ) : (
              <>
                {simpleContext.appState.selectedSuggestions.map(
                  (suggestion, index) => (
                    <div key={index}>
                      <div className="flex items-center gap-2 relative bg-gray-200 p-2 cursor-pointer text-xs text-black rounded-full shadow-md hover:bg-gray-300">
                        <span className="ellipsis-text">
                          {suggestion.name.split(",")[0]}
                        </span>
                        <div>
                          <RxCross2
                            onClick={() => removeSuggestion(suggestion)}
                          />
                        </div>
                      </div>
                    </div>
                  )
                )}
                {isVisibleSuggestions && (
                  <div className="absolute z-10 w-full text-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
                    {simpleContext.appState.selectedSuggestions.map(
                      (suggestion, index) => (
                        <div key={index} className=""></div>
                      )
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-5 grid-cols-1 gap-4 py-4">
          <div>
            <HeaderCity
              abortController={abortController}
              setIsSelectOpen={setIsSelectOpen}
            />
          </div>
          <div className="relative">
            <div className=" w-[100%]">
              <Input
                value={searchTerm}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                type="text"
                placeholder="Search Here..."
                className="rounded-3xl border-2 pr-12"
                style={{
                  pointerEvents: isSelectOpen ? "none" : "auto",
                }}
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
            <div className="absolute z-10 text-black overscroll-auto max-h-80 overflow-y-scroll">
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
                      {suggestion.name}
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
            <HeaderArea />
          </div>
          <div>
            <HeaderOwnerDetail />
          </div>
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <div>
            <HeaderFilter
              onSortChange={handleSortChange}
              sortBy={sortBy}
              sortOrder={sortOrder}
              sortByDate={sortByDate}
              sortOrderDate={sortOrderDate}
              totalCount={totalCount}
            />
          </div>
        </div>
      </form>
      <div>
        <p className="font-montserrat text-2xl font-bold">
          <span>{capitalizedText}</span> Properties in{" "}
          <span className="text-[#0071BC] font-semibold">
            {simpleContext.appState.selectedSuggestions
              .map((suggestion) => displayFirstName(suggestion.name))
              .join(", ") || simpleContext.appState.selectedCity}
          </span>
        </p>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 py-5">
        {loading ? (
          Array.from({ length: 12 }).map((_, index) => (
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
                <div className="grid grid-cols-2 md:grid-cols-1">
                  <div>
                    {item.cover_photo_url ? (
                      <div className="relative">
                        <img
                          src={item.cover_photo_url}
                          alt="photo"
                          className="w-full h-52 object-cover rounded-t-md"
                        />
                        <div className="flex items-center absolute top-2 left-2 gap-2">
                          <div className="p-1 md:p-2 rounded-sm md:rounded-full shadow-md text-xs bg-[#0071BC] text-white">
                            {item.type.replace("_", " ")}
                          </div>
                          {item.agency && (
                            <div className="p-2 rounded-sm md:rounded-full shadow-md text-xs bg-[#0071BC] text-white">
                              <div>{item.agency}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <img
                        src="/img/NoImage.png"
                        alt="dummy"
                        className="w-full h-52 object-fit rounded-t-md"
                      />
                    )}
                  </div>
                  <div>
                    <CardHeader>
                      <div>
                        <div className="flex justify-between item-center hidden md:block">
                          <CardTitle className="text-sm md:text-base font-semibold">
                            {item.header}
                          </CardTitle>
                        </div>
                        <div className="py-2">
                          <CardDescription className="text-sm md:text-base font-semibold">
                            {item.location.split(",").slice(0, 2)}
                          </CardDescription>
                        </div>
                        <div className="py-2">
                          <div>
                            <CardDescription>
                              Added: {formatTimeNow(item.added)}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="py-2">
                          <CardDescription>
                            <div className="flex justify-left gap-1 md:gap-3 text-xs">
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
                          <CardDescription className="text-lg md:text-2xl font-bold">
                            PKR {conversionFunction(item.price)}
                          </CardDescription>
                          <div className="hidden md:block">
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
                      </div>
                    </CardHeader>
                  </div>
                </div>
              </Link>
              <CardDescription>
                {item.description.length > 100 && (
                  <button
                    onClick={() => handleToggleExpand(item.id)}
                    className="text-sm underline p-6 py-3 hidden md:block"
                  >
                    {expandedCards[item.id] ? "See less" : "See more"}
                  </button>
                )}
              </CardDescription>
            </Card>
          ))
        )}
      </div>

      <div className="py-4">
        {cardData.length > 0 && cardData.length >= 12 && (
          <Paging
            currentPage={simpleContext.appState.pageData.page_number}
            totalPages={simpleContext.appState.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      <div>
        <TopPropertyArea conversionFunction={conversionFunction} />
      </div>
    </main>
  );
};
CardsDetail.propTypes = {
  conversionFunction: PropTypes.func.isRequired,
  propertyCategory: PropTypes.string.isRequired,
};
export default CardsDetail;
