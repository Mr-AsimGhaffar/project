import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const BedsTag = () => {
  const [selectBeds, setSelectBeds] = useState("");

  const handleSelectAllBeds = (number) => {
    setSelectBeds(number);
  };
  const handleSelectBeds = (number) => {
    setSelectBeds((num) => {
      if (num == "All") {
        return number;
      }
      return num.concat(", ", number).split(",").filter(Boolean).join(",");
    });
  };

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
                variant="destructive"
                onClick={() => handleSelectAllBeds("All")}
              >
                All
              </Button>
            </div>
            <div className="grid grid-cols-1 mt-2">
              <Button
                variant="outline"
                onClick={() => handleSelectBeds("Studio")}
              >
                Studio
              </Button>
              <Button variant="outline" onClick={() => handleSelectBeds("1")}>
                1
              </Button>
              <Button variant="outline" onClick={() => handleSelectBeds("2")}>
                2
              </Button>
              <Button variant="outline" onClick={() => handleSelectBeds("3")}>
                3
              </Button>
              <Button variant="outline" onClick={() => handleSelectBeds("4")}>
                4
              </Button>
              <Button variant="outline" onClick={() => handleSelectBeds("5")}>
                5
              </Button>
              <Button variant="outline" onClick={() => handleSelectBeds("6")}>
                6
              </Button>
              <Button variant="outline" onClick={() => handleSelectBeds("7")}>
                7
              </Button>
              <Button variant="outline" onClick={() => handleSelectBeds("8")}>
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
