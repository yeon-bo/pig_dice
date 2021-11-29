let total = 0;
function pigdice(){
  const diceNum = document.querySelector('#diceNum');
  const totalNum = document.querySelector('#total');

  // random
  const randomNum = Math.floor(Math.random() * 6) + 1;
  diceNum.innerHTML = randomNum;

  if(randomNum !== 1){
    total += randomNum;
    totalNum.innerHTML = total
  }else{
    total = 0;
    totalNum.innerHTML = 0
    alert('다음 턴');
  }
}


// 게임시작 버튼 클릭 시 레이어팝업 닫힘
const btnStart = document.querySelector('.btn_start');
const layerPop = document.querySelector('.l-layerpop');

btnStart.addEventListener('click',function(){
  console.log('start')
  layerPop.classList.add('s-hidden');
});