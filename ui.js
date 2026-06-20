window.gameState = "menu";
window.bossMenu = false;

const player = {
    money: 0,
    unlockedBoss: 1,
    upgrades: {
        normalDmg: 10,
        weakDmg: 25
    }
};

window.player = player;

// buttons
document.getElementById("shopBtn").onclick = () => {
    if (gameState === "menu") gameState = "shop";
};

document.getElementById("bossBtn").onclick = () => {
    if (gameState === "menu") bossMenu = true;
};

document.getElementById("fsBtn").onclick = () => {
    document.documentElement.requestFullscreen();
};

// boss select click
window.handleBossMenuClick = function(x,y) {
    for (let i=1;i<=10;i++) {
        const yy = 120 + i*40;

        if (y>yy-20 && y<yy+20 && x>250 && x<550) {

            const cost = i*1000;

            if (i > player.unlockedBoss && player.money < cost) {
                window.addShake?.(12);
                return;
            }

            if (i > player.unlockedBoss) {
                player.money -= cost;
                player.unlockedBoss = i;
            }

            window.currentBossLevel = i;
            window.startBoss(i);
            bossMenu = false;
        }
    }
};
