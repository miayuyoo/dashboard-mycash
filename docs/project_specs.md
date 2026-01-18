# 📋 Documento descritivo - Dashboard Mycash+

## 🎯 VISÃO GERAL DO SISTEMA
O mycash+ é um sistema web completo de gestão financeira familiar que permite múltiplos membros de uma família controlarem suas finanças de forma colaborativa. O sistema funciona como uma aplicação de página única onde o usuário navega entre diferentes seções sem recarregar a página. Cada membro da família pode ter suas próprias transações, mas todos compartilham a visualização consolidada das finanças.

## 🏗️ ESTRUTURA DE NAVEGAÇÃO

### Sistema de Abas
O sistema possui cinco seções principais acessíveis através de abas. Quando o usuário clica em uma aba, apenas o conteúdo principal muda, mantendo a estrutura de navegação visível. A aba ativa é sempre destacada visualmente para o usuário saber onde está. As cinco seções são: Dashboard (inicial), Objetivos, Cartões, Transações e Perfil.

### Sidebar Desktop
No desktop, existe uma barra lateral fixa do lado esquerdo da tela que permanece sempre visível. Esta sidebar contém o logotipo do sistema no topo, os botões de navegação no centro e o perfil do usuário na parte inferior. A sidebar pode alternar entre dois estados: expandida e colapsada.
Quando expandida, a sidebar mostra o logotipo completo "mycash+", os nomes completos de cada seção ao lado dos ícones, e o perfil do usuário com foto, nome e email. A largura da sidebar expandida empurra o conteúdo principal para a direita, criando uma margem.
Quando colapsada, a sidebar mostra apenas o ícone do logotipo (versão simplificada), apenas os ícones das seções sem texto, e apenas a foto do perfil sem nome/email. A largura reduzida permite que o conteúdo principal ocupe mais espaço horizontal.
Um pequeno botão circular posicionado na borda direita da sidebar permite alternar entre estes dois estados. O botão mostra uma seta apontando para a esquerda quando expandida e para a direita quando colapsada. Toda a transição entre estados é animada suavemente.
Quando a sidebar está colapsada e o usuário passa o mouse sobre um item de navegação, aparece um tooltip flutuante ao lado mostrando o nome completo da seção. Isso ajuda o usuário a identificar cada seção mesmo quando colapsada.
O item de navegação ativo sempre tem um fundo preto com texto branco, enquanto os inativos têm fundo transparente com texto cinza. Os ícones dos itens ativos ganham a cor verde limão, criando um destaque visual adicional.

### Header Mobile
Em dispositivos móveis (tablets e celulares), a sidebar desaparece completamente e é substituída por um header fixo no topo da tela. Este header ocupa toda a largura e permanece visível mesmo quando o usuário rola a página para baixo.
O header mobile contém o logotipo "mycash+" à esquerda (versão um pouco menor que a do desktop) e o avatar do usuário à direita. O logotipo serve como elemento de marca, sempre visível, enquanto o avatar é clicável.
Quando o usuário toca no avatar, abre-se um menu dropdown deslizando de cima para baixo. Este menu contém todas as opções de navegação que antes estavam na sidebar: Dashboard, Objetivos, Cartões, Transações e Perfil. Cada item do menu mostra ícone e texto. O item da seção atual aparece destacado em preto.
O menu também inclui na parte inferior um botão vermelho de "Sair" para logout. Clicar em qualquer item do menu fecha automaticamente o dropdown e navega para a seção escolhida.
Para fechar o menu sem fazer ação, o usuário pode tocar fora da área do menu ou pressionar o botão X que aparece no canto superior direito do menu.

## 💾 SISTEMA DE DADOS E ESTADO

### Armazenamento Central
Todos os dados do sistema ficam armazenados em um contexto global React chamado useFinance. Este contexto funciona como uma "memória central" que todos os componentes podem acessar. Quando qualquer componente modifica um dado, todos os outros componentes que dependem daquele dado atualizam automaticamente.

