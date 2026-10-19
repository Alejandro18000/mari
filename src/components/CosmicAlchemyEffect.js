/**
 * CosmicAlchemyEffect.js - Libro Mari
 * Fondo animado de polvo cósmico, estrellas y órbitas atómicas sutiles.
 */

export class CosmicAlchemyEffect {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.orbitals = [];
    this.numStars = 45;
    this.numOrbitals = 4;
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
    this.stars = [];
    for (let i = 0; i < this.numStars; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        r: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.7 + 0.2,
        speed: Math.random() * 0.02 + 0.005,
        pulse: Math.random() * Math.PI * 2,
        color: Math.random() > 0.4 ? '212, 175, 55' : '173, 216, 230' // Oro o azul celeste
      });
    }

    this.orbitals = [];
    for (let i = 0; i < this.numOrbitals; i++) {
      this.orbitals.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 25 + 15,
        angle: Math.random() * Math.PI * 2,
        speed: (Math.random() - 0.5) * 0.015,
        opacity: Math.random() * 0.25 + 0.1
      });
    }
  }

  animate() {
    if (!this.active) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Dibujar estrellas / polvo estelar
    this.stars.forEach(s => {
      s.pulse += s.speed;
      const currentAlpha = s.alpha * (0.6 + 0.4 * Math.sin(s.pulse));
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${s.color}, ${currentAlpha})`;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = `rgba(${s.color}, 0.6)`;
      this.ctx.fill();
    });

    // 2. Dibujar órbitas atómicas sutiles flotantes
    this.orbitals.forEach(o => {
      o.angle += o.speed;
      this.ctx.save();
      this.ctx.translate(o.x, o.y);
      this.ctx.rotate(o.angle);
      this.ctx.beginPath();
      this.ctx.ellipse(0, 0, o.radius, o.radius * 0.4, 0, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(212, 175, 55, ${o.opacity})`;
      this.ctx.lineWidth = 1;
      this.ctx.stroke();

      // Electrón orbitando
      const electronX = Math.cos(o.angle * 3) * o.radius;
      const electronY = Math.sin(o.angle * 3) * (o.radius * 0.4);
      this.ctx.beginPath();
      this.ctx.arc(electronX, electronY, 2, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 235, 160, ${o.opacity * 1.5})`;
      this.ctx.fill();

      this.ctx.restore();
    });

    requestAnimationFrame(this.animate);
  }
}
