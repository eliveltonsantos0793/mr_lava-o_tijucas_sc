# MR Lavação — Site institucional

<p align="center">
  <strong>Site institucional e configurador de solicitações de serviços automotivos</strong><br>
  Tijucas — Santa Catarina, Brasil
</p>

<p align="center">
  <a href="https://eliveltonsantos0793.github.io/mr_lava-o_tijucas_sc/">Visualizar site</a> ·
  <a href="TEST_REPORT.md">Relatório de testes</a> ·
  <a href="docs/PROJECT_DOCUMENTATION.md">Documentação técnica</a> ·
  <a href="docs/POLICIES_AND_DATA_HANDLING.md">Políticas e tratamento de dados</a>
</p>

---

## 1. Visão geral

O projeto MR Lavação é um site institucional desenvolvido para apresentar a empresa, seus serviços de cuidado automotivo e permitir que visitantes montem uma solicitação com um ou mais veículos. A experiência foi concebida para funcionar em dispositivos móveis, tablets e computadores, com interface em português do Brasil.

O configurador organiza os serviços por categoria de veículo, calcula combinações comerciais cadastradas e prepara uma mensagem de solicitação para encaminhamento ao WhatsApp quando o número oficial for configurado.

**Atenção ao estágio do projeto:** o site contém informações comerciais intencionalmente pendentes — como telefone oficial, preços, combos, endereço completo e canais sociais. A interface informa que a empresa está em preparação para inauguração. Antes de uma divulgação comercial definitiva, o responsável deve revisar e preencher os dados pendentes descritos neste documento.

## 2. Acesso e tecnologias

