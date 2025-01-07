const start = document.getElementById("startBtn");
const timerDisplay = document.getElementById("display");
const breakBtn = document.getElementById("break");
const focusBtn = document.getElementById("focus");
const audio = document.getElementById("audio");
const controls = document.getElementById("controls");

let timeleft = 10;
let interval;
let stopBtn; // Declare globally
let resetBtn; // Declare globally

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
  // Update timer display
  timerDisplay.style.fontSize = "4.5rem";
  timerDisplay.innerText = "Time is up";
  audio.play();
  clearInterval(interval);

  // Hide stop button
  if (stopBtn) stopBtn.style.display = "none";

  // Show reset button only
  if (resetBtn) {
    resetBtn.style.display = "inline-block";
    resetBtn.addEventListener("click", () => {
      resetState();
    });
  }
};

const resetState = () => {
  // Reset to initial state
  clearInterval(interval);
  timerDisplay.style.fontSize = "6rem";

  timeleft = 1500; // Reset time to initial value (25 minutes)
  audio.pause();
  audio.currentTime = 0; // Stop audio playback

  if (stopBtn) stopBtn.style.display = "none";
  if (resetBtn) resetBtn.style.display = "none";
  start.style.display = "inline-block";
  updateTimer();
};

const stopTimer = () => {
  start.style.display = "none";

  // Create stop button if not already created
  if (!stopBtn) {
    stopBtn = document.createElement("button");
    stopBtn.classList.add("stopBtn");
    stopBtn.innerText = "Pause";
    controls.appendChild(stopBtn);

    stopBtn.addEventListener("click", () => {
      clearInterval(interval);
      updateTimer();
      stopBtn.style.display = "none"; // Hide the stop button
      resetBtn.style.display = "none";
      start.style.display = "inline-block"; // Show the start button again
    });
  }
  stopBtn.style.display = "inline-block";

  // Create reset button if not already created
  if (!resetBtn) {
    resetBtn = document.createElement("button");
    resetBtn.classList.add("reStartBtn");
    resetBtn.innerText = "Reset";
    controls.appendChild(resetBtn);

    resetBtn.addEventListener("click", () => {
      resetState();
    });
  }
  resetBtn.style.display = "inline-block";
};

start.addEventListener("click", stopTimer);
start.addEventListener("click", startTimer);
