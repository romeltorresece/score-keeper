const p1 = {
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display')
};
const p2 = {
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display')
};

const gameStatus = document.querySelector('#gameStatus');
const resetButton = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#playto');

let isGameOver = false;
let winningScore = 3;
let isMaxValue = false;
let isMinValue = false;

function updateScores(player, opponent) {
    if (!isGameOver) {
        player.score++;
        // if (winningScore - player.score <= 1 || winningScore - opponent.score <= 1) {
        //     if (player.score === opponent.score) {
        //         gameStatus.textContent = ' "Deuce"';
        //     } else {
        //         gameStatus.textContent = ' "Match Point"';
        //     }
        // }
        if (player.score >= winningScore) {
            if (player.score - opponent.score >= 2) {
                isGameOver = true;
                player.display.classList.add('has-text-success');
                opponent.display.classList.add('has-text-danger');
                player.button.disabled = true;
                opponent.button.disabled = true;
                // gameStatus.textContent = '';
            }   
        }
        player.display.textContent = player.score;
    } 
}

p1.button.addEventListener('click', function() {
     updateScores(p1, p2);
});

document.addEventListener('keydown', function(e) {
    // console.log(e);
    if (e.code === 'ArrowLeft') {
        updateScores(p1, p2);
    } else if (e.code === 'ArrowRight') {
        updateScores(p2, p1);
    } else if (e.code === 'ArrowUp') {
        if (winningScore === 11) {
            isMaxValue = true;
        }
        if (!isMaxValue) {
            winningScoreSelect.value++;
            winningScore = parseInt(winningScoreSelect.value);
            reset();
        }
    } else if (e.code === 'ArrowDown') {
        if (winningScore === 3) {
            isMinValue = true;
        }
        if (!isMinValue) {
            winningScoreSelect.value--;
            winningScore = parseInt(winningScoreSelect.value);
            reset();
        }
    } else if (e.code === 'Backspace') {
        reset();
    }
});
    
p2.button.addEventListener('click', function() {   
    updateScores(p2, p1);
});

winningScoreSelect.addEventListener('change', function() {
    winningScore = parseInt(this.value);
    reset();
});

resetButton.addEventListener('click', reset);

function reset() {
    isGameOver = false;
    isMinValue = false;
    isMaxValue = false;
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
}