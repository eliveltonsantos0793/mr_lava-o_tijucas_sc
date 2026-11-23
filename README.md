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

IDs dos serviços:
- Hatch/Sedan/SUV: `wash`, `interior`, `wax`
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
