const slider = document.querySelector('.slider'); //Create slider and change slider value on mousemove
const sliderValue = document.querySelectorAll('.sliderValue');
let gridSize = slider.value;
let count = 0;

let mousedown = false; //Logic to simulate mouse holding action
document.body.addEventListener("mousedown", () => (mousedown = true));
document.body.addEventListener("mouseup", () => (mousedown = false));

const container = document.querySelector('.container'); //Create the first grid board
const rainbowBtn = document.querySelector('.rainbow'); //Rainbow button
const gridBtn = document.querySelector('.grid'); //Grid button
const resetBtn = document.querySelector('.reset'); //Reset button


createGridBoard(gridSize);
let gridBoard = document.querySelectorAll('.gridBlock'); //Select all grid blocks
slider.addEventListener('input', function(e){
    sliderValue.forEach(textValue => textValue.textContent = slider.value);
    gridSize = slider.value;
    deleteGridBoard();  
    gridBoard = createGridBoard(gridSize);  
})

rainbowBtn.addEventListener('click', toggleRainbow);
gridBtn.addEventListener('click', toggleGrid);
resetBtn.addEventListener('click', toggleReset);

function createGridBoard(gridSize){ //Create grid board with range slider value
    for (let i = 0; i < gridSize; i++){
        let divRow = document.createElement('div');
        divRow.style.display = 'flex';
        for (let j = 0; j < gridSize; j++){
            let div = document.createElement('div');
            div.setAttribute('style', `height: calc(600px/${gridSize}); width: calc(600px/${gridSize});`);
            div.classList.add('gridBlock');
            if (gridBtn.classList.contains('gridOn')){
                div.style.border = 'solid black 0.3px';
            }
            else{
                div.style.border = 'none';
            }
            divRow.appendChild(div);
            div.addEventListener('mousedown', changeColor);
            div.addEventListener('mouseover', changeColor);
        }
        container.appendChild(divRow);
    }
    let gridBoard = document.querySelectorAll('.gridBlock');
    return gridBoard;
}

function deleteGridBoard(){ //Delete grid board with function found on stackoverflow
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
}

function getColor(count, e){ //Color get 10% darker every time a grid is drawed
    let red = Math.ceil(Math.random()*256) - count*25.5; if (red < 0) red = 0;
    let green = Math.ceil(Math.random()*256) - count*25.5; if (green < 0) green = 0;
    let blue = Math.ceil(Math.random()*256) - count*25.5; if (blue < 0) blue = 0;
    e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}
function changeColor(e){
    if (e.type == 'mouseover' && !mousedown) return; //Logic to draw while mouse down
    if (rainbowBtn.classList.contains('rainbowOn')) { //Rainbow logic
        getColor(count, e);
        count += 1;
        if (count == 10) count = 0;
    }
    else e.target.style.backgroundColor = 'black';
}

function toggleReset(){ //Toggle reset button
    gridBoard.forEach(grid => grid.style.backgroundColor = 'white');
    count = 0;
}

function toggleRainbow(){ //Toggle rainbow button
    rainbowBtn.classList.toggle('rainbowOn');
    (rainbowBtn.classList.contains('rainbowOn'))?
    rainbowBtn.textContent = "Rainbow: On" :
    rainbowBtn.textContent = "Rainbow: Off";
}

function toggleGrid(){ //Toggle grid button
    gridBtn.classList.toggle('gridOn');
    if (gridBtn.classList.contains('gridOn')){
        gridBoard.forEach(grid => grid.style.border = 'solid black 0.3px');
        gridBtn.textContent = "Grid: On";
    }
    else{
        gridBoard.forEach(grid => grid.style.border = 'none');
        gridBtn.textContent = "Grid: Off";
    }
}

