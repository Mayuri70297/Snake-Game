window.onload=function(){
var cvs=document.getElementById("canvas");
var ctx=cvs.getContext("2d");

var snakeW=10;
var snakeH=10;
var dir="right";
var score=0;

//control direction
document.addEventListener("keydown",dirControl);

function dirControl(event){
    if(event.keyCode==37 && dir!="right"){
        dir="left";
    }else if(event.keyCode==38 && dir!="down"){
        dir="up";
    }else if(event.keyCode==39 && dir!="left"){
        dir="right";
    }else if(event.keyCode==40 && dir!="up"){
        dir="down";
    }
}

function drawSnake(x,y){
//ctx=document.getElementById("canvas").getContext("2d")
ctx.fillStyle="#053017";
ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);   //x-axis,y-axis,width,height
ctx.fillStyle="#000";
ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);
}

//crate snake
var len=4;
var snake=[];
for(var i=len-1;i>=0;i--){
    snake.push({
        x:i,
        y:0
    }); 
}

//Create food
var food={
    x:Math.round(Math.random()*(cvs.width/snakeW-2)+1),   //math.round:floating value will be rounded i.e 2.4=2,2.5=3,2.6=3 like wise
    y:Math.round(Math.random()*(cvs.height/snakeH-2)+1)    //math.random methos can take any value randomly.
}

//draw food
function drawFood(x,y){
    ctx.fillStyle="#ff0062";
    ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);  
    ctx.fillStyle="#000";
    ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH); 
}

//check collision
function checkCollision(x,y,array){
    for(var i=0;i<array.length;i++){
        if(x==array[i].x && y==array[i].y){
            return true;
        }
    }return false;
}

//score
function drawScore(x){
    ctx.fillStyle="#000";
    ctx.font="20px verdana";
    ctx.fillText("SCORE : "+x, 5, cvs.height-5);
}

//draw function
function draw(){
    ctx.clearRect(0,0,cvs.width,cvs.height);
    for(var i=0;i<snake.length;i++){
        var x=snake[i].x;
        var y=snake[i].y;
        drawSnake(x,y);
    }
drawFood(food.x,food.y);

//snakehead
var snakeX=snake[0].x;
var snakeY=snake[0].y;

if(dir=="right"){snakeX++}
else if(dir=="left"){snakeX--}
else if(dir=="up"){snakeY--}
else if(dir=="down"){snakeY++}

if(snakeX<0 || snakeY<0 || snakeX>=cvs.width/snakeW || snakeY>=cvs.height/snakeH || checkCollision(snakeX,snakeY,snake)){
    clearInterval(game);
    document.getElementById("end").style.visibility="visible";
}

if(snakeX==food.x && snakeY==food.y){
    food={
        x:Math.round(Math.random()*(cvs.width/snakeW-2)+1),
        y:Math.round(Math.random()*(cvs.height/snakeH-2)+1)
    } 
    var newHead={
        x:snakeX,
        y:snakeY
    };
    score++;
}else{
    snake.pop();
    var newHead={
        x:snakeX,
        y:snakeY
    };
}
snake.unshift(newHead);
drawScore(score);
}//end draw function
game=setInterval(draw,100);
}