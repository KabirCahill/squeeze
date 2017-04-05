/**
 * Created by Kabir on 4/4/2017.
 */
var gameBoard;
var context;
var circle;
var start;
var end;
var horizontalWalls;
var verticalWalls;

$(document).ready(function(){
    gameBoard = document.getElementById("gameBoard");
    context = gameBoard.getContext("2d");
    context.translate(0.5, 0.5);

    circle = {
        radius: 10,
        x: gameBoard.width / 40,
        y: gameBoard.height / 20,
        color: "#ff0000"
    }

    start = document.getElementById("start");

    end = {
        width: gameBoard.width / 20,
        height: gameBoard.height / 10,
        x: gameBoard.width / 20 * 9,
        y: gameBoard.height / 10 * 5,
        color: "#ffff00"
    }

    buildMaze();

    drawGrid();
    drawEnd();
    drawMaze();
    drawCircle();

    start.addEventListener("click", function(event) {
        gameBoard.addEventListener("mousemove", function(event) {
            moveCircle(event);
        });
    });
});

function drawGrid() {
    context.strokeStyle = "#efefef";
    context.beginPath();

    for(var i = gameBoard.width / 20; i < gameBoard.width; i += gameBoard.width / 20) {
        context.moveTo(i, 0);
        context.lineTo(i, gameBoard.height);
    }

    for(var i = gameBoard.height / 10; i < gameBoard.height; i += gameBoard.height / 10) {
        context.moveTo(0, i);
        context.lineTo(gameBoard.width, i);

    }

    context.stroke();
}

function buildMaze() {
    horizontalWalls = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]
    ];

    verticalWalls = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]
    ];
}

