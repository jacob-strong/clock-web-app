document.addEventListener("DOMContentLoaded", () => {

    // Initialize “The Grid. A digital frontier. I tried to picture clusters of information as they moved 
    // through the computer. What did they look like? Ships, motorcycles? Were the circuits like freeways? 
    // I kept dreaming of a world I thought I'd never see. And then, one day I got in...” - Kevin Flynn
    const grid = GridStack.init({
        column: 2,
        row: 2,
        cellHeight: 150,
        float: true,
        resizable: { handles: "all" },
        margin: 10
    });
    console.log("GridStack initialized");

    // Stopwatch
    let stopwatchRunning = false;
    let stopwatchStartTime = 0;
    let stopwatchElapsed = 0;
    let stopwatchInterval;

    const stopwatchDisplay = document.getElementById("stopwatch-display");
    const startStopwatchBtn = document.getElementById("start-stopwatch");
    const resetStopwatchBtn = document.getElementById("reset-stopwatch");

    startStopwatchBtn.addEventListener("click", () => {
        if (!stopwatchRunning) {
            stopwatchRunning = true;
            startStopwatchBtn.textContent = "Pause";
            stopwatchStartTime = Date.now() - stopwatchElapsed;
            stopwatchInterval = setInterval(() => {
                stopwatchElapsed = Date.now() - stopwatchStartTime;
                const totalSeconds = Math.floor(stopwatchElapsed / 1000);
                const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
                const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
                const secs = String(totalSeconds % 60).padStart(2, "0");
                stopwatchDisplay.textContent = `${hrs}:${mins}:${secs}`;
            }, 200);
        } else {
            stopwatchRunning = false;
            startStopwatchBtn.textContent = "Start";
            clearInterval(stopwatchInterval);
        }
    });

    resetStopwatchBtn.addEventListener("click", () => {
        stopwatchRunning = false;
        clearInterval(stopwatchInterval);
        stopwatchElapsed = 0;
        stopwatchDisplay.textContent = "00:00:00";
        startStopwatchBtn.textContent = "Start";
    });

    // Timer
    let timerInterval;
    let timerTimeLeft = 0;

    const timerInput = document.getElementById("timer-minutes");
    const timerDisplay = document.getElementById("timer-display");
    const startTimerBtn = document.getElementById("start-timer");

    startTimerBtn.addEventListener("click", () => {
        if (timerInterval) clearInterval(timerInterval);

        timerTimeLeft = parseInt(timerInput.value || 0) * 60;
        if (timerTimeLeft <= 0) return;

        timerInput.disabled = true;
        startTimerBtn.disabled = true;

        timerInterval = setInterval(() => {
            timerTimeLeft--;
            const mins = String(Math.floor(timerTimeLeft / 60)).padStart(2, "0");
            const secs = String(timerTimeLeft % 60).padStart(2, "0");
            timerDisplay.textContent = `${mins}:${secs}`;

            if (timerTimeLeft <= 0) {
                clearInterval(timerInterval);
                timerDisplay.textContent = "TIME!";
                timerInput.disabled = false;
                startTimerBtn.disabled = false;
            }
        }, 1000);
    });

    // World Clock
    const clockDisplay = document.getElementById("clock-display");
    const timezoneSelect = document.getElementById("timezone");

    function updateClock() {
        const tz = timezoneSelect.value;
        const now = new Date().toLocaleTimeString("en-US", {
            timeZone: tz,
            hour12: false,
        });
        clockDisplay.textContent = now;
    }

    timezoneSelect.addEventListener("change", updateClock);
    updateClock();
    setInterval(updateClock, 1000);

});