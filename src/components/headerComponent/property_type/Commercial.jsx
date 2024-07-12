import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";

const Commercial = ({ selectedSubProperty, onSubPropertySelect }) => {
  const buttonStyles = (subProperty) =>
    selectedSubProperty === subProperty
      ? "bg-gray-800 text-white"
      : "text-black";
  return (
    <div>
      <div className="w-[100%] flex gap-5 p-1">
        <div className="w-[50%]">
          <Button
            className={`w-[100%] ${buttonStyles("Office")}`}
            variant="outline"
            onClick={() => onSubPropertySelect("Office")}
          >
            Office
          </Button>
        </div>
        <div className="w-[50%]">
          <Button
            className={`w-[100%] ${buttonStyles("Shop")}`}
            variant="outline"
            onClick={() => onSubPropertySelect("Shop")}
          >
            Shop
          </Button>
        </div>
      </div>
      <div className="w-[100%] flex gap-5 p-1">
        <div className="w-[50%]">
          <Button
            className={`w-[100%] ${buttonStyles("Warehouse")}`}
            variant="outline"
            onClick={() => onSubPropertySelect("Warehouse")}
          >
            Warehouse
          </Button>
        </div>
        <div className="w-[50%]">
          <Button
            className={`w-[100%] ${buttonStyles("Factory")}`}
            variant="outline"
            onClick={() => onSubPropertySelect("Factory")}
          >
            Factory
          </Button>
        </div>
      </div>
      <div className="w-[100%] flex gap-5 p-1">
        <div className="w-[50%]">
          <Button
            className={`w-[100%] ${buttonStyles("Building")}`}
            variant="outline"
            onClick={() => onSubPropertySelect("Building")}
          >
            Building
          </Button>
        </div>
        <div className="w-[50%]">
          <Button
            className={`w-[100%] ${buttonStyles("Other")}`}
            variant="outline"
            onClick={() => onSubPropertySelect("Other")}
          >
            Other
          </Button>
        </div>
      </div>
    </div>
  );
};

Commercial.propTypes = {
  onSubPropertySelect: PropTypes.func.isRequired,
  selectedSubProperty: PropTypes.string.isRequired,
};

export default Commercial;
