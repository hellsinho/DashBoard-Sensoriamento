'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

type Props = {
  onApply: (range: DateRange | undefined) => void;
  initialRange?: DateRange;
};

export function DateRangePickerWithTime({ onApply, initialRange }: Props) {
  const [range, setRange] = React.useState<DateRange | undefined>(initialRange);
  const [fromTime, setFromTime] = React.useState('00:00');
  const [toTime, setToTime] = React.useState('23:59');

  const handleApply = () => {
    if (!range?.from) return;
  
    const [fromHours, fromMinutes] = fromTime.split(':').map(Number);
    const [toHours, toMinutes] = toTime.split(':').map(Number);
  
    const fromDate = new Date(range.from);
    fromDate.setHours(fromHours);
    fromDate.setMinutes(fromMinutes);
    fromDate.setSeconds(0);
    fromDate.setMilliseconds(0);
  
    const isSameDay = !range.to || range.from.toDateString() === range.to.toDateString();
  
    const toDate = isSameDay ? new Date(range.from) : new Date(range.to!);
    toDate.setHours(toHours);
    toDate.setMinutes(toMinutes);
    toDate.setSeconds(59);
    toDate.setMilliseconds(999);
  
    onApply({ from: fromDate, to: toDate });
  };
  

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[300px] justify-start text-left font-normal">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {range?.from ? (
            range.to ? (
              <>
                {format(range.from, 'dd/MM/yyyy HH:mm')} - {format(range.to, 'dd/MM/yyyy HH:mm')}
              </>
            ) : (
              format(range.from, 'dd/MM/yyyy HH:mm')
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
          defaultMonth={range?.from}
          selected={range}
          onSelect={setRange}
          numberOfMonths={2}
        />
        <div className="flex items-center gap-4">
          <label className="text-sm">
            De:
            <input
              type="time"
              value={fromTime}
              onChange={(e) => setFromTime(e.target.value)}
              className="ml-2 border rounded px-2 py-1 text-sm"
            />
          </label>
          <label className="text-sm">
            Até:
            <input
              type="time"
              value={toTime}
              onChange={(e) => setToTime(e.target.value)}
              className="ml-2 border rounded px-2 py-1 text-sm"
            />
          </label>
          <Button onClick={handleApply} className="ml-auto pointer">
            Aplicar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
