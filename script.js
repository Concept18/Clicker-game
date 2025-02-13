const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = 600;
canvas.height = 500;

document.body.style.textAlign = "center";
document.body.style.background = "#222";
canvas.style.border = "4px solid #fff";
canvas.style.marginTop = "20px";

document.title = "Ultimate Clicker Game";

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

const scoreDisplay = document.createElement("div");
scoreDisplay.style.color = "white";
scoreDisplay.style.fontSize = "24px";
document.body.insertBefore(scoreDisplay, canvas);

function drawButton(text, x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(text, x + 10, y + 30);
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
    drawButton(`Upgrade Click (${upgradeCost})`, 50, 300, 200, 50, "green");
    drawButton(`Buy Auto (${autoClickerCost})`, 350, 300, 200, 50, "orange");
    drawButton(`Rebirth (${rebirthCost})`, 50, 400, 200, 50, "purple");
    drawButton(`Prestige (${prestigeCost})`, 350, 400, 200, 50, "gold");
    updateScoreDisplay();
    checkAchievements();
    requestAnimationFrame(update);
}

canvas.addEventListener("click", (event) => {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    if (x >= 200 && x <= 400 && y >= 200 && y <= 250) {
        score += clickPower * multiplier;
    } else if (x >= 50 && x <= 250 && y >= 300 && y <= 350 && score >= upgradeCost) {
        score -= upgradeCost;
        clickPower++;
        upgradeCost *= 2;
    } else if (x >= 350 && x <= 550 && y >= 300 && y <= 350 && score >= autoClickerCost) {
        score -= autoClickerCost;
        autoClickers++;
        autoClickerCost *= 2;
    } else if (x >= 50 && x <= 250 && y >= 400 && y <= 450 && score >= rebirthCost) {
        rebirths++;
        score = 0;
        clickPower = 1;
        autoClickers = 0;
        upgradeCost = 10;
        autoClickerCost = 50;
        rebirthCost *= 2;
        multiplier++;
    } else if (x >= 350 && x <= 550 && y >= 400 && y <= 450 && score >= prestigeCost) {
        prestigeCost *= 3;
        rebirths = 0;
        multiplier *= 2;
    }
});

setInterval(() => {
    score += autoClickers * rebirths + autoClickers;
    updateScoreDisplay();
    checkAchievements();
}, 1000);

update();
