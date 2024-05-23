import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "./components/ui/DateRangePicker";
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
import Paging from "./Paging";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import PriceTag from "./header_Component/priceTag/PriceTag";
import AreaTag from "./header_Component/areaTag/AreaTag";
import BedsTag from "./header_Component/beds/BedsTag";
import PropertyTag from "./header_Component/property_type/PropertyTag";

const Header = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const simpleContext = useContext(appContext);

  const fetchCityData = async (city) => {
    try {
      const response = await fetch(
        `https://6cb8-2407-d000-1a-5017-1522-91ce-b14-71a.ngrok-free.app/property/${city}?page_size=6&page_number=1&sort_by=id&sort_order=ASC`,
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
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const searchCityData = async (city, query, page_number = 1) => {
    try {
      const response = await fetch(
        `https://6cb8-2407-d000-1a-5017-1522-91ce-b14-71a.ngrok-free.app/property/search/${city}?query=${query}&page_size=6&page_number=${page_number}&sort_by=id&sort_order=ASC`,
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
      }));
      setTotalPages(Number(jsonData.data.total_count));
      setCurrentPage(page_number);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://6cb8-2407-d000-1a-5017-1522-91ce-b14-71a.ngrok-free.app/property/available-cities",
          {
            method: "get",
            headers: new Headers({
              "ngrok-skip-browser-warning": "69420",
            }),
          }
        );
        const jsonData = await response.json();
        setData(jsonData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleSearch = () => {
    if (searchTerm) {
      searchCityData(selectedCity, searchTerm);
    } else if (selectedCity) {
      searchCityData(selectedCity);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handlePageChange = (page_number) => {
    const city = selectedCity;
    searchCityData(city, searchTerm, page_number);
  };
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="w-[20%] text-4xl font-bold">
          <p>Dashboard</p>
        </div>
        <div className="w-[80%] p-2">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center w-[100%] gap-5">
              <div className="w-[20%] text-4xl font-bold">
                <Select onValueChange={fetchCityData}>
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
              <div className="w-[40%]">
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search"
                />
              </div>
              <div>
                <Button onClick={handleSearch}>Search</Button>
              </div>
              <div>
                <DatePickerWithRange />
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
                  <div className="flex justify-between mt-4 rounded gap-5">
                    <div className="w-[25%]">
                      <PropertyTag />
                    </div>
                    <div className="w-[25%]">
                      <PriceTag />
                    </div>
                    <div className="w-[25%]">
                      <AreaTag />
                    </div>
                    <div className="w-[25%]">
                      <BedsTag />
                    </div>
                  </div>
                </div>
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
        </div>
      </div>
      <div className="mt-2">
        <Paging
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Header;
