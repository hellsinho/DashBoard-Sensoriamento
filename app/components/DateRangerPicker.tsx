'use client';

import * as React from "react";
import { addDays, format, setHours, setMinutes } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

export function DateRangePicker({
  onChange,
  initialRange,
}: {
  onChange: (range: DateRange | undefined) => void;
  initialRange?: DateRange;
}) {
  const [date, setDate] = React.useState<DateRange | undefined>(initialRange);
  const [fromTime, setFromTime] = React.useState("00:00");
  const [toTime, setToTime] = React.useState("23:59");

  const handleSelect = (range: DateRange | undefined) => {
    if (!range?.from || !range?.to) return;

    const [fromHour, fromMinute] = fromTime.split(":").map(Number);
    const [toHour, toMinute] = toTime.split(":").map(Number);

    const fromWithTime = setMinutes(setHours(range.from, fromHour), fromMinute);
    const toWithTime = setMinutes(setHours(range.to, toHour), toMinute);

    const finalRange = { from: fromWithTime, to: toWithTime };

    setDate(finalRange);
    onChange(finalRange);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[320px] justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "dd/MM/yyyy HH:mm")} -{" "}
                {format(date.to, "dd/MM/yyyy HH:mm")}
              </>
            ) : (
              format(date.from, "dd/MM/yyyy HH:mm")
            )
          ) : (
            <span>Selecione um intervalo</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-4 space-y-4">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
        <div className="flex gap-4">
          <div>
            <label className="block text-xs font-medium mb-1">Hora início</label>
            <input
              type="time"
              value={fromTime}
              onChange={(e) => setFromTime(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Hora fim</label>
            <input
              type="time"
              value={toTime}
              onChange={(e) => setToTime(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            />
          </div>
          <Button
            variant="default"
            className="self-end h-[36px]"
            onClick={() => handleSelect(date)}
          >
            Aplicar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
