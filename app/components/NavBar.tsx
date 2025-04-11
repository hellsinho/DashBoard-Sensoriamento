'use client';

import { DateRangePickerWithTime } from './DateRangerWithTime'; // <- alterado aqui
import { DateRange } from 'react-day-picker';
import { useState } from 'react';

export default function Navbar({
  userName,
  onDateRangeChange,
}: {
  userName: string;
  onDateRangeChange: (range: DateRange | undefined) => void;
}) {
  const [range, setRange] = useState<DateRange | undefined>();

  const handleRangeChange = (range: DateRange | undefined) => {
    setRange(range);
    onDateRangeChange(range);
  };

  return (
    <header className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div className="flex gap-6 items-center text-sm font-medium text-gray-700">
        <span className="text-xl font-bold text-indigo-600">Sensoriamento</span>
        <a href="/" className="hover:text-indigo-500">Dashboard</a>
        <a href="/logs" className="hover:text-indigo-500">Logs</a>
        <a href="/relatorio" className="hover:text-indigo-500">Relatórios</a>
      </div>
      <div className="flex items-center gap-4">
        <DateRangePickerWithTime onApply={handleRangeChange} initialRange={range} />
        <span className="text-sm text-gray-600">Olá, <strong>{userName}</strong></span>
      </div>
    </header>
  );
}
