import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useContext, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { appContext } from "@/contexts/Context";
import HeaderPrice from "./searchResultHeader/HeaderPrice";
import HeaderBeds from "./searchResultHeader/HeaderBeds";
import HeaderProperty from "./searchResultHeader/HeaderProperty";
import HeaderFilter from "./searchResultHeader/HeaderFilter";
import Paging from "@/components/Paging";
import { saveToLocalStorage } from "@/utlils/SaveLocalStorage";
import { Input } from "@/components/ui/input";
import { priceConversion } from "@/utlils/priceConversion";
import { formatPrice } from "../utlils/formatPrice";
import Recommended from "../components/cardsDetails/Recommended";

const CardsDetail = () => {
  const simpleContext = useContext(appContext);
  const [expandedCards, setExpandedCards] = useState({});
  const [searchTerm, setSearchTerm] = useState(
    simpleContext.appState.searchTerm
  );
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCity, setSelectedCity] = useState("");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [sortBy, setSortBy] = useState("id");

  const {
    cardData,
    pageData: { total_count: totalCount },
  } = simpleContext.appState;

  const API_URL = import.meta.env.VITE_API_URL;

  const cleanValue = (value) => (value ? value.replace(/,/g, "") : "");

  const searchCityData = async (
    city,
    query,
    page_number = 1,
    sort_by = "id",
    sort_order = "ASC"
  ) => {
    try {
      simpleContext.setAppState((s) => ({ ...s, loading: true }));

      const {
        selectedAmountMin,
        selectedAmountMax,
        selectBeds,
        selectedSubProperty,
      } = simpleContext.appState;

      const price_min = cleanValue(selectedAmountMin);
      const price_max = cleanValue(selectedAmountMax);
      const bedrooms = selectBeds.trim();
      const property_type = selectedSubProperty;

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
      const { properties, total_count, page_size } = jsonData.data;

      simpleContext.setAppState((s) => ({
        ...s,
        cardData: properties,
        pageData: { total_count: Number(total_count), page_number },
        isApiCall: true,
        totalPages: Math.ceil(Number(total_count) / Number(page_size)),
        currentPage: page_number,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      simpleContext.setAppState((s) => ({ ...s, loading: false }));
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    simpleContext.setAppState((s) => ({
      ...s,
      searchTerm: searchTerm,
    }));
  }, [searchTerm, simpleContext]);

  // useEffect(() => {
  //   searchCityData(selectedCity, searchTerm, currentPage, sortBy, sortOrder);
  // }, [
  //   simpleContext.appState.selectBeds,
  //   simpleContext.appState.selectedAmountMin,
  //   simpleContext.appState.selectedAmountMax,
  //   simpleContext.appState.selectedPropertyType,
  //   simpleContext.appState.selectedSubProperty,
  // ]);

  const handleToggleExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const { loading } = simpleContext.appState;

  const handleSearch = (sort_by = sortBy, sort_order = sortOrder) =>
    searchCityData(undefined, searchTerm || "", 1, sort_by, sort_order);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };
  const handlePageChange = (page_number) =>
    searchCityData(selectedCity, searchTerm, page_number, sortBy, sortOrder);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    simpleContext.setAppState((s) => ({
      ...s,
      searchTerm: newValue,
    }));
    saveToLocalStorage("searchTerm", newValue);
  };
  const handleSortChange = (sort_by, sort_order) => {
    setSortBy(sort_by);
    setSortOrder(sort_order);
    handleSearch(sort_by, sort_order);
  };
  return (
    <main>
      <div>
        <div className="text-lg font-bold">
          <span>{formatPrice(totalCount)} Results</span>{" "}
          <span className="text-sm text-gray-500">
            in {simpleContext.appState.searchTerm}
          </span>
        </div>
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-5 grid-cols-1 gap-4">
          <div className="relative">
            <div className=" w-[100%]">
              <Input
                value={searchTerm}
                onChange={handleChange}
                type="text"
                placeholder="Search Here..."
                className="rounded-3xl border-2"
              />
            </div>
            <div>
              <div className="absolute inset-y-0 right-2 flex items-center pl-3">
                <CiSearch
                  onClick={handleSubmit}
                  className="text-orange-500 w-5 h-5 cursor-pointer"
                />
              </div>
              <div className="absolute inset-y-0 w-[1px] h-[20px] mt-3 right-10 bg-gray-400"></div>
            </div>
          </div>
          <div>
            <HeaderPrice />
          </div>
          <div>
            <HeaderBeds />
          </div>
          <div>
            <HeaderProperty />
          </div>
          <div>
            <HeaderFilter onSortChange={handleSortChange} />
          </div>
        </div>
      </form>
      <br />
      <div className="flex justify-left gap-6">
        <div>
          <Recommended />
        </div>
        {/* <div>
          <Popular />
        </div>
        <div>
          <Nearest />
        </div> */}
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6 py-5">
        {loading ? (
          Array.from({ length: 1 }).map((_, index) => (
            <div key={index} className="flex items-center justify-center">
              <div className="flex flex-col items-center">
                <Skeleton className="h-[125px] w-[250px] rounded-xl bg-gradient-to-br from-blue-200 to-blue-300 animate-pulse" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px] bg-gradient-to-r from-green-200 to-green-300 animate-ping" />
                  <Skeleton className="h-4 w-[200px] bg-gradient-to-r from-yellow-200 to-yellow-300 animate-ping" />
                </div>
              </div>
            </div>
          ))
        ) : cardData.length === 0 && simpleContext.appState.isApiCall ? (
          <div className="col-span-3 text-center py-10 text-2xl font-bold">
            No result found. Try again
          </div>
        ) : (
          cardData.map((item) => (
            <Card
              key={item.id}
              className={`relative ${
                expandedCards[item.id] ? "h-auto" : "h-auto"
              }`}
            >
              <Link to={`/property/${item.id}`} state={{ id: item.id }}>
                {item.cover_photo_url && (
                  <img
                    src={item.cover_photo_url}
                    alt="photo"
                    className="w-full h-52 object-fit rounded-t-md"
                  />
                )}
                <CardHeader>
                  <div>
                    <div className="flex justify-between item-center">
                      <CardTitle className="text-base font-semibold w-[90%]">
                        {item.header}
                      </CardTitle>
                      {/* <LuDollarSign /> */}
                    </div>
                    <div className="py-2">
                      <CardDescription className="text-2xl font-bold">
                        {priceConversion(item.price)} PKR
                      </CardDescription>
                      <CardDescription
                        className={`overflow-hidden ${
                          expandedCards[item.id]
                            ? "line-clamp-none"
                            : "line-clamp-2"
                        }`}
                      >
                        {item.desc}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Link>
              <CardDescription>
                {item.desc.length > 100 && (
                  <button
                    onClick={() => handleToggleExpand(item.id)}
                    className="text-sm underline p-6 py-3"
                  >
                    {expandedCards[item.id] ? "See less" : "See more"}
                  </button>
                )}
              </CardDescription>
            </Card>
          ))
        )}
      </div>
      <div className="mt-2">
        <Paging
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
};

export default CardsDetail;