### Tipos de Dados Armazenados
- **Transações**: Cada transação é um registro único contendo tipo (receita ou despesa), valor em reais, descrição textual, categoria, data de ocorrência, conta ou cartão de origem, membro da família responsável, número de parcelas (se aplicável), e status (pendente ou concluído). As transações formam a base de todos os cálculos financeiros do sistema.
- **Objetivos**: Cada objetivo representa uma meta financeira que a família quer alcançar. Contém nome do objetivo, descrição detalhada, imagem ilustrativa, valor da meta, valor já acumulado, categoria do objetivo, prazo final (opcional) e status (ativo ou arquivado).
- **Cartões de Crédito**: Cada cartão armazenado contém nome do cartão/banco, dia do fechamento da fatura, dia do vencimento, limite total do cartão, valor da fatura atual, tema visual escolhido (preto, verde-limão ou branco), URL do logotipo do banco (opcional), últimos quatro dígitos do cartão (opcional) e lista de despesas vinculadas ao cartão.
- **Contas Bancárias**: Cada conta contém nome da conta, tipo (corrente, poupança, etc), saldo atual e cor para identificação visual.
- **Membros da Família**: Cada membro registrado contém nome completo, função/papel na família (pai, mãe, filho, etc), URL da foto de perfil e renda mensal estimada (opcional, para planejamento).
- **Categorias**: Sistema mantém listas separadas de categorias para receitas e despesas. Cada categoria tem nome único e cor de identificação. Categorias são usadas para organizar e agrupar transações.

### Funções de Cálculo
O sistema possui diversas funções que processam os dados brutos e retornam informações úteis:
- **Saldo Total**: Soma o saldo de todas as contas bancárias e subtrai o valor de todas as faturas de cartão pendentes. Este é o dinheiro efetivamente disponível da família.
- **Receitas do Período**: Filtra todas as transações de tipo "receita" dentro de um intervalo de datas especificado e soma seus valores. Se nenhum período for especificado, usa o mês atual.
- **Despesas do Período**: Filtra todas as transações de tipo "despesa" dentro de um intervalo de datas e soma seus valores.
- **Taxa de Economia**: Calcula (Receitas - Despesas) / Receitas × 100 para mostrar qual percentual da receita está sendo economizado.
- **Gastos por Categoria**: Agrupa todas as despesas por categoria, somando os valores de cada uma. Retorna lista ordenada por valor decrescente.
- **Gastos por Membro**: Agrupa transações por membro da família, calculando quanto cada um gastou no período.
- **Percentual por Categoria**: Para cada categoria de despesa, calcula qual percentual ela representa em relação à receita total. Isso mostra o "peso" de cada categoria no orçamento familiar.
Todas estas funções aceitam filtros opcionais: intervalo de datas, membro específico, tipo de transação. Quando filtros são aplicados, os cálculos consideram apenas as transações que atendem aos critérios.

### Sistema de Filtros Globais
O sistema mantém em estado global os filtros ativos que afetam múltiplos componentes simultaneamente:
- **Filtro de Membro**: Quando um membro específico é selecionado, todos os gráficos, estatísticas e listas mostram apenas dados relacionados àquele membro. Se nenhum membro está selecionado, mostra dados consolidados de toda a família.
- **Filtro de Período**: Define um intervalo de datas (data inicial e data final). Apenas transações dentro deste período são consideradas nos cálculos e visualizações.
- **Filtro de Tipo**: Permite escolher entre "Todos", "Receitas" ou "Despesas". Quando definido, apenas transações do tipo selecionado aparecem nas listas e influenciam cálculos que dependem de tipo.
- **Filtro de Busca**: String de texto livre que filtra transações por descrição ou categoria. A busca é case-insensitive (não diferencia maiúsculas de minúsculas) e encontra correspondências parciais.
Quando múltiplos filtros estão ativos, eles trabalham em conjunto (operação AND). Por exemplo, se há filtro de membro "João" E período "Janeiro/2024" E tipo "Despesas", apenas as despesas de João em janeiro de 2024 serão mostradas.

## 🏠 DASHBOARD - COMPONENTES DETALHADOS

### Header do Dashboard
O header do dashboard é uma barra horizontal no topo da área de conteúdo (abaixo do header mobile ou ao lado da sidebar desktop). Esta barra contém todos os controles de filtro e ação do dashboard.

