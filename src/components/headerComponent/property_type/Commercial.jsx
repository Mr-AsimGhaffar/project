import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";

const Commercial = ({ selectedSubProperty, onSubPropertySelect }) => {
  const buttonStyles = (subProperty) =>
    selectedSubProperty === subProperty ? "bg-gray-800 text-white" : "";
  return (
    <div>
      <div className="flex gap-2 p-1">
        <div>
          <Button
            className={`w-40 ${buttonStyles("Office")}`}
            variant="outline"
            onClick={() => onSubPropertySelect("Office")}
          >
            Office
          </Button>
        </div>
        <div>
          <Button
            className={`w-40 ${buttonStyles("Shop")}`}
            variant="outline"
            onClick={() => onSubPropertySelect("Shop")}
          >
            Shop
          </Button>
        </div>
      </div>
      <div className="flex gap-2 p-1">
        <div>
          <Button
            className={`w-40 ${buttonStyles("Warehouse")}`}
            variant="outline"
            onClick={() => onSubPropertySelect("Warehouse")}
          >
            Warehouse
          </Button>
        </div>
        <div>
          <Button
            className={`w-40 ${buttonStyles("Factory")}`}
            variant="outline"
            onClick={() => onSubPropertySelect("Factory")}
          >
            Factory
          </Button>
        </div>
      </div>
      <div className="flex gap-2 p-1">
        <div>
          <Button
            className={`w-40 ${buttonStyles("Building")}`}
            variant="outline"
            onClick={() => onSubPropertySelect("Building")}
          >
            Building
          </Button>
        </div>
        <div>
          <Button
            className={`w-40 ${buttonStyles("Other")}`}
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
