document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn");
    const countdownEl = document.getElementById("countdown");
    const gameEl = document.getElementById("game");
    const timerEl = document.getElementById("timer");
    const scoreEl = document.getElementById("score");
    const leftBtn = document.getElementById("btn-left");
    const rightBtn = document.getElementById("btn-right");
    const timeUpEl = document.getElementById("time-up");
    const resultContainer = document.getElementById("result-container");
    const finalScoreEl = document.getElementById("final-score");
    const saveBtn = document.getElementById("save-btn");
    const playerNameInput = document.getElementById("player-name");
    const retryBtn = document.getElementById("retry-btn");

    let countdown = 3;
    let timeLeft = 15;
    let score = 0;
    let gameActive = false;
    let gameInterval;

    // Asegurar que los botones de pulsación sean visibles desde el inicio
    leftBtn.classList.remove("hidden");
    rightBtn.classList.remove("hidden");
    leftBtn.disabled = true;
    rightBtn.disabled = true;

    // Iniciar cuenta atrás
    startBtn.addEventListener("click", () => {
        startBtn.classList.add("hidden");
        countdownEl.classList.remove("hidden");
        countdownEl.textContent = countdown;

        let countdownInterval = setInterval(() => {
            countdown--;
            if (countdown > 0) {
                countdownEl.textContent = countdown;
            } else {
                clearInterval(countdownInterval);
                countdownEl.classList.add("hidden");
                startGame();
            }
        }, 1000);
    });

    // Función para iniciar el juego
    function startGame() {
        gameActive = true;
        score = 0;
        scoreEl.textContent = "Pulsaciones: 0";
        timeLeft = 15;
        timerEl.textContent = timeLeft;

        leftBtn.disabled = false;
        rightBtn.disabled = false; // Habilitar botones al iniciar

        gameInterval = setInterval(() => {
            timeLeft--;
            timerEl.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(gameInterval);
                endGame();
            }
        }, 1000);
    }

    // Función para aumentar la puntuación
    function tapButton() {
        if (gameActive) {
            score++;
            scoreEl.textContent = `Pulsaciones: ${score}`;
        }
    }

    leftBtn.addEventListener("click", tapButton);
    rightBtn.addEventListener("click", tapButton);

    // Finalizar el juego correctamente
    function endGame() {
        gameActive = false; // Bloquear las pulsaciones
        leftBtn.disabled = true;
        rightBtn.disabled = true; // Deshabilitar botones pero sin ocultarlos

        timeUpEl.classList.remove("hidden");
        setTimeout(() => {
            timeUpEl.classList.add("hidden");
            resultContainer.classList.remove("hidden");
            finalScoreEl.textContent = `Pulsaciones: ${score}`;
        }, 2000);
    }

    // Guardar el nombre y mostrar confirmación
    saveBtn.addEventListener("click", () => {
        playerNameInput.value = ""; // Borra el texto del cuadro
        document.getElementById("success-check").style.display = "inline"; // Muestra el icono de verificación

        setTimeout(() => {
            document.getElementById("success-check").style.display = "none"; // Oculta el icono después de 1.5s
        }, 1500);
    });

    // Reiniciar el juego
    retryBtn.addEventListener("click", () => {
        resultContainer.classList.add("hidden");
        startBtn.classList.remove("hidden");
        leftBtn.disabled = true;
        rightBtn.disabled = true; // Volver a deshabilitar hasta que inicie
    });
});
