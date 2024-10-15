import { useContext, useEffect, useState } from "react";
import { fetchAvailableCities } from "../../utlils/fetchApi";
import { appContext } from "../../contexts/Context";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Button } from "../../components/ui/button";
import { IoIosArrowDown } from "react-icons/io";

const HeaderCity = ({ abortController, setIsSelectOpen }) => {
  const simpleContext = useContext(appContext);
  const [cityOptions, setCityOptions] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const cities = await fetchAvailableCities(); // Fetch cities from your API
        setCityOptions(cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cityFromUrl = params.get("city");
    if (cityFromUrl) {
      simpleContext.setAppState((s) => ({ ...s, selectedCity: cityFromUrl }));
    }
  }, []);

  const handleCityChange = (city) => {
    abortController.abort();
    if (!city) {
      return;
    }
    simpleContext.setAppState((s) => ({
      ...s,
      selectedCity: city,
      selectedSuggestions: [],
    }));
  };
  const handleOpenChange = (open) => {
    setIsSelectOpen(open);
  };

  const selectedCity = simpleContext.appState.selectedCity || "Select a city";

  return (
    <div>
      <Popover onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button className="rounded-3xl border-2 w-full flex justify-start bg-white text-black focus:bg-white active:bg-white hover:bg-white dark:bg-black dark:text-white">
            <div className="flex justify-between items-center w-full">
              <div>{selectedCity}</div>
              <div>
                <IoIosArrowDown />
              </div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="dark:bg-black">
          {cityOptions.map((city) => (
            <div
              key={city}
              onClick={() => handleCityChange(city)}
              className="cursor-pointer p-2 dark:bg-black dark:hover:bg-gray-900 hover:bg-gray-100"
            >
              {city}
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
};

HeaderCity.propTypes = {
  abortController: PropTypes.object.isRequired,
  setIsSelectOpen: PropTypes.func.isRequired,
};

export default HeaderCity;
