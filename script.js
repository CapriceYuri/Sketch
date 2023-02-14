const grid = document.querySelector('.grid')
const rangeValue = document.querySelector('#rangeValue');
const rangeNum = document.querySelector('#rangeNum');
const refreshBtn = document.querySelector('.refresh');
const colorCustom = document.querySelector('.color-custom')
const colorBlack = document.querySelector('.color-black');
const colorRainbow = document.querySelector('.color-rainbow');
const colorWhiteout = document.querySelector('.color-whiteout')
const customize = document.querySelector('#customize')

rangeNum.onmousemove = (e) => updateSizeValue(e.target.value)
rangeNum.onchange = (e) => changeSize(e.target.value)
colorCustom.onclick = () => setCurrentMode('custom');
colorBlack.onclick = () => setCurrentMode('black')
colorRainbow.onclick = () => setCurrentMode('rainbow')
colorWhiteout.onclick = () => setCurrentMode('whiteout')

let currentMode = 'black';


function setCurrentMode(value){
    activeMode(value)
    currentMode = value;
}

function activeMode(value){
    if (currentMode === 'rainbow'){
        colorRainbow.classList.remove('active')
    } else if (currentMode === 'black'){
        colorBlack.classList.remove('active')
    } else if (currentMode === 'whiteout'){
        colorWhiteout.classList.remove('active')
    } else if (currentMode === 'custom'){
        colorCustom.classList.remove('active')
        customize.style.visibility = 'hidden'
    }

    if (value === 'rainbow'){
        colorRainbow.classList.add('active')
    } else if (value === 'black'){
        colorBlack.classList.add("active")
    } else if (value === 'whiteout'){
        colorWhiteout.classList.add("active")
    } else if (value === 'custom'){
        colorCustom.classList.add("active")
        customize.style.visibility = 'visible'
    }
}

window.onload = function () {
    createBoard(rangeNum.value)
}

function updateSizeValue(value) {
    rangeValue.innerHTML = `${value} x ${value}`
}

function changeSize(value) {
    reloadBoard()
    createBoard(value)
}

let mousedown = false;
document.body.onmousedown = () => (mousedown = true);
document.body.onmouseup = () => (mousedown = false)

function changeColor(e) {
    if (e.type === 'mouseover' && !mousedown) return
    if (currentMode === 'black'){
        e.target.style.backgroundColor = 'black';
    } else if(currentMode === 'rainbow'){
        e.target.style.backgroundColor = `rgb(${Math.random()*256}, ${Math.random()*256}, ${Math.random()*256})`;
    } else if (currentMode === 'whiteout'){
        e.target.style.backgroundColor = 'white';
    } else if (currentMode === 'custom'){
        e.target.style.backgroundColor = customize.value;
    }
}

function createBoard(x) {
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = `repeat(${x}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${x}, 1fr)`;

    for (let i = 0; i < x * x; i++) {
        let divs = document.createElement('div');
        grid.appendChild(divs)
        divs.addEventListener('mousedown', changeColor)
        divs.addEventListener('mouseover', changeColor)
    }
}

function reloadBoard() {
    grid.innerHTML = ''
}

refreshBtn.addEventListener('click', () => {
    changeSize(rangeNum.value)
})

