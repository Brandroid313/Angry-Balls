// Example is based on examples from: http://brm.io/matter-js/, https://github.com/shiffman/p5-matter


var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Constraint = Matter.Constraint;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;

var engine;
var propeller;
var boxes = [];
var birds = [];
var colors = [];
var ground;
var slingshotBird, slingshotConstraint;
var angle=0;
var angleSpeed=0;
var canvas;
var countdown = 60;
var Width = 1000;
var Height = 600;
////////////////////////////////////////////////////////////
function setup() {
  canvas = createCanvas(Width, Height);

  engine = Engine.create();  

  setupGround();

  setupPropeller();

  setupTower();

  setupSlingshot();

  setupMouseInteraction();
}
////////////////////////////////////////////////////////////
function draw() {
  
  background(0);

  Engine.update(engine);

  drawGround();
  drawPropeller();
  drawTower();
  drawBirds();
  drawSlingshot();    
  gameOver();

}
////////////////////////////////////////////////////////////
//use arrow keys to control propeller
function keyPressed(){
  if (keyCode == LEFT_ARROW){
    //your code here
    angleSpeed -= 0.01;
  }
  else if (keyCode == RIGHT_ARROW){
    //your code here
    angleSpeed += 0.01;
  }
}
////////////////////////////////////////////////////////////
function keyTyped(){
  //if 'b' create a new bird to use with propeller
  if (key==='b'){
    setupBird();
  }

  //if 'r' reset the slingshot
  if (key==='r'){
    removeFromWorld(slingshotBird);
    removeFromWorld(slingshotConstraint);
    setupSlingshot();
  }
}

//**********************************************************************
//  HELPER FUNCTIONS 
//**********************************************************************

//if mouse is released destroy slingshot constraint so that
//slingshot bird can fly off
function mouseReleased(){
  setTimeout(() => {
    slingshotConstraint.bodyB = null;
    slingshotConstraint.pointA = { x: 0, y: 0 };
  }, 100);
}
////////////////////////////////////////////////////////////
//tells you if a body is off-screen
function isOffScreen(body){
  var pos = body.position;
  return (pos.y > height || pos.x < -15 || pos.x > width + 30);
}
////////////////////////////////////////////////////////////
//removes a body from the physics world
function removeFromWorld(body) {
  World.remove(engine.world, body);
}
////////////////////////////////////////////////////////////
function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}
////////////////////////////////////////////////////////////
function drawConstraint(constraint) {
  push();
  var offsetA = constraint.pointA;
  var posA = {x:0, y:0};
  if (constraint.bodyA) {
    posA = constraint.bodyA.position;
  }
  var offsetB = constraint.pointB;
  var posB = {x:0, y:0};
  if (constraint.bodyB) {
    posB = constraint.bodyB.position;
  }
  strokeWeight(5);
  stroke(255);
  line(
    posA.x + offsetA.x,
    posA.y + offsetA.y,
    posB.x + offsetB.x,
    posB.y + offsetB.y
  );
  pop();
}

function gameOver(){
    push();
    textSize(32);
    fill(255, 0, 0);
    text('Time left: ' + countdown, 0, 50);
    pop(); 
    if(frameCount % 60 == 0){
        countdown --;
    }
    
    if(countdown < 0){
        textSize(150);
        fill(255, 0, 50);
        text('You Lose!!!', (width / 5) , height / 2);
        noLoop();
    }
    
    if(boxes.length == 0){
        textSize(150);
        fill(0, 102, 153);
        text('You Win!!!', (width / 5) , height / 2);
        noLoop();
    }
}
