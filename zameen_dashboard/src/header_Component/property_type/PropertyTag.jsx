import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Home from "./Home";
import Plots from "./Plots";
import Commercial from "./Commercial";

const PropertyTag = () => {
  return (
    <div>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="PROPERTY TYPE" />
        </SelectTrigger>
        <SelectContent className="w-[100%]">
          <Router>
            <div>
              <div className="flex justify-between items-center p-5">
                <Link to="/">
                  <h1 className="cursor-pointer hover:text-blue-500">Home</h1>
                </Link>
                <Link to="/plots">
                  <h1 className="cursor-pointer  hover:text-blue-500">Plots</h1>
                </Link>
                <Link to="/commercial">
                  <h1 className="cursor-pointer  hover:text-blue-500">
                    Commercial
                  </h1>
                </Link>
              </div>
              <div>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/plots" element={<Plots />} />
                  <Route path="/commercial" element={<Commercial />} />
                </Routes>
              </div>
            </div>
          </Router>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PropertyTag;
