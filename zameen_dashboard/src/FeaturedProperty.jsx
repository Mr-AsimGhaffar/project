import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/utlils/formatPrice";
import { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { formatTimeFromNow } from "@/utlils/UnixEpochTimeConverter";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { BiSolidDirections } from "react-icons/bi";
import { convertMarlaToSquareFeet } from "@/utlils/marlaToSquareFeet";
import { Button } from "./components/ui/button";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function FeaturedProperty() {
  const [featuredData, setfeaturedData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_URL}/property/featured`, {
          method: "get",
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
          }),
        });
        const jsonData = await response.json();
        setfeaturedData(jsonData.data.properties);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  const handleViewAll = () => {
    setShowAll(true);
  };
  const handleViewLess = () => {
    setShowAll(false);
  };
  const handleClick = (item) => {
    navigate(`/property/${item.id}`, { state: { property: item } });
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div className="flex justify-between items-center text-2xl font-bold">
        <div>Featured Properties</div>
        <div>
          {showAll ? (
            <Button className="text-lg" variant="link" onClick={handleViewLess}>
              View Less
            </Button>
          ) : (
            <Button className="text-lg" variant="link" onClick={handleViewAll}>
              View All
            </Button>
          )}
        </div>
      </div>
      <div className="grid md:grid-cols-4 gap-6 py-5">
        {featuredData
          .slice(0, showAll ? featuredData.length : 4)
          .map((item) => (
            <Card key={item.id} className="cursor-pointer">
              <div onClick={() => handleClick(item)}>
                {item.cover_photo_url && (
                  <img
                    src={item.cover_photo_url}
                    alt="photo"
                    className="w-full h-52 object-fit rounded-t-md"
                  />
                )}
                <CardHeader>
                  <div>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base font-semibold w-[90%]">
                        <span className="font-light text-sm">
                          Added: {formatTimeFromNow(item.added)}
                        </span>
                      </CardTitle>
                    </div>
                    <div className="py-2 font-bold">
                      <CardDescription>
                        PKR {formatPrice(item.price)}
                      </CardDescription>
                      <CardDescription>{item.location}</CardDescription>
                      <br />
                      <CardDescription>
                        <div className="flex justify-left gap-5">
                          <div className="flex flex-row items-center gap-1">
                            <FaBed />
                            <p>{item.bedroom}</p>
                          </div>
                          <div className="flex flex-row items-center gap-1">
                            <FaBath />
                            <p>{item.bath}</p>
                          </div>
                          <div className="flex flex-row items-center gap-1">
                            <BiSolidDirections />
                            <p>
                              {convertMarlaToSquareFeet(
                                item.area.split(" ")[0]
                              )}{" "}
                              sqft
                            </p>
                          </div>
                        </div>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
}
