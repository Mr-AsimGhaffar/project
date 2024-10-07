import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import PropTypes from "prop-types";

const BestPropertyArea = ({ setBestAreaMin, setBestAreaMax }) => {
  const [areaMin, setAreaMin] = useState(null);
  const [areaMax, setAreaMax] = useState(null);
  const [areaMinButton, setAreaMinButton] = useState(null);
  const [areaMaxButton, setAreaMaxButton] = useState(null);

  const handleSelectMaxButton = (area, buttonIndex) => {
    setAreaMax(area);
    setBestAreaMax(area);
    setAreaMaxButton(buttonIndex);
  };

  const handleSelectMinButton = (area, buttonIndex) => {
    setAreaMin(area);
    setBestAreaMin(area);
    setAreaMinButton(buttonIndex);
  };
  const handleMinChangeArea = (e) => {
    const newValue = e.target.value;
    setAreaMin(newValue);
    setBestAreaMin(newValue);
  };
  const handleMaxChangeArea = (e) => {
    const newValue = e.target.value;
    setAreaMax(newValue);
    setBestAreaMax(newValue);
  };

  const handleReset = () => {
    setAreaMin(null);
    setAreaMax(null);
    setAreaMinButton(null);
    setAreaMaxButton(null);
    setBestAreaMin(null);
    setBestAreaMax(null);
  };

  const buttonStyles = (isSelected) =>
    isSelected ? "bg-gray-800 text-white" : "";

  return (
    <div>
      <Select>
        <SelectTrigger className="dark:bg-black">
          <SelectValue placeholder="AREA" />
          <div>{areaMin}</div>
          <div>To</div>
          <div>{areaMax}</div>
        </SelectTrigger>
        <SelectContent className="dark:bg-black">
          <div className="rounded-md shadow-lg p-4 w-64">
            <Button className="mb-4 w-[100%]" variant="secondary">
              Area unit (Marla)
            </Button>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-xs font-semibold text-gray-500 mb-1">
                  MIN:
                </div>
                <Input
                  type="number"
                  className="text-center dark:bg-black"
                  placeholder="0"
                  value={areaMin || ""}
                  onChange={handleMinChangeArea}
                />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 mb-1">
                  MAX:
                </div>
                <Input
                  type="number"
                  className="text-center dark:bg-black"
                  placeholder="Any"
                  value={areaMax || ""}
                  onChange={handleMaxChangeArea}
                />
              </div>
            </div>
            <div className="border-t border-gray-200 py-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className={`${buttonStyles(
                    areaMinButton === 0
                  )} dark:bg-black`}
                  onClick={() => handleSelectMinButton(0, 0)}
                >
                  0
                </Button>
                <Button
                  variant="outline"
                  className={`${buttonStyles(
                    areaMaxButton === 0
                  )}dark:bg-black`}
                  onClick={() => handleSelectMaxButton("Any", 0)}
                >
                  Any
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 p-2">
                <Button
                  variant="outline"
                  className={`${buttonStyles(
                    areaMinButton === 1
                  )}dark:bg-black`}
                  onClick={() => handleSelectMinButton("2", 1)}
                >
                  2
                </Button>
                <Button
                  variant="outline"
                  className={`${buttonStyles(
                    areaMaxButton === 1
                  )}dark:bg-black`}
                  onClick={() => handleSelectMaxButton("2", 1)}
                >
                  2
                </Button>
                <Button
                  variant="outline"
                  className={`${buttonStyles(
                    areaMinButton === 2
                  )}dark:bg-black`}
                  onClick={() => handleSelectMinButton("3", 2)}
                >
                  3
                </Button>
                <Button
                  variant="outline"
                  className={`${buttonStyles(
                    areaMaxButton === 2
                  )}dark:bg-black`}
                  onClick={() => handleSelectMaxButton("3", 2)}
                >
                  3
                </Button>
                <Button
                  variant="outline"
                  className={`${buttonStyles(
                    areaMinButton === 3
                  )}dark:bg-black`}
                  onClick={() => handleSelectMinButton("5", 3)}
                >
                  5
                </Button>
                <Button
                  variant="outline"
                  className={`${buttonStyles(
                    areaMaxButton === 3
                  )}dark:bg-black`}
                  onClick={() => handleSelectMaxButton("5", 3)}
                >
                  5
                </Button>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button
                variant="outline"
                onClick={handleReset}
                className="dark:bg-black"
              >
                Reset
              </Button>
            </div>
          </div>
        </SelectContent>
      </Select>
    </div>
  );
};

BestPropertyArea.propTypes = {
  setBestAreaMin: PropTypes.string.isRequired,
  setBestAreaMax: PropTypes.string.isRequired,
};

export default BestPropertyArea;
