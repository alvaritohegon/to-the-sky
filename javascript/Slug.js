class Slug {
  constructor(positionX, positionY) {
    this.img = new Image();
    this.img.src = "images/bullet.png";
    this.x = positionX;
    this.y = positionY;
    this.w = 40;
    this.h = 40;
    this.speed = 3;
  }

  draw = () => {
    console.log("dibujando bala en posicion", this.x, this.y);
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
  }

  move = () => {
    this.y -= this.speed
  }
}
