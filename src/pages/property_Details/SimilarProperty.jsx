import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { formatTimeFromNow } from "@/utlils/UnixEpochTimeConverter";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { BiSolidDirections } from "react-icons/bi";
import { convertMarlaToSquareFeet } from "@/utlils/marlaToSquareFeet";
import { priceConversion } from "@/utlils/priceConversion";
import SkeletonCard from "../../components/skeleton/Skeleton";

const API_URL = import.meta.env.VITE_API_URL;

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export default function SimilarProperty({ location, similarPropertyId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
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
        setData(jsonData.data.properties);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [similarPropertyId]);

  const handleClick = (item) => {
    navigate(`/property/${item.id}`, { state: { id: item.id } });
    window.scrollTo(0, 0);
  };
  if (loading) {
    return <SkeletonCard />;
  }

  return (
    <div>
      <div>
        <p className="text-2xl font-bold">Similar Houses around {location}</p>
      </div>
      <div className="p-3 cursor-pointer">
        <Carousel responsive={responsive}>
          {data.map((item) => (
            <Card key={item.id}>
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
                        PKR {priceConversion(item.price)}
                      </CardDescription>
                      <CardDescription>{item.location}</CardDescription>
                      <br />
                      <CardDescription>
                        <div className="flex justify-left gap-5">
                          <div className="flex flex-row items-center gap-1">
                            <FaBed />
                            <p>{item.bedroom || "-"}</p>
                          </div>
                          <div className="flex flex-row items-center gap-1">
                            <FaBath />
                            <p>{item.bath || "-"}</p>
                          </div>
                          <div className="flex flex-row items-center gap-1">
                            <BiSolidDirections />
                            <p>
                              {convertMarlaToSquareFeet(
                                item.area.split(" ")[0]
                              ) || "-"}{" "}
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
        </Carousel>
      </div>
    </div>
  );
}

SimilarProperty.propTypes = {
  location: PropTypes.string.isRequired,
  similarPropertyId: PropTypes.number.isRequired,
};
