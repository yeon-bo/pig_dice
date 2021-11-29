let total = 0;

// 플레이어명과, 점수 객체로 구성된 플레이어 배열
// format은 [{name: 보노보노, score:0}, {name: 포로리, score: 0}, {name: 너부리, score: 0}]
let player_arr = [];

const btnStart = document.querySelector(".btn_start");
const layerPop = document.querySelector(".l-layerpop");
const playerInput = document.querySelector(".input");
const playerUl = document.querySelector(".player-name ul");
const playerAddBtn = document.querySelector(".player-add");
const playerResetBtn = document.querySelector(".btn_reset");

// 플레이어 추가 함수
function addPlayer() {
  if (playerInput.value === "") {
    alert("플레이어 이름을 입력해주세요");
  }

  // input 태그 내의 플레이어명
  playerName = playerInput.value;

  // 플레이어 정보 객체
  const playerinfo = { name: playerName, score: 0 };

  //player_arr 배열에 플레이어 추가
  player_arr.push(playerinfo);

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

// 플레이어 순서 mix 함수
function shufflePlayer(array) {
  let m = array.length,
    t,
    i;

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

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
  if (player_arr.length < 2) {
    alert("두 명 이상의 플레이어를 추가하세요 ");
  } else {
    console.log("start");
    // 게임시작 버튼 클릭 시 레이어팝업 닫힘
    layerPop.classList.add("s-hidden");

    // 플레이어 순서 재배치
    player_arr = shufflePlayer(player_arr);
  }
});
