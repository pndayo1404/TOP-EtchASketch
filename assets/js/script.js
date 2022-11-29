let slider = document.querySelector('.slider'); //Create slider and change slider value on mousemove
let sliderValue = document.querySelectorAll('.sliderValue');
let gridSize = slider.value;

const container = document.querySelector('.container'); 
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
function changeColor(e){
    // console.log(mousedown);
    if (e.type == 'mouseover' && !mousedown) return;
    e.target.classList.add('drawed');
}

function resetButton(){
    const resetBtn = document.querySelector('.reset');
    const gridBoard = document.querySelectorAll('.gridBlock');
    resetBtn.addEventListener('click', function(e){
        gridBoard.forEach(grid => grid.classList.remove('drawed'));
    })
}
resetButton();

