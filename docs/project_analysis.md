# Análise Técnica do Projeto MyCash+

Este documento consolida a análise da arquitetura, design system, navegação e estrutura do projeto, servindo como guia para a implementação.

## 1. Análise Visual (Figma)
*Status: ⏸️ Pendente (Aguardando URL do Arquivo Figma)*
- **Ação Necessária**: Preciso do Link do arquivo ou File Key para acessar via MCP e mapear hierarquia visual exata e tokens semânticos (ex: `--color-surface-primary`, `--text-secondary`).

## 2. Design System & Tokens
*Status: ✅ Primitivos Mapeados | ⏸️ Semânticos Pendentes*

Baseado na documentação (`primitive_tokens.md`), temos a base sólida de primitivos:
- **Cores**: Sistema completo com escalas de 100-1000 (Neutral, Brand/Lima, Púrpura, Pink, Red, Orange, Yellow, Green, Blue).
- **Espaçamento**: Escala linear/geométrica (`space/0` a `space/128`).
- **Tipografia**: 
  - Tamanhos: Display (96px) até Label XS (12px).
  - Pesos: Regular (400), Semibold (600), Bold (700).
  - Line-height e Letter-spacing definidos.
- **Shapes e Sombras**: Saturação de sombras coloridas e raios de borda definidos.

**Hierarquia de Uso**:
1. Priorizar **Tokens Semânticos** (a serem extraídos do Figma).
2. Fallback para **Tokens Primitivos** já documentados.
3. Proibido uso de valores mágicos (hardcoded).

## 3. Navegação e Comportamento
*Status: ✅ Mapeado Completamente via Specs*

A aplicação se comporta como SPA (Single Page Application) com layout responsivo adaptativo que muda drasticamente de estrutura e não apenas de tamanho.

| Feature | Desktop (≥ 1280px) | Mobile / Tablet (< 1280px) |
| :--- | :--- | :--- |
| **Navegação** | **Sidebar Lateral** | **Header Fixo Superior** |
| **Estados** | Expandida (Texto+Ícone) ou Colapsada (Ícone) | Menu Dropdown (Avatar click) |
| **Layout** | Conteúdo empurrado pela Sidebar | Conteúdo abaixo do Header |
| **Menu** | Persistente à esquerda | Overlay / Gaveta temporária |

**Transições**:
- Sidebar: Animação de largura (`width`) e opacidade de texto.
- Mobile Menu: Slide-down ou Fade-in.
- SPA Navigation: Troca de conteúdo instantânea sem reload.

## 4. Arquitetura de Software Proposta

### Stack
- **Core**: React + TypeScript + Vite.
- **Estilo**: TailwindCSS (Configurado com tokens do DS).
- **Backend**: Supabase (Auth + DB).
- **Ícones**: Lucide React (ou biblioteca similar leve).

### Estrutura de Pastas (src/)
```
src/
├── assets/          # Imagens, fontes estáticas
├── components/      # Componentes React
│   ├── ui/          # Componentes Primitivos (Button, Input, Card, Badge) - Reutilizáveis e Agmósticos
│   ├── layout/      # Sidebar, Header, PageWrapper
│   ├── modals/      # Todos os modais do sistema (TransactionModal, MemberModal)
│   ├── dashboard/   # Widgets específicos (SummaryCards, CategoryCarousel, FlowChart)
│   └── shared/      # Componentes compartilhados entre features (ex: TransactionList)
├── contexts/        # React Context API
│   └── FinanceContext.tsx  # Store Global (Transações, Membros, Filtros)
├── hooks/           # Custom Hooks
│   ├── useFinance.ts       # Acesso fácil ao contexto
│   ├── useMedia.ts         # Hook para breakpoints (JS detection)
│   └── useClickOutside.ts  # Utilitário para fechar modais/popovers
├── pages/           # Views principais (Roteamento)
│   ├── Dashboard/
│   ├── Transactions/
│   ├── Cards/
│   ├── Goals/
│   └── Profile/
├── services/        # Integração com APIs e Supabase
│   ├── supabase.ts
│   └── api.ts
├── utils/           # Funções puras
│   ├── formatters.ts (Moeda, Data)
│   ├── calculations.ts (Lógica de negócio pesada, ex: Saldo)
│   └── validators.ts (Schemas de validação)
└── types/           # Definições de Tipos TypeScript globais
    └── index.ts
```

### Estratégia de Componentização
1.  **Componentes "Dumb" (UI)**: Recebem props e renderizam. Não sabem sobre o `useFinance`. Ex: `Button`, `StatCard`.
2.  **Componentes "Smart" (Feature/Pages)**: Conectam-se ao `useFinance`, buscam dados e passam para os filhos. Ex: `DashboardPage`, `NewTransactionModal`.
3.  **Layouts Fluidos**: Containers nunca terão largura fixa (`width: fixed`). Usarão `w-full` com `max-w-SCREEN` para controle de leitura.

## 5. Próximos Passos Imediatos
1.  Obter URL do Figma para extração final de tokens semânticos.
2.  Setup inicial do Vite + Tailwind.
3.  Configuração do `tailwind.config.js` com os tokens primitivos.
4.  Criação da estrutura de pastas base.
