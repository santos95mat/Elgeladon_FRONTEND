// Variaveis auxiliares

const baseURL =
  "https://elgeladon-api-blue.herokuapp.com/paletas" ||
  "http://localhost:3000/paletas";

// Requisições

const getPaletas = async () => {
  const resposta = await fetch(`${baseURL}/listar-todas`);
  const paletas = await resposta.json();

  return paletas;
};
const getPaletaID = async (id) => {
  const resposta = await fetch(`${baseURL}/paleta/${id}`);

  if (resposta.status === 404) {
    return false;
  }

  const paleta = await resposta.json();

  return paleta;
};
const createPaleta = async (sabor, descricao, rota, preco) => {
  const paleta = {
    sabor,
    descricao,
    rota,
    preco,
  };

  const resposta = await fetch(`${baseURL}/criar-paleta`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(paleta),
  });

  const novaPaleta = await resposta.json();

  return novaPaleta;
};
const updatePaleta = async (id, sabor, descricao, rota, preco) => {
  const paleta = {
    id,
    sabor,
    descricao,
    rota,
    preco,
  };

  const resposta = await fetch(`${baseURL}//atualizar-paleta/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(paleta),
  });

  const paletaAtualizada = await resposta.json();

  return paletaAtualizada;
};
const deletePaleta = async (id) => {
  const resposta = await fetch(`${baseURL}/excluir-paleta/${id}`, {
    method: "DELETE",
    mode: "cors",
  });

  if (resposta.status === 204) {
    return "Paleta excluida com sucesso";
  } else {
    return "Paleta não encontrada";
  }
};

// Manipulação do documento(HTML)

const showPaletas = async () => {
  const paletas = await getPaletas();

  paletas.forEach((paleta) => {
    document.getElementById("paletaList").insertAdjacentHTML(
      "beforeend",
      `
        <div class="PaletaListaItem">
          <div>
            <h4 class="PaletaListaItem__sabor">${paleta.sabor}</h4>
            <span class="PaletaListaItem__preco">R$${paleta.preco},00</span>
            <p class="PaletaListaItem__descricao">${paleta.descricao}</p>
          </div>
          <img class="PaletaListaItem__foto" src="./${paleta.foto}" alt="Paleta sabor ${paleta.sabor}" />
        </div>
      `
    );
  });
};
const showPaletaID = async () => {
  const input = document.getElementById("inputIdPaleta");
  const id = input.value;

  const paleta = await getPaletaID(id);

  if (paleta === false) {
    document.getElementById("paletaPesquisada").innerHTML = `
      <p class="NotPaleta">Nenhuma Paleta encontrada</p>
    `;
  } else {
    document.getElementById("paletaPesquisada").innerHTML = `
      <div class="PaletaListaItem">
        <div>
          <h4 class="PaletaListaItem__sabor">${paleta.sabor}</h4>
          <span class="PaletaListaItem__preco">R$${paleta.preco},00</span>
          <p class="PaletaListaItem__descricao">${paleta.descricao}</p>
        </div>
        <img class="PaletaListaItem__foto" src="./${paleta.foto}" alt="Paleta sabor ${paleta.sabor}" />
      </div>
    `;
  }
};

showPaletas();
