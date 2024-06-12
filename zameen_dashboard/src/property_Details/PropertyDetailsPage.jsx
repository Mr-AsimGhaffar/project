import { useLocation } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { BiSolidDirections } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
const types = [
  {
    name: "Type",
    type: "House",
  },
  {
    price: "Price",
    amount: "PKR 14.5 Crore",
  },
  {
    location: "Location",
    locationArea: "Bahri Town Rawalpindi",
  },
  {
    bath: "Bath",
    noOfBaths: "6",
  },
];
const areas = [
  {
    name: "Area",
    area: "1,100 sqft",
  },
  {
    purpose: "Purpose",
    category: "For Sale",
  },
  {
    bedrooms: "Bedroom(s)",
    noOfBedrooms: "2",
  },
  {
    time: "Added",
    timeElapsed: "46 minutes ago",
  },
];

const amenities = [
  {
    parking: "parking Spaces",
    lobby: "Lobby in Building",
    window: "Double Glazed Windows",
  },
  {
    main: "Main Features",
    flooring: "Flooring",
    electricty: "Electricity Backup",
    disposal: "Waste Disposal",
  },
  {
    floor: "Floor",
    floorsInBuilding: "Floors in Building",
    elevator: "Elevator: 2",
  },
];
const PropertyDetailsPage = () => {
  const [activeButton, setActiveButton] = useState("Overview");
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const { property } = location.state;
  const overviewRef = useRef(null);
  const locationRef = useRef(null);
  const financeRef = useRef(null);
  const priceIndexRef = useRef(null);
  const trendsRef = useRef(null);

  const scrollToSection = (ref, buttonName) => {
    setActiveButton(buttonName);
    ref.current.scrollIntoView({ behavior: "smooth" });
  };
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      {/* <h1>{property.header}</h1> */}
      <div>
        <div className="relative w-[50%]">
          <img src={property.cover_photo_url} alt="property" />
          <div className="absolute right-5 bottom-5">
            <CiHeart className="w-[30px] h-[30px] bg-gray-400 rounded-3xl text-white" />
          </div>
        </div>
        <br />
        <div className="flex justify-left gap-10">
          <div className="flex flex-col items-center">
            <FaBed />
            <p>7 Beds</p>
          </div>
          <div className="flex flex-col items-center">
            <FaBath />
            <p>6 Baths</p>
          </div>
          <div className="flex flex-col items-center">
            <BiSolidDirections />
            <p>1 Kanal</p>
          </div>
        </div>
        <br />
      </div>
      <div>
        <div className="w-[50%] overflow-x-auto">
          <div className="flex justify-between gap-4 bg-black p-2">
            <Button
              variant="ghost"
              className={`w-full${
                activeButton === "Overview"
                  ? "bg-white bg-accent text-black rounded-3xl border-2"
                  : "bg-black text-white rounded-3xl border-2 border-none"
              }`}
              onClick={() => scrollToSection(overviewRef, "Overview")}
            >
              <span>Overview</span>
            </Button>
            <Button
              variant="ghost"
              className={`  w-full${
                activeButton === "Location"
                  ? "bg-white bg-accent text-black rounded-3xl border-2"
                  : "bg-inherit text-white rounded-3xl border-2 border-none"
              }`}
              onClick={() => scrollToSection(locationRef, "Location")}
            >
              <span>Location & Nearby</span>
            </Button>
            <Button
              variant="ghost"
              className={`w-full${
                activeButton === "Finance"
                  ? "bg-white bg-accent text-black rounded-3xl border-2"
                  : "bg-transparent text-white rounded-3xl border-2 border-none"
              }`}
              onClick={() => scrollToSection(financeRef, "Finance")}
            >
              <span>Home Finance</span>
            </Button>
            <Button
              variant="ghost"
              className={`w-full${
                activeButton === "PriceIndex"
                  ? "bg-white bg-accent text-black rounded-3xl border-2"
                  : "bg-transparent text-white rounded-3xl border-2 border-none"
              }`}
              onClick={() => scrollToSection(priceIndexRef, "PriceIndex")}
            >
              <span>Price Index</span>
            </Button>
            <Button
              variant="ghost"
              className={`w-full${
                activeButton === "Trends"
                  ? "bg-white bg-accent text-black rounded-3xl border-2"
                  : "bg-transparent text-white rounded-3xl border-2 border-none"
              }`}
              onClick={() => scrollToSection(trendsRef, "Trends")}
            >
              <span>Trends</span>
            </Button>
          </div>
        </div>
        <div ref={overviewRef} className="w-[50%]">
          <div className="bg-gray-50">
            <p className="text-2xl p-2">Overview</p>
          </div>
          <div className="p-2">
            <p>Details</p>
            <div>
              <Table>
                <div className="flex justify-between">
                  <div>
                    <TableBody>
                      {types.map((name, rowIndex) => (
                        <TableRow key={name.name} className="border-none">
                          {Object.keys(name).map((key) => (
                            <TableCell
                              key={key}
                              className={`${
                                rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                              }`}
                            >
                              {name[key]}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </div>
                  <div>
                    <TableBody>
                      {areas.map((name, rowIndex) => (
                        <TableRow key={name.name} className="border-none">
                          {Object.keys(name).map((key) => (
                            <TableCell
                              key={key}
                              className={`${
                                rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                              }`}
                            >
                              {name[key]}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </div>
                </div>
              </Table>
            </div>
          </div>
          <hr />
          <br />
          <div className="p-2">
            <p className={`${isExpanded ? "" : "line-clamp-2"}`}>
              {property.desc}
            </p>
            <br />
            <div className="text-right">
              <button onClick={toggleExpanded} className="text-green-500">
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            </div>
          </div>
          <hr />
          <div className="p-2">
            <p>Amenities</p>
            <div>
              <Table>
                <TableBody className="bg-gray-50">
                  {amenities.map((main) => (
                    <TableRow key={main.main} className="border-none">
                      <TableCell>{main.main}</TableCell>
                      <div className="w-[1px] h-[20px] mt-4 bg-gray-400"></div>
                      <TableCell>
                        {main.parking}
                        {main.flooring}
                        {main.floor}
                      </TableCell>
                      <TableCell>
                        {main.lobby}
                        {main.electricty}
                        {main.floorsInBuilding}
                      </TableCell>
                      <TableCell>
                        {main.window}
                        {main.disposal}
                        {main.elevator}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        <br />
        <div ref={locationRef} className="p-4">
          <h2>Location & Nearby</h2>
          <p>Details of Location & Nearby...</p>
        </div>
        <div ref={financeRef} className="p-4">
          <h2>Home Finance</h2>
          <p>Details of Home Finance...</p>
        </div>
        <div ref={priceIndexRef} className="p-4">
          <h2>Price Index</h2>
          <p>Details of Price Index...</p>
        </div>
        <div ref={trendsRef} className="p-4">
          <h2>Trends</h2>
          <p>Details of Trends...</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
