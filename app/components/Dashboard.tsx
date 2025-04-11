'use client';

import { DateRange } from 'react-day-picker';
import { useEffect, useState, useMemo } from 'react';
import GraficoHistorico from './GraficoHistorico';
import MetalCard from './MetalCard';

export default function Dashboard({ range }: { range?: DateRange }) {
  const [dadosHistorico, setDadosHistorico] = useState<any[]>([]);
  const [dadosTempoReal, setDadosTempoReal] = useState({
    mercurio: 0,
    chumbo: 0,
    arsenio: 0,
  });

  // Atualiza dados em tempo real
  useEffect(() => {
    const interval = setInterval(async () => {
      const novaLeitura = {
        data: new Date().toISOString(),
        mercurio: Math.random() * 1.2,
        chumbo: Math.random() * 1.1,
        arsenio: Math.random() * 1.2,
      };

      await fetch('/api/salvar-leitura', {
        method: 'POST',
        body: JSON.stringify(novaLeitura),
        headers: { 'Content-Type': 'application/json' },
      });

      setDadosTempoReal({
        mercurio: novaLeitura.mercurio,
        chumbo: novaLeitura.chumbo,
        arsenio: novaLeitura.arsenio,
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // 🔥 Novo useEffect para buscar dados quando o range mudar
  useEffect(() => {
    async function fetchHistorico() {
      const res = await fetch('/api/historico');
      const data = await res.json();
      setDadosHistorico(data);
    }

    if (range?.from && range?.to) {
      fetchHistorico();
    }
  }, [range]);

  // Aplica o filtro baseado no range
  const dadosFiltrados = useMemo(() => {
    if (range?.from && range.to) {
      return dadosHistorico.filter((item) => {
        const data = new Date(item.data);
        return data >= range.from! && data <= range.to!;
      });
    }

    const now = new Date();
    return [{
      data: now.toISOString(),
      mercurio: dadosTempoReal.mercurio,
      chumbo: dadosTempoReal.chumbo,
      arsenio: dadosTempoReal.arsenio,
    }];
  }, [range, dadosHistorico, dadosTempoReal]);

  return (
    <main className="p-6">
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetalCard tipo="Mercúrio" valor={dadosTempoReal.mercurio} />
        <MetalCard tipo="Chumbo" valor={dadosTempoReal.chumbo} />
        <MetalCard tipo="Arsênio" valor={dadosTempoReal.arsenio} />
      </section>

      <section className="mt-8">
        <GraficoHistorico dados={dadosFiltrados} />
      </section>
    </main>
  );
}
