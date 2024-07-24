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

const Header = ({ propertyCategory }) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("islamabad");
  const [suggestions, setSuggestions] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
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
        searchTerm,
        1,
        "id",
        "ASC",
        filters,
        propertyCategory
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

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="relative">
      <div>
        <img src="img/bg_image.svg" alt="bg_image" />
      </div>
      <div className="absolute top-20 left-0 right-0 mx-auto max-w-5xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-montserrat font-semibold text-5xl text-[#FFFFFF] leading-10 py-3">
              Discover a place you&apos;ll love calling home.
            </h1>
          </div>
        </div>
        <Card className="relative bg-black bg-opacity-50 border-none">
          <CardHeader>
            <div className="flex justify-between">
              <div className="w-[100%]">
                <form onSubmit={handleSubmit}>
                  <div className="flex items-center gap-4 py-2 text-white font-montserrat font-semibold text-lg cursor-pointer">
                    <input type="radio" id="rent" name="fav_language" />
                    <label htmlFor="rent" className="cursor-pointer">
                      Rent
                    </label>
                    <input type="radio" id="buy" name="fav_language" />
                    <label htmlFor="buy" className="cursor-pointer">
                      Buy
                    </label>
                    <input type="radio" id="other" name="fav_language" />
                    <label htmlFor="other" className="cursor-pointer">
                      Other
                    </label>
                  </div>
                  <div className="grid md:grid-cols-8 grid-cols-1 font-montserrat font-medium text-lg">
                    <div className="grid col-span-2">
                      <Select onValueChange={setSelectedCity}>
                        <SelectTrigger className="rounded-none rounded-tl-lg rounded-bl-lg">
                          <SelectValue placeholder="Location" />
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
                    <div className="grid col-span-5 relative">
                      <Input
                        value={searchTerm}
                        onChange={handleChange}
                        onClick={isVisible || toggleVisibility}
                        placeholder="Location"
                        className="rounded-none"
                      />
                      <div className="absolute z-10 mt-10 w-[42%] text-black">
                        {suggestions.length > 0 && (
                          <ul className="bg-white border border-gray-200 w-full rounded">
                            {suggestions.map((suggestion, index) => (
                              <li
                                key={index}
                                className="p-2 cursor-pointer hover:bg-gray-200 text-sm"
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
                    </div>
                    <div className="grid grid-cols-1">
                      <Button
                        onClick={handleSearch}
                        className="rounded-none flex items-center justify-center rounded-tr-lg rounded-br-lg bg-white text-black hover:bg-gray-100"
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
                        {/* <p className="text-sm">Location</p>
                        <Input
                          value={searchTerm}
                          onChange={handleChange}
                          // onClick={isVisible || toggleVisibility}
                          placeholder="Enter Location"
                        />
                      </div> */}
                        <br />
                        <div className="grid md:grid-cols-4 grid-cols-1 gap-4 font-montserrat font-medium text-lg">
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
                      {/* <div>
                      <Button onClick={handleSearch} className="w-[24%]">
                        Search
                      </Button>
                    </div> */}
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
};

export default Header;
