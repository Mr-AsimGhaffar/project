import { useContext, useEffect } from "react";
import { appContext } from "../../contexts/Context";
import { useLocation } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Button } from "../../components/ui/button";
import { IoIosArrowDown } from "react-icons/io";

const HeaderOwnerDetail = () => {
  const simpleContext = useContext(appContext);
  const location = useLocation();
  const { is_agency } = simpleContext.appState;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectAgencyFromUrl = params.get("agency");

    if (selectAgencyFromUrl) {
      simpleContext.setAppState((s) => ({
        ...s,
        is_agency: selectAgencyFromUrl,
      }));
    }
  }, []);

  const handleSelectAgent = (agent) => {
    simpleContext.setAppState((s) => ({
      ...s,
      is_agency: agent == "all" ? "" : agent,
    }));
  };
  const selectedValue =
    is_agency === "" ? "All" : is_agency === "true" ? "Agency" : "Owner";
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild className="rounded-3xl border-2">
          <Button className="w-full flex justify-start bg-white text-black focus:bg-white active:bg-white hover:bg-white dark:bg-black dark:text-white">
            <div className="flex justify-between items-center w-full">
              <div>{selectedValue || "Owner Detail"}</div>
              <div>
                <IoIosArrowDown />
              </div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="dark:bg-black">
          <div
            className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-900 dark:bg-black"
            onClick={() => handleSelectAgent("all")}
          >
            All
          </div>
          <div
            className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-900 dark:bg-black"
            onClick={() => handleSelectAgent("true")}
          >
            Agency
          </div>
          <div
            className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-900 dark:bg-black"
            onClick={() => handleSelectAgent("false")}
          >
            Owner
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default HeaderOwnerDetail;
