class Enemy {
  constructor(positionX) {
    this.img = new Image();
    this.img.src = "images/nave-enemiga.png";

    this.x = positionX;
    this.y = -60;
    this.h = 60;
    this.w = 60;

    this.speed = 1.5;

    this.isMovingRight = true;
  }

  draw = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };

  move = () => {
    if (this.isMovingRight === true) {
      this.x += this.speed;
      this.y += 0.7;
    } else if (this.isMovingRight === false) {
      this.x -= this.speed;
      this.y += 0.7;
    }

    if (this.x < 0) {
      this.isMovingRight = true;
    } else if (this.x + this.w > canvas.width) {
      this.isMovingRight = false;
    }
  };
}

class Boss {
  constructor() {
    this.img = new Image();
    this.img.src = "images/final-boss-transformed (1).png";
    this.x = 350;
    this.y = -200;
    this.h = 200;
    this.w = 200;

    this.speed = 1;

    this.slugArr = []
    this.life = 10

    this.isMovingRight = true;
    this.isMovingDown = true;

    this.seconds = 0;
  }

  draw = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };

  move = () => {
    if (this.isMovingRight === true) {
      this.x += this.speed;
    } else {
      this.x -= this.speed;
    }

    if (this.isMovingDown === true) {
      this.y += this.speed;
    } else {
      this.y -= this.speed;
    }
  };

  wallCollisions = () => {
    if (this.x + 200 > canvas.width) {
      this.isMovingRight = false
    } else if (this.x < 0) {
      this.isMovingRight = true
    }

    if(this.y > 150) {
      this.isMovingDown = false
    }else if (this.y < -100) {
      this.isMovingDown = true
    }
  }

  shoot = () => {
    this.seconds++
    if (this.seconds % 120 === 0) {
      let newSlug = new Slug(this.x + (this.w / 6), this.y + this.h, "enemy")
      this.slugArr.push(newSlug)
      let newSlug2 = new Slug(this.x + (this.w / 6) * 2, this.y + this.h, "enemy")
      this.slugArr.push(newSlug2)
      let newSlug3 = new Slug(this.x + (this.w / 6) * 3, this.y + this.h, "enemy")
      this.slugArr.push(newSlug3)
    }
  }
}
