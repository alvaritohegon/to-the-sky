class Slug {
  constructor(positionX, positionY, isEnemyOrPlayer) {
    this.img = new Image();
    this.img.src = "images/bullet.png";
    this.x = positionX;
    this.y = positionY;
    this.w = 40;
    this.h = 40;
    this.speed = 3;
    this.direction = isEnemyOrPlayer;
  }

  draw = () => {
    // console.log("dibujando bala en posicion", this.x, this.y);
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };

  move = () => {
    if (this.direction === "player") {
      this.y -= this.speed;
    } else if (this.direction === "enemy") {
      this.y += this.speed + 0.5;
    }
  };
}
