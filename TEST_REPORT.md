# Relatório de testes finais — MR Lavação

Data da auditoria: 23/11/2026  
Base avaliada: `master`, após o merge da Etapa 3.

## Resultado

**Aprovado nos testes estáticos e nos testes isolados de regras comerciais executados nesta auditoria.**

### 1. Integridade estrutural
- Sintaxe JavaScript compilada sem erro.
- IDs HTML únicos.
- Seletores de elementos usados diretamente pelo JavaScript encontrados no HTML.
- Links internos com âncoras correspondentes.
- JSON-LD parseado como JSON válido.
- Chaves de abertura/fechamento da folha CSS balanceadas.
- Arquivos locais referenciados conferidos no repositório: `styles.css`, `script.js`, `assets/favicon.svg` e `assets/images/logo-main.jpg`.
- URL canônica, sitemap e robots.txt conferidos entre si.

### 2. Regras comerciais e cálculo
Foram executados 16 casos sobre as funções reais de validação e cálculo extraídas do `script.js`:
- Rejeição de preços negativos, NaN, Infinity, texto, null e undefined.
- Aceitação de preço zero.
- Soma de preços individuais.
- Reconhecimento de combo exato, mesmo quando a ordem dos serviços muda.
- Rejeição/ignoração de combos sem nome, com serviços repetidos, serviços desconhecidos, preço negativo ou combinação incompleta.
- Total permanece indefinido quando faltam preços válidos.
- Veículo sem serviços selecionados não gera cobrança.

**Resultado: 16 de 16 casos aprovados.**

### 3. Limites desta validação
Não foi possível confirmar nesta execução:
- Interação real em Chrome/Safari ou em dispositivo móvel.
- Layout visual em larguras e resoluções diferentes.
- Navegação por teclado e leitor de tela.
- Persistência real no sessionStorage em diferentes navegadores.
- Abertura e envio de mensagem pelo WhatsApp.
- Métricas Lighthouse/PageSpeed, Core Web Vitals ou indexação efetiva pelo Google.
- Disponibilidade pública do GitHub Pages; a tentativa de inspeção externa automatizada não conseguiu acessar a URL.

Esses itens permanecem como validação manual recomendada antes da divulgação comercial. O botão do WhatsApp continua corretamente desabilitado enquanto o telefone oficial não estiver configurado.

## Conclusão

Nenhuma falha estrutural ou de cálculo foi identificada nos testes executados. Não foram necessárias alterações em HTML, CSS ou JavaScript nesta etapa. Este relatório documenta os resultados sem afirmar testes de navegador ou de serviços externos que não foram realizados.
