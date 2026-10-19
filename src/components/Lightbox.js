/**
 * Lightbox.js - Libro Mari
 * Visor interactivo en pantalla completa para fotos e ilustraciones de alta resolución.
 */

export class Lightbox {
  constructor() {
    this.createDom();
    this.openListeners = [];
    this.closeListeners = [];
  }

  createDom() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'lightbox-overlay';
    this.overlay.innerHTML = `
      <div class="lightbox-container">
        <button class="lightbox-close" title="Cerrar">&times;</button>
        <img class="lightbox-image" src="" alt="Ilustración ampliada" />
        <div class="lightbox-caption"></div>
      </div>
    `;
    document.body.appendChild(this.overlay);

    this.imgEl = this.overlay.querySelector('.lightbox-image');
    this.captionEl = this.overlay.querySelector('.lightbox-caption');
    this.closeBtn = this.overlay.querySelector('.lightbox-close');

    this.closeBtn.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
        this.close();
      }
    });
  }

  open(src, caption = '') {
    this.imgEl.src = src;
    this.captionEl.textContent = caption;
    this.overlay.classList.add('active');
    this.openListeners.forEach(cb => cb({ src, caption }));
  }

  close() {
    this.overlay.classList.remove('active');
    this.closeListeners.forEach(cb => cb());
  }

  onOpen(cb) { this.openListeners.push(cb); }
  onClose(cb) { this.closeListeners.push(cb); }
}
