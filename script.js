const toggleButton = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');

const mainPage = document.getElementById('mainpage')
const cenas = {
    home: `<div class="container">
            <h2>Lorem</h2>
            <p>Paragrafo</p>
        </div>
        <div class="container">
            <h2>Lorem</h2>
            <p>Paragrafo</p>
        </div>
        <div class="container">
            <h2>Lorem</h2>
            <p>Paragrafo</p>
        </div>`,
    pomodoro: `<div id="pomodoro">
            <h2>Pomodoro</h2>
            <p class="relogio">25:00</p>
            <div>
                <button>Iniciar</button>
                <button>Reset</button>
            </div>
        </div>`,
    materias: `<div class="container">
            <h2>Materias</h2>
            <p>Aqui fica as materias</p>
        </div>`,
    tarefas: `<div class="container">
            <h2>Tarefas</h2>
            <p>Aqui fica as tarefas</p>
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