# Roteiro de demonstração — Vesper Equipamentos EX

Este roteiro existe para que uma pessoa avaliando o portfólio consiga entender a entrega em poucos minutos, sem depender de uma leitura extensa do código.

## Avaliação em dois minutos

1. Abra [vesper.ind.br](https://vesper.ind.br/) e observe o posicionamento técnico, as certificações e os caminhos principais já no primeiro bloco.
2. Percorra **Soluções por Aplicação** e siga para **Produtos**. A navegação começa pelo problema operacional e avança até a linha de equipamento.
3. Abra um produto para ver como os dados e as especificações são organizados em componentes reutilizáveis.
4. Reduza a janela ou use o modo responsivo. A navegação, os CTAs e a hierarquia de conteúdo permanecem utilizáveis em mobile.

## O que procurar no código

| Pergunta de revisão | Onde observar |
| --- | --- |
| Como o catálogo escala? | `src/data/`, `src/components/ProductDetail.jsx` e `src/components/ProductTechnicalSpecs.jsx` |
| Como a navegação e páginas foram separadas? | `src/pages/` e `src/components/` |
| Como estado transversal é tratado? | `src/contexts/ThemeContext.jsx` e `src/contexts/QuoteContext.jsx` |
| Como o conteúdo é preparado para idioma? | `src/i18n/` |
| Como a cópia pública evita tocar na operação? | `scripts/verify-portfolio-release.mjs` e `docs/portfolio-release.md` |

## Prova e limites

As imagens deste repositório são capturas do site publicado em 28 de julho de 2026. O case study comprova interface, estrutura de front-end e apresentação pública; não declara métricas comerciais, acessos ou resultados de conversão. A cópia do repositório não envia e-mails nem leads para a empresa.
