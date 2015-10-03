// var canvas = document.getElementById("myCanvas");
// var ctx = canvas.getContext("2d");

// var x = canvas.width/2;
// console.log(x);
// var y = canvas.height-30;
// console.log(y);
// var dx = -1; // - is left + is right
// var dy = -2; // negative is up and positive is down
// var ballRadius = 10;
// var ballColor = "rgb(0,0,128)";

// // paddle
// var paddleHeight = 10;
// var paddleWidth = 75;
// var paddleX = (canvas.width-paddleWidth)/2;
// var rightPressed = false;
// var leftPressed = false;

// document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);

// function keyDownHandler(e) {
//     if(e.keyCode == 39) {
//         rightPressed = true;
//     }
//     else if(e.keyCode == 37) {
//         leftPressed = true;
//     }
// }
// function keyUpHandler(e) {
//     if(e.keyCode == 39) {
//         rightPressed = false;
//     }
//     else if(e.keyCode == 37) {
//         leftPressed = false;
//     }
// }



// function drawBall() {
//     ctx.beginPath();
//     ctx.arc(x, y, ballRadius, 0, Math.PI*2);
//     ctx.fillStyle = changeBallColor();
//     ctx.fill();
//     ctx.closePath();
// }

// function drawPaddle() {
//     ctx.beginPath();
//     ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
//     ctx.fillStyle = "#0095DD";
//     ctx.fill();
//     ctx.closePath();
// }

// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     // call the draw ball after it clears
//     drawBall();
    
//     // top edge starts at 0 bottom edge starts at 480
//     if(y + dy > canvas.height || y + dy < 0) {
//     	dy = -dy;
//     	changeBallColor();
// 	}
// 	// if either of the steps above is true reverse the ball

	
// 	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
//     	dx = -dx;
//     	changeBallColor();
// 	}
// 	if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
// 	    dy = -dy;
// 	    changeBallColor();
// 	}

// 	//measuring by ball radius
// 	//Subtracting the radius from one edge's width and adding it onto the other gives us the impression of the proper collision detection 
// 	//
// 	x += dx;
//     y += dy;
// }

// function changeBallColor() {
// 	var random = Math.floor(Math.random() *255);
// 	return "rgb(0,0,random)"
// }
// setInterval(draw, 20);



var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var speed = 100;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var bricks = [];
var lives;
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function drawLives() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("lives: " + lives, canvas.width - 65, 20);
}


function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
        	var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
			var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = 0;
            bricks[c][r].y = 0;
            ctx.beginPath();
            ctx.rect(0, 0, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}

function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: " + score, 8 ,20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
   
    if(y + dy <ballRadius) {
    	dy = -dy;
    } else if(y + dy > canvas.height - ballRadius) {
    	console.log(y , dy);
    	if(x > paddleX && x <paddleX + paddleWidth) {
    		console.log('x',x, paddleX)
    		speed = speed *=2;
    		dy = -dy;
    		console.log('speed', speed);
    	} 
    	else {
	    	lives--;
			if(!lives) {
			    alert("GAME OVER");
			    document.location.reload();
			}
			else {
			    x = canvas.width/2;
			    y = canvas.height-30;
			    dx = 2;
			    dy = -2;
			    paddleX = (canvas.width-paddleWidth)/2;
			}
    		
    	}
    } 

    
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    
    x += dx;
    y += dy;
}

setInterval(draw, speed);


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var lives = 3;

var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;

                    if(score == brickRowCount * brickColumnCount) {
                    	alert("YOu win, Congratulations");
                    	document.location.reload();
                    }
                }
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// 


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
    drawScore();
    drawLives();
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
        }
    }
    
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    
    x += dx;
    y += dy;
    // calls itself over and over again
requestAnimationFrame(draw);

}

draw();
