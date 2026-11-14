# California Rodas – Site

Site da **California Rodas**, recuperadora de rodas de liga leve em Porto Alegre (Zona Norte).
Desempeno, solda, pintura, diamantação e serviço leva e traz.

- WhatsApp: (51) 9692-3466
- Instagram: [@california_rodas](https://www.instagram.com/california_rodas/)

## Estrutura

```
index.html   página completa (HTML, CSS e JS num arquivo só)
img/         logo e fotos dos trabalhos
```

## Como editar os dados

No fim do `index.html` existe o bloco `CONFIG`, com WhatsApp, endereço, horário e Instagram.
Logo abaixo dele fica a lista `ANTES_DEPOIS`. Para cada par de fotos reais (antes/depois) colocado em `img/`, adicione uma linha:

```js
{ antes: "img/onix-antes.jpg", depois: "img/onix-depois.jpg", titulo: "Onix aro 16 – meio-fio + pintura" }
```

## Publicar

É um site estático: funciona no GitHub Pages, Netlify, Vercel ou em qualquer hospedagem.
No GitHub Pages: Settings → Pages → Branch `main`, pasta `/ (root)`.
