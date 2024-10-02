import { Button } from "@/components/ui/button";
import { appContext } from "@/contexts/Context";
import { saveToLocalStorage } from "@/utlils/SaveLocalStorage";
import { useContext, useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { IoIosArrowDown } from "react-icons/io";
import PropTypes from "prop-types";

const BedsTag = ({ disabled }) => {
  const [selectBeds, setSelectBeds] = useState("All");
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
          .split(",")
          .filter((bed) => bed !== number)
          .join(",");
        return updatedBeds === "" ? "All" : updatedBeds;
      } else {
        return [...prevSelectBeds.split(","), number].filter(Boolean).join(",");
      }
    });
  };
  useEffect(() => {
    saveToLocalStorage("selectBeds", selectBeds);
    simpleContext.setAppState((s) => ({
      ...s,
      selectBeds: selectBeds,
    }));
  }, [selectBeds]);

  const buttonStyles = (bedType) => ({
    backgroundColor: selectBeds.includes(bedType) ? "#2d3748" : "#FFFFFF",
    color: selectBeds.includes(bedType) ? "#FFFFFF" : "#000000",
  });

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="w-full bg-white text-black focus:bg-white active:bg-white hover:bg-white"
            disabled={disabled}
          >
            <div className="w-full flex justify-between items-center">
              <p>BEDS</p>
              <div>{selectBeds}</div>
              <div>
                <IoIosArrowDown />
              </div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="rounded-md shadow-lg p-4 w-64 h-96 overflow-auto">
            <div className="grid grid-cols-1">
              <Button
                variant="outline"
                onClick={() => handleSelectBeds("All")}
                style={buttonStyles("All")}
              >
                All
              </Button>
            </div>
            <div className="grid grid-cols-1 mt-2 space-y-2">
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
              <Button
                variant="outline"
                onClick={() => handleSelectBeds("9")}
                style={buttonStyles("9")}
              >
                9
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSelectBeds("10")}
                style={buttonStyles("10")}
              >
                10+
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

BedsTag.propTypes = {
  disabled: PropTypes.bool.isRequired,
};

export default BedsTag;
