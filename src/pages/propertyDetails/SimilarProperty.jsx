import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { BiSolidDirections } from "react-icons/bi";
import SkeletonCard from "../../components/skeleton/Skeleton";
import { fetchSimilarProperties } from "../../utlils/fetchApi";
import { formatTimeNow } from "../../utlils/formatTimeNow";

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

export default function SimilarProperty({
  location,
  similarPropertyId,
  conversionFunction,
  propertyCategory,
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchSimilarProperties(
        similarPropertyId,
        propertyCategory
      );
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [similarPropertyId, propertyCategory]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
        <p className="text-2xl font-bold">
          Similar Houses around{" "}
          <span className="text-[#0071BC] font-semibold">{location}</span>
        </p>
      </div>
      <div className="p-3 cursor-pointer">
        <Carousel responsive={responsive}>
          {data.map((item) => (
            <Card key={item.id} className="m-4">
              <div onClick={() => handleClick(item)}>
                {item.cover_photo_url ? (
                  <img
                    src={item.cover_photo_url}
                    alt="photo"
                    className="w-full h-52 object-fit rounded-t-md"
                  />
                ) : (
                  <img
                    src="/img/NoImage.png"
                    alt="dummy"
                    className="w-full h-52 object-fit rounded-t-md"
                  />
                )}
                <CardHeader>
                  <div>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base font-semibold w-[90%]">
                        <span className="font-light text-sm">
                          Added: {formatTimeNow(item.added)}
                        </span>
                      </CardTitle>
                    </div>
                    <div className="py-2 font-bold">
                      <CardDescription>
                        PKR {conversionFunction(item.price)}
                      </CardDescription>
                      <CardDescription className="truncate">
                        {item.location}
                      </CardDescription>
                      <br />

                      <CardDescription>
                        <div className="flex justify-left gap-3 text-xs">
                          {item.bedroom && (
                            <div className="flex flex-row items-center gap-1">
                              <FaBed />
                              <p>{item.bedroom}</p>
                            </div>
                          )}
                          {item.bath && (
                            <div className="flex flex-row items-center gap-1">
                              <FaBath />
                              <p>{item.bath}</p>
                            </div>
                          )}
                          {item.area && (
                            <div className="flex flex-row items-center gap-1">
                              <BiSolidDirections />
                              <p>{item.area} sqft</p>
                            </div>
                          )}
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
  conversionFunction: PropTypes.func.isRequired,
  propertyCategory: PropTypes.string.isRequired,
};
