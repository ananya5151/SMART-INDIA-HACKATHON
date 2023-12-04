let lastPaintTime = 0;
let speed = 5;
let inputDir = { x: 0, y: 0 };
let box = document.getElementById("box");
let scoreElement = document.getElementById("score");
let resultsElement = document.getElementById("results");
let snake = [{ x: 8, y: 8 }];
let score = 0;
let logos = [
    { name: "GREAT", description: "MEET THE RIGHT TO FOOD", image: "1.png" },
    { name: "GREAT", description: "MEET THE RIGHT TO EDUCATION", image: "2.png" },
    { name: "GREAT", description: "MEET THE RIGHT TO RELIGION", image: "3.png" },
    { name: "GREAT", description: "MEET THE RIGHT TO PRIVACY", image: "4.png" },
    { name: "GREAT", description: "MEET THE RIGHT TO DISABILITY BENEFIT", image: "5.png" },
    { name: "GREAT", description: "MEET THE RIGHT TO PROTECTION AGAINST VIOLENCE", image: "6.png" },
    { name: "GREAT", description: "MEET THE RIGHT TO ADOPTION", image: "7.png" },
    { name: "GREAT", description: "MEET THE RIGHT TO PLAY", image: "8.png" },
    { name: "GREAT", description: "MEET THE RIGHT TO CLOTHING", image: "9.png" },
    { name: "GREAT", description: "MEET THE RIGHT TO IDENTITY", image: "10.png" },
    { name: "GREAT", description: "MEET THE RIGHT TO HAVE A SAFE HOME", image: "11.png" },
    { name: "GREAT", description: "MEET THE RIGHT TO EDUCATION", image: "12.png" },
    // Add more logos with descriptions
];

let food = createFood();

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    game();
}

function game() {
    if (collide()) {
        inputDir = { x: 0, y: 0 };
        snake = [{ x: 8, y: 8 }];
        window.alert("Game Over, Press any key to continue");
        displayResults();
        score = 0;
        scoreElement.innerHTML = "Score is: " + score;
    }

    if (snake[0].x == food.food.x && snake[0].y == food.food.y) {
        console.log("Eating Food");
        snake.unshift({ x: snake[0].x + inputDir.x, y: snake[0].y + inputDir.y });
        score += 1;
        scoreElement.innerHTML = "Score is: " + score;

        // Display results when the snake eats a logo
        displayResults();

        // Remove the current food element
        food.element.remove();

        // Store the current food element
        currentFoodElement = null;

        // Generate a new food element
        food = createFood();
    }

    for (let i = snake.length - 1; i > 0; i--) {
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
    }
    snake[0].x += inputDir.x;
    snake[0].y += inputDir.y;

    // Clear only the previous snake elements
    document.querySelectorAll('.snake').forEach(e => e.remove());

    // Displaying food and snake
    box.appendChild(food.element);

    snake.forEach((e, i) => {
        let snakePos = document.createElement("div");
        snakePos.style.gridRowStart = e.y;
        snakePos.style.gridColumnStart = e.x;
        if (i === 0) {
            snakePos.classList.add("head");
        } else {
            snakePos.classList.add("body");
        }
        snakePos.classList.add("snake");
        box.appendChild(snakePos);
    });
}

function createFood() {
    let newFood;

    // Loop until a suitable position for food is found
    do {
        newFood = { x: Math.round(2 + 16 * Math.random()), y: Math.round(2 + 16 * Math.random()) };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));

    // Create a new div for the food with background image
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = newFood.y;
    foodElement.style.gridColumnStart = newFood.x;
    foodElement.classList.add("food");

    // Use the current logo in the logos array
    let currentLogo = logos[score % logos.length];

    foodElement.style.backgroundImage = `url('${currentLogo.image}')`;

    // Return the new food and its element
    return { food: newFood, element: foodElement };
}

function collide() {
    if (snake[0].x < 0 || snake[0].x > 18 || snake[0].y < 0 || snake[0].y > 18) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;
}

function displayResults() {
    resultsElement.innerHTML = "";

    for (let i = 0; i < score; i++) {
        let logo = logos[i % logos.length];

        let resultItem = document.createElement("div");
        resultItem.innerHTML = `Round ${i + 1}: ${logo.name} - ${logo.description}`;
        resultsElement.appendChild(resultItem);
    }
}

window.requestAnimationFrame(main);

window.addEventListener("keydown", (e) => {
    inputDir = { x: 0, y: 1 };
    switch (e.key) {
        case "ArrowUp":
            console.log("up");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("down");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("left");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("right");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});