- **Site:** [MR Lavação — GitHub Pages](https://eliveltonsantos0793.github.io/mr_lava-o_tijucas_sc/)
- **Repositório:** [eliveltonsantos0793/mr_lava-o_tijucas_sc](https://github.com/eliveltonsantos0793/mr_lava-o_tijucas_sc)
- **Branch principal:** `master`
- **Tecnologias:** HTML5, CSS3 e JavaScript (Vanilla).
- **Publicação planejada/configurada:** GitHub Pages.

O projeto não utiliza framework JavaScript, banco de dados, API própria, painel administrativo ou processamento de pagamentos.

## 3. Funcionalidades

### Experiência institucional
- Apresentação da MR Lavação e de sua proposta de cuidado automotivo em Tijucas–SC.
- Navegação por seções: início, serviços, promoções, galeria, sobre e contato.
- Menu adaptado para telas menores.
- Alternância entre tema escuro e claro, com preferência salva no armazenamento local do navegador.
- Ano do rodapé atualizado automaticamente.
- Identidade visual responsiva e respeito à preferência do sistema por movimento reduzido.

### Configurador de solicitações
- Categorias: Hatch, Sedan, SUV/Picape e motocicleta.
- Seleção de um ou mais serviços por veículo.
- Inclusão de até cinco veículos no mesmo pedido.
- Identificação de combos somente quando a seleção corresponde exatamente a uma combinação cadastrada para a categoria.
- Cálculo por preços individuais quando todos os serviços selecionados têm preços válidos.
- Exibição de total como “A definir” quando não há configuração comercial suficiente.
- Resumo do pedido, data pretendida e horário pretendido.
- Persistência temporária do pedido na sessão da aba, quando o navegador permite.
- Oferta de seleção rápida Uber/99.
- Preparação de mensagem para WhatsApp, condicionada à configuração do número oficial.

**O configurador não confirma agendamentos.** Data e horário são preferências informadas pelo visitante. Disponibilidade, valores finais e atendimento dependem da confirmação da equipe.

### Conteúdo e transparência
- Galeria com elementos visuais explicitamente identificados como ilustrativos.
- Área de avaliações sem depoimentos fictícios; informa que avaliações reais serão adicionadas futuramente.
- Endereço completo, rotas e perfis sociais não são inventados nem apresentados como oficiais antes de sua definição.

## 4. Categorias e identificadores de serviços

Os identificadores abaixo são usados internamente em `script.js` para relacionar seleções, preços e combos.

| Categoria | Identificadores |
|---|---|
| Hatch, Sedan e SUV/Picape | `wash`, `interior`, `interior-simple`, `wax` |
| Motocicleta | `moto-wash`, `moto-detail`, `moto-wax` |

A limpeza interna simples (`interior-simple`) é uma opção distinta da higienização interna completa (`interior`).

## 5. Configuração comercial

As configurações ficam no objeto `CONFIG`, no início de `script.js`.

### Número oficial do WhatsApp

Preencha `CONFIG.whatsappNumber` com o número oficial em formato internacional, somente dígitos, incluindo código do país e DDD. Exemplo de formato: `55DDDNÚMERO`.

Não use número de exemplo em produção. Enquanto o valor estiver vazio ou inválido, o botão de WhatsApp permanece desabilitado.

### Preços individuais

Cadastre valores numéricos, não negativos, para cada serviço e categoria. Exemplo ilustrativo de estrutura — **não representa preço aprovado**:

```js
prices: {
  hatch: {
    wash: 0,
    interior: 0,
    "interior-simple": 0,
    wax: 0
  },
  sedan: {},
  suv: {},
  motorcycle: {}
}
```

Substitua os valores de exemplo por preços comerciais aprovados. Não publique valores demonstrativos.

### Combos

Cada combo deve conter:
- `name`: nome não vazio;
- `services`: lista de identificadores válidos e sem repetição;
- `price`: valor numérico finito e não negativo.

O combo é aplicado somente quando a lista de serviços selecionada coincide exatamente com a lista cadastrada, independentemente da ordem. Combos inválidos ou que representem apenas parte da seleção são ignorados. Nesse caso, o sistema tenta calcular pelos preços individuais válidos.

A constante `MAX_VEHICLES` controla o limite de veículos por solicitação (atualmente 5).

## 6. Estrutura do repositório

```text
.
├── assets/
│   ├── favicon.svg
│   └── images/
│       └── logo-main.jpg
├── docs/
│   ├── PROJECT_DOCUMENTATION.md
│   └── POLICIES_AND_DATA_HANDLING.md
├── index.html
├── script.js
├── styles.css
├── robots.txt
├── sitemap.xml
├── README.md
└── TEST_REPORT.md
```

| Arquivo | Responsabilidade |
|---|---|
| `index.html` | Estrutura semântica, conteúdo, metadados, dados estruturados e referências aos recursos. |
| `styles.css` | Identidade visual, componentes, temas e regras responsivas. |
| `script.js` | Categorias, seleção, cálculo, persistência temporária, validações, WhatsApp e interações. |
| `assets/images/logo-main.jpg` | Banner/logo oficial fornecido para o projeto. |
| `assets/favicon.svg` | Ícone do site. |
| `robots.txt` | Orientação de rastreamento e referência ao sitemap. |
| `sitemap.xml` | Endereço canônico da página principal. |
| `TEST_REPORT.md` | Evidências e limites dos testes executados. |
| `docs/` | Documentação funcional, técnica e de políticas implementadas. |

## 7. Executar localmente

1. Clone ou baixe o repositório.
2. Abra a pasta no Visual Studio Code.
3. Inicie um servidor local, por exemplo com a extensão Live Server.
4. Acesse a página pelo endereço local informado pelo servidor.

Também é possível abrir `index.html` diretamente no navegador para uma verificação simples. Para desenvolvimento e validações, prefira um servidor local.

Não é necessário instalar dependências ou executar etapa de build.

## 8. Segurança, acessibilidade e dados

O projeto inclui medidas no front-end, entre elas:
- política de segurança de conteúdo declarada por meta tag;
- política de referência `strict-origin-when-cross-origin`;
- escape de valores dinâmicos antes de sua inserção em templates HTML;
- validação de preços e da estrutura dos combos;
- limites e validação de dados restaurados da sessão;
- navegação por teclado, link para pular ao conteúdo e anúncios de atualização para tecnologias assistivas;
- respeito à preferência `prefers-reduced-motion`.

O pedido é armazenado temporariamente em `sessionStorage`; a preferência de tema é armazenada em `localStorage`. Não há banco de dados ou backend próprio. Consulte [Políticas e tratamento de dados](docs/POLICIES_AND_DATA_HANDLING.md) para o detalhamento e as limitações.

As medidas implementadas no front-end não substituem configuração de segurança no servidor, revisão jurídica ou uma política pública de privacidade adequada à operação real.

## 9. SEO e compartilhamento

O HTML contém:
- título e descrição em pt-BR;
- URL canônica;
- metadados Open Graph e Twitter Card;
- dados estruturados Schema.org do tipo `CarWash`, limitados às informações conhecidas;
- favicon próprio;
- sitemap e robots.txt.

Se o domínio, o caminho de publicação ou a identidade pública mudar, revise as URLs no HTML, nos dados estruturados, no sitemap e no robots.txt.

## 10. Testes e qualidade

Consulte [TEST_REPORT.md](TEST_REPORT.md) para o relatório da auditoria final.

Na etapa documentada em 23/11/2026, foram aprovados:
- verificações estruturais de HTML, seletores, IDs, CSS, links internos e JSON-LD;
- consistência entre URL canônica, sitemap e robots.txt;
- 16 casos de teste das regras de validação e cálculo comercial.

O relatório também registra explicitamente o que **não** foi validado naquela execução, incluindo testes visuais em navegadores/dispositivos reais, envio pelo WhatsApp, Lighthouse/PageSpeed, Core Web Vitals e indexação efetiva. Não interprete os testes estáticos como certificação completa de produção.

## 11. Pendências antes da operação comercial

- [ ] Confirmar e configurar o telefone oficial do WhatsApp.
- [ ] Aprovar e cadastrar preços individuais.
- [ ] Aprovar e cadastrar combos por categoria.
- [ ] Confirmar endereço completo e localização para rota.
- [ ] Confirmar perfis e links oficiais de redes sociais.
- [ ] Revisar textos, serviços e condições comerciais com o responsável pela empresa.
- [ ] Definir e publicar política de privacidade adequada aos dados e canais efetivamente utilizados.
- [ ] Realizar testes manuais em navegadores e dispositivos móveis.
- [ ] Testar o fluxo de montagem e encaminhamento do pedido com o WhatsApp oficial.
- [ ] Revisar domínio, hospedagem, metadados e indexação antes da divulgação.

## 12. Documentação complementar

- [Documentação técnica e funcional do projeto](docs/PROJECT_DOCUMENTATION.md)
- [Políticas implementadas e tratamento de dados](docs/POLICIES_AND_DATA_HANDLING.md)
- [Relatório de testes finais](TEST_REPORT.md)

---

<p align="center">
  Projeto desenvolvido por <a href="https://www.eliveltonsantos.com.br"><strong>ES Tecnologia</strong></a>.
</p>
