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
            </div>
            <div class="container home-card">
                <h2>Tarefas</h2>
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
                placeholder="Ex:materia aqui">
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
            <p>Aqui fica os flashcards</p>
        </div>`,
    creditos: `<div class="container">
            <div class="container-dev">
                <img src="photos/aspanLogo.webp" class="photo">
                <div>
                    <h2>Davi Felipe</h2>
                    <p>Desenvolvedor front-end</p>
                </div>
            </div>
            <div class="container-dev">
                <img src="photos/aspanLogo.webp" class="photo">
                <div>
                    <h2>Danielle Heloisa</h2>
                    <p>Desenvolvedora mobile</p>
                </div>
            </div>
            <div class="container-dev">
                <img src="photos/aspanLogo.webp" class="photo">
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

        if(sceneName == 'pomodoro'){
            atualizarTelaDoTempo();
            document.getElementById('botao-iniciar').textContent = cronometroLigado ? "Pausar":"Iniciar";
        }
        if(sceneName == 'materias'){
            mostrarMateria();
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

document.addEventListener("submit", (e) =>{
    if(e.target.id !== "form-materia"){
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
})

function mostrarFiltroCategorias(){
    const container = document.getElementById('filtro-categorias');
    if(!container) return;

    container.innerHTML = '';

    const categorisaUsadas = tarefas.map(t => t.categoria || "sem categoria");
    const categoriasUnicas = ["Todas", new Set(categorisaUsadas)]

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
        const categoriaTesxto = tarefa.categoria || "sem categoria"

        const cartao = document.createElement("div");
        cartao.className = "cartao-tarefa";
        cartao.innerHTML = `<>`
    })
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