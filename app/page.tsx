'use client';

import Navbar from './components/NavBar';
import Dashboard from './components/Dashboard';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

export default function Page() {
  const [range, setRange] = useState<DateRange | undefined>();

  return (
    <>
      <Navbar userName="Helson" onDateRangeChange={setRange} />
      <Dashboard range={range} />

    </>
  );
}
