import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";

const Home = ({ selectedSubProperty, onSubPropertySelect }) => {
  const buttonStyles = (subProperty) =>
    selectedSubProperty === subProperty ? "bg-gray-800 text-white" : "";

  return (
    <div>
      <div className="w-[100%] flex gap-5 p-1">
        <div className="w-[50%]">
          <Button
            className={`w-[100%] ${buttonStyles("House")}`}
            variant="outline"
            onClick={() => onSubPropertySelect("House")}
          >
            House
          </Button>
        </div>
        <div className="w-[50%]">
          <Button
            className={`w-[100%] ${buttonStyles("Flat")}`}
            variant="outline"
            onClick={() => onSubPropertySelect("Flat")}
          >
            Flat
          </Button>
        </div>
      </div>
      <div className="w-[100%] flex gap-5 p-1">
        <div className="w-[50%]">
          <Button
            className={`w-[100%] ${buttonStyles("Upper Portion")}`}
            variant="outline"
            onClick={() => onSubPropertySelect("Upper Portion")}
          >
            Upper Portion
          </Button>
        </div>
        <div className="w-[50%]">
          <Button
            className={`w-[100%] ${buttonStyles("Lower Portion")}`}
            variant="outline"
            onClick={() => onSubPropertySelect("Lower Portion")}
          >
            Lower Portion
          </Button>
        </div>
      </div>
      <div className="w-[100%] flex gap-5 p-1">
        <div className="w-[50%]">
          <Button
            className={`w-[100%] ${buttonStyles("Farm House")}`}
            variant="outline"
            onClick={() => onSubPropertySelect("Farm House")}
          >
            Farm House
          </Button>
        </div>
        <div className="w-[50%]">
          <Button
            className={`w-[100%] ${buttonStyles("Room")}`}
            variant="outline"
            onClick={() => onSubPropertySelect("Room")}
          >
            Room
          </Button>
        </div>
      </div>
      <div className="w-[100%] flex gap-5 p-1">
        <div className="w-[50%]">
          <Button
            className={`w-[100%] ${buttonStyles("Penthouse")}`}
            variant="outline"
            onClick={() => onSubPropertySelect("Penthouse")}
          >
            Penthouse
          </Button>
        </div>
        <div className="w-[50%]"></div>
      </div>
    </div>
  );
};

Home.propTypes = {
  onSubPropertySelect: PropTypes.func.isRequired,
  selectedSubProperty: PropTypes.string.isRequired,
};

export default Home;
