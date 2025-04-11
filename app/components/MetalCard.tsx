'use client';

import { useMemo } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function MetalCard({
  tipo,
  valor,
  max = 10,
}: {
  tipo: string;
  valor: number;
  max?: number;
}) {
  const porcentagem = Math.min((valor / max) * 100, 100);

  const cor = useMemo(() => {
    if (porcentagem < 33) return '#22c55e'; // verde
    if (porcentagem < 66) return '#facc15'; // amarelo
    return '#ef4444'; // vermelho
  }, [porcentagem]);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center gap-2">
      <h3 className="text-m font-bold text-gray-700">{tipo}</h3>
      <div className="w-24 h-24">
        <CircularProgressbar
          value={porcentagem}
          text={`${valor.toFixed(2)} ppm`}
          styles={buildStyles({
            textSize: '12px',
            pathColor: cor,
            textColor: '#4b5563',
            trailColor: '#e5e7eb',
          })}
        />
      </div>
    </div>
  );
}
