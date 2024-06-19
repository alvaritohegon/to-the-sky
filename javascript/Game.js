class Game {
  constructor() {
    // Propiedades de Game => todos los elementos que existen en el juego

    // el fondo
    this.background = new Image();
    this.background.src = "images/stars-bk.png";
    this.backgroundX = 0;
    this.backgroundY = -755;
    this.backgroundW = canvas.width;
    this.backgroundH = 1355;

    // nave
    this.nave = new Nave();
    this.isShooting = false;
    // console.log(this.nave);

    // slugs
    this.slugsArr = [];
    this.slugsEnemyArr = [];

    // meteoritos
    this.meteorosArr = [];

    // enemigos
    this.navesArr = [];

    // boss
    this.boss = new Boss();
    this.isBossActive = false;

    // hearts
    this.heartsPlayer = [new Heart(1), new Heart(2), new Heart(3)];
    this.heartArr = [];

    this.isSpawning = true;
    this.isGameOn = true;

    this.fps = 0;
    this.seconds = 0;
  }

  // Metodos de Game => todas las acciones que se realizan en el juego

  disparoNave = (event) => {
    if (event.code === "Space" && this.isShooting === false) {
      // console.log("Disparo de nave detectado");
      let nuevaSlug = new Slug(this.nave.x + 10, this.nave.y, "player");
      this.slugsArr.push(nuevaSlug);
      this.isShooting = true;
    } else if (this.isShooting === true) {
      setTimeout(() => {
        this.isShooting = false;
      }, 600);
    }

    if (this.slugsArr.length > 0 && this.slugsArr[0].x < 0) {
      this.slugsArr.shift();
    }
  };

  disparoNaveEnemiga = (enemy) => {
    // console.log(this.slugsEnemyArr.length);
    if (this.fps % 200 === 0) {
      this.navesArr.forEach((enemy) => {
        let enemySlug = new Slug(enemy.x + 10, enemy.y + enemy.h, "enemy");
        this.slugsEnemyArr.push(enemySlug);
      });
    }

    if (
      this.slugsEnemyArr.length > 0 &&
      this.slugsEnemyArr[0].y > canvas.height
    ) {
      this.slugsEnemyArr.shift();
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

    if (this.meteorosArr[0].y > canvas.height) {
      this.meteorosArr.shift();
      // esta limpieza se puede hacer tanto aquí como en una función aparte
    }
    // console.log(this.meteorosArr.length);
  };

  navesAparecen = () => {
    console.log(this.navesArr.length);
    if (
      this.navesArr.length === 0 ||
      (this.fps % 1600 === 0 && this.isAttack === true)
    ) {
      let randomPosition = Math.random() * canvas.width;
      let nuevoEnemigo = new Enemy(randomPosition);
      this.navesArr.push(nuevoEnemigo);
    }

    if (this.navesArr[0].y > canvas.height) {
      this.navesArr.shift();
    }
  };

  bossAparece = () => {
    if (this.seconds === 70) {
      this.isBossActive = true;
      this.isSpawning = false;
    }
  };

  heartsAparecen = () => {
    if (this.fps % 2000 === 0) {
      let randomNum = Math.random() * canvas.width;
      let nuevoHeart = new Heart(randomNum);
      this.heartArr.push(nuevoHeart);
    }
  };

  // Colisiones

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
        // console.log("colision detectada");
        this.meteorosArr.splice(indexMeteoro, 1);
        this.heartsPlayer.pop();
      } else if (this.heartsPlayer.length === 0) {
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
          this.meteorosArr.splice(indexMeteoro, 1);
        }
      });
    });
  };

  checkCollisionSlugEnemy = () => {
    this.slugsArr.forEach((eachSlug, indexSlug) => {
      this.navesArr.forEach((eachNave, indexNave) => {
        if (
          eachNave.x < eachSlug.x + eachSlug.w &&
          eachNave.x + eachNave.w > eachSlug.x &&
          eachNave.y < eachSlug.y + eachSlug.h &&
          eachNave.y + eachNave.h > eachSlug.y
        ) {
          // Collision detected!
          this.slugsArr.splice(indexSlug, 1);
          this.navesArr.splice(indexNave, 1);
        }
      });
    });
  };

  checkCollisionNaveEnemy = () => {
    this.navesArr.forEach((eachNave, indexNave) => {
      if (
        eachNave.x < this.nave.x + this.nave.w &&
        eachNave.x + eachNave.w > this.nave.x &&
        eachNave.y < this.nave.y + this.nave.h &&
        eachNave.y + eachNave.h > this.nave.y
      ) {
        // Collision detected!
        this.navesArr.splice(indexNave, 1);
        this.heartsPlayer.pop();
      }
    });
  };

  checkCollisionNaveEnemySlug = () => {
    this.slugsEnemyArr.forEach((eachSlug, indexSlug) => {
      if (
        eachSlug.x < this.nave.x + this.nave.w &&
        eachSlug.x + eachSlug.w > this.nave.x &&
        eachSlug.y < this.nave.y + this.nave.h &&
        eachSlug.y + eachSlug.h > this.nave.y
      ) {
        // Collision detected!
        this.slugsEnemyArr.splice(indexSlug, 1);
        this.heartsPlayer.pop();
      }
    });
  };

  checkCollisionNaveHeart = () => {
    this.heartArr.forEach((eachHeart, indexHeart) => {
      if (
        eachHeart.x < this.nave.x + this.nave.w &&
        eachHeart.x + eachHeart.w > this.nave.x &&
        eachHeart.y < this.nave.y + this.nave.h &&
        eachHeart.y + eachHeart.h > this.nave.y
      ) {
        // Collision detected!
        // console.log("colision detectada");
        this.heartArr.splice(indexHeart, 1);

        if (this.heartsPlayer.length < 4) {
          this.heartsPlayer.push(new Heart(this.heartsPlayer.length + 1));
        }
        // if (this.heartsPlayer.length === 1) {
        //   this.heartsPlayer.push(new Heart(2))
        // } else if (this.heartsPlayer.length ===2) {
        //   this.heartsPlayer.push(new Heart(3))
        // } else if (this.heartsPlayer.length ===3) {
        //   this.heartsPlayer.push(new Heart (4))
        // }
      }
    });
  };

  checkCollisionBossSlugNave = () => {
    this.boss.slugArr.forEach((eachSlug, indexSlug) => {
      if (
        eachSlug.x < this.nave.x + this.nave.w &&
        eachSlug.x + eachSlug.w > this.nave.x &&
        eachSlug.y < this.nave.y + this.nave.h &&
        eachSlug.y + eachSlug.h > this.nave.y
      ) {
        // Collision detected!
        this.boss.slugArr.splice(indexSlug, 1);
        this.heartsPlayer.pop();
      }
    });
  };

  checkCollisionBossNave = () => {
    if (
      this.boss.x < this.nave.x + this.nave.w &&
      this.boss.x + this.boss.w > this.nave.x &&
      this.boss.y < this.nave.y + this.nave.h &&
      this.boss.y + this.boss.h > this.nave.y
    ) {
      if (this.heartsPlayer.length > 0) {
        this.heartsPlayer.pop();
      } else {
        this.gameOver();
      }
    }
  };

  checkCollisionNaveSlugBoss = () => {
    this.slugsArr.forEach((eachSlug, indexSlug) => {
      if (
        eachSlug.x < this.boss.x + this.boss.w &&
        eachSlug.x + eachSlug.w > this.boss.x &&
        eachSlug.y < this.boss.y + this.boss.h &&
        eachSlug.y + eachSlug.h > this.boss.y
      ) {
        // Collision detected!
        this.boss.life -= 1;
        this.slugsArr.splice(indexSlug, 1);
        if ((this.boss.life === 0)) {
          this.isBossActive = false;
          this.isSpawning = true;
        }
      }
    });
  };

  gameOver = () => {
    // 1. Detener el juego
    this.isGameOn = false;

    canvas.style.display = "none";

    gameoverScreenDOM.style.display = "flex";
  };

  drawBackground = () => {
    if (this.backgroundY >= 0) {
      this.backgroundY = -755;
    } else {
      this.backgroundY++;
    }
    ctx.drawImage(
      this.background,
      0,
      this.backgroundY,
      this.backgroundW,
      this.backgroundH
    );
  };

  clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  gameLoop = () => {
    // console.log("ejecutando recursión del juego");

    // 1. Limpieza del canvas
    this.clearCanvas();

    // para llevar el control de los segundos
    this.fps++;
    this.seconds = Math.floor(this.fps / 60);

    // 2. Acciones y movimientos de los elementos

    this.nave.automaticMove();

    this.slugsArr.forEach((eachSlug) => {
      eachSlug.move();
      // console.log("Bala moviéndose");
    });

    this.meteorosArr.forEach((eachMeteoro) => {
      eachMeteoro.move();
    });

    this.navesArr.forEach((eachNave) => {
      eachNave.move();
    });

    this.heartArr.forEach((eachHeart) => {
      eachHeart.move();
    });

    this.slugsEnemyArr.forEach((eachSlug) => {
      eachSlug.move();
    });

    this.heartsAparecen();
    if (this.isSpawning === true) {
      this.navesAparecen();
      this.meteorosAparecen();
    }

    this.bossAparece();
    if (this.isBossActive === true) {
      this.boss.move();
      this.boss.wallCollisions();
      this.boss.shoot();
      this.checkCollisionBossNave();
      this.checkCollisionBossSlugNave();
      this.boss.slugArr.forEach((slug) => {
        slug.move();
      });
      this.checkCollisionNaveSlugBoss();
    }

    this.disparoNaveEnemiga();

    this.checkCollisionNaveMeteoro();
    this.checkCollisionSlugMeteoro();
    this.checkCollisionNaveHeart();
    this.checkCollisionSlugEnemy();
    this.checkCollisionNaveEnemy();
    this.checkCollisionNaveEnemySlug();

    // 3. Dibujado de los elementos
    this.drawBackground();
    this.nave.draw();
    if (this.isBossActive === true) {
      this.boss.draw();
    }
    this.slugsArr.forEach((eachSlug) => {
      eachSlug.draw();
    });
    this.meteorosArr.forEach((eachMeteoro) => {
      eachMeteoro.draw();
    });
    this.slugsEnemyArr.forEach((eachSlug) => {
      eachSlug.draw();
    });
    this.heartsPlayer.forEach((eachHeart) => {
      eachHeart.draw();
    });
    this.navesArr.forEach((eachNave) => {
      eachNave.draw();
    });
    this.heartArr.forEach((eachHeart) => {
      eachHeart.draw();
    });
    if (this.isBossActive === true) {
      this.boss.slugArr.forEach((slug) => {
        slug.draw();
      });
    }

    // 4. Recursión (requestAnimationFrame)
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
