
const totBomb = 16;
let clickCounter = 0;
let containerBombNum =[];
let elementBombList = [];

const outputMessage = document.getElementById('output-counter');
const main = document.getElementById('sd-main');
const btnStart = document.getElementById('btn-start');

//al click inizia il gioco
document.getElementById('btn-start').addEventListener( 'click', initGame );

//FUNZIONE DI INIZIO GIOCO
function initGame(){

  main.innerHTML = '';
  containerBombNum =[];
  clickCounter = 0;

  const levelChoice = document.getElementById('level-choice').value;
  const level = [100, 81, 49];
  const boxNumber = level[levelChoice];

  //richiamo qui la funzione che crea la game area
  createGameArea(boxNumber);

}


//FUNZIONE CREA GAME AREA
function createGameArea( boxNumber ){

  const gameArea = document.createElement('div');
  gameArea.className = 'sd-game-area';
  main.append( gameArea );

  //richiamo qui la funzione boxPrinter
  boxPrinter( boxNumber, gameArea );
  return gameArea;
}


//funzione STAMPA
/**
 * stampa in pagina tot box, in una certa size in un contenitore 
 * @param {number} parametroN 
 * @param {string} placeInHtml 
 * @param {number} parameterSize 
 */
 function boxPrinter( boxNumber, htmlElement ){
  
  const bombList = uniqueRandomNum( totBomb, boxNumber );//array bomb number

  for( let i = 1; i <= boxNumber; i++ ){
    
    //richiamo qui la funz creaBox
    const boxEr = createBoxElement( boxNumber, htmlElement );
    boxEr.innerHTML = `<span>${i}</span>`;
    boxEr.iD = i;

    //richiamo qui la funzione click/bomb;
    checkBomb( bombList, boxEr , htmlElement , boxNumber );

    if(bombList.includes(boxEr.iD)){
      elementBombList.push(boxEr);
    }
  }

  console.log( 'magazion bombe ',bombList );

}


//FUNZIONE CREA BOX
/**
 * crea un'elemnto div-box e lo mette in un contenitore
 * @param {string} htmlElement 
 * @param {number} num 
 * @returns 
 */
 function createBoxElement( boxNumber, htmlElement ){

  const box = document.createElement('div');
  box.className = 'sd-box';
  const boxXRow = Math.sqrt( boxNumber );
  console.log(boxXRow);
  const boxSize = `calc( 100% / ${boxXRow})`;
  box.style.width = boxSize;
  box.style.height = boxSize;
  htmlElement.append( box );
  
  return box;
}


//funzione CLICK/BOMB
function checkBomb(bombList, boxEr, htmlElement, boxNumber ){

  boxEr.addEventListener('click', function(){
    //click counter
    clickCounter ++;
    console.log( clickCounter ) ;

    //richiamo qui la funzione che decide come finisce il gioco
    endGame( bombList, boxEr, htmlElement, clickCounter , boxNumber );
  });

}


//END GAME FUNCTION
function endGame( bombList, boxEr, htmlElement, clickCounter, boxNumber ){

  var soundBomb = new Audio('sound/lose.wav');
  var soundClick = new Audio("file.wav");

  //condizione se l'utente clicca o meno la bomba
   if(bombList.includes(boxEr.iD)){

    //richiamo qui la funzione crea lay over di fine gioco
    creaLayover( clickCounter , boxNumber );
    htmlElement.classList.add('pe-none');
    soundBomb.play();

    btnStart.innerHTML = 'Ritenta!'

    for(let i = 0; i < elementBombList.length ; i++ ){
      elementBombList[i].classList.add('bomb');
      elementBombList[i].innerHTML = 'Boom!';
    }

  }else{

    boxEr.classList.add('check');
    soundClick.play();

    if( clickCounter > boxNumber ){
      //richiamo qui la funzione crea lay over di fine gioco
      creaLayover( clickCounter , boxNumber );
    }
  }

}


//Funzione crea layover end message

/**
 * Genera un layover sulla zona di gioco con contenuto differente al variare dei parametri
 * @param {number} clickCounter 
 * @param {number} boxNumber 
 * @returns 
 */
 function creaLayover( clickCounter , boxNumber){

  const layOver = document.createElement('div');
  layOver.className = 'end-message';
  main.append(layOver);

  if(clickCounter < 3){
    layOver.innerHTML = `<h3>Hai perso con solo  ${clickCounter - 1}  click! riprova!<br>...un po sfigatell@ eh</h3> `;
  }else if(clickCounter > boxNumber / 3){
    layOver.innerHTML = `<h3>Hai vinto con  ${clickCounter - 1}  click! riprova!<br>batti il tuo record! `;
  }else{
    layOver.innerHTML = `<h3>Hai perso con ${clickCounter - 1} click! riprova!</h3> `;
  }
  

  return layOver;
}


//generatore numero univoco

/**
 * genera una lista/array di numeri univoci in una quantità variabile al variare dei parametri
 * @param {number} number 
 * @param {number} boxNumber 
 * @returns 
 */
function uniqueRandomNum( number, boxNumber ){

  let estractNumber;
  let selected;

  for( let i = 0; i< number; i++ ){
    let check = false;
  
    while(!check){
      estractNumber = randomNum(1, boxNumber);

      if(!containerBombNum.includes(estractNumber)){
        check = true;
        containerBombNum.push(estractNumber);
        selected = estractNumber;
      }
    }
  
  }
  return containerBombNum;

}


//genera Numeri Random

/**
 * Calcola un numero intero da min a max randomicamente
 * @param {num} min 
 * @param {num} max 
 * @returns 
 */
function randomNum( min , max ){
  return Math.floor(Math.random() * (max - min +1) + min);
}



