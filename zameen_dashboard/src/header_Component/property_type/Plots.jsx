import { Button } from "@/components/ui/button";

import PropTypes from "prop-types";

const Plots = ({ onSubPropertySelect }) => {
  return (
    <div>
      <div className="w-[100%] flex gap-5 p-1">
        <div className="w-[50%]">
          <Button
            className="w-[100%]"
            variant="outline"
            onClick={() => onSubPropertySelect("Residential Plot")}
          >
            Residential Plots
          </Button>
        </div>
        <div className="w-[50%]">
          <Button
            className="w-[100%]"
            variant="outline"
            onClick={() => onSubPropertySelect("Commercial Plot")}
          >
            Commercial Plots
          </Button>
        </div>
      </div>
      <div className="w-[100%] flex gap-5 p-1">
        <div className="w-[50%]">
          <Button
            className="w-[100%]"
            variant="outline"
            onClick={() => onSubPropertySelect("Agricultural Land")}
          >
            Agricultural Land
          </Button>
        </div>
        <div className="w-[50%]">
          <Button
            className="w-[100%]"
            variant="outline"
            onClick={() => onSubPropertySelect("Industrial Land")}
          >
            Industrial Land
          </Button>
        </div>
      </div>
      <div className="w-[100%] flex gap-5 p-1">
        <div className="w-[50%]">
          <Button
            className="w-[100%]"
            variant="outline"
            onClick={() => onSubPropertySelect("Plot File")}
          >
            Plot File
          </Button>
        </div>
        <div className="w-[50%]">
          <Button
            className="w-[100%]"
            variant="outline"
            onClick={() => onSubPropertySelect("Plot Form")}
          >
            Plot Form
          </Button>
        </div>
      </div>
    </div>
  );
};

Plots.propTypes = {
  onSubPropertySelect: PropTypes.func.isRequired,
};

export default Plots;
