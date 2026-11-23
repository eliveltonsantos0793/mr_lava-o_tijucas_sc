# Políticas implementadas e tratamento de dados — MR Lavação

**Documento de transparência técnica**  
**Projeto:** MR Lavação — site institucional  
**Última verificação do código:** 23/11/2026

> **Importante:** este documento registra os comportamentos e controles efetivamente identificados no código-fonte. Ele não é, por si só, uma Política de Privacidade pública, Termos de Uso ou parecer jurídico. A publicação de documentos legais voltados aos visitantes depende da confirmação dos responsáveis pela empresa e da análise dos dados e processos que serão utilizados na operação real.

---

## 1. Finalidade

Descrever as regras de funcionamento, transparência comercial, segurança básica e tratamento local de informações implementadas no site da MR Lavação.

O site é uma aplicação estática. Nesta versão, não há backend próprio, banco de dados, cadastro de usuário, painel administrativo, checkout ou processamento de pagamentos.

## 2. Política de solicitação e agendamento

- O visitante pode montar uma solicitação selecionando veículos e serviços.
- A data e o horário preenchidos são preferências do visitante.
- O envio ou preparação de uma mensagem não representa reserva confirmada.
- A equipe da MR Lavação deverá confirmar disponibilidade, condições e atendimento.
- O site não bloqueia horários em agenda nem gera protocolo de reserva.
- A disponibilidade e o atendimento dependem de confirmação humana.

## 3. Política de preços e combos

- Preços comerciais devem ser definidos e aprovados pela empresa antes de serem cadastrados.
- O sistema não cria preços automaticamente.
- Quando não há informação suficiente para calcular o valor, o site apresenta “A definir”.
- O cálculo individual considera somente preços numéricos, finitos e não negativos.
- Um combo só é aplicado quando sua configuração é válida e corresponde exatamente à seleção de serviços do veículo.
- Combos incompletos, duplicados, com serviços inexistentes ou valores inválidos são ignorados.
- O valor apresentado é estimado e está sujeito à confirmação da equipe.

## 4. Política de comunicação pelo WhatsApp

- O botão de WhatsApp permanece desabilitado enquanto o número oficial não estiver configurado.
- O site não deve utilizar telefone fictício ou de demonstração.
- Quando habilitado, o fluxo prepara uma mensagem com os dados da solicitação para abertura do WhatsApp.
- O visitante decide se deseja prosseguir com o envio no aplicativo/serviço externo.
- A comunicação posterior ocorre no ambiente do WhatsApp e está sujeita às políticas e práticas desse serviço.
- O site não garante entrega, leitura ou resposta da mensagem.

## 5. Dados armazenados no navegador

### 5.1 Dados temporários do pedido

A aplicação utiliza `sessionStorage`, com a chave `mr-lavacao-order-v1`, para manter temporariamente:
- categoria e identificador interno de cada veículo;
- serviços selecionados por veículo;
- data pretendida;
- horário pretendido.

A finalidade é permitir que o visitante retome a montagem do pedido durante a sessão da aba. O armazenamento é local ao navegador e não equivale a envio para servidor, banco de dados ou cadastro na empresa.

A disponibilidade e duração dos dados dependem do navegador e de suas configurações. Se o armazenamento estiver bloqueado, o site continua funcionando, mas a recuperação do pedido pode não ocorrer.

### 5.2 Preferência de tema

A aplicação utiliza `localStorage`, com a chave `mr-lavacao-theme`, para guardar a preferência de tema claro ou escuro.

### 5.3 Cookies e tecnologias semelhantes

Na versão do código analisada, não foi identificada implementação própria de cookies de rastreamento, publicidade ou analytics. O armazenamento de sessão e a preferência de tema são realizados pelas APIs de armazenamento do navegador descritas acima.

A página carrega fontes do Google Fonts. Serviços externos podem operar sob suas próprias políticas e condições. Qualquer inclusão futura de métricas, publicidade, mapas incorporados, pixels, ferramentas de atendimento ou outros fornecedores exige nova avaliação e atualização desta documentação.

## 6. Transmissão e compartilhamento

- Não há API ou servidor próprio recebendo os pedidos nesta versão.
- Não há banco de dados próprio para armazenar solicitações.
- O pedido permanece no navegador até que o visitante decida iniciar o fluxo externo de contato.
- Ao utilizar o WhatsApp, os dados incluídos na mensagem são encaminhados ao serviço externo e ao destinatário escolhido pelo visitante.
- Não declarar que dados são compartilhados com terceiros além dos serviços efetivamente integrados e confirmados.

## 7. Segurança técnica implementada

