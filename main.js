let total = 0;
let player_arr = [];

const btnStart = document.querySelector(".btn_start");
const layerPop = document.querySelector(".l-layerpop");
const playerInput = document.querySelector(".input");
const playerUl = document.querySelector(".player-name ul");
const playerAddBtn = document.querySelector(".player-add");
const playerResetBtn = document.querySelector(".btn_reset");

// 플레이어 추가 함수
function addPlayer() {
  // input 태그 내의 플레이어명
  const playerName = playerInput.value;

  //player_arr 배열에 플레이어 추가
  player_arr.push(playerName);

  const playerLi = document.createElement("li");
  playerLi.append(playerName);
  playerUl.append(playerLi);

  // input 태그 리셋
  playerInput.value = "";
}

playerAddBtn.addEventListener("click", addPlayer);

// 플레이어 리셋 함수
function resetPlayer() {
  playerUl.innerHTML = "";
  player_arr = [];
}

playerResetBtn.addEventListener("click", resetPlayer);

function pigdice() {
  const diceNum = document.querySelector("#diceNum");
  const totalNum = document.querySelector("#total");

  // random
  const randomNum = Math.floor(Math.random() * 6) + 1;
  diceNum.innerHTML = randomNum;

  if (randomNum !== 1) {
    total += randomNum;
    totalNum.innerHTML = total;
  } else {
    total = 0;
    totalNum.innerHTML = 0;
    alert("다음 턴");
  }
}

btnStart.addEventListener("click", function () {
  console.log("start");

  // 게임시작 버튼 클릭 시 레이어팝업 닫힘
  layerPop.classList.add("s-hidden");
});
