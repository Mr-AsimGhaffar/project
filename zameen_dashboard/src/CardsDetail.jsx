import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useContext } from "react";
import { LuDollarSign } from "react-icons/lu";
import { Skeleton } from "@/components/ui/skeleton";
import { appContext } from "./Context";
import { formatPrice } from "./utlils/formatPrice";

const CardsDetail = () => {
  const [expandedCards, setExpandedCards] = useState({});
  const simpleContext = useContext(appContext);

  const handleToggleExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const { loading } = simpleContext.appState;
  return (
    <main>
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
        ) : simpleContext.appState.cardData.length === 0 &&
          simpleContext.appState.isApiCall ? (
          <div className="col-span-3 text-center py-10 text-2xl font-bold">
            No result found. Try again
          </div>
        ) : (
          simpleContext.appState.cardData.map((item) => (
            <Card
              key={item.id}
              className={`relative ${
                expandedCards[item.id] ? "h-auto" : "h-64"
              }`}
            >
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
          ))
        )}
      </div>
    </main>
  );
};

export default CardsDetail;
