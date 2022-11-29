let slider = document.querySelector('.slider'); //Create slider and change slider value on mousemove
let sliderValue = document.querySelectorAll('.sliderValue');
let gridSize = slider.value;

const container = document.querySelector('.container'); 
createGridBoard(gridSize);
slider.addEventListener('input', function(e){
    sliderValue.forEach(textValue => textValue.textContent = slider.value);
    gridSize = slider.value;
    deleteGridBoard();  
    createGridBoard(gridSize);  
})
let mousedown = false;
document.body.addEventListener("mousedown", () => (mousedown = true));
document.body.addEventListener("mouseup", () => (mousedown = false));

resetButton();

const rainbowBtn = document.querySelector('.rainbow');
rainbowBtn.addEventListener('click', toggleRainbow);

function createGridBoard(gridSize){
    for (let i = 0; i < gridSize; i++){
        let divRow = document.createElement('div');
        divRow.style.display = 'flex';
        for (let j = 0; j < gridSize; j++){
            let div = document.createElement('div');
            div.setAttribute('style', `height: calc(600px/${gridSize}); width: calc(600px/${gridSize}); border: solid black 0.3px;`);
            div.classList.add('gridBlock');
            divRow.appendChild(div);
            div.addEventListener('mousedown', changeColor);
            div.addEventListener('mouseover', changeColor);
        }
        container.appendChild(divRow);
    }
    resetButton();  
}

function deleteGridBoard(){
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
}

function changeColor(e){
    // console.log(mousedown);
    if (e.type == 'mouseover' && !mousedown) return;
    if (rainbowBtn.classList.contains('rainbowOn')) {
        let red = Math.ceil(Math.random()*256);
        let green = Math.ceil(Math.random()*256);
        let blue = Math.ceil(Math.random()*256);
        e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    }
    else e.target.style.backgroundColor = 'black';
}

function resetButton(){
    const resetBtn = document.querySelector('.reset');
    const gridBoard = document.querySelectorAll('.gridBlock');
    resetBtn.addEventListener('click', function(e){
        gridBoard.forEach(grid => grid.style.backgroundColor = 'white');
    })
}

function toggleRainbow(){
    rainbowBtn.classList.toggle('rainbowOn');
    (rainbowBtn.classList.contains('rainbowOn'))?
    rainbowBtn.textContent = "Rainbow: On" :
    rainbowBtn.textContent = "Rainbow: Off";
}