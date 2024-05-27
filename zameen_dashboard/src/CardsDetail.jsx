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
  const [loading, setLoading] = useState(false);
  const simpleContext = useContext(appContext);
  return (
    <main>
      <div className="grid grid-cols-3 gap-6 py-5">
        {loading == true ? (
          <div className="flex items-center space-x-4 py-10">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : simpleContext.appState.cardData.length === 0 &&
          simpleContext.appState.isApiCall ? (
          <div className="col-span-3 text-center py-10 text-2xl font-bold">
            No result found. Try again
          </div>
        ) : (
          simpleContext.appState.cardData.map((item) => (
            <Card key={item.id}>
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
                    <CardDescription>{item.desc}</CardDescription>
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
