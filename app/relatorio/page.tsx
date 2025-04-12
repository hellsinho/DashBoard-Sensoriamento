'use client';

import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import GraficoHistorico from '../components/GraficoHistorico';
import { DateRangePickerWithTime } from '../components/DateRangerWithTime';

export default function RelatoriosPage() {
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [dados, setDados] = useState<any[]>([]);

  const fetchDados = async () => {
    const res = await fetch('/api/historico');
    const allData = await res.json();
  
    if (range?.from && range.to) {
      const fromDate = new Date(range.from);
      const toDate = new Date(range.to);
  
      toDate.setSeconds(59);
      toDate.setMinutes(toDate.getMinutes());
      toDate.setHours(toDate.getHours());
      toDate.setMilliseconds(999);
  
      const filtrado = allData.filter((item: any) => {
        const data = new Date(item.data);
        return data >= fromDate && data <= toDate;
      });
  
      setDados(filtrado);
    } else {
      setDados(allData);
    }
  };

  useEffect(() => {
    fetchDados();
  }, [range]);

  const exportarCSV = () => {
    const header = 'Data,Mercúrio,Chumbo,Arsênio\n';
    const linhas = dados.map(d => {
      const data = format(new Date(d.data), 'dd/MM/yyyy HH:mm');
      return `${data},${d.mercurio.toFixed(3)},${d.chumbo.toFixed(3)},${d.arsenio.toFixed(3)}`;
    });
    const csv = header + linhas.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'relatorio.csv';
    a.click();
  };

  const exportarPDF = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    doc.text('Relatório de Leituras', 10, 10);

    dados.slice(0, 30).forEach((d, idx) => {
      const y = 20 + idx * 6;
      const linha = `${format(new Date(d.data), 'dd/MM/yyyy HH:mm')} - Hg: ${d.mercurio.toFixed(2)} | Pb: ${d.chumbo.toFixed(2)} | As: ${d.arsenio.toFixed(2)}`;
      doc.text(linha, 10, y);
    });

    doc.save('relatorio.pdf');
  };

  return (
    <main className="p-6">
      <header className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex gap-6 items-center text-sm font-medium text-gray-700">
          <span className="text-xl font-bold text-indigo-600">Sensoriamento</span>
          <a href="/" className="hover:text-indigo-500">Dashboard</a>
          <a href="/logs" className="hover:text-indigo-500">Logs</a>
          <a href="/relatorios" className="hover:text-indigo-500">Relatórios</a>
        </div>
      </header>

      <h1 className="text-2xl font-bold my-4">Relatórios</h1>

      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <label className="block text-sm font-medium mb-2">Selecione um intervalo de datas e horas:</label>
        <DateRangePickerWithTime onApply={setRange} initialRange={range} />
      </div>

      <div className="flex gap-4 mb-6">
        <button onClick={exportarCSV} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Exportar CSV</button>
        <button onClick={exportarPDF} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Exportar PDF</button>
      </div>

      <GraficoHistorico dados={dados} />
    </main>
  );
}
