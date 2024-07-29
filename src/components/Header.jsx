import { Input } from "@/components/ui/input";
import { useCallback, useContext, useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { appContext } from "@/contexts/Context";
import { Button } from "./ui/button";
import { saveToLocalStorage } from "@/utlils/SaveLocalStorage";
import { Card, CardHeader } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
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

const Header = ({ propertyCategory, setPropertyCategory }) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("islamabad");
  const [suggestions, setSuggestions] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [propertyView, setPropertyView] = useState("");
  const [isVisibleSuggestions, setIsVisibleSuggestions] = useState(false);
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
    fetchData();
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
    if (simpleContext.appState.selectedSuggestions.length === 0) {
      toast.error("Please select a location from the suggestions.", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    try {
      simpleContext.setAppState((s) => ({
        ...s,
        loading: true,
      }));

      const {
        selectedAmountMin,
        selectedAmountMax,
        selectedAreaMin,
        selectedAreaMax,
        selectBeds,
        propertyState,
      } = simpleContext.appState;

      const filters = {
        price_min: cleanValue(selectedAmountMin),
        price_max: cleanValue(selectedAmountMax),
        area_min: selectedAreaMin,
        area_max: selectedAreaMax,
        bedrooms: selectBeds,
        property_type:
          propertyState.selectedSubProperty ??
          propertyState.selectedPropertyType,
      };

      const data = await searchCityData(
        selectedCity,
        simpleContext.appState.selectedSuggestions,
        1,
        "id",
        "ASC",
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

      navigate("/search-results", {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    handleSearch();
  };
  const toggleVisibility = () => setIsVisible(!isVisible);

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
    <div className="relative">
      <div>
        <img src="img/bg_image.svg" alt="bg_image" className="w-full" />
      </div>
      <div className="lg:absolute top-20 left-0 right-0 mx-auto max-w-5xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-montserrat font-semibold text-5xl text-[#FFFFFF] leading-10 py-3">
              Discover a place you&apos; love calling home.
            </h1>
          </div>
        </div>
        <Card className="relative bg-black bg-opacity-50 border-none">
          <CardHeader>
            <div className="flex justify-between">
              <div className="w-[100%]">
                <form onSubmit={handleSubmit}>
                  <div className="flex items-center gap-4 py-2 text-white font-montserrat font-semibold text-lg cursor-pointer">
                    <input
                      type="radio"
                      id="rent"
                      name="propertyView"
                      value="for_rent"
                      checked={
                        propertyView === "for_rent" ||
                        propertyCategory == "for_rent"
                      }
                      onChange={(e) => setPropertyView(e.target.value)}
                    />
                    <label htmlFor="rent" className="cursor-pointer">
                      Rent
                    </label>
                    <input
                      type="radio"
                      id="buy"
                      name="propertyView"
                      value="for_sale"
                      checked={
                        propertyView === "for_sale" ||
                        propertyCategory == "for_sale"
                      }
                      onChange={(e) => setPropertyView(e.target.value)}
                    />
                    <label htmlFor="buy" className="cursor-pointer">
                      Buy
                    </label>
                    <input
                      type="radio"
                      id="other"
                      name="propertyCategory"
                      value="other"
                      checked={propertyCategory === "other"}
                      onChange={(e) => setPropertyCategory(e.target.value)}
                    />
                    <label htmlFor="other" className="cursor-pointer">
                      Other
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-8 gap-y-4 font-montserrat font-medium text-lg">
                    <div className="col-span-1 md:col-span-2">
                      <Select onValueChange={setSelectedCity}>
                        <SelectTrigger className="rounded-none rounded-tl-lg rounded-bl-lg">
                          <SelectValue placeholder="Islamabad" />
                        </SelectTrigger>
                        <SelectContent>
                          {data.map((item) => (
                            <SelectItem
                              className="cursor-pointer"
                              key={item}
                              value={item}
                            >
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-1 md:col-span-5 relative">
                      <Input
                        value={searchTerm}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        onClick={isVisible || toggleVisibility}
                        placeholder="Location"
                        className="rounded-none"
                      />
                      <div className="absolute z-10 w-full text-black">
                        {suggestions.length > 0 && (
                          <ul className="bg-white border border-gray-200 w-full">
                            {suggestions.map((suggestion, index) => (
                              <li
                                key={index}
                                className={`p-2 cursor-pointer hover:bg-gray-200 text-sm ${
                                  index === selectedIndex ? "bg-gray-200" : ""
                                }`}
                                onClick={() =>
                                  handleSuggestionClick(suggestion)
                                }
                              >
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      {simpleContext.appState.selectedSuggestions.length >
                        0 && (
                        <div className="mt-2 flex flex-wrap suggestions-container">
                          {simpleContext.appState.selectedSuggestions.length >
                            2 && !isVisibleSuggestions ? (
                            <div
                              className="bg-gray-200 p-2 mr-2 mb-2 rounded cursor-pointer text-xs"
                              onClick={() => setIsVisibleSuggestions(true)}
                            >
                              x
                              {
                                simpleContext.appState.selectedSuggestions
                                  .length
                              }
                            </div>
                          ) : (
                            <div>
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

                    <div className="col-span-1 md:col-span-1">
                      <Button
                        onClick={handleSearch}
                        className="rounded-none flex items-center justify-center rounded-tr-lg rounded-br-lg bg-white text-black hover:bg-gray-100 md:w-full"
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
                        <div className="grid md:grid-cols-4 grid-cols-1 gap-4 font-montserrat font-medium text-lg py-4">
                          <div>
                            <p className="text-sm text-white">Price Range</p>
                            <PriceTag />
                          </div>
                          <div>
                            <p className="text-sm text-white">Property Type</p>
                            <PropertyTag />
                          </div>
                          <div>
                            <p className="text-sm text-white">Area</p>
                            <AreaTag />
                          </div>
                          <div>
                            <p className="text-sm text-white">Bedrooms</p>
                            <BedsTag />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          variant="primary"
                          onClick={toggleVisibility}
                          className="text-xs text-white font-montserrat font-bold text-base leading-5"
                        >
                          {isVisible ? "Less" : "More"}
                          {isVisible ? (
                            <FaAngleUp className="ml-2" />
                          ) : (
                            <FaAngleDown className="ml-2" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
                {simpleContext.appState.loading && <Spinner />}
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
Header.propTypes = {
  propertyCategory: PropTypes.string.isRequired,
  setPropertyCategory: PropTypes.func.isRequired,
};

export default Header;
