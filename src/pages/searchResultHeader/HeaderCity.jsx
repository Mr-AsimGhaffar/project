import { useContext, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { fetchAvailableCities } from "../../utlils/fetchApi";
import { appContext } from "../../contexts/Context";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

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

  return (
    <div>
      <Select
        onValueChange={handleCityChange}
        onOpenChange={handleOpenChange}
        value={simpleContext.appState.selectedCity || ""}
      >
        <SelectTrigger className="rounded-3xl border-2 dark:bg-black">
          <SelectValue placeholder="Select a city" />
        </SelectTrigger>
        <SelectContent>
          {cityOptions.map((city) => (
            <SelectItem
              key={city}
              value={city}
              className="cursor-pointer dark:bg-black dark:hover:bg-gray-900"
            >
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

HeaderCity.propTypes = {
  abortController: PropTypes.object.isRequired,
  setIsSelectOpen: PropTypes.func.isRequired,
};

export default HeaderCity;
