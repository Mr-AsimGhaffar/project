import { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { appContext } from "../../contexts/Context";

const HeaderOwnerDetail = () => {
  const simpleContext = useContext(appContext);
  const { is_agency } = simpleContext.appState;
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
        className="touch-auto"
        defaultValue={selectedValue}
        onValueChange={handleSelectAgent}
      >
        <SelectTrigger className="rounded-3xl border-2">
          <SelectValue placeholder="Owner Detail" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="true">Agency</SelectItem>
          <SelectItem value="false">Owner</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default HeaderOwnerDetail;
