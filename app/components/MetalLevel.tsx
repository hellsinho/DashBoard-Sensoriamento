'use client';

import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface MetalLevelProps {
  value: number;
  max: number;
  label: string;
}

export default function MetalLevel({ value, max, label }: MetalLevelProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const getColor = () => {
    if (percentage < 50) return '#10b981';
    if (percentage < 80) return '#facc15';
    return '#ef4444';
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-32 h-32">
        <CircularProgressbarWithChildren
          value={percentage}
          strokeWidth={10}
          styles={buildStyles({
            pathColor: getColor(),
            trailColor: '#e5e7eb',
          })}
        >
          <div className="text-center">
            <div className="text-xl font-semibold">{value.toFixed(2)} mg/L</div>
            <div className="text-xs text-gray-500">{label}</div>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
}
