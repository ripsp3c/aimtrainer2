const gameArea = document.getElementById('game-area');
const startBtn = document.getElementById('start-btn');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const rankDisplay = document.getElementById('rank');
const gameTimeInput = document.getElementById('game-time');
const targetSizeInput = document.getElementById('target-size');

let score = 0;
let timeLeft = 0;
let gameActive = false;
let targetSize = 50;

// Rank system based on score
function getRank(score) {
    if (score <= 10) return "Rookie";
    else if (score <= 20) return "Amateur";
    else if (score <= 30) return "Skilled";
    else if (score <= 40) return "Pro";
    else if (score <= 50) return "Elite";
    else return "Legend";
}

startBtn.addEventListener('click', startGame);

function startGame() {
    if (gameActive) return;
    gameActive = true;
    score = 0;
    timeLeft = parseInt(gameTimeInput.value) || 30;
    targetSize = parseInt(targetSizeInput.value) || 50;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    rankDisplay.textContent = "Unranked";
    startBtn.disabled = true;
    gameArea.innerHTML = '';

    spawnTarget();
    const timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            gameActive = false;
            startBtn.disabled = false;
            const finalRank = getRank(score);
            rankDisplay.textContent = finalRank;
            alert(`Game Over! Score: ${score} | Rank: ${finalRank}`);
            gameArea.innerHTML = '';
        }
    }, 1000);
}

function spawnTarget() {
    if (!gameActive) return;

    const target = document.createElement('div');
    target.classList.add('target');
    target.style.width = `${targetSize}px`;
    target.style.height = `${targetSize}px`;
    const x = Math.random() * (gameArea.offsetWidth - targetSize);
    const y = Math.random() * (gameArea.offsetHeight - targetSize);
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

    target.addEventListener('click', () => {
        score++;
        scoreDisplay.textContent = score;
        gameArea.removeChild(target);
        spawnTarget();
    });

    gameArea.appendChild(target);
}
