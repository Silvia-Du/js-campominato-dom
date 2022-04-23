
// ****2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste

//cliccando su una bomba,  accendere i dannati box, tutte le bombe;


const totBomb = 16;
let clickCounter = 0;
let magazzinoBomb =[];

const layoverMessage = document.querySelector('.end-message');
const outputMessage = document.getElementById('output-counter');
const main = document.getElementById('sd-main');

//al click inizia il gioco
document.getElementById('btn-start').addEventListener( 'click', initGame );

//FUNZIONE DI INIZIO GIOCO
function initGame(){

  main.innerHTML = '';
  magazzinoBomb =[];
  clickCounter = 0;

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
  
  const bombList = uniqueRandomNum( totBomb, boxNumber ); //questo è un'array

  for( let i = 1; i <= boxNumber; i++ ){
    
    //richiamo qui la funz creaBox
    const boxEr = createBoxElement(boxNumber, htmlElement);
    boxEr.innerHTML = `<span>${i}</span>`;
    boxEr.iD = i;

    //richiamo qui la funzione click/bomb;
    checkBomb( bombList, boxEr , htmlElement );
  }

  console.log('magazion bombe ',bombList);

}

//


//funzione CLICK/BOMB
function checkBomb(bombList, boxEr, htmlElement ){

  boxEr.addEventListener('click', function(){
    //click counter
    clickCounter ++;
    console.log( clickCounter) ;

    endGame(bombList, boxEr, htmlElement);
  });

}


//END GAME FUNCTION
function endGame(bombList, boxEr, htmlElement){
  
  if(bombList.includes(boxEr.iD)){

    boxEr.classList.add('bomb');
    boxEr.innerHTML = 'Boom!';
    htmlElement.classList.add('pe-none');
    layoverMessage.classList.add('block');
    outputMessage.innerHTML = `Hai perso con ${clickCounter} click!!!`
  }else{

    boxEr.classList.add('check');
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

// var audio = new Audio('sound/lose.wav');   audio.play();

