# MyCash+ Dashboard

Sistema web completo de gestão financeira familiar que permite múltiplos membros de uma família controlarem suas finanças de forma colaborativa.

## 📚 Documentação do Projeto

### [Especificações Funcionais](docs/project_specs.md)
Documentação completa das regras de negócio, fluxos de usuário, estrutura de dados e comportamento do sistema. Inclui detalhes sobre:
- Navegação (Sidebar, Mobile)
- Transações e Cálculos
- Widgets do Dashboard
- Modais e Formulários

### [Análise Visual e UI](docs/visual_analysis.md)
Detalhamento dos componentes visuais extraídos do Figma:
- Cores e Tipografia (Tokens)
- Estrutura de Layout e Grids
- Hierarquia de Componentes

### [Tokens Primitivos](docs/primitive_tokens.md)
Referência técnica dos tokens de design utilizados no sistema:
- Paleta de Cores (Neutral, Brand, Semânticas)
- Escalas de Espaçamento e Tipografia
- Border Radius e Sombras

### [Stack Tecnológica](docs/tech_stack.md)
Lista das tecnologias e ferramentas utilizadas:
- React + TypeScript
- Vite
- Tailwind CSS
- Supabase

### [Plano de Implementação (TODO)](docs/TODO.md)
Roteiro passo-a-passo do desenvolvimento, organizado por Prompts.

---

## 🚀 Como Rodar o Projeto

1.  **Instale as dependências:**
    ```bash
    npm install
    ```

2.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

3.  **Build para produção:**
    ```bash
    npm run build
    ```

## 🏗️ Estrutura de Pastas

```
src/
├── components/      # Componentes React (ui, layout, dashboard, etc)
├── contexts/        # React Contexts (Estado Global)
├── hooks/           # Custom Hooks
├── pages/           # Views/Rotas do sistema
├── types/           # Definições TypeScript
└── utils/           # Funções auxiliares e formatadores
```
