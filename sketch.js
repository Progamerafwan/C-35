var ball;
var database, ballPos;
var position;

function setup(){
    createCanvas(500,500);

    database = firebase.database();
    console.log(database);

    ball = createSprite(250,250,15,15);
    ball.shapeColor = "green";

    ballPos = database.ref('ball/position');
    ballPos.on("value",readPosition,showError);
}

function draw(){
    background("purple");

    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);// ball.x = ball.x - 1;
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);// ball.x = ball.x + 1;
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);// ball.y = ball.y - 1;
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);// ball.y = ball.y + 1;
    }

    drawSprites();
}

function writePosition(x,y){
    database.ref('ball/position').set({
        //ball.x = ball.x + x;
        //ball.y = ball.y + y;

        x: position.x + x ,
        y: position.y + y ,
    })
}

function readPosition(data) {
    position = data.val();
    console.log(position);

    ball.x = position.x;
    ball.y = position.y;
}

function showError() {
  console.log ("Error in the database");
}