/**
 * BookRenderer.js
 * Genera el HTML editorial y artístico del libro interactivo.
 */

import { bookMetadata, chapters, bookPages, asset } from '../chapters/chaptersData.js';

export class BookRenderer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = '';

    // Portada en Cuero Azul Noche y Oro
    this.container.appendChild(this.createFrontCover());

    // Páginas interiores
    bookPages.forEach((pageData) => {
      const pageEl = this.createPageElement(pageData);
      this.container.appendChild(pageEl);
    });

    // Contratapa
    this.container.appendChild(this.createBackCover());
  }

  createFrontCover() {
    const div = document.createElement('div');
    div.className = 'page page-cover page-cover-front theme-mari-cover';
    div.setAttribute('data-density', 'hard');
    div.innerHTML = `
      <div class="cover-antique-bg mari-cover-bg"></div>
      
      <div class="cover-medallion-content">
        <div class="cover-alchemy-ring">
          <svg viewBox="0 0 100 100" class="ring-svg">
            <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(212,175,55,0.7)" stroke-width="1.5" stroke-dasharray="4 2"/>
            <circle cx="50" cy="50" r="41" fill="none" stroke="rgba(212,175,55,0.4)" stroke-width="1"/>
            <polygon points="50,12 85,75 15,75" fill="none" stroke="rgba(212,175,55,0.3)" stroke-width="1"/>
            <polygon points="50,88 85,25 15,25" fill="none" stroke="rgba(212,175,55,0.3)" stroke-width="1"/>
          </svg>
        </div>

        <div class="cover-gold-badge">
          <span class="cover-constellation-icon">✧ ⚛ ✧</span>
          <h1 class="cover-gold-title">${bookMetadata.title}</h1>
          <div class="cover-gold-divider"></div>
          <p class="cover-gold-subtitle">${bookMetadata.subtitle}</p>
          <p class="cover-gold-tagline">${bookMetadata.dedication}</p>
        </div>
        
        <button class="btn-open-book" id="btn-start-book">
          <span>Abrir tomo</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    `;
    return div;
  }

  createBackCover() {
    const div = document.createElement('div');
    div.className = 'page page-cover page-cover-back theme-mari-cover';
    div.setAttribute('data-density', 'hard');
    div.innerHTML = `
      <div class="cover-antique-bg mari-cover-bg back"></div>
      <div class="cover-medallion-content back">
        <div class="cover-gold-badge">
          <div class="cover-gold-title" style="font-size: 1.85rem;">${bookMetadata.title}</div>
          <div class="cover-gold-divider"></div>
          <div class="cover-gold-subtitle">${bookMetadata.subtitle}</div>
          <div class="cover-formula-motto">${bookMetadata.dedication ? `«${bookMetadata.dedication}»` : ''}</div>
        </div>
      </div>
    `;
    return div;
  }

  createPageElement(data) {
    const page = document.createElement('div');
    page.className = 'page page-parchment';
    page.setAttribute('data-page-num', data.pageNumber);

    let innerContent = '';
    switch (data.type) {
      case 'table_of_contents':
        innerContent = this.renderTableOfContents(data);
        break;
      case 'chapter_header':
        innerContent = this.renderChapterHeader(data);
        break;
      case 'illuminated_letter_mari':
        innerContent = this.renderIlluminatedLetterMari(data);
        break;
      case 'master_art_showcase':
        innerContent = this.renderMasterArtShowcase(data);
        break;
      case 'holiday_chapter':
        innerContent = this.renderHolidayChapter(data);
        break;
      case 'epilogue_upcoming':
        innerContent = this.renderEpilogueUpcoming(data);
        break;
      default:
        innerContent = `<div class="page-content-padding">Página ${data.pageNumber}</div>`;
    }

    page.innerHTML = `
      <div class="page-parchment-border"></div>
      <div class="page-inner-scroll">
        ${innerContent}
      </div>
      <div class="page-footer-number">— ${data.pageNumber} —</div>
    `;
    return page;
  }

  renderTableOfContents(data) {
    let itemsHtml = '';
    chapters.forEach(ch => {
      itemsHtml += `
        <button class="toc-item-row chapter-item-btn" data-target-page="${ch.targetPage}">
          <span class="toc-roman">${ch.numberRoman}</span>
          <div class="toc-info">
            <span class="toc-title">${ch.title}</span>
            <span class="toc-desc">${ch.description}</span>
          </div>
          <span class="toc-dots"></span>
          <span class="toc-page-num">${ch.isUpcoming ? 'Pronto' : ch.targetPage}</span>
        </button>
      `;
    });

    return `
      <div class="toc-container">
        <div class="editorial-header">
          <div class="editorial-ornament">✧ ⚛ ✧</div>
          <h2 class="editorial-title">${data.title}</h2>
          <div class="editorial-divider"></div>
        </div>
        <div class="toc-list">
          ${itemsHtml}
        </div>
        <div class="toc-quote-footer">
          ${bookMetadata.dedication ? `«${bookMetadata.dedication}»` : ''}
        </div>
      </div>
    `;
  }

  renderChapterHeader(data) {
    return `
      <div class="chapter-header-screen">
        <div class="alchemy-symbol-badge">
          <svg width="42" height="42" viewBox="0 0 100 100" class="symbol-svg">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#d4af37" stroke-width="2"/>
            <polygon points="50,20 80,75 20,75" fill="none" stroke="#d4af37" stroke-width="1.5"/>
            <circle cx="50" cy="50" r="10" fill="#d4af37"/>
          </svg>
        </div>
        <div class="editorial-roman">${data.roman}</div>
        <h2 class="chapter-main-title">${data.title}</h2>
        <h3 class="chapter-subtitle">${data.subtitle}</h3>
        <div class="editorial-divider gold"></div>
        <p class="chapter-poetic-quote">${data.quote}</p>
        <div class="chapter-feature-badge">${data.badge}</div>
      </div>
    `;
  }

  renderIlluminatedLetterMari(data) {
    if (data.part === 1) {
      return `
        <div class="letter-mari-container">
          <div class="letter-top-ornament">
            <span class="ornament-atom">⚛</span>
            <span class="ornament-vine">🌿</span>
            <span class="ornament-beaker">🧪</span>
            <span class="ornament-vine">🌿</span>
            <span class="ornament-atom">⚛</span>
          </div>

          <div class="illuminated-spread">
            <!-- Letra Capitular Iluminada "H" con orbital atómico animado -->
            <div class="illuminated-capital-wrapper">
              <div class="illuminated-h">
                <span class="capital-letter">H</span>
                <div class="atomic-orbit orbit-1"></div>
                <div class="atomic-orbit orbit-2"></div>
                <div class="atomic-nucleus"></div>
              </div>
              <div class="illuminated-lead-text">
                <h3 class="letter-salutation">${data.greeting}</h3>
                <p class="lead-phrase">${data.leadParagraph}</p>
              </div>
            </div>

            <div class="letter-body-paragraphs">
              ${data.paragraphs.map(p => `<p class="calligraphic-p">${p}</p>`).join('')}
            </div>

            <!-- Fórmula molecular interactiva con resplandor dorado -->
            <div class="molecular-formula-box" title="Fórmula de Amor Incondicional">
              <div class="formula-graphic">
                <svg width="180" height="60" viewBox="0 0 180 60" class="chem-svg">
                  <path d="M 15 30 L 40 15 L 75 15 L 95 30 L 75 45 L 40 45 Z" fill="none" stroke="#d4af37" stroke-width="1.8"/>
                  <line x1="95" y1="30" x2="125" y2="30" stroke="#d4af37" stroke-width="2"/>
                  <circle cx="125" cy="30" r="5" fill="#e2c050"/>
                  <path d="M 125 30 L 150 15 L 175 30 L 150 45 Z" fill="none" stroke="#d4af37" stroke-width="1.8"/>
                  <text x="50" y="34" font-size="9" fill="#8c6d23" font-family="monospace">H-C-O</text>
                  <text x="142" y="34" font-size="9" fill="#8c6d23" font-family="monospace">N-H2</text>
                </svg>
              </div>
              <span class="formula-text">«Amor incondicional es nuestra fórmula.»</span>
            </div>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="letter-mari-container part-2">
          <div class="letter-body-paragraphs">
            ${data.paragraphs.map(p => `<p class="calligraphic-p">${p}</p>`).join('')}
          </div>

          <!-- Banners y Ribetes clásicos de la ilustración -->
          <div class="formula-grand-banner">
            <div class="banner-ribbon-outer">
              <span class="ribbon-glow">✧</span>
              <span class="ribbon-text">${data.formulaBadge}</span>
              <span class="ribbon-glow">✧</span>
            </div>
          </div>

          <div class="closing-signoff-box">
            <div class="curie-avatar-duo">
              <span class="scientist-tag">Marie Curie · Rosalind Franklin</span>
            </div>
            <div class="ribbon-banner-parchment">
              ${data.closingBanner}
            </div>
          </div>

          <div class="art-lightbox-trigger-row">
            <button class="btn-inspect-original clean-photo-frame" data-full-img="${data.originalArt}" data-caption="Manuscrito iluminado original">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
              <span>Ver manuscrito iluminado completo en HD</span>
            </button>
          </div>
        </div>
      `;
    }
  }

  renderMasterArtShowcase(data) {
    return `
      <div class="showcase-container">
        <div class="showcase-header">
          <h3 class="showcase-title">${data.title}</h3>
          <p class="showcase-subtitle">${data.subtitle}</p>
        </div>

        <div class="clean-photo-frame showcase-frame" data-full-img="${data.image}" data-caption="${data.caption}">
          <img src="${data.image}" alt="${data.caption}" class="showcase-img" />
          <div class="showcase-lens-hint">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span>Toca para ampliar al 100%</span>
          </div>
        </div>
      </div>
    `;
  }

  renderHolidayChapter(data) {
    const isChristmas = data.holidayType === 'christmas';
    return `
      <div class="holiday-card-container ${data.holidayType}">
        <div class="holiday-motif-top">
          ${isChristmas 
            ? '<span>❄️</span><span>✨</span><span>🎄</span><span>✨</span><span>❄️</span>' 
            : '<span>🥂</span><span>✨</span><span>🕰️</span><span>✨</span><span>🎆</span>'}
        </div>

        <h3 class="holiday-title">${data.title}</h3>
        <h4 class="holiday-salutation">${data.greeting}</h4>

        <div class="holiday-parchment-sheet">
          <p class="holiday-text-content">
            ${data.placeholderText}
          </p>
          <div class="holiday-signature-space">
            <span class="holiday-feather-icon">✒️</span>
            <span class="holiday-author-line">Con todo mi cariño siempre</span>
          </div>
        </div>

        <div class="holiday-footer-ribbon">
          <span>${data.bannerText}</span>
        </div>
      </div>
    `;
  }

  renderEpilogueUpcoming(data) {
    return `
      <div class="epilogue-upcoming-screen">
        <div class="upcoming-ornament">✧ 📖 ✧</div>
        <h3 class="upcoming-title">${data.title}</h3>
        <h4 class="upcoming-subtitle">${data.subtitle}</h4>
        <div class="editorial-divider"></div>
        <p class="upcoming-note">${data.note}</p>
        <div class="upcoming-footer-stamp">
          <span>Tomo en constante evolución</span>
        </div>
      </div>
    `;
  }
}
