const corpoTabelaBusca = document.getElementById("tblListagemBody");

const id = document.getElementById("livroID");
const titulo = document.getElementById("livroTitulo");
const ano = document.getElementById("livroAno");
const inputBuscarTitulo = document.getElementById("inputBuscarTitulo");

let mensagemBusca = document.getElementById("parResultadoBusca");
let livro;
let listaLivros = [];

function efetuarCadastroLivro() {
    livro = criarLivro(id.value, titulo.value, ano.value);

    listaLivros.push(livro);
    incluirLivroTabelaResultadoBusca();
    apagarCamposHTMLDadosLivro();
}

function criarLivro(umId, umTitulo, umAno) {
    const objetoLivro = {
        id: Number(umId),
        titulo: umTitulo,
        ano: umAno,
    };

    return objetoLivro;
}

function incluirLivroTabelaResultadoBusca() {
    const novaLinha = criarNovaLinha();
    corpoTabelaBusca.appendChild(novaLinha);
}

function criarNovaLinha() {
    const novaLinha = document.createElement("tr");
    novaLinha.id = livro.id;

    novaLinha.innerHTML = `
        <td>${livro.id}</td>
        <td>${livro.titulo}</td>
        <td>${livro.ano}</td>
        <td>
            <button class="deleteButton" type="button" onclick="apagarLivroEventHandler(${livro.id})">
                Apagar
            </button>
        </td>
    `;

    return novaLinha;
}

function apagarLivroEventHandler(livroId) {
    if (confirm("Deseja realmente apagar o livro da tabela?")) {
        apagarLivroDoArray(livroId);
        apagarLivroDaTabela(livroId);
    }
}

function apagarLivroDoArray(livroId) {
    const posicao = listaLivros.findIndex((cadaLivro) => cadaLivro.id === livroId);

    if (posicao > -1) {
        listaLivros.splice(posicao, 1);
    }
}

function apagarLivroDaTabela(livroId) {
    const linha = document.getElementById(String(livroId));

    if (linha) {
        linha.remove();
    }
}

function apagarCamposHTMLDadosLivro() {
    id.value = "";
    titulo.value = "";
    ano.value = "";
}

function processarBuscaLivroPorTitulo() {
    const tituloDesejado = inputBuscarTitulo.value.toLowerCase();

    const livroRetornado = buscarLivroNaListaPor(tituloDesejado);

    mostrarMensagemResultadoBusca(livroRetornado);
    apagarCampoHTMLBuscaTitulo();
}

function buscarLivroNaListaPor(titulo) {
    let umLivro = null;

    if (titulo) {
        umLivro = listaLivros.find((cadaLivro) =>
            cadaLivro.titulo.toLowerCase().includes(titulo)
        );
    }

    return umLivro;
}

function mostrarMensagemResultadoBusca(livro) {
    if (livro != null) {
        mensagemBusca.innerHTML = `
            <strong>Livro encontrado:</strong><br>
            Livro ID: ${livro.id}<br>
            Titulo: ${livro.titulo}<br>
            Ano de Publicacao: ${livro.ano}
        `;
    } else {
        mensagemBusca.textContent = "Nenhum livro encontrado.";
    }
}

function apagarCampoHTMLBuscaTitulo() {
    inputBuscarTitulo.value = "";
}