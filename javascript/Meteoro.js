class Meteoro {
  constructor(positionX) {
    this.img = new Image();
    this.img.src = "images/asteroid3.png";
    // todo - hacer animación de que rote

    this.x = positionX;
    this.y = -30;
    this.w = 50;
    this.h = 30;
    this.speed = 3;

  }

  draw = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };

  move = () => {
    this.y += this.speed;
  };

}