import { Button } from "@/components/ui/button";
import { appContext } from "@/contexts/Context";
import { saveToLocalStorage } from "@/utlils/SaveLocalStorage";
import { useContext, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { useLocation } from "react-router-dom";

const HeaderBeds = () => {
  const simpleContext = useContext(appContext);
  const location = useLocation();
  const [selectBeds, setSelectBeds] = useState(
    simpleContext.appState.selectBeds
  );

  // Sync the component's local state with global appState on reset or update
  useEffect(() => {
    setSelectBeds(simpleContext.appState.selectBeds);
  }, [simpleContext.appState.selectBeds]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectBedsFromUrl = params.get("beds");

    if (selectBedsFromUrl) {
      setSelectBeds(selectBedsFromUrl);
      simpleContext.setAppState((s) => ({
        ...s,
        selectBeds: selectBedsFromUrl,
      }));
    }
  }, []);

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
      <Popover className="touch-auto">
        <PopoverTrigger asChild className="rounded-3xl border-2">
          <Button className="w-full bg-white text-[#434343] focus:bg-white active:bg-white hover:bg-white opacity-80">
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
          <div className="rounded-md shadow-lg p-4 w-64">
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
export default HeaderBeds;
