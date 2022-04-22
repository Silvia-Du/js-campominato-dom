const main = document.getElementById('sd-main');

document.getElementById('btn-start').addEventListener( 'click', initGame );

function initGame(){

  main.innerHTML = '';

  const levelChoice = document.getElementById('level-choice').value;
  const level = [100, 81, 49];
  const boxNumber = level[levelChoice];

  createGameArea(boxNumber);

}


//FUNZIONE CREA GAME AREA
function createGameArea(boxNumber){

  const gameArea = document.createElement('div');
  gameArea.className = 'sd-game-area';
  main.append(gameArea);

  //richiamo qui la funzione boxPrinter
  boxPrinter(boxNumber, gameArea);

  return gameArea;
}


//FUNZIONE CREA BOX
/**
 * crea un'elemnto div-box e lo mette in un contenitore
 * @param {string} htmlElement 
 * @param {number} num 
 * @returns 
 */
 function createBoxElement(boxNumber, htmlElement){

  const box = document.createElement('div');
  box.className = 'sd-box';
  const boxXRow = Math.sqrt( boxNumber );
  console.log(boxXRow);
  const boxSize = `calc( 100% / ${boxXRow})`;
  box.style.width = boxSize;
  box.style.height = boxSize;
  htmlElement.append(box);
  
  return box;
}


//funzione STAMPA
/**
 * stampa in pagina tot box, in una certa size in un contenitore 
 * @param {number} parametroN 
 * @param {string} placeInHtml 
 * @param {number} parameterSize 
 */
 function boxPrinter(boxNumber, htmlElement){
  
  for( let i = 1; i <= boxNumber; i++ ){
    
    //richiamo qui la funz creaBox
    const boxEr = createBoxElement(boxNumber, htmlElement);
    boxEr.innerHTML = `<span>${i}</span>`;

    console.log(boxEr);
    //evento click
    boxEr.addEventListener('click', function(){
      this.classList.add('check');

    })
  }
}