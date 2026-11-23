# Documentação técnica e funcional — MR Lavação

**Projeto:** Site institucional MR Lavação  
**Localidade informada:** Tijucas, Santa Catarina, Brasil  
**Repositório:** https://github.com/eliveltonsantos0793/mr_lava-o_tijucas_sc  
**Página configurada:** https://eliveltonsantos0793.github.io/mr_lava-o_tijucas_sc/  
**Base documental:** código-fonte da branch principal após a auditoria concluída em 23/11/2026.

---

## 1. Objetivo do projeto

Construir uma presença institucional digital para a MR Lavação e disponibilizar uma experiência simples para o visitante conhecer os serviços e preparar uma solicitação de atendimento.

O projeto foi desenvolvido como aplicação estática, com foco em carregamento simples, manutenção direta e ausência de dependências de framework. O configurador opera no navegador e encaminha a intenção do visitante para contato humano, sem prometer confirmação automática de agendamento.

## 2. Escopo funcional

### 2.1 Seções institucionais
- Início e apresentação da marca.
- Serviços e configurador de pedido.
- Promoções e oferta Uber/99.
- Galeria ilustrativa.
- Sobre a empresa.
- Área reservada para avaliações reais.
- Contato e informações de localização.
- Rodapé institucional com ano dinâmico e crédito ES Tecnologia.

### 2.2 Categorias de veículos
| Chave interna | Rótulo apresentado |
|---|---|
| `hatch` | Hatch |
| `sedan` | Sedan |
| `suv` | SUV / Picape |
| `motorcycle` | Motocicleta |

### 2.3 Catálogo de serviços
Para Hatch, Sedan e SUV/Picape:
- `wash` — Lavagem completa.
- `interior` — Higienização interna.
- `interior-simple` — Limpeza interna simples.
- `wax` — Enceramento e proteção.

Para motocicletas:
- `moto-wash` — Lavagem de motocicletas.
- `moto-detail` — Limpeza detalhada.
- `moto-wax` — Enceramento e proteção.

Os identificadores são parte da lógica de configuração. Alterá-los exige revisar preços, combos, validações e documentação.

## 3. Fluxo de utilização

1. O visitante acessa a seção de serviços.
2. Seleciona a categoria do veículo.
3. Marca um ou mais serviços disponíveis.
4. Pode adicionar outros veículos, até o limite de cinco.
5. O sistema verifica se a seleção corresponde exatamente a um combo configurado.
6. Quando não há combo correspondente, tenta somar os preços individuais válidos.
7. O resumo apresenta os veículos, serviços e valores conhecidos; quando não é possível calcular, mostra “A definir”.
8. O visitante pode informar data e horário pretendidos.
9. Ao acionar o botão de WhatsApp, o sistema valida os dados e prepara uma mensagem para o número configurado.
10. A equipe deverá confirmar disponibilidade, valores e atendimento por contato humano.

**Importante:** data e horário são preferências. A interface não cria reserva, não bloqueia agenda e não confirma atendimento.

## 4. Regras de negócio

### 4.1 Limite de veículos
A constante `MAX_VEHICLES` em `script.js` define o limite atual de cinco veículos. Ao atingir o limite, o controle de inclusão é desabilitado e uma mensagem de status é exibida.

### 4.2 Cálculo de preços
Um preço individual é aceito somente se for do tipo numérico, finito e maior ou igual a zero. O preço zero é tecnicamente válido; sua utilização comercial deve ser intencional e aprovada.

Se todos os serviços selecionados possuírem preços individuais válidos, o total é a soma desses valores.

### 4.3 Correspondência de combos
Um combo é considerado somente se:
- possuir nome textual não vazio;
- possuir lista de serviços;
- não contiver identificadores repetidos;
- usar apenas serviços existentes para a categoria;
- possuir preço numérico finito e não negativo;
- coincidir exatamente com a seleção do visitante.

A ordem dos identificadores não altera a comparação. Um combo parcial não é aplicado a uma seleção maior.

### 4.4 Total indefinido
Se não houver combo exato e faltar preço individual válido para pelo menos um serviço selecionado, o sistema não inventa nem estima o valor: mantém o total como “A definir”.

### 4.5 Oferta Uber/99
A oferta de seleção rápida direciona a escolha para a combinação prevista no código: lavagem do veículo e limpeza interna simples. A condição comercial e o preço dependem de configuração e confirmação da empresa. Limpeza interna simples não deve ser confundida com higienização interna completa.

## 5. Configuração operacional

As configurações comerciais ficam no início de `script.js`, no objeto `CONFIG`.

### 5.1 WhatsApp
`CONFIG.whatsappNumber` deve receber o número oficial em formato internacional, somente dígitos. Não inserir números fictícios. Enquanto o número não estiver configurado, o botão de envio permanece desabilitado.

### 5.2 Preços
Cadastrar valores aprovados em `CONFIG.prices`, separados por categoria e identificador de serviço.

### 5.3 Combos
Cadastrar arrays em `CONFIG.combos`, com objetos contendo `name`, `services` e `price`. Cada combo deve representar uma combinação completa e exata.

### 5.4 Limite de veículos
Ajustar `MAX_VEHICLES` somente se houver decisão operacional. Revalidar a interface e os testes após a alteração.

## 6. Arquitetura e responsabilidades

| Camada | Arquivo | Responsabilidade |
|---|---|---|
| Estrutura e conteúdo | `index.html` | Elementos semânticos, conteúdo institucional, metadados, JSON-LD e referências a CSS/JS. |
| Apresentação | `styles.css` | Tokens visuais, layout, componentes, temas e breakpoints. |
| Comportamento | `script.js` | Estado dos veículos, seleção, regras comerciais, resumo, armazenamento de sessão e interações. |
| Recursos | `assets/` | Logo/banner e favicon. |
| Descoberta | `robots.txt`, `sitemap.xml` | Orientações para robôs e endereço da página principal. |
| Qualidade | `TEST_REPORT.md` | Evidências dos testes executados e limitações. |

