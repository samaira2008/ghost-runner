var towerImage,tower;
var ghost,ghostImage;
var doorImage,door,doorsGroup;
var climber,climberImage,climbersGroup;
var invisibleBlockGroup,invisibleBlock;
var gameState="play";

function preload(){
  towerImage=loadImage("tower.png");
  ghostImage=loadImage("ghost-jumping.png");
  doorImage=loadImage("door.png");
 climberImage=loadImage("climber.png");
}


function setup() {
  createCanvas(600, 600);
  tower=createSprite(300,300)
  tower.addImage(towerImage)
  tower.velocityY=1;
  
  ghost=createSprite(200,200,50,50)
  ghost.addImage(ghostImage)
  ghost.scale=0.3;
  
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
}

function draw() {
  background("black");
  if(gameState==="play"){
    if(keyDown("space")){
      ghost.velocityY=-10;
    }
        if(keyDown("left_arrow")){
      ghost.x=ghost.x-3;
    }
        if(keyDown("right_arrow")){
      ghost.x=ghost.x+3;
    }
    ghost.velocityY=ghost.velocityY+0.8;
    if(tower.y>400){
      tower.y=300;
    }
    
    spawnDoors();
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }
    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy();
      gameState="end"
    }
     drawSprites();
  }
  if(gameState==="end"){
    fill("yellow")
    textSize(26)
    text("GAMEOVER",230,250)
    
    
  }
  
  

}
function spawnDoors(){
if(frameCount%240===0){
  door=createSprite(200,-50)
  climber=createSprite(200,10)
  invisibleBlock=createSprite(200,15)
  invisibleBlock.width=climber.width;
  invisibleBlock.height=2;
  
  door.x=random(120,400)
  climber.x=door.x;
  invisibleBlock.x=door.x;
  door.addImage(doorImage)
   climber.addImage(climberImage)
  
  door.velocityY=1;
  climber.velocityY=1;
  invisibleBlock.velocityY=1;
  
  ghost.depth=door.depth;
  ghost.depth=ghost.depth+1;
  
  door.lifetime=800;
  climber.lifetime=800;
   invisibleBlock.lifetime=800;
  
  invisibleBlock.debug=true;
  
  doorsGroup.add(door)
   climbersGroup.add(climber)
  invisibleBlockGroup.add(invisibleBlock)
  
}
  
}

