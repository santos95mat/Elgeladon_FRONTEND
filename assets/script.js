const baseURL =
  "https://testeapielgeladon.herokuapp.com/paletas" ||
  "http://localhost:3000/paletas";

async function getPaletas() {
  const response = await fetch(`${baseURL}/listar-todas`);

  const paletas = await response.json();

  paletas.forEach((paleta) => {
    document.getElementById("PaletaList").insertAdjacentHTML(
      "beforeend",
      `
        <div class="PaletaListaItem">
            <div>
                <div class="PaletaListaItem__sabor">${paleta.sabor}</div>
                <div class="PaletaListaItem__preco">R$ ${paleta.preco},00</div>
                <div class="PaletaListaItem__descricao">${paleta.descricao}</div>
            </div>
            <img class="PaletaListaItem__foto" src="${paleta.foto}"/>
        </div>
        `
    );
  });
}

getPaletas();
