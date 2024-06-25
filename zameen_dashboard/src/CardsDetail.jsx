import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useContext, useEffect } from "react";
// import { LuDollarSign } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { Skeleton } from "@/components/ui/skeleton";
import { appContext } from "./Context";
import { formatPrice } from "./utlils/formatPrice";
import { Input } from "./components/ui/input";
import HeaderFilter from "./search_Result_Header/HeaderFilter";
import HeaderPrice from "./search_Result_Header/HeaderPrice";
import HeaderBeds from "./search_Result_Header/HeaderBeds";
import HeaderProperty from "./search_Result_Header/HeaderProperty";
import Recommended from "./cards_Details/Recommended";
// import Popular from "./cards_Details/Popular";
// import Nearest from "./cards_Details/Nearest";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import Paging from "./Paging";
import { saveToLocalStorage } from "./utlils/SaveLocalStorage";

const CardsDetail = () => {
  const simpleContext = useContext(appContext);
  const [expandedCards, setExpandedCards] = useState({});
  const [searchTerm, setSearchTerm] = useState(
    simpleContext.appState.searchTerm
  );
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [selectedCity, setSelectedCity] = useState("");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [sortBy, setSortBy] = useState("id");
  const cardData = simpleContext.appState.cardData;
  const totalCount = simpleContext.appState.pageData.total_count;

  const API_URL = import.meta.env.VITE_API_URL;
  // console.log("state", sortBy);
  const searchCityData = async (
    city,
    query,
    page_number = 1,
    sort_by = "id",
    sort_order = "ASC"
  ) => {
    // console.log(sort_by);
    try {
      simpleContext.setAppState((s) => ({
        ...s,
        loading: true,
      }));
      const price_min = simpleContext.appState.selectedAmountMin?.replace(
        /,/g,
        ""
      );
      const price_max = simpleContext.appState.selectedAmountMax?.replace(
        /,/g,
        ""
      );
      const bedrooms = simpleContext.appState.selectBeds.trim();
      const property_type = simpleContext.appState.selectedSubProperty;
      const response = await fetch(
        `${API_URL}/property/search/${city ?? ""}?query=${
          query ?? ""
        }&page_size=10&page_number=${
          page_number ?? ""
        }&sort_by=${sort_by}&sort_order=${sort_order}&property_type=${property_type}&area_min=&area_max=&price_min=${
          price_min ?? ""
        }&price_max=${price_max ?? ""}&bedrooms=${bedrooms ?? ""}`,
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
        isApiCall: true,
        totalPages: Math.ceil(
          Number(jsonData.data.total_count) / Number(jsonData.data.page_size)
        ),
        currentPage: page_number,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      simpleContext.setAppState((s) => ({
        ...s,
        loading: false,
      }));
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
  }, [simpleContext]);

  const handleToggleExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const { loading } = simpleContext.appState;

  const handleSearch = (sort_by, sort_order) => {
    if (searchTerm) {
      searchCityData(selectedCity, searchTerm, 1, sort_by, sort_order);
    } else if (selectedCity) {
      searchCityData(selectedCity, "", 1, sort_by, sort_order);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };
  const handlePageChange = (page_number) => {
    const city = selectedCity;
    searchCityData(city, searchTerm, page_number, sortBy, sortOrder);
  };
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
          <span>{totalCount} Results</span>{" "}
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
                  onClick={handleSearch}
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
            <div key={index} className="flex items-center space-x-4 py-10">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
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
                        {formatPrice(item.price)}
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