#### Campo de Busca
À esquerda da barra há um campo de texto com ícone de lupa. Este campo tem placeholder "Pesquisar..." e largura fixa no desktop, ocupando largura total no mobile.
Quando o usuário digita neste campo, o sistema reage instantaneamente (sem precisar pressionar Enter). A cada caractere digitado, o sistema filtra a lista de transações buscando correspondências na descrição ou categoria. O filtro é aplicado a todos os componentes do dashboard que dependem de transações: tabela de transações, gráfico de categorias e cards de resumo.
A busca é "inteligente": ignora diferenças entre maiúsculas e minúsculas, encontra palavras parciais (digitar "aliment" encontra "Alimentação"), e busca tanto na descrição quanto na categoria simultaneamente.
Se o usuário apagar todo o texto da busca, o filtro é removido e todos os dados voltam a aparecer normalmente.

#### Botão de Filtros
Ao lado do campo de busca existe um botão circular com ícone de "controles deslizantes" (três linhas horizontais com círculos). Este botão abre o painel de filtros avançados.
No desktop, clicar no botão abre um popover flutuante que aparece abaixo do botão, alinhado à direita. O popover tem fundo branco semi-transparente com efeito de desfoque (glassmorphism), criando profundidade visual.
Dentro do popover aparecem controles de filtro organizados em seções:
Seção Tipo de Transação: Contém três opções de rádio: "Todos", "Receitas", "Despesas". Apenas uma opção pode estar selecionada por vez. A opção selecionada tem fundo preto com texto branco. Ao clicar em uma opção, ela é imediatamente aplicada e todos os dados do dashboard atualizam.
No mobile, ao invés de popover, o botão abre um modal fullscreen que desliza de baixo para cima cobrindo toda a tela. Este modal tem header fixo com título "Filtros" e botão X para fechar. O conteúdo é scrollável. As mesmas opções de filtro aparecem, mas organizadas verticalmente com mais espaçamento para facilitar toque. Na parte inferior do modal há um botão grande "Aplicar Filtros" que fecha o modal e aplica as seleções.

#### Seletor de Período
Outro botão no header mostra o período atualmente selecionado. Por padrão, mostra o mês atual formatado como "01 jan - 31 jan, 2024". O botão tem ícone de calendário à esquerda.
Clicar neste botão abre um calendário interativo. No desktop, aparecem dois meses lado a lado permitindo visualização ampla. No mobile, aparece um único mês de cada vez com setas para navegar entre meses.
O calendário permite seleção de intervalo: usuário clica na data inicial, depois na data final, e o intervalo fica destacado visualmente. O formato é flexível - pode ser um único dia, uma semana, um mês, ou qualquer período customizado.
Há botões de navegação rápida para selecionar "Este mês", "Mês passado", "Últimos 3 meses", "Este ano". Clicar em qualquer atalho define automaticamente o intervalo correspondente.
Quando o usuário confirma a seleção (clicando fora do calendário ou em um botão OK), o período é aplicado globalmente. Todos os cálculos, gráficos e listas passam a considerar apenas transações dentro do novo período. O texto do botão atualiza para refletir o novo período selecionado.

#### Widget de Membros da Família
Na sequência do header aparecem os avatares circulares dos membros da família. As fotos ficam parcialmente sobrepostas umas às outras (cada foto "encosta" levemente na anterior), criando efeito de pilha.
Cada avatar tem borda branca de 2 pixels para destacar do fundo. Quando o usuário passa o mouse sobre um avatar, ele cresce levemente (scale 1.1) e move-se para frente (z-index aumenta), criando efeito de elevação.
Ao passar o mouse, também aparece um tooltip flutuante acima do avatar mostrando o nome completo e função do membro (exemplo: "João Silva - Pai"). O tooltip tem fundo preto com texto branco e pequena seta apontando para o avatar.
Quando o usuário clica em um avatar, este membro é selecionado como filtro. O avatar selecionado recebe borda preta grossa (4 pixels) ao invés de branca, permanece em scale 1.1, e exibe um pequeno ícone de check verde no canto inferior direito sobreposto à foto.
Com um membro selecionado, todo o dashboard filtra para mostrar apenas dados daquele membro: suas transações, seus gastos por categoria, seu saldo, etc. Os outros membros continuam visíveis mas em estado não-selecionado.
Clicar novamente no mesmo avatar desseleção ele, removendo o filtro e voltando a mostrar dados consolidados de toda a família.
Apenas um membro pode estar selecionado por vez. Se um membro já está selecionado e o usuário clica em outro, o primeiro é deselecionado automaticamente e o novo é selecionado.
Após os avatares dos membros existe um botão circular com ícone de "+" (plus). Este botão tem fundo cinza claro e abre o modal de adicionar novo membro quando clicado.

