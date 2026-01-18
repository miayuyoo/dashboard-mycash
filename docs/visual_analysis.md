# Análise Visual do Dashboard (Figma)

**Fonte**: [Figma Link](https://www.figma.com/design/uQJiatSa9p09GqsDNU1geO/Workshop---Do-figma-MCP-ao-Cursor-AI-v.2--Community-?node-id=2009-2131&t=lZLleZEFVcGPkjk7-4)
**Node ID**: 2009-2131

## 1. Mapeamento de Componentes

### Navegação (Sidebar & Header)
- **Sidebar (Desktop)**:
  - Componente: `State=Expanded` (2012:2568)
  - Botões de Navegação: `btn-sidebar` com estados `Active` e `Rest`.
  - Ícones: `fi-rr-home`, `fi-rr-credit-card` (Estilo arredondado, stroke).
  - Comportamento: Alternância entre expandido/colapsado (ícone de seta `fi-rr-angle-left`).

- **Header (Conteúdo)**:
  - **Busca**: Campo de input `search` (2017:2677) com ícone `fi-rr-search`.
  - **Filtros**: Botão `filter` (2019:2720) com ícone `fi-rr-settings-sliders`.
  - **Seletor de Data**: Componente `select-date` (2019:2734).
  - **Membros**: Widget de seleção de membros (`Member=Pai`) com avatares empilhados.

### Cards e Widgets
- **Resumo Financeiro**: Cards com layout flex (`row` ou `column`), usando `gap` e `padding` consistentes (8px, 16px).
- **Botões**: Hierarquia definida (`btn-hierarchy=primary`).
- **Estados**: Hover e interações mapeadas.

## 2. Tokens Identificados

### Tipografia
- **Família**: Inter (Google Fonts).
- **Estilos**:
  - `Paragraph/Medium`: 16px, Regular (400), Line-height 1.5em.
  - (Inferido): Títulos em Bold, Labels menores.

### Cores (Exemplos)
- **Primary/Action**: Preto (`#000000`, `fill_1RPOKJ`) e Verde Lima (confirmado na doc de primitivos).
- **Semânticas de Status**:
  - `Accent/Danger`: `#ED6778` (Danger-500) para despesas/erros.
  - Provável `Accent/Success` para receitas.

### Layout
- **Containers Fluidos**: Uso extensivo de `sizing: horizontal: fill` e `justifyContent: space-between`.
- **Alinhamento**: `alignItems: center` para itens de lista e headers.
- **Espaçamento**: Múltiplos de 4px (4, 8, 16, 24, 32, 143...?).

## 3. Estrutura de Navegação Confirmada
- **Desktop**: Sidebar persistente à esquerda. Frame principal ajusta largura (`fill`).
- **Transição**: Botão de toggle na sidebar altera estado visual e largura do container pai.

## 4. Próximos Passos
- Configurar `tailwind.config.js` com as cores exatas (`#ED6778`, `#000000`, Inter font).
- Criar componentes base (`Button`, `Input`, `Avatar`) refletindo as propriedades do Figma (padding, gap).
