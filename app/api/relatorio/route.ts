// app/api/relatorio/route.ts

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabase
    .from('leituras')
    .select('mercurio, chumbo, arsenio');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const calcularEstatisticas = (valores: number[]) => {
    const media = valores.reduce((acc, v) => acc + v, 0) / valores.length;
    const min = Math.min(...valores);
    const max = Math.max(...valores);
    return { media, min, max };
  };

  const mercurio = calcularEstatisticas(data.map(d => d.mercurio));
  const chumbo = calcularEstatisticas(data.map(d => d.chumbo));
  const arsenio = calcularEstatisticas(data.map(d => d.arsenio));

  return NextResponse.json({ mercurio, chumbo, arsenio });
}