function drawMaze() {

    context.fillStyle = "#000000";
    context.strokeStyle = "#000000";
    context.beginPath();

    // build horizontal walls
    for(var i = 0; i < horizontalWalls.length; ++i) {
        context.moveTo(0, (i + 1) * gameBoard.height / 10);

        for(var j = 0; j < horizontalWalls[0].length; ++j) {
            if(horizontalWalls[i][j]) {
                context.lineTo((j + 1) * gameBoard.width / 20, (i + 1) * gameBoard.height / 10);
            } else {
                context.moveTo((j + 1) * gameBoard.width / 20,  (i + 1) * gameBoard.height / 10);
            }
        }
    }

    // build vertical walls
    for(var j = 0; j < verticalWalls[0].length; ++j) {
        context.moveTo((j + 1) * gameBoard.width / 20, 0);

        for(var i = 0; i < verticalWalls.length; ++i) {
            if(verticalWalls[i][j]) {
                context.lineTo((j + 1) * gameBoard.width / 20, (i + 1) * gameBoard.height / 10);
            } else {
                context.moveTo((j + 1) * gameBoard.width / 20,  (i + 1) * gameBoard.height / 10);
            }
        }
    }

    /*
    context.moveTo(0, gameBoard.height / 10);
    context.lineTo(gameBoard.width / 20 * 19, gameBoard.height / 10);
    context.lineTo(gameBoard.width / 20 * 19, gameBoard.height / 10 * 9);

    context.moveTo(gameBoard.width / 20 * 18, gameBoard.height);
    context.lineTo(gameBoard.width / 20 * 18, gameBoard.height / 10 * 2);

    context.moveTo(gameBoard.width / 20 * 17, gameBoard.height / 10);
    context.lineTo(gameBoard.width / 20 * 17, gameBoard.height / 10 * 9);
    context.lineTo(gameBoard.width / 20 * 1, gameBoard.height / 10 * 9);

    context.moveTo(gameBoard.width / 20 * 16, gameBoard.height / 10 * 2);
    context.lineTo(gameBoard.width / 20 * 16, gameBoard.height / 10 * 8);
    context.lineTo(gameBoard.width / 20 * 14, gameBoard.height / 10 * 8);
    context.lineTo(gameBoard.width / 20 * 14, gameBoard.height / 10 * 2);
    context.lineTo(gameBoard.width / 20, gameBoard.height / 10 * 2);
    context.lineTo(gameBoard.width / 20, gameBoard.height / 10 * 4);
    context.lineTo(gameBoard.width / 20 * 8, gameBoard.height / 10 * 4);

    context.moveTo(gameBoard.width / 20 * 15, gameBoard.height / 10);
    context.lineTo(gameBoard.width / 20 * 15, gameBoard.height / 10 * 7);

    context.moveTo(gameBoard.width / 20 * 2, gameBoard.height / 10 * 3);
    context.lineTo(gameBoard.width / 20 * 13, gameBoard.height / 10 * 3);

    context.moveTo(gameBoard.width / 20 * 9, gameBoard.height / 10 * 3);
    context.lineTo(gameBoard.width / 20 * 9, gameBoard.height / 10 * 8);

    context.moveTo(0, gameBoard.height / 10 * 5);
    context.lineTo(gameBoard.width / 20 * 13, gameBoard.height / 10 * 5);

    context.moveTo(gameBoard.width / 20 * 14, gameBoard.height / 10 * 4);
    context.lineTo(gameBoard.width / 20 * 10, gameBoard.height / 10 * 4);

    context.moveTo(gameBoard.width / 20 * 13, gameBoard.height / 10 * 9);
    context.lineTo(gameBoard.width / 20 * 13, gameBoard.height / 10 * 7);

    context.moveTo(gameBoard.width / 20 * 14, gameBoard.height / 10 * 6);
    context.lineTo(gameBoard.width / 20 * 9, gameBoard.height / 10 * 6);

    context.moveTo(gameBoard.width / 20, gameBoard.height / 10 * 9);
    context.lineTo(gameBoard.width / 20, gameBoard.height / 10 * 6);
    context.lineTo(gameBoard.width / 20 * 8, gameBoard.height / 10 * 6);
    context.lineTo(gameBoard.width / 20 * 8, gameBoard.height / 10 * 7);

    context.moveTo(gameBoard.width / 20 * 12, gameBoard.height / 10 * 6);
    context.lineTo(gameBoard.width / 20 * 12, gameBoard.height / 10 * 8);

    context.moveTo(gameBoard.width / 20 * 11, gameBoard.height / 10 * 9);
    context.lineTo(gameBoard.width / 20 * 11, gameBoard.height / 10 * 7);
    context.lineTo(gameBoard.width / 20 * 10, gameBoard.height / 10 * 7);

    context.moveTo(gameBoard.width / 20 * 10, gameBoard.height / 10 * 8);
    context.lineTo(gameBoard.width / 20 * 2, gameBoard.height / 10 * 8);
    context.lineTo(gameBoard.width / 20 * 2, gameBoard.height / 10 * 7);
    context.lineTo(gameBoard.width / 20 * 7, gameBoard.height / 10 * 7);
    context.lineTo(gameBoard.width / 20 * 7, gameBoard.height / 10 * 8);

    context.moveTo(gameBoard.width / 20 * 10, gameBoard.height / 10 * 8);
*/
    context.stroke();
}

function drawEnd() {
    context.beginPath();
    context.fillStyle = end.color;
    context.fillRect(end.x, end.y, end.width, end.height);
}

function drawCircle() {
    context.beginPath();
    context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    context.fillStyle = circle.color;
    context.fill();
    context.strokeStyle = "#000000";
    context.stroke();
}

function moveCircle(e) {
    var rect = gameBoard.getBoundingClientRect();
    circle.x = e.clientX - rect.left;
    circle.y = e.clientY - rect.top;

    // check if circle has reached left or right boundary
    if(circle.x + circle.radius > gameBoard.width) {
        circle.x = gameBoard.width - circle.radius;
    } else if (circle.x - circle.radius < 0) {
        circle.x = circle.radius;
    }

    // check if circle has reached top or bottom boundary
    if(circle.y + circle.radius > gameBoard.height) {
        circle.y = gameBoard.height - circle.radius;
    } else if (circle.y - circle.radius < 0) {
        circle.y = circle.radius;
    }

    context.clearRect(-10, -10, gameBoard.width + 10, gameBoard.height + 10);
    drawGrid();
    drawEnd();
    drawMaze();
    drawCircle();

    if(userHasWon()) {
        alert("You win!");
    }
}

// Source: http://stackoverflow.com/questions/20885297/collision-detection-in-html5-canvas
function userHasWon() {
     return(circle.x - circle.radius > end.x && circle.x + circle.radius < end.x + end.width &&
        circle.y - circle.radius > end.y && circle.y + circle.radius < end.y + end.height);
}
