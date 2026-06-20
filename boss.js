function bossColor(i) {
    const colors = [
        "#ef4444","#f97316","#eab308","#22c55e",
        "#06b6d4","#3b82f6","#a855f7","#ec4899",
        "#ffffff","#facc15"
    ];
    return colors[(i-1) % colors.length];
}

class Boss {
    constructor(level, player) {
        this.level = level;
        this.player = player;

        this.layer = 0;
        this.x = 400;
        this.y = 320;

        this.popups = [];
        this.shake = 0;

        this.layers = this.createLayers();
    }

    createLayers() {
        const base = 80 + this.level * 60;

        return [
            { hp: base, max: base },
            { hp: base+40, max: base+40 },
            { hp: base+90, max: base+90 },
            { hp: base+140, max: base+140 }
        ];
    }

    current() {
        return this.layers[this.layer];
    }

    click(x,y) {
        const l = this.current();

        let dmg = this.player.upgrades.normalDmg;
        const weak = Math.random() < 0.25;

        if (weak) dmg = this.player.upgrades.weakDmg;

        l.hp -= dmg;

        this.shake = 10;

        this.popups.push({ x,y,text:"-" + dmg,life:600 });

        if (l.hp <= 0) {
            this.layer++;

            if (this.layer >= this.layers.length) {
                this.player.money += this.level * 100;
                window.gameState = "menu";
                window.boss = null;
            }
        }
    }

    update(dt) {
        this.popups.forEach(p => p.life -= dt);
        this.popups = this.popups.filter(p => p.life > 0);

        if (this.shake > 0) this.shake--;
    }

    render(ctx) {
        const col = bossColor(this.level);

        let ox = 0, oy = 0;
        if (this.shake > 0) {
            ox = (Math.random()-0.5)*this.shake;
            oy = (Math.random()-0.5)*this.shake;
        }

        ctx.fillStyle = "#050505";
        ctx.fillRect(0,0,800,600);

        const l = this.current();

        const radius = 90 - this.layer * 10;

        ctx.shadowColor = col;
        ctx.shadowBlur = 25;

        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(this.x+ox,this.y+oy,radius,0,Math.PI*2);
        ctx.fill();

        ctx.shadowBlur = 0;

        const w = 300;
        const pct = l.hp / l.max;

        ctx.fillStyle = "#222";
        ctx.fillRect(this.x-150,this.y-140,w,15);

        ctx.fillStyle = col;
        ctx.fillRect(this.x-150,this.y-140,w*pct,15);

        ctx.fillStyle = "#fff";
        ctx.font = "16px Arial";

        this.popups.forEach(p => {
            ctx.fillText(p.text,p.x,p.y);
        });
    }
}
