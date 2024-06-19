class Nave {
  constructor() {
    // propiedades de la nave
    this.img = new Image();
    this.img.src = "images/nave-espacial.png";

    this.x = 330;
    this.y = 520;
    this.w = 60;
    this.h = 60;

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
    if (this.isMovingRight === true && this.x + 60 < canvas.width) {
      this.x += 1.5;
    } else if (this.isMovingLeft === true && this.x > 0) {
      this.x -= 1.5;
    }

    if (this.isMovingUp === true && this.y > 200) {
      this.y -= 1.5;
    } else if (this.isMovingDown === true && this.y + 60 < canvas.height) {
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

class Heart {
  constructor(positionX) {
    this.img = new Image()
    this.img.src = "images/heart.png"

    if (positionX === 1 ) {
      this.x = 15
    } else if (positionX === 2) {
      this.x = 45
    } else if (positionX === 3) {
      this.x = 75
    } else if(positionX === 4){
      this.x = 105
    } else {
      this.x = positionX
    }

    this.y = 50;
    this.w = 40;
    this.h = 40;

  }

  draw = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  move = () => {
    this.y++
  }






}
