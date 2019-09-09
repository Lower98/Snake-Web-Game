///
/// Snake Game by Denis
///



const ctx = document.getElementById('snake').getContext('2d');


///Dimensiunea unei patratele.
let box = 25;

/// Snake - ul

let snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box,
    position: 'STAY'
};

/// Scorul

let score = 0;

/// Audio

let dead = new Audio();
    dead.src = "audio/dead.mp3"
let eat = new Audio();
    eat.src = "audio/eat.mp3";
let right = new Audio();
    right.src = "audio/right.mp3";
let left = new Audio();
    left.src = "audio/left.mp3";
let up = new Audio();
    up.src = "audio/up.mp3";
let down = new Audio();
    down.src = "audio/down.mp3";
/// Mancarea

let food = {
    x: Math.floor(Math.random() * 21 + 1) * box,
    y: Math.floor(Math.random() * 20 + 3) * box
}

/// Imaginile

let arena = new Image();
    arena.src = "img/arena.png";
let snake_head_left = new Image();
    snake_head_left.src = "img/snake_head_left.png";
let snake_head_down = new Image();
    snake_head_down.src = "img/snake_head_down.png";
let snake_head_up = new Image();
    snake_head_up.src = "img/snake_head_up.png";
let snake_head_right = new Image();
    snake_head_right.src = "img/snake_head_right.png";
let foodIMG = new Image();
    foodIMG.src = "img/grapes.png";
let snake_stay = new Image();
    snake_stay.src = "img/snake_stay.png";
let coada_orizontala = new Image();
    coada_orizontala.src = "img/coada_orizontala.png";
let coada_verticala = new Image();
    coada_verticala.src = "img/coada_verticala.png";
let snake_sus_dreapta = new Image();
    snake_sus_dreapta.src = "img/snake_sus_dreapta.png";
let snake_dreapta_sus = new Image();
    snake_dreapta_sus.src = "img/snake_dreapta_sus.png";
let snake_dreapta_jos = new Image();
    snake_dreapta_jos.src = "img/snake_dreapta_jos.png";
let snake_stangaa_sus = new Image();
    snake_stangaa_sus.src = "img/snake_stangaa_sus.png";
/// Directia
document.addEventListener("keydown", direction);


let dir = "stay";
function direction(event) {
    const eve = event.keyCode;
    if(eve == 39 && dir != 'LEFT'){
        dir = 'RIGHT';
        right.play();
    }
    if(eve == 37 && dir != 'RIGHT') {
        dir = 'LEFT';
        left.play();
    }
    if(eve == 38 && dir != 'DOWN'){
        dir = 'UP';
        up.play();
    }
    
    if(eve == 40 && dir != 'UP'){
        dir = 'DOWN';
        down.play();
    }
}

function coada(newHead, snake) {
    for(let i = 0; i < snake.length; ++i) {
        if(newHead.x == snake[i].x && newHead.y == snake[i].y)
            return true;
    }
    return false;
}

