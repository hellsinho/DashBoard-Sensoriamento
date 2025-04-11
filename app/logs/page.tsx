'use client';

import { useEffect, useState } from 'react';

export default function LogsPage() {
  const [leituras, setLeituras] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // opcional para controle de paginação
  const limit = 10;

  const fetchLogs = async () => {
    try {
      const res = await fetch(`/api/logs?page=${page}&limit=${limit}`);
      const json = await res.json();

      // se sua API estiver retornando { data: [...] }, você deve acessar json.data
      const data = Array.isArray(json) ? json : json.data;

      setLeituras(data);

      // se a quantidade retornada for menor que o limite, não há mais dados
      setHasMore(data.length === limit);
    } catch (error) {
      console.error('Erro ao buscar logs:', error);
      setLeituras([]);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page]);

  const formatarData = (data: string) => {
    const d = new Date(data);
    return d.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
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

      <h1 className="text-2xl font-bold mb-4">Logs de Leituras</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md p-4 mb-4">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">Data e Hora</th>
              <th className="p-2">Mercúrio (mg/L)</th>
              <th className="p-2">Chumbo (mg/L)</th>
              <th className="p-2">Arsênio (mg/L)</th>
            </tr>
          </thead>
          <tbody>
            {leituras.length > 0 ? (
              leituras.map((leitura, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="p-2">{formatarData(leitura.data)}</td>
                  <td className="p-2">{leitura.mercurio.toFixed(3)}</td>
                  <td className="p-2">{leitura.chumbo.toFixed(3)}</td>
                  <td className="p-2">{leitura.arsenio.toFixed(3)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  Nenhum dado encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          disabled={page === 1}
        >
          Anterior
        </button>
        <span className="text-sm font-medium">Página {page}</span>
        <button
          onClick={() => setPage((prev) => hasMore ? prev + 1 : prev)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          disabled={!hasMore}
        >
          Próxima
        </button>
      </div>
    </main>
  );
}