#### Botão de Nova Transação
No canto direito do header existe um botão de destaque com fundo preto e texto branco. O botão exibe ícone de "+" e texto "Nova Transação". Este é o botão de call-to-action principal do dashboard.
No mobile, o botão ocupa largura total e tem altura maior (48px) para facilitar toque. No desktop, tem largura automática baseada no conteúdo (padding horizontal de 24px) e altura padrão (40px).
Clicar neste botão abre o modal de criação de nova transação.

### Cards de Resumo Financeiro
Logo abaixo do header existem três cards grandes posicionados horizontalmente (no desktop) ou verticalmente (no mobile). Estes cards resumem a saúde financeira atual da família.

#### Card de Saldo Total (Primeiro Card)
Este é o card de maior destaque visual. Tem fundo completamente preto com texto branco, se diferenciando dos outros dois cards brancos.
No topo do card há um label pequeno "Saldo Total" em cinza claro. Abaixo, em fonte muito grande (32-36px), aparece o valor do saldo total formatado como moeda brasileira com cifrão, pontos de milhar e vírgula decimal: "R$ 12.458,90".
Abaixo do valor existe um pequeno badge arredondado com fundo semi-transparente branco contendo ícone de gráfico crescente e texto mostrando crescimento percentual: "+12% esse mês". Este percentual compara o saldo atual com o saldo do mês anterior.
No canto superior direito do card há um elemento decorativo: um círculo grande desfocado (blur intenso) na cor verde-limão com 20% de opacidade. Este "blob" está parcialmente cortado pelas bordas do card, criando efeito visual moderno.
Quando o usuário passa o mouse sobre o card, o blob aumenta sua opacidade para 30%, criando leve interação.
O saldo total é calculado somando os saldos positivos de todas as contas bancárias e subtraindo os valores das faturas pendentes de todos os cartões de crédito. Representa quanto dinheiro a família efetivamente possui disponível neste momento.
Este valor é afetado pelos filtros de período e membro. Se um período específico é selecionado, o cálculo considera apenas as transações dentro daquele período. Se um membro específico é filtrado, considera apenas contas e cartões daquele membro.

#### Card de Receitas (Segundo Card)
Card com fundo branco, borda sutil cinza claro e leve sombra. No topo à esquerda há um label "Receitas" em preto negrito. No topo à direita há um círculo com fundo cinza claro (10% de preto) contendo ícone de seta diagonal apontando para baixo-esquerda, simbolizando entrada de dinheiro.
Abaixo, em fonte grande (24-28px) e negrito, aparece o valor total das receitas formatado como moeda: "R$ 8.500,00".
O valor das receitas é calculado somando todas as transações do tipo "receita" dentro do período selecionado. Se nenhum período foi selecionado, usa o mês atual por padrão.
Este card também respeita o filtro de membro: se um membro está selecionado, mostra apenas as receitas daquele membro específico.

#### Card de Despesas (Terceiro Card)
Similar ao card de receitas em estrutura, mas com diferenças visuais para transmitir "saída de dinheiro".
Tem fundo branco com borda cinza claro. Label "Despesas" em cinza médio (não preto como receitas). Ícone no canto superior direito dentro de círculo com fundo vermelho muito claro (red-50), mostrando seta diagonal apontando para cima-direita, simbolizando saída.
O valor em fonte grande mostra o total de despesas: "R$ 6.200,00".
Calcula somando todas as transações do tipo "despesa" dentro do período selecionado, respeitando também filtro de membro se ativo.

### Widget de Gastos por Categoria
Abaixo dos três cards de resumo existe uma área horizontal que mostra os gastos organizados por categoria. Esta área é um carrossel scrollável horizontalmente contendo múltiplos cards pequenos, um para cada categoria de despesa que possui transações no período.

#### Processamento dos Dados
Quando este componente renderiza, ele executa a seguinte lógica:
Primeiro, busca todas as transações do tipo "despesa". Depois aplica os filtros ativos: se há filtro de período, mantém apenas despesas dentro daquele período; se há filtro de membro, mantém apenas despesas daquele membro; se há filtro de busca textual, mantém apenas despesas cuja descrição ou categoria contenha o texto buscado.
Com a lista filtrada de despesas, o sistema agrupa por categoria. Para cada categoria única encontrada, soma os valores de todas as transações daquela categoria. Também calcula a receita total do período (somando todas as receitas, respeitando os mesmos filtros).
Para cada categoria, calcula o percentual que ela representa em relação à receita total: (valorDaCategoria / receitaTotal) × 100. Por exemplo, se Alimentação somou R$ 1.500 e a receita foi R$ 5.000, o percentual é 30%.
Finalmente, ordena as categorias por valor decrescente: a categoria com maior gasto aparece primeiro, seguida da segunda maior, e assim por diante.

