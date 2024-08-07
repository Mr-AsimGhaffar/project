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

export function DatePickerWithRange({ onChange, className }) {
  const [date, setDate] = React.useState(null);

  const handleDateChange = (newDate) => {
    setDate(newDate);
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
              "justify-start text-left font-normal rounded-3xl border-2",
              !date && "text-muted-foreground"
            )}
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
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
            toDate={today}
          />
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
  className: PropTypes.string, // Add className to propTypes
};
