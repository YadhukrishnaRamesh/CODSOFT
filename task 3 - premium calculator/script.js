const result = document.getElementById("result");
const preview = document.getElementById("preview");
const historyList = document.getElementById("historyList");
const historyPanel = document.getElementById("historyPanel");

let expression = "";
let history = JSON.parse(localStorage.getItem("astraHistory")) || [];

/* SOUND EFFECT */
const clickSound = new Audio("https://www.soundjay.com/buttons/sounds/button-16.mp3");

/* Ripple Effect */
document.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", function(e) {
    button.classList.add("ripple");
    setTimeout(() => button.classList.remove("ripple"), 600);
    clickSound.currentTime = 0;
    clickSound.play();
  });
});

/* Append */
function append(val) {
  expression += val;
  result.value = formatNumber(expression);
}

/* Clear */
function clearDisplay() {
  expression = "";
  result.value = "";
  preview.textContent = "";
}

/* Delete */
function deleteLast() {
  expression = expression.slice(0, -1);
  result.value = formatNumber(expression);
}

/* Calculate */
function calculate() {
  try {
    const output = Function('"use strict";return (' + expression + ')')();

    preview.textContent = expression + " =";

    animateResult(output);

    history.unshift(expression + " = " + output);
    localStorage.setItem("astraHistory", JSON.stringify(history));
    renderHistory();

    expression = output.toString();

    document.querySelector(".equals").classList.add("glow");
    setTimeout(() => {
      document.querySelector(".equals").classList.remove("glow");
    }, 600);

  } catch {
    result.value = "Error";
    expression = "";
  }
}
/* 3D Tilt Effect */
const calculator = document.querySelector(".calculator");

calculator.addEventListener("mousemove", (e) => {
  const rect = calculator.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = -(y - centerY) / 20;
  const rotateY = (x - centerX) / 20;

  calculator.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

calculator.addEventListener("mouseleave", () => {
  calculator.style.transform = `rotateX(0deg) rotateY(0deg)`;
});

let startX = 0;

document.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 100) {
    historyPanel.classList.add("active");
  }

  if (endX - startX > 100) {
    historyPanel.classList.remove("active");
  }
});


/* Animate Result Counting */
function animateResult(finalValue) {
  let start = 0;
  let duration = 400;
  let startTime = null;

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    let progress = timestamp - startTime;
    let current = Math.min(progress / duration, 1) * finalValue;
    result.value = formatNumber(current.toFixed(2));

    if (progress < duration) {
      requestAnimationFrame(animate);
    } else {
      result.value = formatNumber(finalValue);
    }
  }

  requestAnimationFrame(animate);
}

/* Format Numbers */
function formatNumber(num) {
  if (num === "") return "";
  let parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

/* Render History */
function renderHistory() {
  historyList.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

/* Toggle History */
document.getElementById("historyToggle").onclick = () => {
  historyPanel.classList.toggle("active");
};

/* Clear History */
document.getElementById("clearHistory").onclick = () => {
  history = [];
  localStorage.removeItem("astraHistory");
  renderHistory();
};

document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("light");

  const icon = document.getElementById("themeToggle");
  icon.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
};

/* Keyboard Support */
document.addEventListener("keydown", e => {
  if (!isNaN(e.key) || ["+", "-", "*", "/", "%", "."].includes(e.key)) {
    append(e.key);
  }
  if (e.key === "Enter") calculate();
  if (e.key === "Backspace") deleteLast();
  if (e.key === "Escape") clearDisplay();
});

renderHistory();