O código contém controles básicos de segurança no front-end:

1. **Content Security Policy (CSP):** declarada por meta tag no HTML, restringindo origens de scripts, estilos, fontes, imagens, conexões e formulários conforme as diretivas configuradas.
2. **Referrer Policy:** meta tag com `strict-origin-when-cross-origin`.
3. **Escape de conteúdo dinâmico:** a função `escapeHTML` trata caracteres especiais antes da inserção de valores dinâmicos em templates HTML.
4. **Validação comercial:** preços e combos são validados antes de entrarem no cálculo.
5. **Validação da restauração:** dados lidos de `sessionStorage` são limitados e filtrados contra categorias, serviços e identificadores conhecidos.
6. **Links externos:** abertura de links externos com `noopener,noreferrer`.

### Limitações importantes

- Meta tags de segurança não substituem cabeçalhos HTTP configurados no servidor.
- A CSP atual deve ser reavaliada sempre que forem incluídos scripts, estilos, imagens, integrações ou recursos externos.
- Não há autenticação, gestão de permissões, proteção de painel administrativo ou controles de servidor porque não existe área administrativa nesta versão.
- Não existe proteção de dados em backend porque não há backend próprio implementado.
- A auditoria estática não equivale a teste de invasão ou certificação de segurança.

## 8. Transparência de conteúdo

- As imagens da galeria são identificadas como ilustrativas e não devem ser interpretadas como registros de serviços já executados.
- A seção de avaliações informa que avaliações reais serão adicionadas futuramente; não foram criados depoimentos fictícios.
- Endereço completo, telefone, horários e perfis sociais não devem ser apresentados como oficiais até serem confirmados pela empresa.
- Informações estruturadas de SEO devem permanecer limitadas a dados confirmados.
- A oferta Uber/99 distingue limpeza interna simples de higienização interna completa.

## 9. Acessibilidade e experiência de uso

A implementação contém:
- link para pular ao conteúdo;
- navegação adaptada a dispositivos móveis;
- controles com rótulos e estados acessíveis;
- anúncios de atualização do resumo e de mensagens de status;
- gerenciamento de foco em interações relevantes;
- respeito à preferência do sistema por movimento reduzido.

Esses recursos representam implementações no código, mas não constituem certificação formal de conformidade com WCAG. Testes manuais com teclado, leitores de tela e diferentes dispositivos continuam recomendados.

## 10. Documentos legais ainda não implementados

Na versão analisada, não foram encontrados documentos/páginas dedicados e publicados para:
- Política de Privacidade voltada ao visitante;
- Termos de Uso;
- Política de Cookies com painel de consentimento.

Este arquivo documenta políticas operacionais e técnicas observadas, mas **não substitui** esses documentos legais.

Antes da operação comercial, a empresa deve decidir:
- quem será o controlador dos dados e como poderá ser contatado;
- quais dados serão efetivamente recebidos pela equipe;
- por quais canais os pedidos serão recebidos e mantidos;
- por quanto tempo as conversas e solicitações serão conservadas;
- quem terá acesso a esses dados;
- como atender solicitações dos titulares;
- se serão adicionados serviços de terceiros, analytics ou publicidade;
- quais informações e bases legais serão aplicáveis conforme a operação real e a legislação vigente, inclusive LGPD quando aplicável.

Não inserir declarações genéricas de conformidade legal sem confirmar os processos reais da empresa.

## 11. Alterações que exigem revisão deste documento

Atualizar esta documentação quando ocorrer qualquer uma destas mudanças:
- ativação do WhatsApp com número oficial;
- inclusão de formulário que envie dados a servidor;
- inclusão de analytics, pixels ou publicidade;
- integração com mapas, CRM, agenda ou atendimento;
- implantação de backend, banco de dados ou painel administrativo;
- coleta de nome, telefone, placa, localização ou outros dados pessoais;
- mudança na persistência ou compartilhamento dos dados.

## 12. Referência de implementação

Arquivos principais verificados:
- `index.html`: meta tags CSP e referrer, conteúdo institucional, avisos comerciais e metadados.
- `script.js`: `CONFIG`, `sessionStorage`, `localStorage`, validações, escape de HTML e fluxo de WhatsApp.
- `styles.css`: apresentação responsiva e preferência por movimento reduzido.
- `TEST_REPORT.md`: escopo dos testes estáticos e limitações da auditoria.

---

**Responsabilidade de atualização:** manter este documento sincronizado com o código efetivamente publicado. Se o comportamento do site mudar, revisar o texto antes de apresentá-lo aos visitantes como descrição atual.
