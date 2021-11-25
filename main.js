// const diceBtn = document.querySelector('button');
let total = 0;
function pigdice(){
  const diceNum = document.querySelector('#diceNum');
  const totalNum = document.querySelector('#total');

  // random
  const randomNum = Math.floor(Math.random() * 6) + 1;
  diceNum.innerHTML = randomNum;

  //if
  if(randomNum !== 1){
    total += randomNum;
    totalNum.innerHTML = total
  }else{
    total = 0;
    totalNum.innerHTML = 0
    alert('다음 턴');
  }
}


