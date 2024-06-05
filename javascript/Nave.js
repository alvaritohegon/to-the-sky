class Nave {
  constructor() {
    // propiedades de la nave
    this.img = new Image();
    this.img.src = "images/nave-espacial.png";

    this.x = 330;
    this.y = 520;
    this.w = 70;
    this.h = 70;

    this.speed = 2;

    this.isMovingRight = false;
    this.isMovingLeft = false;
    this.isMovingUp = false;
    this.isMovingDown = false;
  }

  // metodo (acciones) de la nave
  draw = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };

  automaticMove = () => {
    if (this.isMovingRight === true) {
      this.x += 1.5;
    } else if (this.isMovingLeft === true) {
      this.x -= 1.5;
    }

    if (this.isMovingUp === true) {
      this.y -= 1.5;
    } else if (this.isMovingDown === true) {
      this.y += 1.5;
    }
  };

  move = (event) => {
    if (event.code === "ArrowLeft") {
      this.isMovingRight = false;
      this.isMovingLeft = true;
    } else if (event.code === "ArrowRight") {
      this.isMovingRight = true;
      this.isMovingLeft = false;
    } else if (event.code === "ArrowUp") {
      this.isMovingUp = true;
      this.isMovingDown = false;
    } else if (event.code === "ArrowDown") {
      this.isMovingUp = false;
      this.isMovingDown = true;
    }
  };
}
