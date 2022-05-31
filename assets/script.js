// Variaveis auxiliares

const baseURL = "https://api-elgeladon-mongo.herokuapp.com/paletas";
let savePaletas = [];

// Requisições

const getPaletas = async () => {
  const resposta = await fetch(`${baseURL}/listar-todas`);
  const paletas = await resposta.json();
  savePaletas = paletas;

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
const createPaleta = async (sabor, descricao, foto, preco) => {
  const paleta = {
    sabor,
    descricao,
    foto,
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
const updatePaleta = async (id, sabor, descricao, foto, preco) => {
  const paleta = {
    id,
    sabor,
    descricao,
    foto,
    preco,
  };

  const resposta = await fetch(`${baseURL}/atualizar-paleta/${id}`, {
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

  document.getElementById("paletaList").innerHTML = ``;

  paletas.forEach((paleta) => {
    document.getElementById("paletaList").insertAdjacentHTML(
      "beforeend",
      `
        <div class="PaletaListaItem">
          <div>
            <h4 class="PaletaListaItem__sabor">${paleta.sabor}</h4>
            <span class="PaletaListaItem__preco">R$${paleta.preco},00</span>
            <p class="PaletaListaItem__descricao">${paleta.descricao}</p>
            <div class="button">
              <button class="btnEdit btn" onclick="modalEditar('${paleta._id}')">
                <img src="./assets/icons/edit.png" alt="">
              </button>
              <button class="btnDel btn" onclick="delPaleta('${paleta._id}')">
                <img src="./assets/icons/bin.png" alt="">
              </button>
            </div>
          </div>
          <img class="PaletaListaItem__foto" src="./${paleta.foto}" alt="Paleta sabor ${paleta.sabor}" />
        </div>
      `
    );
  });
};
const showPaletaID = async () => {
  const input = document.getElementById("inputIdPaleta");
  const sabor = input.value;

  const paletaSelecionada = savePaletas.find((elem) => elem.sabor === sabor);

  if (paletaSelecionada === undefined) {
    document.getElementById("paletaPesquisada").innerHTML = `
    <p class="NotPaleta">Nenhuma Paleta encontrada</p>
  `;
  } else {
    const id = paletaSelecionada._id;

    const paleta = await getPaletaID(id);

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
const delPaleta = async (id) => {
  await deletePaleta(id);
  await showPaletas();
};
const editarPaleta = async (id) => {
  const sabor = document.getElementById("sabor").value;
  const preco = document.getElementById("preco").value;
  const descricao = document.getElementById("descricao").value;
  const foto = document.getElementById("foto").value;

  const paleta = savePaletas.find((elemento) => elemento.sabor === sabor);

  if (paleta) {
    alert("Paleta ja existe");
    window.location.reload();
  } else {
    await updatePaleta(id, sabor, descricao, foto, preco);
    window.location.reload();
  }
};
const modalEditar = (id) => {
  document.getElementById("absolute").style.display = "flex";
  document.getElementById("modalForm").innerHTML = `
      <img onclick="fechaModal()" src="./assets/icons/remove.png" alt="" />
      <h2 id="modalTitulo"></h2>
      <input
        required
        name="sabor"
        id="sabor"
        type="text"
        placeholder="Sabor"
      />
      <input
        required
        name="preco"
        id="preco"
        type="number"
        placeholder="Preço"
      />
      <input
        required
        name="descricao"
        id="descricao"
        type="text"
        placeholder="Descrição"
      />
      <input
        required
        name="foto"
        id="foto"
        type="text"
        placeholder="Foto"
      />
      <button onclick="editarPaleta('${id}')">Editar</button>
    `;

  const paleta = savePaletas.find((elemento) => elemento._id === id);

  document.getElementById("modalTitulo").innerText = paleta.sabor;
  document.getElementById("sabor").value = paleta.sabor;
  document.getElementById("preco").value = paleta.preco;
  document.getElementById("descricao").value = paleta.descricao;
  document.getElementById("foto").value = paleta.foto;
};
const criarPaleta = async () => {
  const sabor = document.getElementById("sabor").value;
  const preco = document.getElementById("preco").value;
  const descricao = document.getElementById("descricao").value;
  const foto = document.getElementById("foto").value;

  const paleta = savePaletas.find((elemento) => elemento.sabor === sabor);

  if (paleta) {
    alert("Paleta ja existe");
    window.location.reload();
  } else {
    await createPaleta(sabor, descricao, foto, preco);
    window.location.reload();
  }
};
const modalCriar = () => {
  document.getElementById("absolute").style.display = "flex";
  document.getElementById("modalForm").innerHTML = `
    <img onclick="fechaModal()" src="./assets/icons/remove.png" alt="" />
      <h2>Criar Paleta</h2>
      <input
        required
        name="sabor"
        id="sabor"
        type="text"
        placeholder="Sabor"
      />
      <input
        required
        name="preco"
        id="preco"
        type="number"
        placeholder="Preço"
      />
      <input
        required
        name="descricao"
        id="descricao"
        type="text"
        placeholder="Descrição"
      />
      <input
        required
        name="foto"
        id="foto"
        type="text"
        placeholder="Foto"
      />
      <button onclick="criarPaleta()">Criar</button>
    `;
};
const fechaModal = () => {
  document.getElementById("absolute").style.display = "none";
};
showPaletas();
