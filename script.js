let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCounter = 0;

function startTimer() {
  if (!running) {
    running = true;
    if (!startTime) {
      startTime = new Date().getTime(); // Initialize start time
    } else {
      startTime = new Date().getTime() - difference; // Adjust start time to resume
    }
    tInterval = setInterval(updateTime, 10);
  }
}

function updateTime() {
  if (running) {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const microseconds = Math.floor((difference % 1000) / 10); // Calculate microseconds

    document.getElementById("display").innerHTML =
      (hours < 10 ? "0" : "") +
      hours +
      ":" +
      (minutes < 10 ? "0" : "") +
      minutes +
      ":" +
      (seconds < 10 ? "0" : "") +
      seconds +
      "." +
      (microseconds < 10 ? "0" : "") +
      microseconds; // Display microseconds
  }
}

function pauseTimer() {
  clearInterval(tInterval);
  running = false;
}

function resetTimer() {
  clearInterval(tInterval);
  running = false;
  difference = 0;
  startTime = null; // Reset startTime
  document.getElementById("display").innerHTML = "00:00:00.00"; // Reset display
  document.getElementById("lap-times").innerHTML = "";
  lapCounter = 0;
}

function addLap() {
  if (running) {
    lapCounter++;
    const lapTime = document.createElement("li");
    lapTime.textContent = document.getElementById("display").innerHTML;
    document.getElementById("lap-times").appendChild(lapTime);
  }
}

// Event Listeners
document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("lap").addEventListener("click", addLap);
