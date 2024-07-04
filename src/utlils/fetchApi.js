const API_URL = import.meta.env.VITE_API_URL;

async function fetchFeaturedProperties() {
  try {
    const response = await fetch(`${API_URL}/property/featured`, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    });
    const jsonData = await response.json();
    return jsonData.data.properties;
  } catch (error) {
    console.error("Error fetching featured properties:", error);
    throw error;
  }
}

async function fetchSimilarProperties(similarPropertyId) {
  try {
    const response = await fetch(
      `${API_URL}/property/similar?id=${similarPropertyId}`,
      {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      }
    );
    const jsonData = await response.json();
    return jsonData.data.properties;
  } catch (error) {
    console.error("Error fetching similar properties:", error);
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
    const jsonData = await response.json();
    return jsonData.data;
  } catch (error) {
    console.error("Error fetching similar properties:", error);
    throw error;
  }
}

async function searchCityData(
  city,
  query,
  page_number = 1,
  sort_by = "id",
  sort_order = "ASC",
  filters = {}
) {
  try {
    const { price_min, price_max, bedrooms, property_type } = filters;

    const url = `${API_URL}/property/search/${city ?? ""}?query=${
      query ?? ""
    }&page_size=10&page_number=${page_number}&sort_by=${sort_by}&sort_order=${sort_order}&property_type=${property_type}&area_min=&area_max=&price_min=${
      price_min ?? ""
    }&price_max=${price_max ?? ""}&bedrooms=${bedrooms ?? ""}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonData = await response.json();
    return jsonData.data;
  } catch (error) {
    console.error("Error fetching city data:", error);
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
    const jsonData = await response.json();
    return jsonData.data;
  } catch (error) {
    console.error("Error fetching available cities:", error);
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
