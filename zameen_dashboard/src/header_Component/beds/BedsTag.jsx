import { appContext } from "@/Context";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContext, useEffect, useState } from "react";

const BedsTag = () => {
  const [selectBeds, setSelectBeds] = useState("");
  const simpleContext = useContext(appContext);
  useEffect(() => {
    simpleContext.setAppState((s) => ({
      ...s,
      selectBeds: selectBeds,
    }));
  }, [selectBeds]);

  const handleSelectBeds = (number) => {
    setSelectBeds((prevSelectBeds) => {
      if (prevSelectBeds === "All" || number === "All") {
        return number;
      }
      if (prevSelectBeds.includes(number)) {
        const updatedBeds = prevSelectBeds
          .split(", ")
          .filter((bed) => bed !== number)
          .join(", ");
        return updatedBeds === "" ? "All" : updatedBeds;
      } else {
        return [...prevSelectBeds.split(", "), number]
          .filter(Boolean)
          .join(", ");
      }
    });
  };

  const buttonStyles = (bedType) => ({
    backgroundColor: selectBeds.includes(bedType) ? "#2C2C2C" : "#FFFFFF",
    color: selectBeds.includes(bedType) ? "#FFFFFF" : "#000000",
  });

  return (
    <div>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="BEDS" />
          <div>{selectBeds}</div>
        </SelectTrigger>
        <SelectContent>
          <div className="bg-white rounded-md shadow-lg p-4 w-64">
            <div className="grid grid-cols-1">
              <Button
                variant="outline"
                onClick={() => handleSelectBeds("All")}
                style={buttonStyles("All")}
              >
                All
              </Button>
            </div>
            <div className="grid grid-cols-1 mt-2">
              <Button
                variant="outline"
                onClick={() => handleSelectBeds("Studio")}
                style={buttonStyles("Studio")}
              >
                Studio
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSelectBeds("1")}
                style={buttonStyles("1")}
              >
                1
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSelectBeds("2")}
                style={buttonStyles("2")}
              >
                2
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSelectBeds("3")}
                style={buttonStyles("3")}
              >
                3
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSelectBeds("4")}
                style={buttonStyles("4")}
              >
                4
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSelectBeds("5")}
                style={buttonStyles("5")}
              >
                5
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSelectBeds("6")}
                style={buttonStyles("6")}
              >
                6
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSelectBeds("7")}
                style={buttonStyles("7")}
              >
                7
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSelectBeds("8")}
                style={buttonStyles("8")}
              >
                8
              </Button>
            </div>
          </div>
        </SelectContent>
      </Select>
    </div>
  );
};

export default BedsTag;
