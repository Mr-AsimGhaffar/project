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

const HeaderCity = ({ abortController }) => {
  const simpleContext = useContext(appContext);
  const [cityOptions, setCityOptions] = useState([]);

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

  const handleCityChange = (city) => {
    abortController.abort();
    simpleContext.setAppState((s) => ({
      ...s,
      selectedCity: city,
      selectedSuggestions: [],
    }));
  };

  return (
    <div>
      <Select
        onValueChange={handleCityChange}
        value={simpleContext.appState.selectedCity}
      >
        <SelectTrigger className="rounded-3xl border-2">
          <SelectValue placeholder="Select a city" />
        </SelectTrigger>
        <SelectContent>
          {cityOptions.map((city) => (
            <SelectItem key={city} value={city}>
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
};

export default HeaderCity;