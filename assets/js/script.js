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

// resetButton();

const rainbowBtn = document.querySelector('.rainbow');
const resetBtn = document.querySelector('.reset');
const gridBoard = document.querySelectorAll('.gridBlock');
rainbowBtn.addEventListener('click', toggleRainbow);
resetBtn.addEventListener('click', resetButton);
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
    // resetButton();  
}

function deleteGridBoard(){
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
}
let count = 0;
function getColor(count, e){ //Color get 10% darker every time a grid is drawed
    let red = Math.ceil(Math.random()*256) - count*25.5; if (red < 0) red = 0;
    let green = Math.ceil(Math.random()*256) - count*25.5; if (green < 0) green = 0;
    let blue = Math.ceil(Math.random()*256) - count*25.5; if (blue < 0) blue = 0;
    e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    console.log(red);
    console.log(green);
    console.log(blue);
}
function changeColor(e){
    if (e.type == 'mouseover' && !mousedown) return; //Logic to draw while mouse down
    if (rainbowBtn.classList.contains('rainbowOn')) { //Rainbow logic
        getColor(count, e);
        count += 1;
        if (count == 10) count = 0;
        console.log(count);
    }
    else e.target.style.backgroundColor = 'black';
}

function resetButton(){
    gridBoard.forEach(grid => grid.style.backgroundColor = 'white');
    count = 0;
}

function toggleRainbow(){
    rainbowBtn.classList.toggle('rainbowOn');
    (rainbowBtn.classList.contains('rainbowOn'))?
    rainbowBtn.textContent = "Rainbow: On" :
    rainbowBtn.textContent = "Rainbow: Off";
}