#### Apresentação Visual
O resultado é uma lista horizontal de cards. Cada card tem fundo branco, borda cinza clara, largura fixa de 160px e altura automática. Os cards ficam alinhados lado a lado com espaço de 16px entre eles.
No topo de cada card há um gráfico donut (gráfico de rosca) com diâmetro de 64 pixels. O donut tem anel externo colorido representando o percentual da categoria e anel interno vazio (branco). No centro exato do donut, sobreposto, aparece o percentual calculado em texto: "30%".
A cor do anel externo varia por categoria, seguindo um array de cores definido: primeiro é verde-limão, segundo é preto, terceiro é cinza médio, quarto é cinza claro, e assim por diante em rotação.
Abaixo do donut, centralizado, aparece o nome da categoria em texto pequeno (12px) e cinza médio: "Alimentação". Se o nome for muito longo e não couber, é truncado com reticências.
Abaixo do nome aparece o valor total da categoria em fonte média (14px) e negrito preto: "R$ 1.500,00".

#### Navegação e Scroll
Como podem existir muitas categorias, o carrossel é scrollável. O usuário pode scrollar de três formas:
1. Mouse wheel: No desktop, girar a rodinha do mouse sobre o carrossel move-o horizontalmente.
2. Clique e arrasta: Clicar em qualquer ponto do carrossel e arrastar o mouse para os lados desloca os cards.
3. Setas de navegação: No desktop, quando o usuário passa o mouse sobre a área do carrossel, aparecem dois botões circulares flutuantes: um à esquerda e outro à direita. Estes botões têm fundo branco com sombra e ícones de setas. Clicar neles desloca o carrossel em aproximadamente 200 pixels na direção correspondente. Os botões desaparecem quando o mouse sai da área.
As bordas do carrossel têm um gradiente de máscara: a borda esquerda e direita ficam progressivamente transparentes, criando efeito de "fade out" e indicando visualmente que há mais conteúdo para scrollar.
Quando o usuário passa o mouse sobre um card individual, sua borda muda de cinza clara para verde-limão, criando feedback visual de hover.
No mobile, as setas de navegação não aparecem. O usuário simplesmente desliza com o dedo para scrollar, comportamento natural em dispositivos touch.

### Gráfico de Fluxo Financeiro
Abaixo do carrossel de categorias existe um card grande contendo um gráfico que mostra a evolução das receitas e despesas ao longo dos meses.

#### Header do Gráfico
No topo do card há um título "Fluxo Financeiro" com ícone de gráfico crescente à esquerda. À direita do título existe uma legenda horizontal mostrando dois itens: um círculo pequeno verde-limão com texto "Receitas" ao lado, e um círculo preto com texto "Despesas" ao lado. Esta legenda ajuda a interpretar as cores do gráfico.

#### Estrutura do Gráfico
O gráfico ocupa a área principal do card, com altura fixa de 300 pixels e largura responsiva (100% do card). Tem fundo cinza claro muito suave.
O gráfico é do tipo área (area chart) com duas séries de dados: receitas e despesas. Cada série é representada por uma linha com área preenchida abaixo.
No eixo horizontal (X) aparecem os nomes dos meses: Jan, Fev, Mar, Abr, Mai, Jun, Jul. Estes labels ficam na parte inferior do gráfico, espaçados uniformemente, com fonte pequena e cor cinza média. Não há linha vertical para o eixo.
No eixo vertical (Y) aparecem valores monetários formatados de forma compacta: R$ 2k, R$ 4k, R$ 6k, R$ 8k, R$ 10k. Estes labels ficam do lado esquerdo com a mesma formatação de cor e fonte do eixo X.
Linhas horizontais tracejadas muito sutis atravessam o gráfico em cada marca do eixo Y, criando grid que facilita leitura dos valores. As linhas são cinza claríssimo para não poluir visualmente.

