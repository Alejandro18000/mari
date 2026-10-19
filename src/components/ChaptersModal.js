/**
 * ChaptersModal.js - Libro Mari
 * Modal interactivo con el índice de capítulos.
 */

import { chapters } from '../chapters/chaptersData.js';

export class ChaptersModal {
  constructor(onSelectPage) {
    this.onSelectPage = onSelectPage;
    this.createDom();
  }

  createDom() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'chapters-modal-overlay';
    
    let chaptersHtml = '';
    chapters.forEach(ch => {
      chaptersHtml += `
        <div class="modal-chapter-item ${ch.isUpcoming ? 'upcoming' : ''}" data-target-page="${ch.targetPage}">
          <div class="modal-ch-roman">${ch.numberRoman}</div>
          <div class="modal-ch-info">
            <h4 class="modal-ch-title">${ch.title}</h4>
            <p class="modal-ch-desc">${ch.description}</p>
          </div>
          <div class="modal-ch-page">${ch.isUpcoming ? 'Pronto' : 'Pág. ' + ch.targetPage}</div>
        </div>
      `;
    });

    this.overlay.innerHTML = `
      <div class="chapters-modal-container">
        <div class="modal-header">
          <h3>Índice de Capítulos</h3>
          <button class="modal-close-btn" title="Cerrar">&times;</button>
        </div>
        <div class="modal-list">
          ${chaptersHtml}
        </div>
      </div>
    `;

    document.body.appendChild(this.overlay);

    this.closeBtn = this.overlay.querySelector('.modal-close-btn');
    this.closeBtn.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });

    this.overlay.querySelectorAll('.modal-chapter-item').forEach(item => {
      item.addEventListener('click', () => {
        const targetPage = parseInt(item.getAttribute('data-target-page'), 10);
        if (!isNaN(targetPage)) {
          this.close();
          this.onSelectPage(targetPage);
        }
      });
    });
  }

  open() {
    this.overlay.classList.add('active');
  }

  close() {
    this.overlay.classList.remove('active');
  }
}
