const player = document.getElementById('player');
const gameContainer = document.getElementById('gameContainer');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');

let playerLeft = 175;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let isGameOver = false;
let spawnInterval = 1000; 
let minimumSpawnInterval = 200; 
let spawnReductionRate = 20; 

function movePlayer(event) {
    if (!isGameOver) {
        if (event.key === 'ArrowLeft' && playerLeft > 0) {
            playerLeft -= 25;
        } else if (event.key === 'ArrowRight' && playerLeft < 350) {
            playerLeft += 25;
        }

        player.style.left = playerLeft + 'px';
    }
}

document.addEventListener('keydown', movePlayer);

function spawnEnemy() {
    if (!isGameOver) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');

        
        let enemyLeft = Math.random() * (gameContainer.clientWidth - 50);
        enemy.style.left = enemyLeft + 'px';
        enemy.style.bottom = '600px'; 
        gameContainer.appendChild(enemy);

        let enemyBottom = 600;

        function moveEnemy() {
            if (enemyBottom > -50) { 
                enemyBottom -= 4; 
                enemy.style.bottom = enemyBottom + 'px';
            } else {
                clearInterval(enemyTimerId);
                gameContainer.removeChild(enemy);
                if (!isGameOver) {
                    score++;
                    scoreDisplay.textContent = 'Score: ' + score;

                    
                    if (spawnInterval > minimumSpawnInterval) {
                        spawnInterval -= spawnReductionRate;
                        clearInterval(gameTimerId);
                        gameTimerId = setInterval(spawnEnemy, spawnInterval);
                    }
                }
            }

            if (
                (enemyBottom <= 50) &&
                (playerLeft >= enemyLeft && playerLeft <= enemyLeft + 50)
            ) {
                gameOver();
            }
        }

        let enemyTimerId = setInterval(moveEnemy, 20); 
    }
}

let gameTimerId = setInterval(spawnEnemy, spawnInterval);

function gameOver() {
    isGameOver = true;
    clearInterval(gameTimerId);

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highScoreDisplay.textContent = 'High Score: ' + highScore;
    }

    alert('Game Over! Your Score: ' + score);

    player.style.left = '175px';
    score = 0;
    scoreDisplay.textContent = 'Score: ' + score;
    isGameOver = false;
    spawnInterval = 1000; // Tilbakestill spawn-intervallet
    gameTimerId = setInterval(spawnEnemy, spawnInterval);
}



