#### Área de Receitas
A primeira área representando receitas tem linha de borda verde-limão com 3 pixels de espessura. A linha conecta os pontos de dados de cada mês formando curva suave (interpolação monotone).
Abaixo da linha, a área é preenchida com gradiente vertical: no topo (próximo à linha) a cor é verde-limão com 30% de opacidade; na base do gráfico a cor é verde-limão com 0% de opacidade (transparente). Isso cria efeito de "neblina" colorida que não obscurece a área de despesas abaixo.

#### Área de Despesas
A segunda área representando despesas tem linha de borda preta com 3 pixels de espessura, também com curva suave conectando os pontos mensais.
O preenchimento abaixo desta linha usa gradiente similar: topo com preto a 10% de opacidade, base com preto transparente. A opacidade menor que a de receitas garante que ambas áreas sejam visíveis mesmo quando sobrepostas.

#### Interação com Tooltip
Quando o usuário move o mouse sobre o gráfico, uma linha vertical fina cinza clara acompanha o cursor, indicando o mês sob o ponteiro.
Ao parar sobre um ponto específico, aparece um tooltip flutuante ao lado do cursor. O tooltip tem fundo branco com sombra elevada e bordas arredondadas.
Dentro do tooltip aparecem três linhas de texto:
- Primeira linha: Nome do mês em negrito e cinza escuro ("Janeiro")
- Segunda linha: "Receitas: R$ 4.000,00" em cor verde escuro
- Terceira linha: "Despesas: R$ 2.400,00" em cor preta
Os valores são formatados com moeda completa (cifrão, pontos de milhar, vírgula decimal).
Quando o mouse sai da área do gráfico, o tooltip desaparece imediatamente.

### Seção de Objetivos
Mais abaixo no dashboard existe uma seção dedicada aos objetivos financeiros da família.

#### Header da Seção
A seção começa com um header horizontal que tem:
À esquerda: Ícone de alvo (target) dentro de um círculo preto com fundo preto e ícone branco, seguido do título "Objetivos" em fonte grande e negrito.
À direita: Botão fantasma (sem fundo) com texto "Ver mais" e ícone de seta para direita. Clicar neste botão navega para a view completa de objetivos onde todos os objetivos são listados.

#### Grid de Objetivos
Abaixo do header, os objetivos aparecem em grid responsivo:
- Mobile: 1 coluna (objetivos empilhados verticalmente)
- Tablet: 2 colunas
- Desktop: 4 colunas
O espaçamento entre cards é generoso (24px). Apenas os primeiros 4 objetivos são mostrados nesta seção do dashboard, mesmo que existam mais objetivos cadastrados.

#### Estrutura do Card de Objetivo
Cada objetivo é um card vertical com fundo branco, borda clara e bordas muito arredondadas (32px). O card é dividido em duas áreas principais: imagem e conteúdo.
Área de Imagem (Topo): Ocupa metade superior do card com altura fixa de 192 pixels. A imagem cadastrada no objetivo preenche totalmente esta área usando object-fit: cover, ou seja, a imagem é recortada/redimensionada para cobrir todo o espaço mantendo proporção.
Sobreposta à imagem, no canto superior direito, há um badge pequeno com fundo preto semi-transparente com leve desfoque (backdrop blur), criando efeito glassmorphism. Dentro do badge, em texto minúsculo branco, aparece a categoria do objetivo: "Lazer", "Transporte", etc.
Quando o usuário passa mouse sobre o card, a imagem aumenta levemente de escala (scale 1.05) criando leve efeito de zoom. Esta transição é lenta (700ms) para ser mais suave e elegante.
Área de Conteúdo (Base): Tem padding interno generoso e é dividida verticalmente em duas subáreas: informações e progresso.
Subárea de Informações: Primeiro aparece o nome do objetivo em fonte média (18px) e negrito: "Viagem em Família".
Logo abaixo, uma linha mostra dois valores monetários: valor atual em destaque (fonte 20px, negrito, preto) "R$ 3.500,00" seguido de "de" em fonte minúscula cinza e o valor da meta também em cinza: "de R$ 10.000,00".
Subárea de Progresso: Contém uma barra de progresso horizontal com altura pequena (10px), fundo cinza claro e bordas arredondadas completas (pill shape).
Dentro desta barra, outra barra preenchida com cor verde-limão representa o progresso atual. A largura desta barra é percentual calculado: (valorAtual / valorMeta) × 100. Por exemplo, se tem R$ 3.500 de R$ 10.000, a barra verde preenche 35% da largura total.
A animação de preenchimento da barra é suave e lenta (1000ms) para criar efeito agradável quando a página carrega ou quando o valor é atualizado.
Abaixo da barra, em linha horizontal com espaço entre os itens:
- À esquerda: percentual em texto pequeno negrito preto: "35%"
- À direita: valor faltante em texto pequeno negrito cinza: "Faltam R$ 6.500,00"