/// Functia in care afisam pe site.
function draw() {
    ctx.drawImage(arena, 0, 0);
    for(let i = 0; i < snake.length; ++i) {
        if(snake[i].position == "RIGHT" && i == 0)
            ctx.drawImage(snake_head_right, snake[i].x, snake[i].y);
        else if(snake[i].position == "LEFT" && i == 0)
            ctx.drawImage(snake_head_left, snake[i].x, snake[i].y);
        else if(snake[i].position == "UP" && i == 0)
            ctx.drawImage(snake_head_up, snake[i].x, snake[i].y);
        else if(snake[i].position == "DOWN" && i == 0)
            ctx.drawImage(snake_head_down, snake[i].x, snake[i].y);
        else if(dir == "stay")ctx.drawImage(snake_stay, snake[i].x, snake[i].y);
        else if(i != 0){
        
        if(snake[i - 1].position == "RIGHT") {
            if(snake[i].position == "UP")
                ctx.drawImage(snake_sus_dreapta, snake[i].x, snake[i].y);
            if(snake[i].position == "DOWN")
                ctx.drawImage(snake_stangaa_sus, snake[i].x, snake[i].y);
            if(snake[i].position == "LEFT")
                ctx.drawImage(coada_orizontala, snake[i].x, snake[i].y);
            if(snake[i].position == "RIGHT")
                ctx.drawImage(coada_orizontala, snake[i].x, snake[i].y);   
        }
        else if(snake[i - 1].position == "LEFT") {
            if(snake[i].position == "UP")
                ctx.drawImage(snake_dreapta_jos, snake[i].x, snake[i].y);
            if(snake[i].position == "DOWN")
                ctx.drawImage(snake_dreapta_sus, snake[i].x, snake[i].y);
            if(snake[i].position == "LEFT")
                ctx.drawImage(coada_orizontala, snake[i].x, snake[i].y);
            if(snake[i].position == "RIGHT")
                ctx.drawImage(coada_orizontala, snake[i].x, snake[i].y);
        }
        else if(snake[i - 1].position == "UP") {
            if(snake[i].position == "LEFT")
                ctx.drawImage(snake_stangaa_sus, snake[i].x, snake[i].y);
            if(snake[i].position == "RIGHT")
                ctx.drawImage(snake_dreapta_sus, snake[i].x, snake[i].y);
            if(snake[i].position == "DOWN")
                ctx.drawImage(coada_verticala, snake[i].x, snake[i].y);
            if(snake[i].position == "UP")
                ctx.drawImage(coada_verticala, snake[i].x, snake[i].y);
        }
        else if(snake[i - 1].position == "DOWN") {
            if(snake[i].position == "LEFT")
                ctx.drawImage(snake_sus_dreapta, snake[i].x, snake[i].y);
            if(snake[i].position == "RIGHT")
                ctx.drawImage(snake_dreapta_jos, snake[i].x, snake[i].y);
            if(snake[i].position == "DOWN")
                ctx.drawImage(coada_verticala, snake[i].x, snake[i].y);
            if(snake[i].position == "UP")
                ctx.drawImage(coada_verticala, snake[i].x, snake[i].y);
        }
        }
    }
    ctx.drawImage(foodIMG, food.x, food.y);
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    let snakePos = snake[0].position;

    if(dir != "stay"){

    if(dir == 'RIGHT'){
        snakeX += box;
    }
    else if(dir == 'LEFT'){
        snakeX -= box;
    }
    else if(dir == 'UP'){
        snakeY -= box;
    }
    else if(dir == 'DOWN'){
        snakeY += box;
    }
    snakePos = dir;
    let newHead = {
        x: snakeX,
        y: snakeY, 
        position: snakePos
    };

    if(snakeX == food.x && snakeY == food.y) {
        ++score;
        food.x = Math.floor(Math.random() * 20 + 1) * box;
        food.y = Math.floor(Math.random() * 19 + 3) * box;
        if(food.x >= 20*box)
            food.x = 20*box;
        if(food.x <= 2*box)
            food.x = 2 * box;
        if(food.y <= 3 * box)
            food.y = 3 * box;
        if(food.y >= 24 * box)
            food.y = 22 * box;
        eat.play();
    }
    else snake.pop();

    if(snakeX < box || snakeX >= 21*box || snakeY <= 2*box || snakeY >= 23*box || coada(newHead, snake)){
        document.getElementById('button-pauza').style.display = 'none';
        document.getElementById('button-resetare').style.display = 'inline-block';
        document.getElementById('button-start').style.display = 'none';
        clearInterval(game);
        dead.play();
    }


    snake.unshift(newHead);
}
    ctx.fillStyle = "white";
    ctx.font = "30px Changa one";
    ctx.fillText(score,3.2*box,1.8*box);
}

let game = setInterval(draw, 80);

///Button inceput

document.getElementById('button').addEventListener('click', function() {

    document.getElementById('snake').style.display = 'inline-block'; 
    document.getElementById('button').style.display = 'none'; 
    document.getElementById('button-pauza').style.display = 'inline-block';
});

/// Buton pauza

document.getElementById('button-pauza').addEventListener('click', function() {

    document.getElementById('button-pauza').style.display = 'none';
    document.getElementById('button-start').style.display = 'inline-block';
    clearInterval(game);
});

/// Buton start

document.getElementById('button-start').addEventListener('click', function() {

    document.getElementById('button-pauza').style.display = 'inline-block';
    document.getElementById('button-start').style.display = 'none';
    game = setInterval(draw, 80);
});

/// Buton restart
document.getElementById('button-resetare').addEventListener("click", function() {
    document.getElementById('button-pauza').style.display = 'inline-block';
    document.getElementById('button-resetare').style.display = 'none';
    clearInterval(game);
    snake = [];
    dir = 'stay';
    score = 0;
    snake[0] = {
        x: 9 * box,
        y: 10 * box,
        position: 'stay'
    };
    game = setInterval(draw, 80);
});


///
/// Sfarsit joc.
///