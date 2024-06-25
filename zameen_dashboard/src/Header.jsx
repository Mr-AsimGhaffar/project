import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { appContext } from "./Context";
import { useContext, useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import PriceTag from "./header_Component/priceTag/PriceTag";
import AreaTag from "./header_Component/areaTag/AreaTag";
import BedsTag from "./header_Component/beds/BedsTag";
import PropertyTag from "./header_Component/property_type/PropertyTag";
import { Card, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { saveToLocalStorage } from "./utlils/SaveLocalStorage";

const Header = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const simpleContext = useContext(appContext);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const searchCityData = async (city, query, page_number = 1) => {
    try {
      simpleContext.setAppState((s) => ({
        ...s,
        loading: true,
      }));
      const price_min = simpleContext.appState.selectedAmountMin?.replace(
        /,/g,
        ""
      );
      const price_max = simpleContext.appState.selectedAmountMax?.replace(
        /,/g,
        ""
      );
      const area_min = simpleContext.appState.selectedAreaMin;
      const area_max = simpleContext.appState.selectedAreaMax;
      const bedrooms = simpleContext.appState.selectBeds.trim();
      const property_type = simpleContext.appState.selectedSubProperty;
      const response = await fetch(
        `${API_URL}/property/search/${city ?? ""}?query=${
          query ?? ""
        }&page_size=10&page_number=${
          page_number ?? ""
        }&sort_by=id&sort_order=ASC&property_type=${property_type}&area_min=${
          area_min ?? ""
        }&area_max=${area_max ?? ""}&price_min=${price_min ?? ""}&price_max=${
          price_max ?? ""
        }&bedrooms=${bedrooms ?? ""}`,
        {
          method: "get",
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
          }),
        }
      );
      const jsonData = await response.json();
      simpleContext.setAppState((s) => ({
        ...s,
        cardData: jsonData.data.properties,
        pageData: {
          total_count: Number(jsonData.data.total_count),
          page_number,
        },
        graphData: jsonData.data.property_count_map,
        isApiCall: true,
      }));
      navigate("/search-results", {
        state: {
          cardData: jsonData.data.properties,
          totalCount: jsonData.data.total_count,
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
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_URL}/property/available-cities`, {
          method: "get",
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
          }),
        });
        const jsonData = await response.json();
        setData(jsonData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [API_URL]);

  useEffect(() => {
    // const storedSearchTerm = loadFromLocalStorage("searchTerm");
    // if (storedSearchTerm) {
    // setSearchTerm(storedSearchTerm);
    simpleContext.setAppState((s) => ({
      ...s,
      searchTerm: searchTerm,
    }));
    // }
  }, [simpleContext]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      searchCityData(selectedCity, searchTerm);
    } else if (selectedCity) {
      searchCityData(selectedCity);
    }
  };
  const handleChange = (e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    simpleContext.setAppState((s) => ({
      ...s,
      searchTerm: newValue,
    }));
    saveToLocalStorage("searchTerm", newValue);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">Property Search</div>
        <div>
          <Button
            className="text-lg"
            variant="link"
            onClick={isVisible || toggleVisibility}
          >
            Advance Search
          </Button>
        </div>
      </div>
      <br />
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div className="w-[100%] p-2">
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
                  <div className=" text-4xl font-bold">
                    <Select onValueChange={setSelectedCity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                      <SelectContent>
                        {data.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid col-span-2">
                    <Input
                      value={searchTerm}
                      onChange={handleChange}
                      onClick={toggleVisibility}
                      placeholder="Location"
                    />
                  </div>
                  <div className="grid grid-cols-1">
                    <Button onClick={handleSearch}>Search</Button>
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
                      <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
                        <div>
                          <p className="text-sm">Price Range</p>
                          <PriceTag />
                        </div>
                        <div>
                          <p className="text-sm">Property Type</p>
                          <PropertyTag />
                        </div>
                        <div>
                          <p className="text-sm">Area</p>
                          <AreaTag />
                        </div>
                        <div>
                          <p className="text-sm">Bedrooms</p>
                          <BedsTag />
                        </div>
                      </div>
                    </div>
                    {/* <div>
                      <Button onClick={handleSearch} className="w-[24%]">
                        Search
                      </Button>
                    </div> */}

                    <Button
                      onClick={toggleVisibility}
                      className="flex items-center px-1 py-1 bg-inherit hover:bg-inherit text-black text-xs"
                    >
                      {isVisible ? (
                        <FaAngleDown className="mr-2" />
                      ) : (
                        <FaAngleUp className="mr-2" />
                      )}
                      {isVisible ? "Less Options" : "More Options"}
                    </Button>
                  </div>
                </div>
              </form>
              {simpleContext.appState.loading && (
                <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
                  <div
                    role="status"
                    className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Header;
