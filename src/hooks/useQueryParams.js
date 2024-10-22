import { useLocation } from "react-router-dom";
import { useMemo } from "react";

const useQueryParams = () => {
  const location = useLocation();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const selectedSuggestions = params.get("location_ids")
    ? params
        .get("location_ids")
        .split(",")
        .map((suggestion) => {
          const [id, name] = suggestion.split(":");
          return { id, name };
        })
    : [];

  const holdState = {
    selectedCity: params.get("city") || "",
    pageNumber: params.get("page_number") || "",
    selectedSuggestions,
    priceMin: params.get("price_min") || "",
    priceMax: params.get("price_max") || "",
    areaMin: params.get("area_min") || "",
    areaMax: params.get("area_max") || "",
    beds: params.get("beds") || "",
    property_type: params.get("propertyType") || "",
    subPropertyType: params.get("subPropertyType") || "",
    agency: params.get("agency") || "",
    firstDate: params.get("start_date")
      ? new Date(params.get("start_date"))
      : null,
    lastDate: params.get("end_date") ? new Date(params.get("end_date")) : null,
    sortByDatePrice: params.get("sort_by"),
    sortByAscDesc: params.get("sort_order"),
  };
  return holdState;
};

export default useQueryParams;
