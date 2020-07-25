let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 16;
let arenaSide = 512;
let arenaPixels = arenaSide / box;
let snake = [];
let score;

// // Define a Posição Inicial
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    context.fillStyle = "#9db08c";
    context.fillRect(0, 0, arenaPixels * box, arenaPixels * box);
}

function criarCobrinha() {
    for(i=0; i < snake.length; i++) {
        context.fillStyle = "#233312";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    context.fillStyle = "#607350";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

score = 0;
function iniciarJogo() {
    // Cria o efeito Pac-Man
    if (snake[0].x > (arenaPixels -1) * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = arenaPixels * box;
    if (snake[0].y > (arenaPixels - 1) * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = arenaPixels * box;

    // Cria a condição de Fim de Jogo caso a Cobrinha choque-se contra si mesma
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert("Game Over :(\nVocê fez " + score + " pontos!");
        }
    }
    
    criarBG();
    criarCobrinha();
    drawFood();
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    /*
     * A Cobrinha é um array, 
     * o movimento consiste em remover o último elemento, e criar uma nova cabeça a frente
     */

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    }
    else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        score++;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
    
    // Imprime a Pontuação na tela
    document.getElementById('score').innerHTML = "<h2>" + score + " Pontos</h2>";
}

let jogo = setInterval(iniciarJogo, 80);