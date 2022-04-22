// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
// **BONUS:**
// 1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
// ****2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste

// ****Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi.
// Ad esempio:

//cliccando su una bomba,  accendere i dannati box, tutte le bombe, tutti gli altri azzurri;


const totBomb = 16;
let clickCounter = 0;
let magazzinoBomb =[];
let magazinoBox = [];

const layoverMessage = document.querySelector('.end-message');
console.log(layoverMessage);
const main = document.getElementById('sd-main');

document.getElementById('btn-start').addEventListener( 'click', initGame );

function initGame(){

  main.innerHTML = '';
  magazzinoBomb =[];

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
  
  const bombList = uniqueRandomNum( totBomb, boxNumber );

  for( let i = 1; i <= boxNumber; i++ ){
    
    //richiamo qui la funz creaBox
    const boxEr = createBoxElement(boxNumber, htmlElement);
    boxEr.innerHTML = `<span>${i}</span>`;
    boxEr.iD = i;
    magazinoBox.push(boxEr.iD);

    //richiamo qui la funzione click/bomb;
    checkBomb( bombList, boxEr , htmlElement );
  }
  console.log('magazino----->',magazinoBox);
  console.log('magazion bombe ',bombList);

}

//




//funzione CLICK/BOMB
function checkBomb( bombList, boxEr , htmlElement){


  boxEr.addEventListener('click', function(){
    //click counter
    clickCounter ++;
    console.log(clickCounter);

    if(bombList.includes(boxEr.iD)){

      this.classList.add('bomb');
      boxEr.innerHTML = 'Boom!';
      endGame(htmlElement , boxEr , bombList);

    }else{
      this.classList.add('check');
    }
  });
}


//END GAME FUNCTION
function endGame(htmlElement, boxEr , bombList){
  htmlElement.classList.add('pe-none');
  
  if(bombList.includes(boxEr.iD)){
    boxEr.classList.add('bomb');
    console.log('rossi', boxEr);
  }else{
    boxEr.classList.add('check');
    console.log('azzurri', boxEr);
  }
  


}


//generatore numero univoco
let estractNumber;
let selected;

function uniqueRandomNum( number, boxNumber ){

  for( let i = 0; i< number; i++ ){
    let check = false;
  
    while(!check){
      estractNumber = randomNum(1, boxNumber);

      if(!magazzinoBomb.includes(estractNumber)){
        check = true;
        magazzinoBomb.push(estractNumber);
        selected = estractNumber;
      }
    }
  
  }
  return magazzinoBomb;

}


//genera Numeri Random
function randomNum( min , max ){
  return Math.floor(Math.random() * (max - min +1) + min);
}

