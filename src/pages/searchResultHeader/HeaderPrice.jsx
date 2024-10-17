import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveToLocalStorage } from "@/utlils/SaveLocalStorage";
import { appContext } from "@/contexts/Context";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { IoIosArrowDown } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { GrPowerReset } from "react-icons/gr";

const HeaderPrice = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const simpleContext = useContext(appContext);
  const location = useLocation();
  const [selectedAmountMax, setSelectedAmountMax] = useState(
    simpleContext.appState.selectedAmountMax
  );
  const [selectedAmountMin, setSelectedAmountMin] = useState(
    simpleContext.appState.selectedAmountMin
  );
  const [selectedMinButton, setSelectedMinButton] = useState(null);
  const [selectedMaxButton, setSelectedMaxButton] = useState(null);

  useEffect(() => {
    setSelectedAmountMin(simpleContext.appState.selectedAmountMin);
    setSelectedAmountMax(simpleContext.appState.selectedAmountMax);
  }, [
    simpleContext.appState.selectedAmountMin,
    simpleContext.appState.selectedAmountMax,
  ]);

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
    const params = new URLSearchParams(location.search);
    const minPriceFromUrl = params.get("price_min");
    const maxPriceFromUrl = params.get("price_max");

    if (minPriceFromUrl) {
      setSelectedAmountMin(minPriceFromUrl);
      simpleContext.setAppState((s) => ({
        ...s,
        selectedAmountMin: minPriceFromUrl,
      }));
    }
    if (maxPriceFromUrl) {
      setSelectedAmountMax(maxPriceFromUrl);
      simpleContext.setAppState((s) => ({
        ...s,
        selectedAmountMax: maxPriceFromUrl,
      }));
    }
  }, []);

  useEffect(() => {
    simpleContext.setAppState((s) => ({
      ...s,
      selectedAmountMax: selectedAmountMax,
      selectedAmountMin: selectedAmountMin,
    }));
  }, [selectedAmountMax, selectedAmountMin]);

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
    let newValue = e.target.value;
    const isDigitsOnly = (str) => /^[\d,]+$/.test(str);
    if (!isDigitsOnly(newValue)) return;

    newValue = newValue.replace(/,/g, "");
    let parsedValue = parseInt(newValue, 10);
    if (isNaN(parsedValue)) return;
    newValue = parsedValue.toLocaleString();
    const buttonIndex = priceOptions.indexOf(newValue);

    setSelectedAmountMin(newValue);
    setSelectedMinButton(buttonIndex == -1 ? null : buttonIndex);
    simpleContext.setAppState((s) => ({
      ...s,
      selectedAmountMin: newValue,
    }));
    saveToLocalStorage("selectedAmountMin", newValue);
  };

  const handleMaxChange = (e) => {
    let newValue = e.target.value;
    const isDigitsOnly = (str) => /^[\d,]+$/.test(str);
    if (!isDigitsOnly(newValue)) return;

    newValue = newValue.replace(/,/g, "");
    let parsedValue = parseInt(newValue, 10);
    if (isNaN(parsedValue)) return;
    newValue = parsedValue.toLocaleString();
    const buttonIndex = priceOptions.indexOf(newValue);

    setSelectedAmountMax(newValue);
    setSelectedMaxButton(buttonIndex == -1 ? null : buttonIndex);
    simpleContext.setAppState((s) => ({
      ...s,
      selectedAmountMax: newValue,
    }));
    saveToLocalStorage("selectedAmountMax", newValue);
  };
  const handleReset = () => {
    setSelectedAmountMin(null);
    setSelectedAmountMax(null);
    setSelectedMinButton(null);
    setSelectedMaxButton(null);
  };

  // Filter Min and Max price options based on selection
  const filteredMinOptions = priceOptions.filter((price) => {
    if (!selectedAmountMax) return true; // No Max selected, show all Min
    return (
      parseInt(price.replace(/,/g, "")) <=
      parseInt(selectedAmountMax.replace(/,/g, ""))
    );
  });

  const filteredMaxOptions = priceOptions.filter((price) => {
    if (!selectedAmountMin) return true; // No Min selected, show all Max
    return (
      parseInt(price.replace(/,/g, "")) >=
      parseInt(selectedAmountMin.replace(/,/g, ""))
    );
  });

  const buttonStyles = (isSelected) =>
    isSelected ? "bg-gray-800 dark:bg-gray-800 text-white" : "";
  return (
    <div>
      <Popover
        onOpenChange={(open) => setIsDropdownOpen(open)}
        open={isDropdownOpen}
      >
        <PopoverTrigger asChild className="rounded-3xl border-2">
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
                  type="text"
                  className="text-center dark:bg-black"
                  placeholder="0"
                  value={selectedAmountMin || ""}
                  onChange={handleMinChange}
                />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 mb-1">
                  MAX:
                </div>
                <Input
                  type="text"
                  className="text-center dark:bg-black"
                  placeholder="Any"
                  value={selectedAmountMax || ""}
                  onChange={handleMaxChange}
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

export default HeaderPrice;
