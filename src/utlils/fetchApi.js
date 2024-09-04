import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const abortControllers = new Map();

function getAbortController(key) {
  if (abortControllers.has(key)) {
    abortControllers.get(key).abort();
  }
  const controller = new AbortController();
  abortControllers.set(key, controller);
  return controller;
}

async function fetchFeaturedProperties(propertyCategory = "for_sale") {
  const controller = getAbortController("fetchFeaturedProperties");
  try {
    const response = await axios.get(
      `${API_URL}/property/featured?purpose=${propertyCategory}`,
      {
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
        signal: controller.signal,
      }
    );
    return response.data.data.properties;
  } catch (error) {
    if (error.name === "AbortError") {
      // Request was canceled; do not show an error message
    } else {
      // Handle other errors
      const errorMessage =
        error.message || "Failed to fetch featured properties.";
      console.error("Error fetching featured properties:", errorMessage);
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
      });
    }
    throw error;
  }
}

async function fetchSimilarProperties(
  similarPropertyId,
  propertyCategory = "for_sale"
) {
  try {
    const response = await axios.get(
      `${API_URL}/property/similar?id=${similarPropertyId}&purpose=${propertyCategory}`,
      {
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      }
    );

    return response.data.data.properties;
  } catch (error) {
    const errorMessage =
      error.message || "Failed to fetch featured properties.";
    console.error("Error fetching featured properties:", errorMessage);
    toast.error(errorMessage, {
      position: "top-center",
      autoClose: 5000,
    });
    throw error;
  }
}

async function fetchPropertyDetails(id) {
  try {
    const response = await axios.get(`${API_URL}/property/${id}`, {
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    });
    return response.data.data;
  } catch (error) {
    const errorMessage =
      error.message || "Failed to fetch featured properties.";
    console.error("Error fetching featured properties:", errorMessage);
    toast.error(errorMessage, {
      position: "top-center",
      autoClose: 5000,
    });
    throw error;
  }
}

async function searchCityData(
  city,
  queries = [],
  page_number = 1,
  sort_by = "price",
  sort_order = "ASC",
  filters = {},
  propertyCategory = "for_sale",
  start_date,
  end_date
) {
  const controller = getAbortController("searchCityData");
  const page_size = 12;

  try {
    const {
      price_min,
      price_max,
      area_min,
      area_max,
      bedrooms,
      is_posted_by_agency,
      property_type = "",
    } = filters;

    const queryString = queries.join(",");

    // Create an instance of URLSearchParams to build the query string
    const params = new URLSearchParams({
      location_ids: queryString,
      page_size: page_size.toString(),
      page_number: page_number.toString(),
      sort_by,
      sort_order,
      property_type: property_type.toLowerCase().replace(" ", "_"),
      area_min: area_min || "",
      area_max: area_max || "",
      price_min: price_min || "",
      price_max: price_max || "",
      bedrooms: bedrooms || "",
      is_posted_by_agency: is_posted_by_agency?.toString() || "",
      purpose: propertyCategory,
      start_date: start_date || "",
      end_date: end_date || "",
    });

    const url = `${API_URL}/property/search/${city ?? ""}?${params.toString()}`;

    const response = await axios.get(url, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
      signal: controller.signal,
    });

    return response.data.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      const errorMessage = error.message || "Failed to search city data.";
      console.error("Error searching city data:", errorMessage);
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
      });
      throw error;
    }
  }
}

async function fetchAvailableCities() {
  try {
    const response = await axios.get(`${API_URL}/property/available-cities`, {
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    });
    return response.data.data;
  } catch (error) {
    const errorMessage = error.message || "Failed to fetch available cities";
    console.error("Error fetching available cities:", errorMessage);
    toast.error(errorMessage, {
      position: "top-center",
      autoClose: 5000,
    });
    throw error;
  }
}

export async function fetchPropertyCount(propertyCategory = "for_sale") {
  const controller = getAbortController("fetchPropertyCount");
  try {
    const response = await axios.get(
      `${API_URL}/property/count?purpose=${propertyCategory}`,
      {
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
        signal: controller.signal,
      }
    );
    return response.data.data;
  } catch (error) {
    if (error.name === "AbortError") {
      // Request was canceled; do not show an error message
    } else {
      // Handle other errors
      const errorMessage = error.message || "Failed to fetch count properties.";
      console.error("Error fetching count properties:", errorMessage);
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
      });
    }
    throw error;
  }
}

async function fetchSearchSuggestions(city, query) {
  const controller = getAbortController("fetchSearchSuggestions");
  try {
    const url = `${API_URL}/property/suggestions/${city ?? ""}?query=${query}`;

    const response = await axios.get(url, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
      signal: controller.signal,
    });
    return response.data.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      return [];
    }
    const errorMessage = error.message || "Failed to search city data.";
    console.error("Error searching city data:", errorMessage);
    toast.error(errorMessage, {
      position: "top-center",
      autoClose: 5000,
    });
    throw error;
  }
}

async function fetchPropertyRecommendations({
  city = "",
  queries = [],
  propertyCategory = "for_sale",
  property_type,
  area_min,
  area_max,
  page_number = 1,
}) {
  try {
    const formattedPropertyType =
      typeof property_type === "string"
        ? property_type.toLowerCase().replace(" ", "_")
        : "";
    const queryString = queries.map((query) => `${query}`).join(",");
    const response = await axios.get(
      `${API_URL}/property/best/${city}?location_ids=${queryString}&purpose=${propertyCategory}&area_min=${
        area_min ?? ""
      }&area_max=${
        area_max ?? ""
      }&page_number=${page_number}&property_type=${formattedPropertyType}`,
      {
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      }
    );
    return response.data.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      const errorMessage = error.message || "Failed to search city data.";
      console.error("Error searching city data:", errorMessage);
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
      });
      throw error;
    }
  }
}

async function fetchLocationTreeData() {
  try {
    const response = await axios.get(`${API_URL}/property/locations`, {
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    });
    return response.data.data;
  } catch (error) {
    const errorMessage =
      error.message || "Failed to fetch featured properties.";
    console.error("Error fetching featured properties:", errorMessage);
    toast.error(errorMessage, {
      position: "top-center",
      autoClose: 5000,
    });
    throw error;
  }
}

export {
  fetchFeaturedProperties,
  fetchSimilarProperties,
  fetchPropertyDetails,
  searchCityData,
  fetchAvailableCities,
  fetchSearchSuggestions,
  fetchPropertyRecommendations,
  fetchLocationTreeData,
};
