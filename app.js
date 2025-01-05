const start = document.getElementById("startBtn");
const timerDisplay = document.getElementById("display");
const reset = document.getElementById("reStartBtn");
const breakBtn = document.getElementById("break");
const focusBtn = document.getElementById("focus");

let timeleft = 1500;
let interval;

const updateTimer = () => {
  const minutes = Math.floor(timeleft / 60);
  const seconds = timeleft % 60;

  timerDisplay.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const startTimer = () => {
  interval = setInterval(() => {
    timeleft--;
    updateTimer();

    if (timeleft === 0) {
      clearInterval(interval);
      alert("Time is up");
      timeleft = 1500;
      updateTimer();
    }
  }, 1000);
};

const stopTimer = () => {};

start.addEventListener("click", startTimer);
