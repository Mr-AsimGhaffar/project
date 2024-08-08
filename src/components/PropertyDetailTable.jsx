import { useCallback, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  fetchAvailableCities,
  fetchPropertyRecommendations,
} from "../utlils/fetchApi";
import PropTypes from "prop-types";
import { squareFeetToMarla } from "../utlils/squareFeetToMarla";
import { formatTimeNow } from "../utlils/formatTimeNow";
import BestPropertyArea from "./bestProperty/BestPropertyArea";
import BestPropertyCategory from "./bestProperty/BestPropertyCategory";
import { marlaToSquareFeet } from "../utlils/marlaToSquareFeet";
import { Link } from "react-router-dom";

const PropertyDetailTable = ({ conversionFunction, propertyCategory }) => {
  const [data, setData] = useState([]);
  const [city, setCity] = useState("islamabad");
  const [propertyRecommendationsData, setPropertyRecommendationData] = useState(
    []
  );
  const [bestAreaMin, setBestAreaMin] = useState(null);
  const [bestAreaMax, setBestAreaMax] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProperties, setTotalProperties] = useState(0);
  const [propertyType, setpropertyType] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const cities = await fetchAvailableCities();
      setData(cities);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    async function loadRecommendationsData() {
      try {
        setLoading(true);
        const data = await fetchPropertyRecommendations(
          city,
          propertyCategory,
          marlaToSquareFeet(bestAreaMin) || "",
          marlaToSquareFeet(bestAreaMax) || "",
          currentPage,
          propertyType
        );
        if (data == null) {
          return;
        }
        setPropertyRecommendationData(data.properties);
        setTotalProperties(data.total_count);
        setLoading(data == null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    loadRecommendationsData();
  }, [
    city,
    propertyCategory,
    bestAreaMin,
    bestAreaMax,
    currentPage,
    propertyType,
  ]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalProperties / 10);
  const pages = [];

  if (totalPages <= 10) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 7) {
      for (let i = 1; i <= 10; i++) {
        pages.push(i);
      }
    } else if (currentPage > 7 && currentPage < totalPages - 3) {
      for (let i = currentPage - 6; i <= currentPage + 3; i++) {
        pages.push(i);
      }
    } else {
      for (let i = totalPages - 9; i <= totalPages; i++) {
        pages.push(i);
      }
    }
  }

  return (
    <div>
      <div className="py-20">
        <h1 className="font-montserrat font-bold text-3xl lg:text-4xl leading-10 tracking-[0.2em] text-[#0071BC] text-center">
          Best Property In Town
        </h1>
      </div>
      <section className="font-montserrat md:px-20 lg:px-44 drop-shadow-2xl">
        <div>
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden p-4">
            <div className="flex item-center gap-4">
              <div className="w-[17%]">
                <Select onValueChange={setCity}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Islamabad" />
                  </SelectTrigger>
                  <SelectContent>
                    {data.map((item, index) => (
                      <SelectItem
                        className="cursor-pointer"
                        key={index}
                        value={item}
                      >
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[17%]">
                <BestPropertyArea
                  setBestAreaMin={setBestAreaMin}
                  setBestAreaMax={setBestAreaMax}
                />
              </div>
              <div className="w-[17%]">
                <BestPropertyCategory setpropertyType={setpropertyType} />
              </div>
            </div>
            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>
                </div>
              ) : (
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-4 py-3">
                        Property Detail
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Category
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Area
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {propertyRecommendationsData.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-4 py-3 text-center text-gray-500"
                        >
                          No results found
                        </td>
                      </tr>
                    ) : (
                      propertyRecommendationsData.map((item) => (
                        <tr
                          key={item}
                          className="border-b dark:border-gray-700"
                        >
                          <Link
                            to={`/property/${item.id}`}
                            state={{ id: item.id }}
                          >
                            <th
                              scope="row"
                              className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white hover:underline"
                            >
                              {item.header.split(",")[0]}
                            </th>
                          </Link>
                          <td className="px-4 py-3">
                            {item.type.replace("_", " ")}
                          </td>
                          <td className="px-4 py-3">
                            {formatTimeNow(item.added)}
                          </td>
                          <td className="px-4 py-3">
                            {conversionFunction(item.price)}
                          </td>
                          <td className="px-4 py-3">
                            {squareFeetToMarla(item.area)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
            <nav
              className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing
                <span className="font-semibold text-gray-900 dark:text-white px-2">
                  {(currentPage - 1) * 10 + 1}-
                  {Math.min(currentPage * 10, totalProperties)}
                </span>
                of
                <span className="font-semibold text-gray-900 dark:text-white px-2">
                  {totalProperties}
                </span>
              </span>
              <ul className="inline-flex items-stretch -space-x-px">
                <li>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
                {pages.map((page) => (
                  <li key={page}>
                    <button
                      onClick={() => handlePageChange(page)}
                      className={`flex items-center justify-center text-sm py-2 px-3 leading-tight ${
                        currentPage === page
                          ? "bg-[#bdd2ff] dark:bg-gray-700 text-white"
                          : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      }`}
                    >
                      {page}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a 1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
};

PropertyDetailTable.propTypes = {
  conversionFunction: PropTypes.func.isRequired,
  propertyCategory: PropTypes.string.isRequired,
};
export default PropertyDetailTable;
