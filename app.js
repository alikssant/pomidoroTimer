const start = document.getElementById("startBtn");
const timerDisplay = document.getElementById("display");
const breakBtn = document.getElementById("break");
const focusBtn = document.getElementById("focus");
const audio = document.getElementById("audio");
const controls = document.getElementById("controls");

let timeleft = 1500; // (25 minutes)
let interval;
let stopBtn;
let resetBtn;
let startTime;
let endTime;

const updateTimer = () => {
  const minutes = Math.floor(timeleft / 60);
  const seconds = timeleft % 60;

  timerDisplay.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const startTimer = () => {
  startTime = Date.now();
  endTime = startTime + timeleft * 1000; // Calculate when the timer should end

  clearInterval(interval); // Clear any existing intervals
  interval = setInterval(() => {
    const now = Date.now();
    timeleft = Math.max(0, Math.round((endTime - now) / 1000)); // Calculate remaining time

    updateTimer();

    if (timeleft === 0) {
      clearInterval(interval);
      timeDone();
    }
  }, 1000);
};

const timeDone = () => {
  timerDisplay.style.fontSize = "4.5rem";
  timerDisplay.innerText = "Time is up";
  audio.play();
  clearInterval(interval);

  if (stopBtn) stopBtn.style.display = "none";

  if (resetBtn) {
    resetBtn.style.display = "inline-block";
    resetBtn.addEventListener("click", resetState);
  }
};

const resetState = () => {
  focusBtn.style.backgroundColor = "rgba(90, 90, 90, 0.8)";
  breakBtn.style.backgroundColor = "";
  clearInterval(interval);
  timerDisplay.style.fontSize = "6rem";

  timeleft = 1500; // (25 minutes)
  audio.pause();
  audio.currentTime = 0;

  if (stopBtn) stopBtn.style.display = "none";
  if (resetBtn) resetBtn.style.display = "none";
  start.style.display = "inline-block";
  updateTimer();
};

const stopTimer = () => {
  start.style.display = "none";
  if (!stopBtn) {
    stopBtn = document.createElement("button");
    stopBtn.classList.add("stopBtn");
    stopBtn.innerText = "Pause";
    controls.appendChild(stopBtn);

    stopBtn.addEventListener("click", () => {
      clearInterval(interval);
      updateTimer();
      stopBtn.style.display = "none";
      resetBtn.style.display = "none";
      start.style.display = "inline-block";
    });
  }
  stopBtn.style.display = "inline-block";
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

const breakTimerMode = () => {
  breakBtn.style.backgroundColor = "rgba(90, 90, 90, 0.8)";
  focusBtn.style.backgroundColor = "";
  timeleft = 300;
  updateTimer();
};

const startTimer1 = (initialTime = timeleft) => {
  clearInterval(interval);
  timeleft = initialTime;
  updateTimer();

  interval = setInterval(() => {
    timeleft--;
    updateTimer();

    if (timeleft === 0) {
      timeDone();
    }
  }, 1000);
};

const focusTimerMode = () => {
  focusBtn.style.backgroundColor = "rgba(90, 90, 90, 0.8)";
  breakBtn.style.backgroundColor = "";
  timeleft = 1500;
  updateTimer();
};
start.addEventListener("click", startTimer);
start.addEventListener("click", stopTimer);
breakBtn.addEventListener("click", breakTimerMode);
focusBtn.addEventListener("click", focusTimerMode);
