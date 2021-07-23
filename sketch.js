var spaceCraft
var star
var UFO
var score
var life
var gameState = "play"
var bullet

function preload(){
  bg=loadImage("images/space.jpg")
  spaceCraftImg = loadImage("images/spaceCraft.png")
  starImg = loadImage("images/star.png")
  asteroidImg = loadImage("images/asteroid.png")
  UFO1Img = loadImage("images/UFO1.png")
  UFO2Img = loadImage("images/UFO2.png")
  UFO3Img = loadImage("images/UFO3.png")
  UFO4Img = loadImage("images/UFO4.png")
  UFO5Img = loadImage("images/UFO5.png")
  livesImg = loadImage("images/lives.png")
  bulletImg = loadImage("images/bullet.png")
}


function setup() {
  createCanvas(1000, 600);

  score = 0
  life = 3
  spaceCraft = createSprite(500,500)
  spaceCraft.addImage("spaceCraft",spaceCraftImg)
  spaceCraft.scale=0.5
 
  spark1 = createSprite(80,36,20,20)
  spark1.addImage("lives",livesImg)
  spark1.scale=0.1

  spark2 = createSprite(120,36,20,20)
  spark2.addImage("lives",livesImg)
  spark2.scale=0.1

  spark3 = createSprite(160,36,20,20)
  spark3.addImage("lives",livesImg)
  spark3.scale=0.1

  starGroup = new Group()
  asteroidGroup = new Group()
  UFOgroup = new Group()
  bulletGroup = new Group()
}

function draw() {
  background(bg);

  drawSprites()

  textSize(25)
  fill("white")
  text("SCORE:"+score,840,36)

if (gameState==="play"){

  if(life===3){
    spark1.visible=true
    spark2.visible=true
    spark3.visible=true
  }

  if(life===2){
    spark1.visible=true
    spark2.visible=true
    spark3.visible=false
  }

  if(life===1){
    spark1.visible=true
    spark2.visible=false
    spark3.visible=false
  }
  
  if(life===0){
    spark1.visible=false
    spark2.visible=false
    spark3.visible=false
    gameState="end"
  }

  if(keyDown(RIGHT_ARROW)){
    spaceCraft.x +=6
 }

 if(keyDown(LEFT_ARROW)){
   spaceCraft.x -=6
}

if(starGroup.isTouching(spaceCraft)){
  starGroup[0].destroy()
  score+=20
}

if(asteroidGroup.isTouching(spaceCraft)){
   asteroidGroup[0].destroy()
   life-=1
}

spawnStars()

spawnAsteroids()

spawnUFOs()

if(UFOgroup.isTouching(spaceCraft)){
  UFOgroup[0].destroy()
  gameState="end"
}

if(keyDown(UP_ARROW)){
  bullet = createSprite(spaceCraft.x,spaceCraft.y,10,10)
  bullet.addImage("bullet",bulletImg)
  bullet.scale=0.1
  bullet.velocityY=-8

  
}
}


if (gameState==="end"){
 text("GAME OVER",250,250)
}

  
  
 }

function spawnStars(){

  if(frameCount%90===0){
    star=createSprite(random(0,1000),5,10,10)
    star.addImage("star",starImg)
    star.velocityY=7
    star.scale=0.07

    star.lifetime=80
    starGroup.add(star)
  }
}

function spawnAsteroids(){

  if(frameCount%100===0){
    asteroid=createSprite(random(0,1000),5,10,10)
    asteroid.addImage("asteroid",asteroidImg)
    asteroid.velocityY=9
    asteroid.scale=0.35
    asteroid.debug=true
    asteroid.setCollider("circle",0,0,5.0)
    asteroid.lifetime=80;
    asteroidGroup.add(asteroid)
  }
}


function spawnUFOs(){

  if(frameCount%150===0){
    UFO=createSprite(random(0,1000),5,10,10)

  var rand=Math.round(random(1,5))
  
  switch(rand){
      case 1:
        UFO.addImage("UFO1",UFO1Img)
        break
      case 2:
        UFO.addImage("UFO2",UFO2Img)
        break
      case 3:
        UFO.addImage("UFO3",UFO3Img)
        break
      case 4:
        UFO.addImage("UFO4",UFO4Img)
         break
      case 5:
        UFO.addImage("UFO5",UFO5Img)
        break

  }

      UFO.debug=true
      UFO.setCollider("circle",0,0,5.0)
     
    //asteroid.addImage("asteroid",asteroidImg)
    UFO.velocityY=8
    UFO.scale=0.3 

    UFO.lifetime=80
  
    UFOgroup.add(UFO)
  }

}
