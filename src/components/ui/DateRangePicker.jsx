"use client";

import * as React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLocation } from "react-router-dom";
import { appContext } from "../../contexts/Context";

export function DatePickerWithRange({ onChange, className, isSelectOpen }) {
  const simpleContext = React.useContext(appContext);
  const [date, setDate] = React.useState(null);
  const location = useLocation();

  React.useEffect(() => {
    if (!simpleContext.appState.startDate && !simpleContext.appState.endDate) {
      setDate(null);
    }
  }, [simpleContext.appState]);

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const startDateFromUrl = params.get("start_date");
    const endDateFromUrl = params.get("end_date");

    if (startDateFromUrl || endDateFromUrl) {
      const startDate = startDateFromUrl ? new Date(startDateFromUrl) : null;
      const endDate = endDateFromUrl ? new Date(endDateFromUrl) : null;
      setDate({ from: startDate, to: endDate });

      simpleContext.setAppState((s) => ({
        ...s,
        startDate,
        endDate,
      }));
    }
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    simpleContext.setAppState((s) => ({
      ...s,
      startDate: newDate?.from,
      endDate: newDate?.to,
    }));
    if (newDate) {
      onChange(newDate.from, newDate.to);
    } else {
      onChange(null, null); // Handle case when date is cleared
    }
  };
  const handleClear = () => {
    setDate(null);
    onChange(null, null);
  };
  const today = new Date();

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "flex items-center justify-start text-left font-normal rounded-3xl border-2",
              !date && "text-muted-foreground",
              "w-full sm:w-auto"
            )}
            style={{
              pointerEvents: isSelectOpen ? "none" : "auto",
            }}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full sm:w-auto p-0" align="start">
          <div className="md:h-auto overflow-y-auto h-52">
            <Calendar
              initialFocus
              mode="range"
              selected={date}
              onSelect={handleDateChange}
              numberOfMonths={2}
              toDate={today}
            />
          </div>
          <div className="flex justify-end p-2">
            <Button variant="outline" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
DatePickerWithRange.propTypes = {
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  isSelectOpen: PropTypes.bool,
};
