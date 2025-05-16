let start;
let gameRunning = false;
let shapeTimeout;
let reactionTimes = [];

const shape = document.getElementById("shape");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const reactionTimeDisplay = document.getElementById("reactionTimeDisplay");
const gameArea = document.getElementById("gameArea");

shape.style.display = "none";

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function move() {
    if (!gameRunning) return;

    const shapeSize = (Math.random() * 30) + 20;
    const areaRect = gameArea.getBoundingClientRect();
    const maxLeft = areaRect.width - shapeSize;
    const maxTop = areaRect.height - shapeSize;

    const left = Math.random() * maxLeft;
    const top = Math.random() * maxTop;
    const clr = getRandomColor();

    shape.style.left = left + "px";
    shape.style.top = top + "px";
    shape.style.width = shapeSize + "px";
    shape.style.height = shapeSize + "px";
    shape.style.backgroundColor = clr;
    shape.style.display = "block";

    start = new Date().getTime();
}

startBtn.onclick = function () {
    gameRunning = true;
    startBtn.style.display = "none";
    stopBtn.style.display = "inline";
    reactionTimeDisplay.textContent = "⏱️ Reaction Time: --";
    shapeTimeout = setTimeout(move, Math.random() * 1000 + 2000);
};

stopBtn.onclick = function () {
    gameRunning = false;
    shape.style.display = "none";
    clearTimeout(shapeTimeout);
    stopBtn.style.display = "none";
    startBtn.style.display = "inline";
    if (reactionTimes.length > 0) {
        const averageTime = reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;
        reactionTimeDisplay.textContent = `⏱️ Average Reaction Time: ${averageTime.toFixed(2)} seconds!`;
    }
};

shape.onclick = function () {
    if (!gameRunning) return;
    const end = new Date().getTime();
    const timeTaken = (end - start) / 1000;
    reactionTimes.push(timeTaken);
    reactionTimeDisplay.textContent = `⏱️ Reaction Time: ${timeTaken.toFixed(2)} seconds!`;
    setTimeout(function() {
        shape.style.display = "none";
        shapeTimeout = setTimeout(move, Math.random() * 500 + 500);
    }, 1000);
};
