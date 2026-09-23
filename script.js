const toggleButton = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');

const mainPage = document.getElementById('mainpage')
const cenas = {
    home: `<div class="container">
            <h2>Bem-vindo a Lumi!</h2>
            <p>Seu app favorito para matérias e tarefas!</p>
        </div>
       <div class="home-grid">
            <div class="container home-card">
                <h2>Materias</h2>
                <p id="conteudo-materias-main">Materias:</p>
            </div>
            <div class="container home-card">
                <h2>Tarefas</h2>
                <p id="conteudo-tarefas-main">Tarefas: nenhuma</p>
            </div>
       </div>
       <div class="container">
            <h2>Flashcard</h2>
       </div>`,
    pomodoro: `<div id="pomodoro">
            <h2>Pomodoro</h2>
            <p class="relogio" id="tempo-mostrado">25:00</p>
            <div>
                <button id="botao-iniciar" onclick="iniciarOuPausar()">Iniciar</button>
                <button onclick="reiniciarCronometro()">Reset</button>
            </div>
        </div>`,
    materias: `<div class="container">
            <h2>Materias</h2>
            <form id="form-materia">
                <input type="text" id="input-materia"
                placeholder="Ex: Materia aqui">
                <button type="submit" class="botaoPrimario">Adicionar</button>
            </form>
            <div id="lista-materias">
            </div>
        </div>`,
    tarefas: `<div class="container">
            <h2>Tarefas</h2>
            <form id="form-tarefa">
                <input type="text" id="input-tarefa"
                placeholder="Ex: Estudar capitulo 1">
                <select id="select-categoria-tarefa">
                    <option value="">Sem categoria</option>
                </select>
                <button type="submit" class="botaoPrimario">Adicionar</button>
            </form>
            <div id="filtro-categorias"></div>
            <div id="lista-tarefas"></div>
        </div>`,
    flashcards: `<div class="container">
                    <h2>Flashcards</h2>
                    <form id="form-flashcard">
                    <input type="text" id="input-frente"
                    placeholder="Frente (pergunta)">
                    <input type="text" id="input-verso"
                    placeholder="Verso (resposta)">
                    <select id="select-categoria-flashcard">
                        <option value="">Sem categoria</option>
                    </select>
                    <button type="submit" class="botaoPrimario">
                        adicionar cartao
                    </button>
                    </form>
                    
                    <div id="area-flashcard">
                        <div id="cartao-flashcard" onclick="virarFlashcard()">
                            <p id="texto-flashcard">Nenhum cartão ainda</p>
                        </div>
                        <div id="navegacao-flashcard">
                            <button type="button" onclick="cartaoAnterior()">Anterior</button>
                            <span id="contador-flashcard"></span>
                            <button type="button" onclick="proximoCartao()">Próximo</button>
                        </div>
                    <button type="button" id="botao-excluir-flashcard" onclick="removerFlashcardAtual()">Excluir este cartão</button>
                    </div>
                </div>`,
    creditos: `<div class="container">
            <div class="container-dev">
                <img src="https://github.com/NormyNaoExiste.png" class="photo">
                <div>
                    <a href="https://github.com/NormyNaoExiste/"><h2>Davi Felipe</h2>
                    <p>Desenvolvedor front-end</p></a>
                </div>
            </div>
            <div class="container-dev">
                <img src="https://github.com/Danielle-sys-tech.png" class="photo">
                <div>
                    <h2>Danielle Heloisa</h2>
                    <p>Desenvolvedora mobile</p>
                </div>
            </div>
            <div class="container-dev">
                <img src="https://github.com/leoMnZs.png" class="photo">
                <div>
                    <h2>Leonador Menezes</h2>
                    <p>Desenvolvedor mobile</p>
                </div>
            </div>
        </div>`
}

function toggleSidebar(){
    sidebar.classList.toggle('close')
    toggleButton.classList.toggle('rotate')

    Array.from(sidebar.getElementsByClassName('show')).forEach( ul =>{
        ul.classList.remove('show')
        ul.previousElementSibling.classList.remove('rotate')
    })
}

function toggleSubMenu(button){
    button.nextElementSibling.classList.toggle('show')
    button.classList.toggle('rotate')

    if(sidebar.classList.contains('close')){
        sidebar.classList.toggle('close')
        toggleButton.classList.toggle('rotate')
    }
}

function changeScene(sceneName){
    if(cenas[sceneName]){
        mainPage.innerHTML = cenas[sceneName]

        if(sceneName == 'home'){
            const txtHomeMaterias = document.getElementById("conteudo-materias-main")
            const txtHomeTarefas = document.getElementById("conteudo-tarefas-main")
            txtHomeMaterias.innerText = `Materias: ${materias}`
            txtHomeTarefas.innerText = `Tarefas: ${tarefas.length}`
        }
        if(sceneName == 'pomodoro'){
            atualizarTelaDoTempo();
            document.getElementById('botao-iniciar').textContent = cronometroLigado ? "Pausar":"Iniciar";
        }
        if(sceneName == 'materias'){
            mostrarMateria();
        }
        if(sceneName == 'tarefas'){
            prencherSelectCategorias();
            mostrarTarefas();
        }
        if(sceneName == 'flashcards'){
            preencherSelectFlashcards();
            mostrarFlashcard();
        }
    } else{
        alert(`cena ${sceneName} não existe`)
    }
}

