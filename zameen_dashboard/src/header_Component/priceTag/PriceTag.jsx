import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { appContext } from "@/Context";

const PriceTag = () => {
  const [selectedAmountMax, setSelectedAmountMax] = useState(null);
  const [selectedAmountMin, setSelectedAmountMin] = useState(null);
  const simpleContext = useContext(appContext);
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

  const handleSelectMax = (amount) => {
    setSelectedAmountMax(amount);
  };
  const handleSelectMin = (amount) => {
    setSelectedAmountMin(amount);
  };
  const handleMinChange = (e) => {
    setSelectedAmountMin(e.target.value);
  };

  const handleMaxChange = (e) => {
    setSelectedAmountMax(e.target.value);
  };
  const handleReset = () => {
    setSelectedAmountMin(null);
    setSelectedAmountMax(null);
  };

  function ChevronUpIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    );
  }
  return (
    <div>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="PRICE" />
          <div>{selectedAmountMin}</div>
          <div>To</div>
          <div>{selectedAmountMax}</div>
        </SelectTrigger>
        <SelectContent>
          <div className="bg-white rounded-md shadow-lg p-4 w-64">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-semibold">PRICE (PKR)</div>
              <ChevronUpIcon className="h-4 w-4 text-gray-400" />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-xs font-semibold text-gray-500 mb-1">
                  MIN:
                </div>
                <Input
                  className="text-center"
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
                  className="text-center"
                  placeholder="Any"
                  value={selectedAmountMax || ""}
                  onChange={handleMaxChange}
                />
              </div>
            </div>
            <div className="border-t border-gray-200 py-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="destructive"
                  onClick={() => handleSelectMin(0)}
                >
                  0
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleSelectMax("Any")}
                >
                  Any
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 p-2">
                <Button
                  variant="outline"
                  onClick={() => handleSelectMin("500,000")}
                >
                  500,000
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSelectMax("1,000,000")}
                >
                  1,000,000
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSelectMin("2,000,000")}
                >
                  2,000,000
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSelectMax("3,500,000")}
                >
                  3,500,000
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSelectMin("5,000,000")}
                >
                  5,000,000
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSelectMax("6,500,000")}
                >
                  6,500,000
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSelectMin("8,000,000")}
                >
                  8,000,000
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSelectMax("10,000,000")}
                >
                  10,000,000
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSelectMin("12,500,000")}
                >
                  12,500,000
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSelectMax("15,000,000")}
                >
                  15,000,000
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSelectMin("17,500,000")}
                >
                  17,500,000
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSelectMax("20,000,000")}
                >
                  20,000,000
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSelectMin("25,000,000")}
                >
                  25,000,000
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSelectMax("30,000,000")}
                >
                  30,000,000
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSelectMin("40,000,000")}
                >
                  40,000,000
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSelectMax("50,000,000")}
                >
                  50,000,000
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSelectMin("75,000,000")}
                >
                  75,000,000
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSelectMax("100,000,000")}
                >
                  100,000,000
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSelectMin("200,000,000")}
                >
                  200,000,000
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSelectMax("500,000,000")}
                >
                  500,000,000
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSelectMin("1,000,000,000")}
                >
                  1,000,000,000
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSelectMax("5,000,000,000")}
                >
                  5,000,000,000
                </Button>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="ghost" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </div>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PriceTag;
