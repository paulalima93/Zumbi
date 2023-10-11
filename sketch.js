var bg, bgImg;
var player, shooterImg, shooter_shooting;
var zumbi, zumbiImage;
var heart1, heart2, heart3;
var heart1Image, heart2Image, heart3Image;
var zumbiGroup;
var life = 3;
var gameState = "play";
var bala;
var balaImage;
var balaGroup;
var score=0;
var balas=100;

function preload() {

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zumbiImage = loadImage("assets/zumbi.png")
  heart1Image = loadImage("assets/heart_1.png")
  heart2Image = loadImage("assets/heart_2.png")
  heart3Image = loadImage("assets/heart_3.png")
  balaImage = loadImage("assets/bala.png")

  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  createCanvas(windowWidth, windowHeight - 20)

  //adicionando a imagem de fundo
  bg = createSprite(width / 2, height / 2 + 180)
  bg.addImage(bgImg)
  bg.scale = 1.3


  //criando o sprite do jogador
  player = createSprite(width/2-500, height - 200, 50, 50);
  player.addImage(shooterImg);
  player.scale = 0.3;
  player.debug = false;
  player.setCollider("rectangle", 0, 0, 300, 300);

  zumbiGroup = new Group()

  balaGroup = new Group()

  heart1 = createSprite(width - 400, 40);
  heart1.addImage("coracao1", heart1Image);
  heart1.visible = false;
  heart1.scale = 0.5;

  heart2 = createSprite(width - 350, 40);
  heart2.addImage("coracao2", heart2Image);
  heart2.visible = false;
  heart2.scale = 0.5;

  heart3 = createSprite(width - 400, 40);
  heart3.addImage("coracao3", heart3Image);
  heart3.visible = true;
  heart3.scale = 0.5;

}

function draw() {
  background(0);


  if (gameState === "play") {
    
    if (zumbiGroup.isTouching(player)) {
      life -= 1;
      for (var i = 0; i < zumbiGroup.length; i++) {
        if (zumbiGroup[i].isTouching(player)) {
          zumbiGroup[i].destroy();
        }
      }
    }



    if (zumbiGroup.isTouching(balaGroup)) {
      for (var i = 0; i < zumbiGroup.length; i++) {
        if (zumbiGroup[i].isTouching(balaGroup)) {
          score+=1
          zumbiGroup[i].destroy();
          balaGroup.destroyEach();
        }
      }
    }

    zumbiGroup.setVelocityXEach(-(8 + 10* score/100));



    if (life === 0) {
      gameState = "end"
    }

    if (life === 1) {
      heart1.visible = true;
      heart2.visible = false;
      heart3.visible = false;
    }

    if (life === 2) {
      heart1.visible = false;
      heart2.visible = true;
      heart3.visible = false;
    }

    if (life === 3) {
      heart1.visible = false;
      heart2.visible = false;
      heart3.visible = true;
    }

    //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
    //cima
    if (keyDown(87) && player.y > 650 || touches.length > 0) {
      player.y = player.y - 30
    }
    //baixo
    if (keyDown(83) && player.y < height - 75 || touches.length > 0) {
      player.y = player.y + 30
    }


    //solte balas e mude a imagem do atirador para a posição de tiro quando a tecla de espaço for pressionada
    if (keyWentDown("space")) {

      player.addImage(shooter_shooting)
      
        
      
      
    }

    //o jogador volta à imagem original quando pararmos de pressionar a barra de espaço
    else if (keyWentUp("space")) {
      if(balas > 0) {
        tiro();
      }
      
      player.addImage(shooterImg)
    }

    drawSprites();

    createZumbi()
  } else if (gameState === "end") {

    textSize(50)
    text("Game Over", width / 2 - 100, height / 2)
  }
  

  fill ("#D35269")
  textFont ("Georgia")
  textSize(20)
  text("zumbis eliminados " +score, heart1.x-100, 95)
  text("Balas restantes " +balas, heart1.x-100, 125)
}

function createZumbi() {
  if (frameCount % 120 === 0) {
    zumbi = createSprite(random(1310, 1600), random(616, 811));
    zumbi.addImage(zumbiImage);
    zumbi.scale = 0.2;
    zumbi.velocityX = -3;
    zumbi.lifetime = 300;
    zumbiGroup.add(zumbi);
    zumbi.debug= false
    zumbi.setCollider("circle", 0,-200 ,150)
  }
}

function tiro() {
  bala = createSprite(player.x + 39, player.y - 24);
  bala.addImage(balaImage);
  bala.velocityX = 10; bala.scale = 0.02
  balaGroup.add(bala)
  if(balas >0 ){
    balas -= 1;
  } 
  




}
