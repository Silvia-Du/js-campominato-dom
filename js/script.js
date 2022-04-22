

document.getElementById('btn-start').addEventListener( 'click', initGame );



function initGame(){

  gameArea.innerHTML = '';

  const levelChoice = document.getElementById('level-choice').value;
  const level = [100, 81, 49];
  const boxNumber = level[levelChoice];

}