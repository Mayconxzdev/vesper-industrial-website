# Estudo de caso — Vesper Equipamentos EX

## Contexto

A Vesper atua com ventiladores e exaustores industriais para aplicações que exigem comunicação técnica, confiança e leitura rápida de informações. No site, o conteúdo precisava atender tanto quem busca uma solução por aplicação quanto quem já chega procurando uma linha de produto ou locação.

## Objetivo de produto

Criar uma presença institucional consistente, responsiva e orientada à descoberta de soluções, mantendo visíveis os elementos que fazem diferença nesse segmento: certificações, uso industrial, detalhes técnicos, linhas de produto e canais de contato.

## Abordagem de design

### Arquitetura de informação

- Home com posicionamento, aplicações, catálogo em destaque, locação e caminho de contato.
- Navegação para produtos, ventiladores, exaustores, empresa, qualidade, downloads e contato.
- Páginas de produto com dados técnicos em componentes reutilizáveis.

### Interface

- Contraste elevado e tipografia com peso para conteúdo técnico e chamadas de ação.
- Blocos de informação que tornam certificações, aplicações e categorias fáceis de escanear.
- Cartões consistentes para reduzir o esforço de comparação entre equipamentos.
- Fluxos de orçamento e WhatsApp visíveis sem forçar uma conversão imediata.

### Implementação

O front-end é estruturado em React com dados de produtos separados da camada de visualização. Contextos isolam estado de tema e orçamento; a localização usa i18next; componentes cobrem header, footer, busca, produto, especificação, breadcrumbs e widgets de contato.

## O que é comprovável neste repositório

- Interface React/Vite com build reproduzível.
- Layout responsivo registrado em capturas reais do site publicado.
- Catálogo de produtos e especificações organizado como dados.
- Estrutura de tradução PT-BR e inglês.
- Lint e build disponíveis no projeto e em CI.

## Limites do case study

Não há alegação de métricas de conversão, SEO, acessos, faturamento ou resultados comerciais. Integrações de e-mail, transporte e deploy fazem parte da operação e foram removidas desta cópia pública. O objetivo aqui é demonstrar a entrega de design e front-end publicada.

## Links

- Produção: <https://vesper.ind.br/>
- Capturas: [desktop](screenshots/home-desktop.png), [mobile](screenshots/home-mobile.png) e [soluções](screenshots/solutions-desktop.png)
