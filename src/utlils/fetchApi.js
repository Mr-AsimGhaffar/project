import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

async function fetchFeaturedProperties(propertyCategory = "For Sale") {
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
      const errorMessage = `HTTP error! Status: ${response.status}`;
      throw new Error(errorMessage);
    }
    const jsonData = await response.json();
    return jsonData.data.properties;
  } catch (error) {
    console.error("Error fetching featured properties:", error);
    throw error;
  }
}

async function fetchSimilarProperties(
  similarPropertyId,
  propertyCategory = "For Sale"
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
      const errorMessage = `HTTP error! Status: ${response.status}`;
      throw new Error(errorMessage);
    }
    const jsonData = await response.json();
    return jsonData.data.properties;
  } catch (error) {
    const errorMessage =
      error.message || "Failed to fetch featured properties.";
    console.error("Error fetching featured properties:", errorMessage);
    toast.error(errorMessage, {
      position: toast,
      autoClose: 10000,
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
      const errorMessage = `HTTP error! Status: ${response.status}`;
      throw new Error(errorMessage);
    }
    const jsonData = await response.json();
    return jsonData.data;
  } catch (error) {
    const errorMessage =
      error.message || "Failed to fetch featured properties.";
    console.error("Error fetching featured properties:", errorMessage);
    toast.error(errorMessage, {
      position: toast,
      autoClose: 10000,
    });
    throw error;
  }
}

async function searchCityData(
  city,
  query,
  page_number = 1,
  sort_by = "id",
  sort_order = "ASC",
  filters = {},
  propertyCategory = "For Sale"
) {
  try {
    const { price_min, price_max, bedrooms } = filters;
    const property_type = filters.property_type ?? "";
    const url = `${API_URL}/property/search/${city ?? ""}?query=${
      query ?? ""
    }&page_size=10&page_number=${page_number}&sort_by=${sort_by}&sort_order=${sort_order}&property_type=${property_type}&area_min=&area_max=&price_min=${
      price_min ?? ""
    }&price_max=${price_max ?? ""}&bedrooms=${
      bedrooms ?? ""
    }&purpose=${propertyCategory}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      const errorMessage = `HTTP error! Status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const jsonData = await response.json();
    return jsonData.data;
  } catch (error) {
    const errorMessage = error.message || "Error fetching city data.";
    console.error("Error fetching city data:", errorMessage);
    toast.error(errorMessage, {
      position: toast,
      autoClose: 10000,
    });
    throw error;
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
      const errorMessage = `HTTP error! Status: ${response.status}`;
      throw new Error(errorMessage);
    }
    const jsonData = await response.json();
    return jsonData.data;
  } catch (error) {
    const errorMessage =
      error.message || "Failed to fetch featured properties.";
    console.error("Error fetching featured properties:", errorMessage);
    toast.error(errorMessage, {
      position: toast,
      autoClose: 10000,
    });
    throw error;
  }
}

export async function fetchPropertyCount(propertyCategory = "For Sale") {
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
      const errorMessage = `HTTP error! Status: ${response.status}`;
      throw new Error(errorMessage);
    }
    const jsonData = await response.json();
    return jsonData.data;
  } catch (error) {
    const errorMessage =
      error.message || "Failed to fetch featured properties.";
    console.error("Error fetching featured properties:", errorMessage);
    toast.error(errorMessage, {
      position: toast,
      autoClose: 10000,
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
};
