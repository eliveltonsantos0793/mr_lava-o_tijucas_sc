# MR Lavação — versão inicial

Site institucional em HTML, CSS e JavaScript, desenvolvido a partir do Documento Mestre v1.1.

## Como visualizar
1. Extraia os arquivos.
2. Abra `index.html` no navegador.
3. Para desenvolvimento, recomenda-se usar VS Code com Live Server.

## Arquivos
- `index.html`: estrutura das seções.
- `styles.css`: identidade visual, temas e responsividade.
- `script.js`: seleção de veículos/serviços, cálculo de combos, resumo, tema e mensagem WhatsApp.

## Configurações pendentes
No início de `script.js`, preencher:
- `CONFIG.whatsappNumber`: telefone oficial em formato internacional, somente números.
- `CONFIG.prices`: preços individuais por categoria e serviço.
- `CONFIG.combos`: combos exatos cadastrados por categoria, com nome, lista de IDs dos serviços e preço.

IDs dos serviços (incluindo limpeza interna simples, disponível para todos os clientes):
- Hatch/Sedan/SUV: `wash`, `interior`, `interior-simple`, `wax`
- Motocicleta: `moto-wash`, `moto-detail`, `moto-wax`

Exemplo de combo (não é preço real; apenas formato de configuração):
```js
combos: {
  hatch: [
    { name: "Combo exemplo", services: ["wash", "interior"], price: 0 }
  ]
}
```
Substitua `0` por preço aprovado antes de publicar. Não deixe dados demonstrativos como valores comerciais.

## Importante
- O site não confirma agendamentos; a equipe confirma pelo WhatsApp.
- Endereço, redes sociais, preços e telefone não foram inventados.
- As imagens da galeria são ilustrações CSS e estão identificadas como ilustrativas.
- Não há painel administrativo, banco de dados ou pagamento online nesta fase.
- Esta versão é uma prévia de desenvolvimento e não deve ser publicada sem revisão e autorização do proprietário.


## Robustez do pedido — Etapa 2
- Limite de até 5 veículos por pedido; o controle de inclusão é desabilitado ao atingir o limite.
- Preços individuais e de combos só são considerados válidos quando são números finitos e não negativos.
- Combos só são aplicados quando têm nome, preço válido e uma combinação exata de serviços existentes, sem IDs repetidos.
- Se um combo estiver inválido, ele é ignorado; o cálculo tenta usar os preços individuais válidos. Se não houver preços válidos para todos os serviços, o total permanece "A definir".
- O pedido é salvo temporariamente no `sessionStorage` da aba do navegador, incluindo veículos, serviços, data e horário pretendidos. O armazenamento não é um banco de dados e pode não estar disponível em navegação privada ou em configurações restritivas.
- O resumo e o total anunciam atualizações para tecnologias assistivas.
- O limite de veículos pode ser ajustado pela constante `MAX_VEHICLES` no início de `script.js`.

A data e o horário são preferências informadas pelo cliente, não confirmação de agendamento. O pedido continua dependendo da confirmação da equipe.


## SEO e desempenho — Etapa 3
- Metadados de título, descrição e indexação em português do Brasil.
- URL canônica e metadados Open Graph/Twitter para compartilhamento.
- Dados estruturados Schema.org do tipo `CarWash`, limitados às informações confirmadas (Tijucas–SC; sem endereço, telefone ou horário inventados).
- Sitemap XML e robots.txt apontando para a URL pública atual do GitHub Pages.
- Favicon SVG próprio, sem dependência de serviço externo.
- Imagem principal priorizada no carregamento; logo secundária carregada sob demanda.
- Folha de estilos respeita `prefers-reduced-motion`.
- As URLs canônicas e do sitemap devem ser atualizadas caso o domínio de publicação mude.


## Testes finais — Etapa 4
Consulte [TEST_REPORT.md](TEST_REPORT.md) para os resultados da auditoria estática e dos testes das regras comerciais, bem como os limites e validações manuais ainda recomendadas.
