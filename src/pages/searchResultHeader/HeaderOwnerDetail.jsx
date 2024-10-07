import { useContext, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { appContext } from "../../contexts/Context";
import { useLocation } from "react-router-dom";

const HeaderOwnerDetail = () => {
  const simpleContext = useContext(appContext);
  const location = useLocation();
  const { is_agency } = simpleContext.appState;

  // Sync local state with appState
  // useEffect(() => {
  //   is_agency(simpleContext.appState.is_agency);
  // }, [simpleContext.appState.is_agency]);

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
    is_agency === "" ? "all" : is_agency === "true" ? "true" : "false";
  return (
    <div>
      <Select
        defaultValue={selectedValue}
        value={selectedValue}
        onValueChange={handleSelectAgent}
      >
        <SelectTrigger className="rounded-3xl border-2 dark:bg-black">
          <SelectValue placeholder="Owner Detail" />
        </SelectTrigger>
        <SelectContent className="dark:bg-black">
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="true">Agency</SelectItem>
          <SelectItem value="false">Owner</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default HeaderOwnerDetail;
