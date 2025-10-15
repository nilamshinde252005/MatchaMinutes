let totalTime = 60 * 60 // sec
const START_TIME = totalTime;
let countDown = null;

const timerDisplay = document.getElementById("timer")
const resetButton = document.getElementById("reset")
const stopButton = document.getElementById("stop");
const resumeButton = document.getElementById("resume");

const pomodoroSection = document.getElementById("pomodoro-section");
const showTimerBtn = document.getElementById("showTimerBtn");
const hideTimerBtn = document.getElementById("hideTimerBtn");

function showPomodoro() {

    pomodoroSection.style.display = "block"; // is visible
    showTimerBtn.style.display = "none";// disappears
    hideTimerBtn.style.display = "block";
    updateDisplay();
}

function hidePomodoro(){
    pomodoroSection.style.display = "none"; 
    showTimerBtn.style.display = "block";
    hideTimerBtn.style.display = "none";
}

function updateDisplay() {

    resumeButton.disabled = true;
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;

    const formattedTime =
        String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
    timerDisplay.textContent = formattedTime;

}

function reset() {
    resumeButton.disabled = true;
    clearInterval(countDown);
    totalTime = START_TIME;
    updateDisplay();

    countDown = setInterval(() => {
        totalTime--;

        if (totalTime < 0) {
            clearInterval(countDown);
            timerDisplay.textContent = "⏰ Time’s up!";
        } else {
            updateDisplay();
        }
    }, 1000)
}

function stop() {
    resumeButton.disabled = false;
    clearInterval(countDown);
}

function resume() {

    countDown = setInterval(() => {
        totalTime--;

        if (totalTime < 0) {
            clearInterval(countDown);
            timerDisplay.textContent = "⏰ Time’s up!";
        } else {
            updateDisplay();
        }
    }, 1000)

}

updateDisplay(); // show 60:00
resumeButton.disabled = false;

resetButton.addEventListener("click", reset);
stopButton.addEventListener("click", stop);
resumeButton.addEventListener("click", resume);
showTimerBtn.addEventListener("click", showPomodoro);
hideTimerBtn.addEventListener("click", hidePomodoro);