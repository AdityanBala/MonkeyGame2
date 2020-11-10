var Monkey , MonkeyRunning,MonkeyStanding;
var Banana ,BananaImage, Obstacle, ObstacleImage
var BananaGroup, ObstacleGroup
var Score = 0;
var Ground, GroundImage;
var WhiteGround,InvisGround;
var PLAY = 1;
var END = 0
var gameState = PLAY;

function preload(){
  
  //add running animation for monkey
  MonkeyRunning = loadAnimation(
    "sprite_0.png",
    "sprite_1.png",
    "sprite_2.png",
    "sprite_3.png",
    "sprite_4.png",
    "sprite_5.png",
    "sprite_6.png",
    "sprite_7.png",
    "sprite_8.png")
  
  BananaImage = loadImage("banana.png");
  
  ObstacleImage = loadImage("obstacle.png");
  
  GroundImage = loadImage("Ground2.png");
  
  MonkeyStanding = loadImage("sprite_0.png")
}

function setup() {
  createCanvas(500,500);
  
  var gameState = 1;
  
  //create monkey
  Monkey = createSprite (80,250,20,20);
  Monkey.addAnimation("Running", MonkeyRunning);
  Monkey.addAnimation("Standing", MonkeyStanding);
  Monkey.scale = 0.15;
  
  //create ground
  Ground = createSprite(0,400,1000,15);
  Ground.addImage(GroundImage);
  Ground.scale = 1;
  
  WhiteGround = createSprite(250,383,500,15);
  WhiteGround.shapeColor = "white";
  WhiteGround.depth = Ground.depth + 1;
  
  InvisGround = createSprite(250,400,500,15)
  InvisGround.visible = false;
  
  Monkey.depth = WhiteGround.depth + 1;
  
  BananaGroup = new Group();
  ObstacleGroup = new Group();
}


function draw() {
  background("white");

  if(gameState === PLAY){
  //Moving Ground
  Ground.velocityX = -5;
  if(Ground.x < 0){
    Ground.x = 990;
  }
  
  Score = Score + (Math.round(getFrameRate()/57.7));
  fill("grey");
  text("Survival Time: " + Score, 350,50);
  
  if(keyDown("space") && Monkey.y > 345){
    Monkey.velocityY = - 18;
  }
  
  //Gravity
  Monkey.velocityY = Monkey.velocityY + 0.8
  
  Monkey.collide(InvisGround);
  
  if(frameCount%80 === 0){
    SpawnBanana();
  }
  if(frameCount%300 === 0){
    SpawnObstacle();
  }
  
  if(Monkey.isTouching(ObstacleGroup)){
      gameState = END;
    }
  }
  if(gameState === END){
    Ground.velocityX = 0;
    Monkey.velocityY = 0;
    ObstacleGroup.setVelocityXEach(0);
    BananaGroup.setVelocityXEach(0);
    ObstacleGroup.setLifetimeEach(-1);
    BananaGroup.setLifetimeEach(-1);
    Monkey.changeAnimation("Standing",MonkeyStanding);
    textSize(20);
    text("Press 'R' to restart",200,200);
    
    if(keyDown("r")){
      reset();
      gameState = PLAY;
    }
  }
  
  drawSprites();
}

function SpawnBanana(){
  var Random = Math.round(random(150,270))
  Banana = createSprite(550,Random,20,20);
  Banana.addImage(BananaImage);
  Banana.scale = 0.1;
  Banana.velocityX = -5;
  Banana.lifetime = 150;
  
  console.log(Random);
  
  BananaGroup.add(Banana);
}

function SpawnObstacle(){
  Obstacle = createSprite(550,370,20,20);
  Obstacle.addImage(ObstacleImage);
  Obstacle.scale = 0.15;
  Obstacle.velocityX = -5;
  Obstacle.lifetime = 150;
  
  Obstacle.debug = true;
  
  ObstacleGroup.add(Obstacle);
}

function reset(){
  ObstacleGroup.destroyEach();
  BananaGroup.destroyEach();
  Score = 0;
  Monkey.changeAnimation("Running", MonkeyRunning);
}