### Tabela de Transações Detalhada
A última seção do dashboard é uma tabela completa mostrando todas as transações registradas.

#### Header da Tabela
No topo da seção há um header horizontal. À esquerda, título "Extrato Detalhado" em fonte grande e negrito. À direita, controles de busca e filtro para a tabela.
Campo de Busca da Tabela: Similar ao campo de busca do header principal, mas específico para esta tabela. Tem ícone de lupa, placeholder "Buscar lançamentos..." e largura média (256px no desktop, 100% no mobile). A busca é em tempo real e filtra por descrição OU categoria.
Select de Tipo: Dropdown ao lado da busca permite filtrar por tipo. Opções: "Todos", "Receitas", "Despesas". Tem largura fixa (140px) no desktop e 100% no mobile. Quando uma opção é selecionada, a tabela mostra apenas transações daquele tipo.

#### Estrutura da Tabela
A tabela tem borda clara arredondada contornando toda ela. O header da tabela (linha com nomes das colunas) tem fundo cinza claro para se diferenciar das linhas de dados.
Colunas da Tabela:
1. Avatar: Coluna estreita (50px) mostrando foto circular pequena (24px) do membro responsável pela transação. Se não houver foto ou membro, mostra ícone de usuário genérico.
2. Data: Mostra data da transação formatada como "DD/MM/AAAA" (exemplo: "15/01/2024") em texto cinza médio.
3. Descrição: Mostra ícone indicativo do tipo seguido da descrição textual. Para receitas, ícone é seta diagonal para baixo-esquerda em círculo com fundo verde claro. Para despesas, ícone é seta diagonal para cima-direita em círculo com fundo vermelho claro. A descrição aparece em texto negrito preto.
4. Categoria: Nome da categoria em badge arredondado com fundo cinza claro e texto cinza médio.
5. Conta/Cartão: Nome da conta bancária ou cartão de crédito de onde saiu/entrou o dinheiro. Texto cinza médio. O sistema busca o nome na lista de contas; se não encontrar, busca na lista de cartões; se não encontrar em nenhuma, mostra "Desconhecido".
6. Parcelas: Se a transação foi parcelada, mostra "3x", "6x", etc. Se foi à vista (parcelas = 1), mostra apenas "-" (traço).
7. Valor: Alinhado à direita, mostra o valor com prefixo de sinal. Receitas têm "+" em verde ("+R$ 5.000,00"). Despesas têm "-" em preto ("-R$ 350,00"). Fonte negrito.
Linhas de Dados: Cada linha representa uma transação. As linhas alternam sutilmente entre fundo completamente branco e fundo com levíssimo cinza (zebra striping) para facilitar leitura.
Quando o usuário passa mouse sobre uma linha, ela fica com fundo cinza claro mais perceptível, destacando a linha inteira.

#### Filtragem e Busca
A tabela considera múltiplos filtros simultaneamente:
Filtros Globais: Se há filtro de membro ativo no header do dashboard, a tabela mostra apenas transações daquele membro. Se há filtro de período ativo, mostra apenas transações dentro daquele intervalo de datas.
Filtros Locais: O campo de busca local da tabela adiciona mais um filtro. Se há busca de "mercado", mostra apenas transações cuja descrição OU categoria contenha a palavra "mercado". O select de tipo adiciona mais filtro: se "Despesas" está selecionado, mostra apenas transações de tipo despesa.
Todos estes filtros trabalham em conjunto (AND lógico). Uma transação só aparece se passar por TODOS os filtros ativos.
Ordenação: Independente dos filtros, as transações são sempre ordenadas por data em ordem decrescente (mais recente primeiro, mais antiga por último).

