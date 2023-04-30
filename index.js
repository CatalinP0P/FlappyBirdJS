var canvas;
var context;
var gameLoop;
var bird;
var backgroundImage = document.getElementById("background");
var groundImage = document.getElementById("ground");

var score = 0;
var secondCount = 0;
var obstacleFrequency = 2000;
const obstacleList = [];

var groundImageX = 0;


function drawBackground()
{
    groundImage.width = canvas.width;
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

function drawGround()
{
    groundImage.height = groundImage.width / 3;
    context.drawImage(groundImage, groundImageX, canvas.height - groundImage.height, groundImage.width, groundImage.height )
    context.drawImage(groundImage, groundImageX + canvas.width, canvas.height - groundImage.height, groundImage.width, groundImage.height);
}


function GameLoop()
{
    gameLoop = setInterval(function()
    {   
        if ( bird.dead  ) clearInterval(gameLoop);
        secondCount += 20;
        context.reset();
        drawBackground();
        obstacleList.forEach(obstacle =>
        {
            obstacle.move();
            obstacle.show();  
        })
        drawGround();
        groundImageX -= new Obstacle().speed;
        if ( groundImageX < -1 * canvas.width )
            groundImageX = 0;
        

        bird.update();
        bird.show();
        bird.checkForCollision();

        if ( secondCount % obstacleFrequency == 0 )
        {
            var obstacle = new Obstacle();
            obstacleList.push(obstacle);
        }

    }, 20)
}

function StartGame()
{
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    canvas.width = 500;
    canvas.height = 900;
    bird = new Bird();
    context.reset();

    secondCount = 0;
    score = 0;

    var obstacle = new Obstacle();
    obstacleList.length = 0;
    obstacleList.push(obstacle);

    document.getElementById("scoreLabel").innerText = 0;

    GameLoop();
}

window.addEventListener("load", () =>
{
    StartGame();
})

window.addEventListener("keydown", e =>
{
    if ( e.code == "Space" )
    {
        if ( bird.dead ) StartGame();
        else
            bird.jump();
    }
})

window.addEventListener("click", e =>
{
    if ( bird.dead ) StartGame();
        else
            bird.jump();
})