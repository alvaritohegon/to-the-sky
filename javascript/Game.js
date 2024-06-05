class Game {
  constructor() {
    // Propiedades de Game => todos los elementos que existen en el juego

    // el fondo
    this.background = new Image();
    this.background.src = "images/stars-bk.png";

    // nave
    this.nave = new Nave();
    console.log(this.nave);

    // slugs
    this.slugsArr = [];

    // meteoritos
    this.meteorosArr = [];

    this.playerLifeCount = 3

    this.isGameOn = true;
  }

  // Metodos de Game => todas las acciones que se realizan en el juego

  disparoNave = (event) => {
    if (event.code === "Space") {
      console.log("Disparo de nave detectado");
      let nuevaSlug = new Slug(this.nave.x, this.nave.y);
      this.slugsArr.push(nuevaSlug);
    }
  };

  meteorosAparecen = () => {
    if (
      this.meteorosArr.length === 0 ||
      this.meteorosArr[this.meteorosArr.length - 1].y > 70
    ) {
      let randomPositionX = Math.random() * canvas.width; // entre 0 y el ancho

      let nuevoMeteoro = new Meteoro(randomPositionX);
      this.meteorosArr.push(nuevoMeteoro);
    }
  };

  checkCollisionNaveMeteoro = () => {
    // this.nave
    // this.meteorosArr
    this.meteorosArr.forEach((eachMeteoro, indexMeteoro) => {
      // eachTubo vs this.nave
      if (
        eachMeteoro.x < this.nave.x + this.nave.w &&
        eachMeteoro.x + eachMeteoro.w > this.nave.x &&
        eachMeteoro.y < this.nave.y + this.nave.h &&
        eachMeteoro.y + eachMeteoro.h > this.nave.y
      ) {
        // Collision detected!
        console.log("colision detectada");
        this.meteorosArr.splice(indexMeteoro, 1)
        this.playerLifeCount -= 1

      } else if (this.playerLifeCount === 0){
        this.gameOver();
      }
    });
  };

  checkCollisionSlugMeteoro = () => {
    // this.slugsArr
    // this.meteorosArr
    this.meteorosArr.forEach((eachMeteoro, indexMeteoro) => {
      this.slugsArr.forEach((eachSlug, indexSlug) => {
        if (
          eachMeteoro.x < eachSlug.x + eachSlug.w &&
          eachMeteoro.x + eachMeteoro.w > eachSlug.x &&
          eachMeteoro.y < eachSlug.y + eachSlug.h &&
          eachMeteoro.y + eachMeteoro.h > eachSlug.y
        ) {
          // Collision detected!
          this.slugsArr.splice(indexSlug, 1);
          this.meteorosArr.splice(indexMeteoro, 1)
        }
      });
    });
  };

  gameOver = () => {
    // 1. Detener el juego
    this.isGameOn = false;

    canvas.style.display = "none";

    gameoverScreenDOM.style.display = "flex";
  };

  drawBackground = () => {
    ctx.drawImage(this.background, 0, 0, canvas.width, canvas.height);
  };

  clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  gameLoop = () => {
    console.log("ejecutando recursión del juego");

    // 1. Limpieza del canvas
    this.clearCanvas();

    // 2. Acciones y movimientos de los elementos
    this.nave.automaticMove();
    this.slugsArr.forEach((eachSlug) => {
      eachSlug.move();
      console.log("Bala moviéndose");
    });
    this.meteorosArr.forEach((eachMeteoro) => {
      eachMeteoro.move();
    });
    this.meteorosAparecen();
    this.checkCollisionNaveMeteoro();
    this.checkCollisionSlugMeteoro()

    // 3. Dibujado de los elementos
    this.drawBackground();
    this.nave.draw();
    this.slugsArr.forEach((eachSlug) => {
      eachSlug.draw();
    });
    this.meteorosArr.forEach((eachMeteoro) => {
      eachMeteoro.draw();
    });

    // 4. Recursión (requestAnimationFrame)
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
