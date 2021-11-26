let rand = Math.floor(Math.random()*6) + 1;
const mySum = [];

const a = rand == 1 ? "0" : diceAdd() ;

function diceAdd (rand) {
    mySum.push(rand);
    const sum = mySum.reduce((a, b)=>{
        return a + b;
          }, 0);
    return sum;
}

console.log(a)
