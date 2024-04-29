const player = document.getElementById("player");
const gameArea = document.getElementById("gameArea");
let playerPos = gameArea.offsetWidth / 2 - player.offsetWidth / 2;
let gameInterval;
let obstacles = [];

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft" && playerPos > 0) {
    playerPos -= 10;
  } else if (
    event.key === "ArrowRight" &&
    playerPos < gameArea.offsetWidth - player.offsetWidth
  ) {
    playerPos += 10;
  }
  player.style.left = playerPos + "px";
});

function startGame() {
  gameInterval = setInterval(() => {
    createObstacle();
  }, 2000); // 障礙物生成秒速
}

function createObstacle() {
  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  obstacle.style.left = Math.random() * (gameArea.offsetWidth - 20) + "px";
  obstacle.style.top = "0px";
  gameArea.appendChild(obstacle);
  obstacles.push(obstacle);
  moveObstacles();
}

function moveObstacles() {
  obstacles.forEach((ob) => {
    let obTop = parseInt(ob.style.top);
    ob.style.top = obTop + 20 + "px"; // 障礙物下移

    // 檢查碰撞
    if (
      obTop + 20 >= player.offsetTop &&
      ob.getBoundingClientRect().left < player.getBoundingClientRect().right &&
      ob.getBoundingClientRect().right > player.getBoundingClientRect().left
    ) {
      clearInterval(gameInterval);
      alert("Game Over!");
    }
  });
}

startGame();
