import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useState, useContext } from "react";
import { LuDollarSign } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { Skeleton } from "@/components/ui/skeleton";
import { appContext } from "./Context";
import { formatPrice } from "./utlils/formatPrice";
import { useLocation } from "react-router-dom";
import { Input } from "./components/ui/input";
import HeaderFilter from "./search_Result_Header/HeaderFilter";
import HeaderPrice from "./search_Result_Header/HeaderPrice";
import HeaderBeds from "./search_Result_Header/HeaderBeds";
import HeaderProperty from "./search_Result_Header/HeaderProperty";
import Recommended from "./cards_Details/Recommended";
import Popular from "./cards_Details/Popular";
import Nearest from "./cards_Details/Nearest";
import { Link } from "react-router-dom";

const CardsDetail = () => {
  const [expandedCards, setExpandedCards] = useState({});
  const simpleContext = useContext(appContext);
  const location = useLocation();
  const cardData = location.state?.cardData || simpleContext.appState.cardData;
  const totalCount =
    location.state?.totalCount || simpleContext.appState.pageData.total_count;

  const handleToggleExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const { loading } = simpleContext.appState;
  return (
    <main>
      <div>
        <div className="text-lg font-bold">
          {totalCount} Results &nbsp;
          <span className="text-sm text-gray-500">
            in {simpleContext.appState.searchTerm}
          </span>
        </div>
      </div>
      <br />
      <form>
        <div className="flex justify-between w-[100%]  gap-4">
          <div className="relative w-[25%]">
            <div className=" w-[100%]">
              <Input
                type="text"
                placeholder="Search Here..."
                className="rounded-3xl border-2"
              />
            </div>
            <div>
              <div className="absolute inset-y-0 right-2 flex items-center pl-3">
                <CiSearch className="text-orange-500 w-5 h-5" />
              </div>
              <div className="absolute inset-y-0 w-[1px] h-[20px] mt-3 right-10 bg-gray-400"></div>
            </div>
          </div>
          <div className="w-[12%] ">
            <HeaderPrice />
          </div>
          <div className="w-[12%]">
            <HeaderBeds />
          </div>
          <div className="w-[25%]">
            <HeaderProperty />
          </div>
          <div className="w-[25%]">
            <HeaderFilter />
          </div>
        </div>
      </form>
      <br />
      <div className="flex justify-left gap-6">
        <div>
          <Recommended />
        </div>
        <div>
          <Popular />
        </div>
        <div>
          <Nearest />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 py-5">
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
            <Link
              key={item.id}
              to={`/property/${item.id}`}
              state={{ property: item }}
            >
              <Card
                className={`relative ${
                  expandedCards[item.id] ? "h-auto" : "h-auto"
                }`}
              >
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
                      <LuDollarSign />
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
                      {item.desc.length > 100 && (
                        <button
                          onClick={() => handleToggleExpand(item.id)}
                          className="text-sm underline mt-2"
                        >
                          {expandedCards[item.id] ? "See less" : "See more"}
                        </button>
                      )}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))
        )}
      </div>
    </main>
  );
};

export default CardsDetail;
