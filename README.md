# 🌡️ Projeto de Monitoramento de Metais Pesados

Este projeto é uma aplicação web desenvolvida com **Next.js**, utilizando **Shadcn/UI** para a interface, que permite o monitoramento de três metais pesados — **Mercúrio (Hg)**, **Chumbo (Pb)** e **Arsênio (As)** — com funcionalidades de visualização de histórico, filtros por data e hora, e exportação de relatórios.

## 📦 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Shadcn/UI](https://ui.shadcn.com/)
- [react-day-picker](https://react-day-picker.js.org/)
- [jsPDF](https://github.com/parallax/jsPDF) para exportação em PDF
- HTML5 Blob para exportação em CSV


## 🔍 Funcionalidades

- ✅ Filtro de dados por intervalo de **data e hora**
- ✅ Exportação de dados filtrados em **PDF** e **CSV**
- ✅ Gráficos históricos dos metais
- ✅ Design responsivo e minimalista
- ✅ Separação clara entre Dashboard e Relatórios

## 🚀 Como Rodar o Projeto Localmente

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

** Instale dependências **

```bash
npm install
```
** Inicie o servidor de desenvolvimento **

```bash
npm run dev
```

** Acesse **

```bash
http://localhost:3000
```

### 🧪 Exemplo de Requisição da API (mock)

```bash
// /api/historico (método GET)
[
  {
    "data": "2025-04-10T11:00:00.000Z",
    "mercurio": 0.005,
    "chumbo": 0.002,
    "arsenio": 0.003
  },
  ...
]
```

### 📌 Melhorias Futuras
 - Autenticação de usuários

 - Banco de dados real (Supabase, PostgreSQL, etc.)

 - Upload de dados via CSV

 - Alertas em tempo real quando valores ultrapassarem limites

### 👨‍💻 Autor
Desenvolvido por Helson Gonçalves dos Santos Filho.