#### Paginação
Como pode haver muitas transações, a tabela implementa paginação. São exibidas apenas 5 transações por vez.
Abaixo da tabela, dolado esquerdo, aparece um contador: "Mostrando 1 a 5 de 47", indicando quais itens estão visíveis e quantos existem no total.
Do lado direito aparecem os controles de navegação:
Botão Anterior: Círculo com ícone de seta para esquerda. Clicável apenas se não estiver na primeira página. Quando clicável, tem hover state. Quando está na primeira página, fica com cor cinza clara e cursor normal (disabled).
Números de Página: Sequência de botões circulares numerados. Se há 10 páginas, aparecem botões "1", "2", "3", ... "10". A página atual tem fundo preto com texto branco. As outras têm fundo transparente com texto cinza médio. Clicar em qualquer número salta para aquela página.
Se houver muitas páginas (mais de 7), o sistema mostra apenas as primeiras 3, reticências "...", e as últimas 2. Exemplo: "1 2 3 ... 9 10". Sempre mostra a página atual e páginas adjacentes.
Botão Próxima: Círculo com ícone de seta para direita. Clicável apenas se não estiver na última página. Disabled na última página.
Quando o usuário muda de página, a tabela rola suavemente até o topo e as novas 5 transações são carregadas com leve fade-in.

## 🔄 MODAIS DO SISTEMA

### Modal de Nova Transação
Este modal abre quando o usuário clica no botão "Nova Transação" do header do dashboard ou em outros lugares do sistema que permitem adicionar transação.

#### Apresentação e Layout
O modal aparece centralizado na tela sobre uma camada escura semi-transparente (overlay). O modal tem fundo branco, bordas arredondadas generosas, sombra forte e largura média (500-600px no desktop, 90% da tela no mobile).
Header: Barra superior com título "Nova Transação" e botão X para fechar.
Conteúdo: Área scrollável contendo o formulário.
Footer: Barra inferior com botões "Cancelar" e "Salvar Transação".

#### Campos do Formulário
- **Toggle de Tipo**: "Receita" vs "Despesa".
- **Valor**: Input numérico formatado como moeda (R$).
- **Descrição**: Input de texto obrigatório.
- **Categoria**: Select com categorias dependentes do tipo selecionado. Opção "Outra..." permite criar nova.
- **Data**: DatePicker (padrão hoje).
- **Conta/Cartão**: Select de origem/destino do dinheiro.
- **Membro**: Select de membro responsável (opcional).
- **Parcelas**: Input numérico (default 1).
- **Status**: Toggle "Pendente" vs "Concluído" (default Concluído).

#### Validação e Salvamento
Valida campos obrigatórios. Se sucesso, cria objeto de transação, adiciona ao contexto global, fecha modal com toast de sucesso e atualiza dashboard.

### Modal de Adicionar Membro
Permite cadastrar novo membro da família.
Campos: Nome completo, Função na família (Pai, Mãe, etc), Avatar (URL ou Upload), Renda mensal estimada.
Ao salvar, adiciona membro à lista global.

### Modal de Adicionar Cartão
Permite cadastrar novo cartão de crédito.
Campos: Nome do cartão, Dia de fechamento, Dia de vencimento, Limite total, Fatura atual, Tema visual (Black, Lime, White), Logo URL, Últimos 4 dígitos.
Ao salvar, adiciona cartão à lista global.

### Modal de Filtros Mobile
Modal fullscreen específico para mobile.
Permite selecionar: Tipo de Transação, Membro da Família, Período (calendário).
Botão "Aplicar Filtros" confirma as seleções e atualiza o dashboard.

## 🔗 INTEGRAÇÕES E FLUXOS COMPLEXOS
(Consulte o documento original ou chunks lidos para detalhes passo-a-passo dos fluxos de adicionar transação, filtrar e interagir com calendário)

## 📊 CÁLCULOS E LÓGICA DE NEGÓCIO
O sistema implementa cálculos precisos para:
- Saldo Total (Contas - Faturas)
- Receitas/Despesas do Período
- Percentual por Categoria
- Taxa de Economia
- Progresso de Objetivos

## 🎨 ESTADOS VISUAIS E ACESSIBILIDADE
- **Hover/Focus**: Todos elementos interativos possuem estados visuais claros.
- **Loading/Error**: Previsão de skeleton screens e mensagens de erro amigáveis.
- **Acessibilidade**: Navegação por teclado, labels para screen readers e contraste WCAG AA.
