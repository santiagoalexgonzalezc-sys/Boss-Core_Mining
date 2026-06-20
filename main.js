const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let boss = null;
let currentBossLevel = 1;

window.startBoss = function(level) {
    boss = new Boss(level, player);
    gameState = "game";
};

// input
canvas.addEventListener("click", e => {
    const r = canvas.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    if (gameState === "game" && boss) {
        boss.click(x,y);
    }

    if (bossMenu) {
        handleBossMenuClick(x,y);
    }
});

// loop
function loop() {

    ctx.clearRect(0,0,800,600);

    if (gameState === "menu") {
        ctx.fillStyle = "white";
        ctx.font = "26px Arial";
        ctx.fillText("⛏️ BOSS CORE GAME", 240, 200);

        ctx.font = "18px Arial";
        ctx.fillText("Money: $" + player.money, 320, 260);
    }

    if (gameState === "game" && boss) {
        boss.update(16);
        boss.render(ctx);
    }

    if (bossMenu) {
        ctx.fillStyle = "#120018";
        ctx.fillRect(0,0,800,600);

        ctx.fillStyle = "#a855f7";
        ctx.font = "26px Arial";
        ctx.fillText("👑 BOSS SELECT", 260, 60);

        for (let i=1;i<=10;i++) {
            const y = 120 + i*40;
            const locked = i > player.unlockedBoss;

            ctx.fillStyle = locked ? "#333" : "#22c55e";
            ctx.fillRect(250,y-20,300,30);

            ctx.fillStyle = "white";
            ctx.fillText(
                locked ? `Boss ${i} LOCK ($${i*1000})` : `Boss ${i}`,
                270,y
            );
        }
    }

    requestAnimationFrame(loop);
}

loop();
