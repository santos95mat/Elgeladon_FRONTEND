async function listarTodasAsPaletas() {
  const resposta = await fetch("http://localhost:3000/paletas/listar-todas");

  const paletas = await resposta.json();

  paletas.forEach((elemento) => {
    document.getElementById("paletaList").insertAdjacentHTML(
      "beforeend",
      `
        <div class="PaletaListaItem">
          <div>
            <div class="PaletaListaItem__sabor">${elemento.sabor}</div>
            <div class="PaletaListaItem__preco">R$ ${elemento.preco}</div>
            <div class="PaletaListaItem__descricao">${elemento.descricao}</div>
          </div>
          <img class="PaletaListaItem__foto" src="./${elemento.foto}" alt="Paleta de Doce de Leite" />
        </div>
      `
    );
  });
}

listarTodasAsPaletas();
