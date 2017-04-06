/**
 * Created by Kabir on 4/4/2017.
 */

N = 1
S = 2
E = 4
W = 8
dirs = ['N', 'S', 'E', 'W']
dirsValue = {N : N, S : S, E : E, W : W}
DX = {E : 1, W : -1, N : 0, S : 0}
DY = {E : 0, W : 0, N : -1, S : 1}
OPPOSITE = {E : W, W : E, N : S, S : N}

var gameBoard;
var context;
var circle;
var start;
var end;
var horizontalWalls;
var verticalWalls;
var grid;
var height;
var width;

$(document).ready(function(){
    gameBoard = document.getElementById("gameBoard");
    context = gameBoard.getContext("2d");
    context.translate(0.5, 0.5);

    height = 10;
    width = 20;

    grid = new Array(height);
    for(var i = 0; i <grid.length; ++i) {
        grid[i] = new Array(width);

        for(var j = 0; j < grid[i].length; ++j) {
            grid[i][j] = 0;
        }
    }

    carve_passages_from(0, 0, grid);

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

/* ------------------------------------------------------------ */
function carve_passages_from(cx, cy, grid) {
    var directions = shuffle(dirs)

    directions.forEach(function(direction) {
        var nx = cx + DX[direction]
        var ny = cy + DY[direction]

        if (ny >= 0 && ny < grid.length && nx >= 0
            && nx < grid[0].length && grid[ny][nx] === 0) {
            grid[cy][cx] += dirsValue[direction]
            grid[ny][nx] += OPPOSITE[direction]
            carve_passages_from(nx, ny, grid)
        }
    })
}

function shuffle(o){
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function drawMaze() {
    context.strokeStyle = "#000000";
    context.beginPath();

    for(var row = 0; row < grid.length; ++row) {
        for(var col = 0; col < grid[row].length; ++col) {
            var val = grid[row][col];
            var top = row * gameBoard.height / 10;
            var left = col * gameBoard.width / 20;
            context.moveTo(left, top);

            if(val / W >= 1) {
                val %= W;
            } else {
                context.lineTo(left, top + gameBoard.height / 10);
            }

            if(val / E >= 1) {
                val %= E;
            } else {
                context.moveTo(left + gameBoard.width / 20, top);
                context.lineTo(left + gameBoard.width / 20, top + gameBoard.height / 10);
            }

            if(val / S >= 1) {
                val %= S;
            } else {
                context.moveTo(left, top + gameBoard.height / 10);
                context.lineTo(left + gameBoard.width / 20, top + gameBoard.height / 10);
            }

            if(val < N) {
                context.moveTo(left, top);
                context.lineTo(left + gameBoard.width / 20, top);
            }

            //context.font = "10px Arial";
            //context.fillText(grid[row][col], left + 15, top + 15);
        }
    }

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
    var row = Math.floor(circle.y / (gameBoard.height / 10));
    var col = Math.floor(circle.x / (gameBoard.width / 20));

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



    // if(touchingWall()) {
    //     alert("Oops!");
    //     console.log("Oops!");
    // }

    context.clearRect(-10, -10, gameBoard.width + 10, gameBoard.height + 10);
    drawGrid();
    drawEnd();
    drawMaze();
    drawCircle();

    if(userHasWon()) {
        alert("You win!");
    }
}

function touchingWall() {
    var row = Math.floor(circle.y / (gameBoard.height / 10));
    var col = Math.floor(circle.x / (gameBoard.width / 20));

    if(row != 10 && horizontalWalls[row][col]) {
        if((circle.y - circle.radius < row * gameBoard.height / 10) && (circle.y + circle.radius > row * gameBoard.height / 10)) {
            return true;
        }
    }

    if(col != 20 && verticalWalls[row][col]) {
        if((circle.x - circle.radius < col * gameBoard.width / 20) && (circle.x + circle.radius > col * gameBoard.width / 20)) {
            return true;
        }
    }

    return false;
}

// Source: http://stackoverflow.com/questions/20885297/collision-detection-in-html5-canvas
function userHasWon() {
     return(circle.x - circle.radius > end.x && circle.x + circle.radius < end.x + end.width &&
        circle.y - circle.radius > end.y && circle.y + circle.radius < end.y + end.height);
}
