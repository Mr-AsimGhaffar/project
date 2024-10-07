import { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { FaBed, FaChartArea } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { fetchFeaturedProperties } from "../utlils/fetchApi";
import PropTypes from "prop-types";
import { formatTimeNow } from "../utlils/formatTimeNow";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

export default function FeaturedProperty({
  conversionFunction,
  propertyCategory,
}) {
  const [featuredData, setfeaturedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchFeaturedProperties(propertyCategory);
        setfeaturedData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [propertyCategory]);

  const handleClick = (item) => {
    navigate(`/property/${item.id}`, { state: { id: item.id } });
    window.scrollTo(0, 0);
  };

  return (
    <div className="px-4 md:px-20 lg:px-44 bg-[#0071BC] dark:bg-[#0c0c0c] bg-opacity-10">
      <div className="flex justify-center items-center p-10 lg:p-20">
        <div>
          <h1 className="font-montserrat font-bold text-xl sm:text-3xl lg:text-4xl leading-10 tracking-[0.2em] text-[#0071BC] dark:text-white text-center">
            FEATURED PROPERTIES
          </h1>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center py-10 lg:py-20">
          <div className="flex justify-center items-center">
            <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>
          </div>
        </div>
      ) : (
        <div className="p-3 cursor-pointer">
          <Carousel responsive={responsive}>
            {featuredData.map((item) => (
              <Card key={item.id} className="m-4 dark:bg-black">
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
                        <CardDescription className="dark:text-white">
                          PKR {conversionFunction(item.price)}
                        </CardDescription>
                        <CardDescription className="truncate dark:text-white">
                          {item.header}
                        </CardDescription>
                        <CardDescription>
                          <div className="flex justify-left gap-3 text-xs mt-4 dark:text-white">
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
                                <FaChartArea />
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
      )}
    </div>
  );
}
FeaturedProperty.propTypes = {
  conversionFunction: PropTypes.func.isRequired,
  propertyCategory: PropTypes.string.isRequired,
};
