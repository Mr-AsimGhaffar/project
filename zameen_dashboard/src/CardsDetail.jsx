import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState, useContext } from "react";
import { LuDollarSign } from "react-icons/lu";
import { Skeleton } from "@/components/ui/skeleton";
import { appContext } from "./Context";

const CardsDetail = () => {
  const [loading, setLoading] = useState(false);
  const simpleContext = useContext(appContext);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://ecdb-2407-d000-1a-5017-bcd9-edfc-c27d-37c8.ngrok-free.app/property",
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
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
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
                      {item.price}
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
