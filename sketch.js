var sword , swordImage , swordSound;

var PLAY = 1;
var END = 0;
var gamestate = 1;

var score;

var fruitGroup,enemyGroup;
var fruit;
var fruit1, fruit2,fruit3,fruit4;

var monster, monsterImage ;
var gameover,gameoverImage , gameoverSound;


function preload(){
  
  swordImage = loadImage("sword.png");
 fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  monsterImage = loadImage("alien1.png");
  gameoverImage = loadImage("gameover.png");
  gameoverSound =  loadSound("gameover.mp3");
  swordSound =  loadSound("knifeSwooshSound.mp3");
}

function setup(){ 
createCanvas(500,500);
 sword = createSprite(40,200,20,20);
 sword.addImage(swordImage);
 sword.scale = 0.9;
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  score = 0;
  

  
}

function draw(){
  
 background("lightblue");
 
    if(gamestate === PLAY){
  fruits();
  enemy();
  
  sword.y = World.mouseY;
  sword.x = World.mouseX;
      
  if(sword.isTouching(fruitGroup)){
    fruitGroup.destroyEach();
    score = score+1;
    swordSound.play();
  }
      if(sword.isTouching(enemyGroup)){           
        gameoverSound.play();
        gamestate = END;
      }
      
    }
  if(gamestate === END){ 
    enemyGroup.destroyEach();
    sword.destroy();
     gameover = createSprite(250,250,0,0);
    gameover.addImage(gameoverImage);
   
  }
  
  
  
  text("Score:"+score,450,20);
   sword.setCollider("rectangle",0,0,80,80);
   //sword.debug=true;
 

drawSprites();
  
}

function fruits(){
  if(frameCount%80===0){
    var fruit = createSprite(600,200,20,20);
    fruit.scale = 0.2;
    //fruit.debug= true;
    r=Math.round(random(1,4));
    
   if(r == 1){
     fruit.addImage(fruit1);
   }else if (r == 2){
     fruit.addImage(fruit2);
   }else if (r==3){
     fruit.addImage(fruit3);
   }else if (r==4){
     fruit.addImage(fruit4);
   }
    fruit.y = Math.round(random(30,400));
    fruit.velocityX= -7;
    
    fruit.lifetime = 100;
    fruitGroup.add(fruit);
    fruit.scale = 0.2;
   // fruit.velocityX = -(8+(score/4));
  }
}
 
function enemy() {
if(frameCount%200===0){
 var monster= createSprite(400,200,20,20);
monster.addImage("moving", monsterImage);
monster.y=Math.round(random(100,300));
monster.velocityX = -8;
monster.setLifetime = 50;
  
enemyGroup.add(monster);

monster.velocityX = -(10+(score/4));
}
}
