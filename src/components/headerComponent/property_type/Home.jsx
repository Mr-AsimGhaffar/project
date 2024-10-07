import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";

const Home = ({ selectedSubProperty, onSubPropertySelect }) => {
  const buttonStyles = (subProperty) =>
    selectedSubProperty === subProperty ? "bg-gray-800 text-white" : "";

  return (
    <div>
      <div className="flex gap-2 p-1">
        <div>
          <Button
            className={`w-40  dark:bg-black ${buttonStyles("House")}`}
            variant="outline"
            onClick={() => onSubPropertySelect("House")}
          >
            House
          </Button>
        </div>
        <div>
          <Button
            className={`w-40 dark:bg-black ${buttonStyles("Flat")}`}
            variant="outline"
            onClick={() => onSubPropertySelect("Flat")}
          >
            Flat
          </Button>
        </div>
      </div>
      <div className="flex gap-2 p-1">
        <div>
          <Button
            className={`w-40 dark:bg-black ${buttonStyles("Upper Portion")}`}
            variant="outline"
            onClick={() => onSubPropertySelect("Upper Portion")}
          >
            Upper Portion
          </Button>
        </div>
        <div>
          <Button
            className={`w-40 dark:bg-black ${buttonStyles("Lower Portion")}`}
            variant="outline"
            onClick={() => onSubPropertySelect("Lower Portion")}
          >
            Lower Portion
          </Button>
        </div>
      </div>
      <div className="flex gap-2 p-1">
        <div>
          <Button
            className={`w-40 dark:bg-black ${buttonStyles("Farm House")}`}
            variant="outline"
            onClick={() => onSubPropertySelect("Farm House")}
          >
            Farm House
          </Button>
        </div>
        <div>
          <Button
            className={`w-40 dark:bg-black ${buttonStyles("Room")}`}
            variant="outline"
            onClick={() => onSubPropertySelect("Room")}
          >
            Room
          </Button>
        </div>
      </div>
      <div className="flex gap-2 p-1">
        <div>
          <Button
            className={`w-40 dark:bg-black ${buttonStyles("Penthouse")}`}
            variant="outline"
            onClick={() => onSubPropertySelect("Penthouse")}
          >
            Penthouse
          </Button>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  onSubPropertySelect: PropTypes.func.isRequired,
  selectedSubProperty: PropTypes.string.isRequired,
};

export default Home;
