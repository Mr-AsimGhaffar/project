import { Input } from "@/components/ui/input";
import { useCallback, useContext, useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { appContext } from "@/contexts/Context";
import { Button } from "./ui/button";
import { saveToLocalStorage } from "@/utlils/SaveLocalStorage";
import { Card, CardHeader } from "./ui/card";
import PriceTag from "./headerComponent/priceTag/PriceTag";
import AreaTag from "./headerComponent/areaTag/AreaTag";
import BedsTag from "./headerComponent/beds/BedsTag";
import PropertyTag from "./headerComponent/property_type/PropertyTag";
import Spinner from "./spinner/Spinner";
import {
  fetchAvailableCities,
  fetchSearchSuggestions,
  searchCityData,
} from "../utlils/fetchApi";
import PropTypes from "prop-types";
import { CiSearch } from "react-icons/ci";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import LazyLoad from "react-lazyload";
import { isBedsDisabled } from "../utlils/disableBed";
import { FiAlertTriangle } from "react-icons/fi";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { IoIosArrowDown } from "react-icons/io";

const Header = ({ propertyCategory, setPropertyCategory }) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [propertyView, setPropertyView] = useState("");
  const [isVisibleSuggestions, setIsVisibleSuggestions] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const simpleContext = useContext(appContext);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const cities = await fetchAvailableCities();
      setData(cities);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    setPropertyView(propertyCategory);
  }, [propertyCategory]);

  useEffect(() => {
    fetchData();
    simpleContext.setAppState((s) => ({
      ...s,
      selectedSuggestions: [],
      selectedAreaMin: "",
      selectedAreaMax: null,
      selectedCity: "islamabad",
    }));
  }, []);

  useEffect(() => {
    simpleContext.setAppState((s) => ({
      ...s,
      searchTerm: searchTerm,
    }));
  }, [searchTerm]);

  const cleanValue = (value) => (value ? value.replace(/,/g, "") : "");

  const handleSearch = async (e) => {
    e.preventDefault();
    const {
      selectedAmountMin,
      selectedAmountMax,
      selectedAreaMin,
      selectedAreaMax,
      selectBeds,
      propertyState,
      is_agency,
    } = simpleContext.appState;
    if (
      simpleContext.appState.selectedSuggestions.length === 0 &&
      searchTerm != ""
    ) {
      toast.error("Please select a location from the suggestions.", {
        position: "top-center",
        autoClose: 2000,
        style: {
          fontSize: "14px",
        },
        progressStyle: {
          background: "orange",
        },
        icon: <FiAlertTriangle style={{ color: "orange" }} />,
      });
      return;
    }
    try {
      simpleContext.setAppState((s) => ({
        ...s,
        loading: true,
      }));

      const filters = {
        price_min: cleanValue(selectedAmountMin),
        price_max: cleanValue(selectedAmountMax),
        area_min: selectedAreaMin || "",
        area_max: selectedAreaMax || "",
        bedrooms: selectBeds,
        is_posted_by_agency: is_agency,
        property_type:
          propertyState.selectedSubProperty ||
          propertyState.selectedPropertyType,
      };

      const queryString = new URLSearchParams();

      if (simpleContext.appState.selectedCity) {
        queryString.set("city", simpleContext.appState.selectedCity);
      }

      queryString.set(
        "location_ids",
        simpleContext.appState.selectedSuggestions
          .map(({ id, name }) => `${id}:${name.split(",")[0]}`)
          .join(",")
      );

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

      if (propertyState.selectedPropertyType) {
        queryString.set("propertyType", propertyState.selectedPropertyType);
      }

      if (propertyState.selectedSubProperty) {
        queryString.set("subPropertyType", propertyState.selectedSubProperty);
      }

      if (filters.bedrooms) {
        queryString.set("beds", filters.bedrooms);
      }

      if (filters.is_posted_by_agency) {
        queryString.set("agency", filters.is_posted_by_agency.toString());
      }

      queryString.set("sort_by", "added");
      queryString.set("sort_order", "DESC");

      const data = await searchCityData(
        simpleContext.appState.selectedCity,
        simpleContext.appState.selectedSuggestions.map(
          (suggestion) => suggestion.id
        ),
        1,
        "added",
        "DESC",
        filters,
        propertyView || propertyCategory
      );

      simpleContext.setAppState((s) => ({
        ...s,
        cardData: data.properties,
        pageData: {
          total_count: Number(data.total_count),
          page_number: 1,
        },
        totalPages: Math.ceil(
          Number(data.total_count) / Number(data.page_size)
        ),
        currentPage: data.page_number,
        isApiCall: true,
      }));

      navigate(`/search-results?${queryString.toString()}`, {
        state: {
          cardData: data.properties,
          totalCount: data.total_count,
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      simpleContext.setAppState((s) => ({
        ...s,
        loading: false,
      }));
    }
  };
  const handleChange = async (e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    simpleContext.setAppState((s) => ({
      ...s,
      searchTerm: newValue,
    }));
    saveToLocalStorage("searchTerm", newValue);
    if (newValue.length >= 2) {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    handleSearch(e);
  };
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const toggleOpen = () => {
    !isVisible && toggleVisibility();
  };

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

  const emptySuggestions = () => {
    simpleContext.setAppState((s) => ({
      ...s,
      selectedSuggestions: [],
    }));
  };

  const handleSelectCity = (city) => {
    emptySuggestions();
    simpleContext.setAppState((s) => ({
      ...s,
      selectedCity: city,
    }));
  };

  const emptySearchString = () => {
    setSearchTerm("");
    setSuggestions([]);
  };

  const handleOpenChange = (open) => {
    setIsSelectOpen(open);
    emptySearchString();
  };

  const bedsDisabled = isBedsDisabled(
    simpleContext.appState.propertyState.selectedPropertyType
  );

  return (
    <div className="relative">
      <LazyLoad height={200} offset={100} once>
        <img
          src="img/bg_image.jpeg"
          alt="bg_image"
          className="w-full md:h-[30rem] h-[10rem]"
        />
      </LazyLoad>

      <div className="lg:absolute top-28 left-0 right-0 mx-auto max-w-5xl">
        <div className="flex justify-between items-center">
          <div>
            <LazyLoad height={200} offset={100} once>
              <h1 className="font-montserrat font-semibold text-xl sm:text-3xl lg:text-5xl md:text-[#FFFFFF] text-black dark:text-white leading-10 py-3 text-center">
                Discover a place you&apos;ll love calling home.
              </h1>
            </LazyLoad>
          </div>
        </div>
        <LazyLoad height={200} offset={100} once>
          <Card className="relative bg-black bg-opacity-50 border-none p-4">
            <CardHeader className="p-0">
              <div className="flex justify-between">
                <div className="w-[100%]">
                  <form onSubmit={handleSubmit}>
                    <div className="flex items-center gap-4 text-white font-montserrat font-semibold text-lg cursor-pointer">
                      <input
                        type="radio"
                        id="buy"
                        name="propertyView"
                        value="for_sale"
                        checked={propertyView === "for_sale"}
                        onChange={(e) => {
                          setPropertyCategory(e.target.value);
                        }}
                        className="appearance-none bg-white border-2 border-[#0071BC] rounded-full w-5 h-5 checked:border-[#0071BC] checked:bg-[#0071BC]"
                      />
                      <label htmlFor="buy" className="cursor-pointer">
                        Buy
                      </label>
                      <input
                        type="radio"
                        id="rent"
                        name="propertyView"
                        value="for_rent"
                        checked={propertyView === "for_rent"}
                        onChange={(e) => {
                          setPropertyCategory(e.target.value);
                        }}
                        className="appearance-none bg-white border-2 border-[#0071BC] rounded-full w-5 h-5 checked:border-[#0071BC] checked:bg-[#0071BC]"
                      />
                      <label htmlFor="rent" className="cursor-pointer">
                        Rent
                      </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-8 gap-y-4 font-montserrat font-medium text-lg py-2">
                      <div className="col-span-1 md:col-span-2">
                        <Popover onOpenChange={handleOpenChange}>
                          <PopoverTrigger asChild>
                            <Button className="w-full flex justify-start text-left rounded-md md:rounded-tr-none md:rounded-br-none bg-white text-black focus:bg-white active:bg-white hover:bg-white dark:bg-black dark:text-white">
                              <div className="flex justify-between items-center w-full">
                                <div>
                                  {simpleContext.appState.selectedCity ||
                                    "Islamabad"}
                                </div>
                                <div>
                                  <IoIosArrowDown />
                                </div>
                              </div>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="dark:bg-black">
                            {data.map((item) => (
                              <div
                                key={item}
                                onClick={() => handleSelectCity(item)}
                                className="cursor-pointer dark:bg-black dark:hover:bg-gray-900 p-2 hover:bg-gray-100"
                              >
                                {item}
                              </div>
                            ))}
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="col-span-1 md:col-span-5 relative">
                        <Input
                          value={searchTerm}
                          onChange={handleChange}
                          onKeyDown={handleKeyDown}
                          onClick={toggleOpen}
                          placeholder="Location"
                          className="rounded-md md:rounded-none dark:bg-black"
                          style={{
                            pointerEvents: isSelectOpen ? "none" : "auto",
                          }}
                        />
                        <div className="absolute z-10 w-full text-black overscroll-auto max-h-80 overflow-y-scroll">
                          {suggestions.length > 0 && (
                            <ul className="bg-white dark:bg-black dark:text-white dark:border-black border border-gray-200 w-full">
                              {suggestions.map((suggestion, index) => (
                                <li
                                  key={index}
                                  className={`p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 text-sm ${
                                    index === selectedIndex
                                      ? "bg-gray-200 dark:bg-gray-900"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    handleSuggestionClick(suggestion)
                                  }
                                >
                                  {suggestion.name}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <div>
                          {simpleContext.appState.selectedSuggestions.length >
                            0 && (
                            <div className="mt-2 flex flex-wrap gap-2 suggestions-container">
                              {simpleContext.appState.selectedSuggestions
                                .length > 1 && !isVisibleSuggestions ? (
                                <>
                                  <div>
                                    <div className="flex items-center gap-2 truncate relative bg-gray-200 p-2 cursor-pointer text-xs rounded-full shadow-md hover:bg-gray-300 transition-colors duration-300">
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
                                              simpleContext.appState
                                                .selectedSuggestions[0]
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div
                                    className="bg-[#0071BC] p-2 rounded-full cursor-pointer text-xs text-white shadow-md hover:bg-blue-600 transition-colors duration-300"
                                    onClick={() =>
                                      setIsVisibleSuggestions(true)
                                    }
                                  >
                                    +
                                    {simpleContext.appState.selectedSuggestions
                                      .length - 1}{" "}
                                    more
                                  </div>
                                </>
                              ) : (
                                <>
                                  {simpleContext.appState.selectedSuggestions.map(
                                    (suggestion, index) => (
                                      <div key={index}>
                                        <div className="flex items-center gap-2 truncate relative bg-gray-200 p-2 cursor-pointer text-xs text-black rounded-full shadow-md hover:bg-gray-300">
                                          <span className="ellipsis-text">
                                            {suggestion.name.split(",")[0]}
                                          </span>
                                          <div>
                                            <RxCross2
                                              onClick={() =>
                                                removeSuggestion(suggestion)
                                              }
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
                      </div>

                      <div>
                        <Button
                          style={{
                            pointerEvents: isSelectOpen ? "none" : "auto",
                          }}
                          onClick={handleSearch}
                          className="w-full rounded-md flex items-center justify-center md:rounded-tl-none md:rounded-bl-none bg-white text-black dark:bg-black dark:text-white hover:bg-gray-100"
                        >
                          <CiSearch className="h-5 w-5 mr-2" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div
                          className={`transition-all duration-500 ${
                            isVisible
                              ? "max-h-96 opacity-100"
                              : "max-h-0 opacity-0 overflow-hidden"
                          }`}
                        >
                          <div className="grid md:grid-cols-4 grid-cols-1 gap-4 font-montserrat font-medium text-lg py-2">
                            <div>
                              <p className="text-sm text-white">Price Range</p>
                              <PriceTag />
                            </div>
                            <div>
                              <p className="text-sm text-white">
                                Property Type
                              </p>
                              <PropertyTag />
                            </div>
                            <div>
                              <p className="text-sm text-white">Area</p>
                              <AreaTag />
                            </div>
                            <div>
                              <p className="text-sm text-white">Bedrooms</p>
                              <BedsTag disabled={bedsDisabled} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="flex justify-end">
                    <Button
                      variant="primary"
                      onClick={toggleVisibility}
                      className="text-base text-white font-montserrat font-bold"
                    >
                      {isVisible ? "Less" : "More"}
                      {isVisible ? (
                        <FaAngleUp className="ml-2" />
                      ) : (
                        <FaAngleDown className="ml-2" />
                      )}
                    </Button>
                  </div>
                  {simpleContext.appState.loading && <Spinner />}
                </div>
              </div>
            </CardHeader>
          </Card>
        </LazyLoad>
      </div>
    </div>
  );
};
Header.propTypes = {
  propertyCategory: PropTypes.string,
  setPropertyCategory: PropTypes.func,
};

export default Header;