Não existe camada de servidor própria. O código não mantém cadastro de clientes, pedidos persistentes, estoque, agenda, pagamentos ou painel administrativo.

## 7. Estado no navegador e persistência

- Chave `mr-lavacao-order-v1` em `sessionStorage`: guarda temporariamente veículos, serviços selecionados, data e horário pretendidos.
- Chave `mr-lavacao-theme` em `localStorage`: guarda a preferência de tema.
- A restauração do pedido limita a quantidade de veículos, verifica categorias conhecidas, remove serviços inválidos e evita IDs repetidos.
- Se o navegador bloquear o armazenamento, a interface continua operando sem persistência.

O armazenamento é local ao navegador/aba e não representa banco de dados, backup ou transmissão automática para a empresa.

## 8. Interface, acessibilidade e responsividade

A implementação contempla:
- layout responsivo com adaptações para telas menores;
- menu móvel com estado de expansão acessível;
- link “Pular para o conteúdo”;
- rótulos associados aos campos;
- estados e resumos anunciados por regiões live;
- foco de teclado considerado na atualização de componentes;
- atributo de movimento reduzido para respeitar a preferência do sistema;
- alternância de tema claro/escuro.

A auditoria estática não substitui testes com tecnologias assistivas e dispositivos reais. Esses testes permanecem recomendados.

## 9. Segurança e privacidade técnica

Medidas observadas no código:
- Content Security Policy declarada por meta tag no documento;
- meta referrer policy `strict-origin-when-cross-origin`;
- função `escapeHTML` para escapar valores dinâmicos antes de inserção em templates HTML;
- validação de preços e combos;
- sanitização lógica dos dados restaurados da sessão;
- abertura de links externos com `noopener,noreferrer`;
- ausência de backend, banco de dados e processamento de pagamento nesta versão.

Limites:
- políticas declaradas via HTML não equivalem a cabeçalhos HTTP configurados no servidor;
- não há mecanismo de autenticação, autorização ou painel privado;
- não há política de privacidade pública dedicada nesta versão;
- o uso de WhatsApp envolve serviço externo e suas próprias condições;
- qualquer futura integração de analytics, formulários, mapas, CRM ou backend exige atualização desta documentação e revisão do tratamento de dados.

Detalhamento: [Políticas e tratamento de dados](POLICIES_AND_DATA_HANDLING.md).

## 10. SEO e metadados

O documento HTML inclui:
- idioma `pt-BR`;
- title e meta description;
- robots meta;
- URL canônica;
- Open Graph e Twitter Card;
- JSON-LD Schema.org com tipo `CarWash`;
- imagem de compartilhamento associada ao banner oficial;
- favicon SVG;
- preconnect para Google Fonts;
- priorização de carregamento da imagem principal e lazy loading para imagem secundária.

O JSON-LD informa somente os dados conhecidos. Endereço completo, telefone, horários e perfis sociais não foram inventados.

O sitemap e o robots.txt usam a URL do GitHub Pages. Se a publicação mudar de domínio ou caminho, atualizar todos os endereços correspondentes.

## 11. Execução e publicação

### Desenvolvimento local
1. Clonar o repositório.
2. Abrir a pasta no VS Code.
3. Executar por servidor local, como Live Server.
4. Testar alterações no navegador.

Não há etapa de build nem dependências npm nesta versão.

### Publicação
A configuração de URL e os arquivos de descoberta indicam uso do GitHub Pages. Antes de considerar uma publicação comercial pronta, confirmar as configurações de Pages no GitHub, abrir a URL em navegadores reais e concluir as pendências comerciais e de conteúdo.

## 12. Testes e auditoria

O relatório [TEST_REPORT.md](../TEST_REPORT.md) registra a auditoria final de 23/11/2026.

Resultado documentado:
- verificações estáticas de sintaxe JavaScript, IDs, seletores, âncoras, JSON-LD, CSS e recursos locais;
- consistência entre canonical, sitemap e robots;
- 16 de 16 casos de teste das regras comerciais aprovados.

Não foram atestados nessa execução:
- testes reais em Chrome/Safari ou dispositivos móveis;
- envio efetivo pelo WhatsApp;
- validação por leitor de tela;
- Lighthouse/PageSpeed ou Core Web Vitals;
- indexação efetiva no Google;
- confirmação de disponibilidade pública do GitHub Pages por inspeção externa automatizada.

## 13. Pendências e evolução

Antes da operação comercial:
1. Definir número oficial de WhatsApp.
2. Aprovar preços e combos.
3. Confirmar endereço e rota.
4. Inserir canais sociais oficiais.
5. Definir política pública de privacidade adequada à operação.
6. Realizar testes manuais em dispositivos e navegadores.
7. Testar fluxo real com o número oficial.

Possíveis evoluções futuras — fora do escopo atual — incluem backend, gestão de agendamentos, painel administrativo, banco de dados, CRM e integrações. Essas funcionalidades não devem ser consideradas existentes até serem desenvolvidas, testadas e documentadas.

## 14. Histórico de auditoria

O ciclo de auditoria funcional e técnica foi conduzido em quatro etapas, concluídas e mescladas na branch principal em 23/11/2026:
- Etapa 1: correções funcionais e acessibilidade.
- Etapa 2: robustez do pedido e persistência temporária.
- Etapa 3: SEO e desempenho.
- Etapa 4: testes finais e relatório de validação.

Esta documentação descreve o estado do código analisado e não substitui o histórico de commits e pull requests do GitHub.
