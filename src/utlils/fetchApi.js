import { toast } from "react-toastify";
// import algoliasearch from "algoliasearch";

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
  try {
    const response = await fetch(
      `${API_URL}/property/featured?purpose=${propertyCategory}`,
      {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      }
    );
    if (!response.ok) {
      const errorMessage =
        "The page you were looking for doesn't exist. You may have misstyped the address or the page may have moved";
      throw new Error(errorMessage);
    }
    const jsonData = await response.json();
    return jsonData.data.properties;
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

async function fetchSimilarProperties(
  similarPropertyId,
  propertyCategory = "for_sale"
) {
  try {
    const response = await fetch(
      `${API_URL}/property/similar?id=${similarPropertyId}&purpose=${propertyCategory}`,
      {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      }
    );
    if (!response.ok) {
      const errorMessage =
        "The page you were looking for doesn't exist. You may have misstyped the address or the page may have moved";
      throw new Error(errorMessage);
    }
    const jsonData = await response.json();
    return jsonData.data.properties;
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
    const response = await fetch(`${API_URL}/property/${id}`, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    });
    if (!response.ok) {
      const errorMessage =
        "The page you were looking for doesn't exist. You may have misstyped the address or the page may have moved";
      throw new Error(errorMessage);
    }
    const jsonData = await response.json();
    return jsonData.data;
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
    const { price_min, price_max, area_min, area_max, bedrooms } = filters;
    const property_type = filters.property_type ?? "";
    const queryString = queries.map((query) => `${query}`).join(",");
    const url = `${API_URL}/property/search/${
      city ?? ""
    }?location_ids=${queryString}&page_size=${page_size}&page_number=${page_number}&sort_by=${
      sort_by ?? ""
    }&sort_order=${sort_order ?? ""}&property_type=${property_type
      .toLowerCase()
      .replace(" ", "_")}&area_min=${area_min ?? ""}&area_max=${
      area_max ?? ""
    }&price_min=${price_min ?? ""}&price_max=${price_max ?? ""}&bedrooms=${
      bedrooms ?? ""
    }&purpose=${propertyCategory}&start_date=${start_date ?? ""}&end_date=${
      end_date ?? ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorMessage =
        "The page you were looking for doesn't exist. You may have misstyped the address or the page may have moved";
      throw new Error(errorMessage);
    }

    const jsonData = await response.json();
    return jsonData.data;
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
    const response = await fetch(`${API_URL}/property/available-cities`, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    });
    if (!response.ok) {
      const errorMessage =
        "The page you were looking for doesn't exist. You may have misstyped the address or the page may have moved";
      throw new Error(errorMessage);
    }
    const jsonData = await response.json();
    return jsonData.data;
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

export async function fetchPropertyCount(propertyCategory = "for_sale") {
  try {
    const response = await fetch(
      `${API_URL}/property/count?purpose=${propertyCategory}`,
      {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      }
    );
    if (!response.ok) {
      const errorMessage =
        "The page you were looking for doesn't exist. You may have misstyped the address or the page may have moved";
      throw new Error(errorMessage);
    }
    const jsonData = await response.json();
    return jsonData.data;
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

async function fetchSearchSuggestions(city, query) {
  //   try {
  //     const client = algoliasearch(
  //       "M8TRSWR245",
  //       "a821e0149ad248fa5240718b3c1a5360"
  //     );
  //     const index = client.initIndex("locations");
  //     const response = await index.search(`${city} ${query}`, {
  //       attributesToRetrieve: ["id", "name"],
  //     });
  //     return response.hits;
  //   } catch (error) {
  //     if (error.name !== "AbortError") {
  //       const errorMessage = error.message || "Failed to search city data.";
  //       console.error("Error searching city data:", errorMessage);
  //       toast.error(errorMessage, {
  //         position: "top-center",
  //         autoClose: 5000,
  //       });
  //       throw error;
  //     }
  //     return [];
  //   }
  // }
  const controller = getAbortController("fetchSearchSuggestions");
  try {
    const url = `${API_URL}/property/suggestions/${city ?? ""}?query=${query}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorMessage =
        "Checked that you typed the address correctly, try using our site to find something specific";
      throw new Error(errorMessage);
    }

    const jsonData = await response.json();
    return jsonData.data;
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
    return [];
  }
}

async function fetchPropertyRecommendations(
  city,
  propertyCategory = "for_sale",
  area_min,
  area_max,
  page_number = 1,
  property_type
) {
  const controller = getAbortController("fetchPropertyRecommendations");
  try {
    const formattedPropertyType =
      typeof property_type === "string"
        ? property_type.toLowerCase().replace(" ", "_")
        : "";
    const response = await fetch(
      `${API_URL}/property/best/${city}?purpose=${propertyCategory}&area_min=${
        area_min ?? ""
      }&area_max=${
        area_max ?? ""
      }&page_number=${page_number}&property_type=${formattedPropertyType}`,
      {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
        signal: controller.signal,
      }
    );
    if (!response.ok) {
      const errorMessage =
        "The page you were looking for doesn't exist. You may have misstyped the address or the page may have moved";
      throw new Error(errorMessage);
    }
    const jsonData = await response.json();
    return jsonData.data;
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

export {
  fetchFeaturedProperties,
  fetchSimilarProperties,
  fetchPropertyDetails,
  searchCityData,
  fetchAvailableCities,
  fetchSearchSuggestions,
  fetchPropertyRecommendations,
};