function toggleActive(clicado){
    const activeLink = clicado.closest('li')
    const todosLinks = document.querySelectorAll("li")

    todosLinks.forEach(li => li.classList.remove("active"))
    activeLink.classList.add("active")

    const parentLink = activeLink.closest("ul.sub-menu")?.closest('li')
    if(parentLink){
        parentLink.classList.add("active")
    }
}

//materias

let materias = [];

const formMateria = document.getElementById("form-materia");

document.addEventListener("submit", (e)=>{
    if(e.target.id !== "form-materia"){
        return;
    }
    e.preventDefault();

    const campo = document.getElementById("input-materia");
    const texto = campo.value.trim()

    if(texto == "") return;

    materias.push(texto);
    campo.value = "";
    mostrarMateria();
})

function mostrarMateria(){
    const container = document.getElementById("lista-materias");
    container.innerHTML = ""

    materias.forEach((nome, indice)=>{
        const cartao = document.createElement("div");
        cartao.className = "cartao";
        cartao.innerHTML = nome + '<button onclick="removerMateria(' + indice +' )">x</button>';
        container.appendChild(cartao);
    });
}

function removerMateria(indice){
    materias.splice(indice, 1);
    mostrarMateria();
}

//pomodoro - peguei de outro projeto
let segundosRestantes = 25 * 60;
let cronometroLigado = false;
let intervaloDoTimer = null;

function atualizarTelaDoTempo(){
    const minutos = Math.floor(segundosRestantes / 60);
    const segundos = segundosRestantes % 60;
    const minutosTexto = String(minutos).padStart(2, "0");
    const segundosTexto = String(segundos).padStart(2, "0");
    document.getElementById("tempo-mostrado").textContent = minutosTexto + ":" + segundosTexto;

};

function iniciarOuPausar(){
    const botao = document.getElementById("botao-iniciar");

    if(cronometroLigado){
        clearInterval(intervaloDoTimer);
        cronometroLigado = false;
        botao.textContent = "Continuar"
    } else{
        cronometroLigado = true;
        botao.textContent = "Pausar"

        intervaloDoTimer = setInterval(function (){
            segundosRestantes = segundosRestantes - 1;

            if(segundosRestantes <= 0){
                clearInterval(intervaloDoTimer)
                cronometroLigado = false;
                botao.textContent = "Iniciar"
                alert("Terminou o tempo");
            }

            atualizarTelaDoTempo();
        }, 1000);
    };
};

function reiniciarCronometro(){
    clearInterval(intervaloDoTimer);
    cronometroLigado = false;
    segundosRestantes = 25 * 60;
    document.getElementById("botao-iniciar").textContent = "Iniciar";
    atualizarTelaDoTempo();
}

//tarefas

let tarefas = []
let filtroCategoriaAtual = ""

function prencherSelectCategorias(){
    const select = document.getElementById("select-categoria-tarefa");
    if(!select) return;

    select.innerHTML = `<option value="">Sem categoria</option>`;

    materias.forEach((materia)=>{
        const opcao = document.createElement("option");
        opcao.value = materia
        opcao.textContent = materia
        select.appendChild(opcao)
    })
}

document.addEventListener("submit", (e) =>{
    if(e.target.id !== "form-tarefa"){
        return
    }
    e.preventDefault()

    const campoTexto = document.getElementById('input-tarefa');
    const campoCategoria = document.getElementById('select-categoria-tarefa');

    const texto = campoTexto.value.trim()
    const categoria = campoCategoria.value;

    if(texto === "") return;

    tarefas.push({
        id: Date.now(),
        texto: texto,
        categoria: categoria
    });

    campoTexto.value = "";
    mostrarTarefas()
})

function mostrarFiltroCategorias(){
    const container = document.getElementById('filtro-categorias');
    if(!container) return;

    container.innerHTML = '';

    const categorisaUsadas = tarefas.map(t => t.categoria || "sem categoria");
    const categoriasUnicas = ["Todas", ...new Set(categorisaUsadas)]

    categoriasUnicas.forEach((categoria) =>{
        const botao = document.createElement("button")
        botao.type = "button"
        botao.className = "botao-filtro";
        botao.textContent = categoria;

        const estaoAtivo = (categoria === "Todas" && filtroCategoriaAtual === "") || categoria === filtroCategoriaAtual;
        if(estaoAtivo){
            botao.classList.add("ativo");
        }

        botao.onclick = () => {
            filtroCategoriaAtual = categoria === "Todas" ? "": categoria;
            mostrarTarefas()
        }

        container.appendChild(botao);
    })
}

