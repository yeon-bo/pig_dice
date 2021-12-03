let total = 0;

// 플레이어명과, 점수 객체로 구성된 플레이어 배열
// format은 [{name: 보노보노, score:0, id : 1}, {name: 포로리, score: 0, id : 2}, {name: 너부리, score: 0, id : 3}]
let player_arr = [];

const btnStart = document.querySelector(".btn_start");
const layerPop = document.querySelector(".l-layerpop");
const playerInput = document.querySelector(".input");
const playerUl = document.querySelector(".player-name ul");
const playerAddBtn = document.querySelector(".player-add");
const playerResetBtn = document.querySelector(".btn_reset");
const rollBtn = document.querySelector(".btn-dice");
const holdBtn = document.querySelector(".btn-hold");
const diceNumShow = document.querySelector(".dice-num");

// 플레이어 추가 영역
const playerArea = document.querySelector(".player");

// hidden 클래스 내
const playerNick = document.querySelector(".player-name");
const playerScore = document.querySelector(".total-count");

// 플레이어 추가 함수
function addPlayer() {
  if (playerInput.value === "") {
    alert("플레이어 이름을 입력해주세요");
  } else {
    // input 태그 내의 플레이어명
    playerName = playerInput.value;

    // player 아이디 생성
    let id = player_arr.length + 1;

    // score -> totalScore & turnScore로 분할 : 게임 진행 시 turnScore를 저장할 메모리 필요. (211130_kimham)
    const playerinfo = { name: playerName, totalScore: 0, turnScore: 0, id: id };

    //player_arr 배열에 플레이어 추가
    player_arr.push(playerinfo);

    const playerLi = document.createElement("li");
    playerLi.append(playerName);
    playerUl.append(playerLi);

    // input 태그 리셋
    playerInput.value = "";
  }
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

// DOM에 플레이어 추가하는 함수
function createPlayer(arr) {
  arr.forEach((obj, idx) => {
    // hidden DOM 요소에 이름, 점수 추가
    playerNick.innerHTML = obj.name;
    playerScore.innerHTML = obj.totalScore; // obj.score -> obj.totalScore : 플레이어 정보 객체 수정사항 상속 (211130_kimham)

    // hidden 요소 복제
    const cloned = document
      .querySelector(".player li:first-child")
      .cloneNode(true);

    // hidden  속성제거
    cloned.classList.remove("hidden");

    // 첫번째는 클래스에 active 추가
    if (idx === 0) {
      cloned.classList.add("active");
      cloned.setAttribute("id", `${obj.id}`);
      playerArea.append(cloned);
    } else {
      cloned.setAttribute("id", `${obj.id}`);
      playerArea.append(cloned);
    }
  });
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

    // 재배치한 배열을 바탕으로 DOM에 플레이어 생성
    createPlayer(player_arr);
  }
});

// Play Game (211130_kimham)
  // 턴 점수 
  let turnScore;
  let i = 0;
  // 주사위 굴리기 함수
  const rollDice = () => {
    let diceNum = Math.floor(Math.random() * 6) + 1;
    diceNumShow.textContent = diceNum;
    return diceNum;
  }
  // 총 점수 기록 함수
  const scoreRender = (player) => {
    const turnPlayerScore = document.querySelector(".active > .total-count");
    player.totalScore += player.turnScore;
    player.turnScore = 0;
    turnPlayerScore.textContent = player.totalScore;
  }
  // 현재 플레이어 표시 함수
  const turnRender = () => {
    const playerList = document.querySelector(".player");
    const turnPlayer = document.querySelector(".active");
    turnPlayer.classList.remove("active");
    playerList.children[i+1].classList.add("active");
  }
  // holdBtn 이벤트리스너의 콜백함수
  const holdBtnCallback = () => {
    scoreRender(player_arr[i]);
    i ++;
    if(i >= player_arr.length) i = 0;
    diceNumShow.textContent = 0;
    turnRender();
  }
  // 턴 진행 함수
  const playTurn = (diceNum, player) => {
    if(diceNum === 1){
      player.turnScore = 0;
      console.log(`1이 나와 턴 점수가 ${player.turnScore}점이 되었습니다. 다음 플레이어의 턴으로 넘어갑니다.`)
      i ++;
      if(i >= player_arr.length) i = 0;
      turnRender();
      holdBtn.disabled = true;
    } else {
      player.turnScore += diceNum;
      console.log(`${player.name}의 이번 턴 점수는 ${player.turnScore}. 다시 던지시겠습니까?`)
      holdBtn.disabled = false;
    }
  }

  // 주사위 굴리기 버튼 클릭
  rollBtn.addEventListener("click", () => {
    rollDice();
    playTurn(rollDice(), player_arr[i]);
    holdBtn.addEventListener("click", holdBtnCallback, {once: true})

  })