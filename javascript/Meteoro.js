class Meteoro {
  constructor(positionX) {
    this.img = new Image();
    this.img.src = "images/esteroid.png"
    // todo - hacer animación de que rote

    this.x = positionX
    this.y = 0
    this.w = 30
    this.h = 30
    this.speed = 2

  }

  draw = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
  }

  move = () => {
    this.y += this.speed
  }


}