import { useContext, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveToLocalStorage } from "@/utlils/SaveLocalStorage";
import { appContext } from "@/contexts/Context";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { GrPowerReset } from "react-icons/gr";

const PriceTag = () => {
  const [selectedAmountMax, setSelectedAmountMax] = useState(null);
  const [selectedAmountMin, setSelectedAmountMin] = useState(null);
  const [selectedMinButton, setSelectedMinButton] = useState(null);
  const [selectedMaxButton, setSelectedMaxButton] = useState(null);
  const simpleContext = useContext(appContext);

  const priceOptions = [
    "0",
    "500,000",
    "1,000,000",
    "2,000,000",
    "3,500,000",
    "5,000,000",
    "6,500,000",
    "8,000,000",
    "10,000,000",
    "12,500,000",
    "15,000,000",
    "17,500,000",
    "20,000,000",
    "25,000,000",
    "30,000,000",
    "40,000,000",
    "50,000,000",
    "75,000,000",
    "100,000,000",
    "250,000,000",
    "500,000,000",
    "1,000,000,000",
  ];

  useEffect(() => {
    simpleContext.setAppState((s) => ({
      ...s,
      selectedAmountMax: selectedAmountMax,
    }));
  }, [selectedAmountMax]);

  useEffect(() => {
    simpleContext.setAppState((s) => ({
      ...s,
      selectedAmountMin: selectedAmountMin,
    }));
  }, [selectedAmountMin]);

  const handleSelectMax = (amount, buttonIndex) => {
    const newValue = amount === "Any" ? null : amount;
    if (selectedMaxButton === buttonIndex) {
      setSelectedAmountMax(null);
      setSelectedMaxButton(null);
      simpleContext.setAppState((s) => ({
        ...s,
        selectedAmountMax: null,
      }));
      saveToLocalStorage("selectedAmountMax", null);
    } else {
      setSelectedAmountMax(newValue);
      setSelectedMaxButton(buttonIndex);
      simpleContext.setAppState((s) => ({
        ...s,
        selectedAmountMax: newValue ? newValue : null,
      }));
      saveToLocalStorage("selectedAmountMax", newValue);
    }
  };
  const handleSelectMin = (amount, buttonIndex) => {
    const newValue = amount;
    if (selectedMinButton === buttonIndex) {
      setSelectedAmountMin(null);
      setSelectedMinButton(null);
      simpleContext.setAppState((s) => ({
        ...s,
        selectedAmountMin: null,
      }));
      saveToLocalStorage("selectedAmountMin", null);
    } else {
      setSelectedAmountMin(newValue);
      setSelectedMinButton(buttonIndex);
      simpleContext.setAppState((s) => ({
        ...s,
        selectedAmountMin: newValue,
      }));
      saveToLocalStorage("selectedAmountMin", newValue);
    }
  };
  const handleMinChange = (e) => {
    const newValue = e.target.value;
    if (newValue === "" || Number(newValue) >= 0) {
      setSelectedAmountMin(newValue);
      simpleContext.setAppState((s) => ({
        ...s,
        selectedAmountMin: newValue,
      }));
      saveToLocalStorage("selectedAmountMin", newValue);
    }
  };

  const handleMaxChange = (e) => {
    const newValue = e.target.value;
    if (newValue === "" || Number(newValue) >= 0) {
      setSelectedAmountMax(newValue);
      simpleContext.setAppState((s) => ({
        ...s,
        selectedAmountMax: newValue,
      }));
      saveToLocalStorage("selectedAmountMax", newValue);
    }
  };
  const handleReset = () => {
    setSelectedAmountMin(null);
    setSelectedAmountMax(null);
    setSelectedMinButton(null);
    setSelectedMaxButton(null);
  };

  // Filter Min and Max price options based on selection
  const filteredMinOptions = priceOptions.filter((price) => {
    if (selectedAmountMax === null) return true; // No Max selected, show all Min
    return (
      parseInt(price.replace(/,/g, "")) <=
      parseInt(selectedAmountMax.replace(/,/g, ""))
    );
  });

  const filteredMaxOptions = priceOptions.filter((price) => {
    if (selectedAmountMin === null) return true; // No Min selected, show all Max
    return (
      parseInt(price.replace(/,/g, "")) >=
      parseInt(selectedAmountMin.replace(/,/g, ""))
    );
  });

  const buttonStyles = (isSelected) =>
    isSelected ? "bg-gray-800 dark:bg-black text-white" : "";
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="w-full bg-white text-black focus:bg-white active:bg-white hover:bg-white dark:bg-black dark:text-white">
            <div className="flex justify-between items-center w-full">
              <p>PRICE</p>
              <div>{selectedAmountMin === null ? "0" : selectedAmountMin}</div>
              <div>To</div>
              <div>
                {selectedAmountMax === null ? "Any" : selectedAmountMax}
              </div>
              <div>
                <IoIosArrowDown />
              </div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="dark:bg-black">
          <div className="rounded-md shadow-lg p-4 w-64 h-96 overflow-auto">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-semibold">PRICE (PKR)</div>
              <div>
                <Button
                  variant="outline"
                  className="rounded-3xl text-xs dark:bg-black"
                  onClick={handleReset}
                >
                  <div className="flex items-center gap-2">
                    Reset
                    <GrPowerReset />
                  </div>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-xs font-semibold text-gray-500 mb-1">
                  MIN:
                </div>
                <Input
                  type="number"
                  inputMode="numeric"
                  className="text-center dark:bg-black"
                  placeholder="0"
                  value={selectedAmountMin || ""}
                  onChange={handleMinChange}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 mb-1">
                  MAX:
                </div>
                <Input
                  type="number"
                  inputMode="numeric"
                  className="text-center dark:bg-black"
                  placeholder="Any"
                  value={selectedAmountMax || ""}
                  onChange={handleMaxChange}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
            <div className="border-t border-gray-200 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  {filteredMinOptions.map((price, index) => (
                    <Button
                      key={`min-${index}`}
                      variant="outline"
                      className={`${buttonStyles(
                        selectedMinButton === index
                      )} w-[100%] mb-2`}
                      onClick={() => handleSelectMin(price, index)}
                    >
                      {price}
                    </Button>
                  ))}
                </div>
                <div>
                  {filteredMaxOptions.map((price, index) => (
                    <Button
                      key={`max-${index}`}
                      variant="outline"
                      className={`${buttonStyles(
                        selectedMaxButton === index
                      )} w-[100%] mb-2`}
                      onClick={() => handleSelectMax(price, index)}
                    >
                      {price}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PriceTag;
