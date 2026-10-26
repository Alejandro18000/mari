/**
 * CosmicAlchemyEffect.js - Libro Mari
 * Fondo animado de polvo mágico en acuarela, destellos cálidos y pequeños corazoncitos flotantes.
 */

export class CosmicAlchemyEffect {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.hearts = [];
    this.numParticles = 40;
    this.numHearts = 6;
    this.active = true;

    this.resize = this.resize.bind(this);
    this.animate = this.animate.bind(this);

    window.addEventListener('resize', this.resize);
    this.resize();
    this.initElements();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  initElements() {
    this.particles = [];
    const colors = ['244, 200, 190', '252, 234, 222', '217, 116, 102', '255, 235, 170'];
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        r: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.015 + 0.005,
        pulse: Math.random() * Math.PI * 2,
        vy: -(Math.random() * 0.3 + 0.1),
        vx: (Math.random() - 0.5) * 0.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    this.hearts = [];
    for (let i = 0; i < this.numHearts; i++) {
      this.hearts.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 6 + 6,
        alpha: Math.random() * 0.4 + 0.15,
        vy: -(Math.random() * 0.4 + 0.15),
        vx: (Math.random() - 0.5) * 0.25,
        sway: Math.random() * Math.PI * 2,
        color: 'rgba(217, 116, 102,'
      });
    }
  }

  drawHeart(ctx, x, y, size, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    const d = size / 2;
    ctx.moveTo(0, d * 0.6);
    ctx.bezierCurveTo(-d, -d * 0.5, -d * 1.4, d * 0.5, 0, d * 1.5);
    ctx.bezierCurveTo(d * 1.4, d * 0.5, d, -d * 0.5, 0, d * 0.6);
    ctx.fillStyle = `rgba(244, 180, 170, ${alpha})`;
    ctx.fill();
    ctx.restore();
  }

  animate() {
    if (!this.active) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Partículas suaves flotando hacia arriba
    this.particles.forEach(p => {
      p.pulse += p.speed;
      p.y += p.vy;
      p.x += p.vx;
      if (p.y < -10) p.y = this.height + 10;
      if (p.x < -10) p.x = this.width + 10;
      if (p.x > this.width + 10) p.x = -10;

      const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p.color}, ${currentAlpha})`;
      this.ctx.shadowBlur = 6;
      this.ctx.shadowColor = `rgba(${p.color}, 0.5)`;
      this.ctx.fill();
    });

    // 2. Corazoncitos flotantes
    this.hearts.forEach(h => {
      h.sway += 0.02;
      h.y += h.vy;
      h.x += Math.sin(h.sway) * 0.4;
      if (h.y < -20) {
        h.y = this.height + 20;
        h.x = Math.random() * this.width;
      }
      this.drawHeart(this.ctx, h.x, h.y, h.size, h.alpha);
    });

    requestAnimationFrame(this.animate);
  }
}
