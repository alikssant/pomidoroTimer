const start = document.getElementById("startBtn");
const timerDisplay = document.getElementById("display");
const breakBtn = document.getElementById("break");
const focusBtn = document.getElementById("focus");
const audio = document.getElementById("audio");

let timeleft = 10;
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
      timeDone();
    }
  }, 1000);
};
const timeDone = () => {
  stopBtn.style.display = "none";
  timerDisplay.style.fontSize = "4.5rem";
  timerDisplay.innerText = "Time is up";
  audio.play();
  clearInterval(interval);

  resetBtn.addEventListener("click", () => {
    timerDisplay.style.fontSize = "6rem";
    stopBtn.style.display = "inline-block";
    audio.pause();

    timeleft = 1500;
    updateTimer();
  });
};
const stopTimer = () => {
  start.style.display = "none";
  const stopBtn = document.createElement("button");
  stopBtn.classList.add("stopBtn");
  stopBtn.innerText = "Pause";
  document.getElementById("controls").appendChild(stopBtn);
  stopBtn.addEventListener("click", () => {
    clearInterval(interval);
    updateTimer();
    stopBtn.style.display = "none"; // Hide the stop button
    resetBtn.style.display = "none";
    start.style.display = "inline-block"; // Show the start button again
    // Add any other stop functionality here
  });

  const resetBtn = document.createElement("button");
  resetBtn.classList.add("reStartBtn");
  resetBtn.innerText = "Reset";
  document.getElementById("controls").appendChild(resetBtn);
  resetBtn.addEventListener("click", () => {
    clearInterval(interval);
    timeleft = 1500;
    updateTimer();

    resetBtn.style.display = "none"; // Hide the stop button
    stopBtn.style.display = "none";
    start.style.display = "inline-block"; // Show the start button again
    // Add any other stop functionality here
  });
};

start.addEventListener("click", stopTimer);
start.addEventListener("click", startTimer);