function mostrarTarefas(){
    mostrarFiltroCategorias();

    const container = document.getElementById("lista-tarefas");
    if(!container) return;

    container.innerHTML = ""

    const tarefasFiltradas = filtroCategoriaAtual === "" ? tarefas: tarefas.filter(t=>(t.categoria || "sem categoria") === filtroCategoriaAtual)

    if(tarefasFiltradas.length === 0){
        container.innerHTML = "<p>sem tarefa</p>"
        return
    }

    tarefasFiltradas.forEach((tarefa)=>{
        const categoriaTexto = tarefa.categoria || "sem categoria"

        const cartao = document.createElement("div");
        cartao.className = "cartao-tarefa";
        cartao.innerHTML = `<div class="info-tarefa">
                                <span class="categoria-tag">
                                    ${categoriaTexto}
                                </span>
                                <p>${tarefa.texto}</p>
                                </div>
                            <button onclick="removerTarefa(${tarefa.id})">x</button>`;

                            container.appendChild(cartao);
        
    })

}
function removerTarefa(id){
    tarefas = tarefas.filter(t => t.id !== id);
    mostrarTarefas();
}

//Flashcards

let flashcards = []
let indiceFlashcardAtual = 0
let flashcardVirado = false;

document.addEventListener("submit" ,(e) =>{
    if(e.target.id !== "form-flashcard"){
        return
    }
    e.preventDefault();

    const campoFrente = document.getElementById("input-frente");
    const campoVerso = document.getElementById("input-verso");
    const campoCategoria = document.getElementById("select-categoria-flashcard");

    const frente = campoFrente.value.trim();
    const verso = campoVerso.value.trim();
    const categoria = campoCategoria.value;

    if(frente === "" || verso === "") return;

    flashcards.push({
        id:Date.now(),
        frente: frente,
        verso: verso,
        categoria: categoria
    })

    campoFrente.value = ""
    campoVerso.value = "";

    indiceFlashcardAtual = flashcards.length - 1;
    flashcardVirado = false;
    mostrarFlashcard();
})

function mostrarFlashcard(){
    const textoEl = document.getElementById('texto-flashcard');
    const contadorEl = document.getElementById('contador-flashcard');
    const excluirBtn = document.getElementById('botao-excluir-flashcard');
    
    if(!textoEl || !contadorEl) return;

    if(flashcards.length === 0){
        textoEl.textContent = "Nenhum cartão ainda";
        contadorEl.textContent = "";
        if(excluirBtn) excluirBtn.style.display = "none";
        return
    }

    if(excluirBtn) excluirBtn.style.display = "inline-block";

    const cartaoAtual = flashcards[indiceFlashcardAtual];
    textoEl.textContent = flashcardVirado ? cartaoAtual.verso : cartaoAtual.frente;
    contadorEl.textContent = (indiceFlashcardAtual + 1) + " / " + flashcards.length;
}

function preencherSelectFlashcards(){
    const select = document.getElementById('select-categoria-flashcard');
    if(!select) return;

    select.innerHTML = `<option value=""> Sem categoria </option>`;

    materias.forEach((materia)=>{
        const opcao = document.createElement("option");
        opcao.value = materia
        opcao.textContent = materia
        select.appendChild(opcao)
    })
}

function virarFlashcard(){
    if(flashcards.length === 0) return;
    flashcardVirado = !flashcardVirado;
    document.getElementById("cartao-flashcard").classList.toggle("virado")
    mostrarFlashcard();
}

function cartaoAnterior(){
    if(flashcards.length === 0) return
    indiceFlashcardAtual = (indiceFlashcardAtual - 1 + flashcards.length) % flashcards.length;
    flashcardVirado = false;
    mostrarFlashcard();
}

function proximoCartao(){
    if(flashcards.length === 0) return
    indiceFlashcardAtual = (indiceFlashcardAtual + 1) % flashcards.length;
    flashcardVirado = false;
    mostrarFlashcard();
}

function removerFlashcardAtual(){
    if(flashcards.length === 0) return;

    flashcards.splice(indiceFlashcardAtual, 1);

    if(indiceFlashcardAtual >= flashcards.length){
        indiceFlashcardAtual = Math.max(0, flashcards.length - 1);
    }

    flashcardVirado = false;
    mostrarFlashcard();
}




//mudar o tema

function trocarTema(){
    document.body.classList.toggle('light-theme');
    const temaAtual = document.body.classList.contains('light-theme') ?
    'light' : 'dark';
    localStorage.setItem('tema', temaAtual);
}

function carregarTema(){
    const temaSalvo = localStorage.getItem('tema')
    if(temaSalvo === 'light'){
        document.body.classList.add('light-theme')
    }
}