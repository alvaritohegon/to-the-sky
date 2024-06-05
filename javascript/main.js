//* global variables

const splashScreenDOM = document.querySelector("#splash-screen");
const gameoverScreenDOM = document.querySelector("#gameover-screen");
const startBtnDOM = document.querySelector("#start-btn");
const restartBtnDOM = document.querySelector("#restart-btn");
const canvas = document.querySelector("#my-canvas");

const ctx = canvas.getContext("2d");

let gameObj;

//* state management functions

const startGame = () => {
  console.log("intentando iniciar el juego");

  // 1. Cambiar las pantallas del juego
  splashScreenDOM.style.display = "none";
  canvas.style.display = "block";

  // 2. Crear los elementos del juego
  gameObj = new Game();
  console.log(gameObj);

  // 3. Iniciar el bucle del juego (recursión)
  gameObj.gameLoop();
};

const restartGame = () => {
  gameoverScreenDOM.style.display = "none";
  canvas.style.display = "block";

  gameObj = new Game();

  gameObj.gameLoop();
};

//* add event listeners

startBtnDOM.addEventListener("click", startGame);
restartBtnDOM.addEventListener("click", restartGame);

window.addEventListener("keydown", (event) => {
  if (gameObj !== undefined) {
    gameObj.nave.move(event);
    gameObj.disparoNave(event);
  }
});
