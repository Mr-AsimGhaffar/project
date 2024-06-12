import { useContext, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { appContext } from "@/Context";
import Home from "../header_Component/property_type/Home";
import Plots from "../header_Component/property_type/Plots";
import Commercial from "../header_Component/property_type/Commercial";

const HeaderProperty = () => {
  const [selectedPropertyType, setSelectedPropertyType] = useState("Home");
  const [selectedSubProperty, setSelectedSubProperty] = useState("");
  const simpleContext = useContext(appContext);
  useEffect(() => {
    simpleContext.setAppState((s) => ({
      ...s,
      selectedSubProperty: selectedSubProperty,
    }));
  }, [selectedSubProperty]);

  const handleSubPropertySelect = (subProperty) => {
    setSelectedSubProperty(subProperty);
  };

  return (
    <div>
      <Select>
        <SelectTrigger className="rounded-3xl border-2">
          <SelectValue placeholder="PROPERTY TYPE" />
          <div>{selectedSubProperty || selectedPropertyType}</div>
        </SelectTrigger>
        <SelectContent className="w-[100%]">
          <div className="flex justify-between items-center p-5">
            <h1
              className={`cursor-pointer hover:text-blue-500 ${
                selectedPropertyType === "Home" && "text-blue-500"
              }`}
              onClick={() => {
                setSelectedPropertyType("Home");
                setSelectedSubProperty("");
              }}
            >
              Home
            </h1>
            <h1
              className={`cursor-pointer hover:text-blue-500 ${
                selectedPropertyType === "Plots" && "text-blue-500"
              }`}
              onClick={() => {
                setSelectedPropertyType("Plots");
                setSelectedSubProperty("");
              }}
            >
              Plots
            </h1>
            <h1
              className={`cursor-pointer hover:text-blue-500 ${
                selectedPropertyType === "Commercial" && "text-blue-500"
              }`}
              onClick={() => {
                setSelectedPropertyType("Commercial");
                setSelectedSubProperty("");
              }}
            >
              Commercial
            </h1>
          </div>
          <div>
            {selectedPropertyType === "Home" && (
              <Home onSubPropertySelect={handleSubPropertySelect} />
            )}
            {selectedPropertyType === "Plots" && (
              <Plots onSubPropertySelect={handleSubPropertySelect} />
            )}
            {selectedPropertyType === "Commercial" && (
              <Commercial onSubPropertySelect={handleSubPropertySelect} />
            )}
          </div>
        </SelectContent>
      </Select>
    </div>
  );
};

export default HeaderProperty;
