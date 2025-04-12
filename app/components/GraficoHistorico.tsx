'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';

export default function GraficoHistorico({ dados }: { dados: any[] }) {
  const formatarData = (isoDate: string) => {
    const date = new Date(isoDate);
    return format(date, 'dd/MM - HH:mm');
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Histórico de Leitura</h2>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-rose-500 mb-2">Mercúrio</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={dados}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="data" tickFormatter={formatarData} />
            <YAxis domain={[0, 10]} />
            <Tooltip labelFormatter={formatarData} />
            <Line type="monotone" dataKey="mercurio" stroke="#f43f5e" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-indigo-500 mb-2">Chumbo</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={dados}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="data" tickFormatter={formatarData} />
            <YAxis domain={[0, 10]} />
            <Tooltip labelFormatter={formatarData} />
            <Line type="monotone" dataKey="chumbo" stroke="#6366f1" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-green-500 mb-2">Ferro</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={dados}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="data" tickFormatter={formatarData} />
            <YAxis domain={[0, 10]} />
            <Tooltip labelFormatter={formatarData} />
            <Line type="monotone" dataKey="arsenio" stroke="#22c55e" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
