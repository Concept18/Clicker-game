const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = 600;
canvas.height = 600;

let score = 0;
let autoClickers = 0;
let clickPower = 1;
let rebirths = 0;
let upgradeCost = 10;
let autoClickerCost = 50;
let rebirthCost = 1000;
let prestigeCost = 10000;
let multiplier = 1;
let achievements = {};
let autoRebirth = false;
let autoPrestige = false;
let autoBuyAutoClicker = false;

const scoreDisplay = document.getElementById("scoreDisplay");

function drawButton(text, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(text, x + 10, y + 30);
}

function drawLeverButton(x, y, width, height, isOn, label) {
  ctx.fillStyle = isOn ? "lime" : "red";
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText(label, x + 10, y + 25);
}

function updateScoreDisplay() {
  scoreDisplay.innerHTML = `Score: ${score} | Click Power: ${clickPower} | Auto Clickers: ${autoClickers} | Rebirths: ${rebirths} | Multiplier: ${multiplier}x`;
}

function checkAchievements() {
  if (score >= 1000 && !achievements["1000 Points!"]) {
    achievements["1000 Points!"] = true;
    alert("Achievement Unlocked: 1000 Points!");
  }
  if (rebirths >= 5 && !achievements["5 Rebirths!"]) {
    achievements["5 Rebirths!"] = true;
    alert("Achievement Unlocked: 5 Rebirths!");
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawButton("Click Me!", 200, 200, 200, 50, "blue");
  drawButton(`Upgrade Click (${Math.round(upgradeCost)})`, 50, 300, 200, 50, "green");
  drawButton(`Buy Auto (${Math.round(autoClickerCost)})`, 350, 300, 200, 50, "orange");
  drawButton(`Rebirth (${Math.round(rebirthCost)})`, 50, 400, 200, 50, "purple");
  drawButton(`Prestige (${Math.round(prestigeCost)})`, 350, 400, 200, 50, "gold");

  drawLeverButton(50, 500, 150, 40, autoRebirth, "Auto Rebirth");
  drawLeverButton(210, 500, 150, 40, autoPrestige, "Auto Prestige");
  drawLeverButton(370, 500, 150, 40, autoBuyAutoClicker, "Auto Buy Auto");

  updateScoreDisplay();
  checkAchievements();
  requestAnimationFrame(update);
}

canvas.addEventListener("click", (event) => {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;

  if (x >= 200 && x <= 400 && y >= 200 && y <= 250) score += clickPower * multiplier;

  else if (x >= 50 && x <= 250 && y >= 300 && y <= 350 && score >= upgradeCost) {
    score -= upgradeCost;
    clickPower++;
    upgradeCost = Math.round(upgradeCost * 1.5);
  }

  else if (x >= 350 && x <= 550 && y >= 300 && y <= 350 && score >= autoClickerCost) {
    score -= autoClickerCost;
    autoClickers++;
    autoClickerCost = Math.round(autoClickerCost * 1.7);
  }

  else if (x >= 50 && x <= 250 && y >= 400 && y <= 450 && score >= rebirthCost) {
    rebirths++;
    score = 0;
    clickPower = 1;
    autoClickers = 0;
    upgradeCost = 10;
    autoClickerCost = 50;
    rebirthCost = Math.round(rebirthCost * 1.8);
    multiplier++;
  }

  else if (x >= 350 && x <= 550 && y >= 400 && y <= 450 && score >= prestigeCost) {
    prestigeCost = Math.round(prestigeCost * 2.5);
    rebirths = 0;
    multiplier *= 2;
  }

  else if (x >= 50 && x <= 200 && y >= 500 && y <= 540) autoRebirth = !autoRebirth;

  else if (x >= 210 && x <= 360 && y >= 500 && y <= 540) autoPrestige = !autoPrestige;

  else if (x >= 370 && x <= 520 && y >= 500 && y <= 540) autoBuyAutoClicker = !autoBuyAutoClicker;
});

setInterval(() => {
  score += autoClickers * rebirths + autoClickers;

  if (autoRebirth && score >= rebirthCost) {
    rebirths++;
    score = 0;
    clickPower = 1;
    autoClickers = 0;
    upgradeCost = 10;
    autoClickerCost = 50;
    rebirthCost = Math.round(rebirthCost * 1.8);
    multiplier++;
  }

  if (autoPrestige && score >= prestigeCost) {
    prestigeCost = Math.round(prestigeCost * 2.5);
    rebirths = 0;
    multiplier *= 2;
  }

  if (autoBuyAutoClicker && score >= autoClickerCost) {
    score -= autoClickerCost;
    autoClickers++;
    autoClickerCost = Math.round(autoClickerCost * 1.7);
  }

  updateScoreDisplay();
  checkAchievements();
}, 1000);

update();
