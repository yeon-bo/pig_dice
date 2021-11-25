// random
const randomNum = Math.floor(Math.random() * 6) + 1
console.log(randomNum)

//if
let total;
if(randomNum !== 1){
  total += randomNum;
  console.log('total',total)
}else{
  total = 0;
  console.log('total',total)
  alert('다음 턴')
}