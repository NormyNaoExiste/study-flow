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
    pomodoro: `<div class="container">
            <h2>Pomodoro</h2>
            <p>25:00</p>
        </div>`,
    materias: `<div class="container">
            <h2>Materias</h2>
            <p>Aqui fica as materias</p>
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