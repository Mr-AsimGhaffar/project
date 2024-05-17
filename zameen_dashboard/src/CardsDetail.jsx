import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { LuDollarSign } from "react-icons/lu";

const CardsDetail = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://4fb9-2407-d000-1a-52-5bb7-4032-8162-4fb1.ngrok-free.app/property/rawalpindi?page_size=10&page_number=1&sort_by=id&sort_order=ASC",
          {
            method: "get",
            headers: new Headers({
              "ngrok-skip-browser-warning": "69420",
            }),
          }
        );
        const jsonData = await response.json();
        setData(jsonData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <main>
      <div className="grid grid-cols-4 gap-6 py-5">
        {data.map((item) => (
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
        ))}
      </div>
    </main>
  );
};

export default CardsDetail;
