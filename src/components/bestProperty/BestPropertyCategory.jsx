import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Home from "../headerComponent/property_type/Home";
import Plots from "../headerComponent/property_type/Plots";
import Commercial from "../headerComponent/property_type/Commercial";
import PropTypes from "prop-types";

const BestPropertyCategory = ({ setpropertyType }) => {
  const [propertyState, setPropertyState] = useState("home");
  const [selectedSubProperty, setSelectedSubProperty] = useState(null);

  const handleSubPropertySelect = (subProperty) => {
    setSelectedSubProperty(subProperty);
    setpropertyType(subProperty);
  };

  const handlePropertyTypeChange = (propertyType) => {
    setPropertyState(propertyType);
    setpropertyType(propertyType);
    setSelectedSubProperty(null);
  };

  const getPropertyTypeStyle = (type) =>
    propertyState === type
      ? "text-[#0071BC] border-b-2 border-[#0071BC] cursor-pointer"
      : "hover:text-blue-500 cursor-pointer";

  return (
    <div>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="PROPERTY TYPE" />
          <div>{selectedSubProperty || propertyState}</div>
        </SelectTrigger>
        <SelectContent>
          <div className="flex justify-between items-center p-5">
            <h1
              className={getPropertyTypeStyle("home")}
              onClick={() => handlePropertyTypeChange("home")}
            >
              Home
            </h1>
            <h1
              className={getPropertyTypeStyle("plot")}
              onClick={() => handlePropertyTypeChange("plot")}
            >
              Plots
            </h1>
            <h1
              className={getPropertyTypeStyle("commercial")}
              onClick={() => handlePropertyTypeChange("commercial")}
            >
              Commercial
            </h1>
          </div>
          <div>
            {propertyState === "home" && (
              <Home
                selectedSubProperty={selectedSubProperty}
                onSubPropertySelect={handleSubPropertySelect}
              />
            )}
            {propertyState === "plot" && (
              <Plots
                selectedSubProperty={selectedSubProperty}
                onSubPropertySelect={handleSubPropertySelect}
              />
            )}
            {propertyState === "commercial" && (
              <Commercial
                selectedSubProperty={selectedSubProperty}
                onSubPropertySelect={handleSubPropertySelect}
              />
            )}
          </div>
        </SelectContent>
      </Select>
    </div>
  );
};
BestPropertyCategory.propTypes = {
  setpropertyType: PropTypes.string.isRequired,
};
export default BestPropertyCategory;
