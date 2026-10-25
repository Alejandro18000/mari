/**
 * BookRenderer.js
 * Genera el HTML editorial y artístico del tratado renacentista interactivo para Mari.
 * Basado en los principios de la imprenta veneciana (Aldo Manuzio), proporciones áureas
 * y la integración facsimilar del manuscrito iluminado original.
 */

import { bookMetadata, chapters, bookPages, asset } from '../chapters/chaptersData.js';

export class BookRenderer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = '';

    // Portada en Cuero Renacentista Azul Noche y Oro
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
        <!-- Marco perimetral clásico en pan de oro renacentista -->
        <div class="cover-renaissance-frame">
          <svg class="cover-frame-svg" viewBox="0 0 320 450" preserveAspectRatio="none">
            <rect x="8" y="8" width="304" height="434" fill="none" stroke="rgba(212, 175, 55, 0.65)" stroke-width="1.8" />
            <rect x="14" y="14" width="292" height="422" fill="none" stroke="rgba(212, 175, 55, 0.35)" stroke-width="0.8" stroke-dasharray="6 3" />
            
            <!-- Palmetas / arabescos de esquina -->
            <path d="M 8 36 C 24 36, 36 24, 36 8" fill="none" stroke="rgba(212, 175, 55, 0.7)" stroke-width="1.5" />
            <path d="M 312 36 C 296 36, 284 24, 284 8" fill="none" stroke="rgba(212, 175, 55, 0.7)" stroke-width="1.5" />
            <path d="M 8 414 C 24 414, 36 426, 36 442" fill="none" stroke="rgba(212, 175, 55, 0.7)" stroke-width="1.5" />
            <path d="M 312 414 C 296 414, 284 426, 284 442" fill="none" stroke="rgba(212, 175, 55, 0.7)" stroke-width="1.5" />
          </svg>
        </div>

        <!-- Emblema renacentista central -->
        <div class="cover-printer-device">
          <svg viewBox="0 0 100 100" class="aldine-emblem-svg">
            <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(212, 175, 55, 0.7)" stroke-width="1.2" stroke-dasharray="3 2" />
            <circle cx="50" cy="50" r="41" fill="none" stroke="rgba(212, 175, 55, 0.4)" stroke-width="0.8" />
            <circle cx="50" cy="50" r="27" fill="none" stroke="rgba(212, 175, 55, 0.5)" stroke-width="1" />
            <!-- Símbolo atómico y laurel de conocimiento libre -->
            <ellipse cx="50" cy="50" rx="20" ry="8" fill="none" stroke="rgba(212, 175, 55, 0.5)" stroke-width="0.9" transform="rotate(30 50 50)" />
            <ellipse cx="50" cy="50" rx="20" ry="8" fill="none" stroke="rgba(212, 175, 55, 0.5)" stroke-width="0.9" transform="rotate(-30 50 50)" />
            <circle cx="50" cy="50" r="3.2" fill="rgba(243, 229, 171, 0.95)" />
          </svg>
        </div>

        <div class="cover-gold-badge">
          <div class="cover-renaissance-fleuron">❧ ⚛ ❧</div>
          <h1 class="cover-gold-title">${bookMetadata.title}</h1>
          <div class="cover-gold-divider"></div>
          <p class="cover-gold-subtitle">${bookMetadata.subtitle}</p>
          <p class="cover-gold-tagline">${bookMetadata.dedication}</p>
        </div>
        
        <button class="btn-open-book" id="btn-start-book" title="Comenzar lectura del tomo">
          <span>Abrir Tratado</span>
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
          <div class="cover-renaissance-fleuron">❦</div>
          <div class="cover-gold-title" style="font-size: 1.7rem; letter-spacing: 2px;">PARA MARI</div>
          <div class="cover-gold-divider"></div>
          <div class="cover-gold-subtitle">4 de Agosto</div>
          <div class="cover-formula-motto">«Amor incondicional es nuestra fórmula»</div>
          <div class="colophon-latin">Explicit Feliciter · Venetia & Bogota</div>
        </div>
      </div>
    `;
    return div;
  }

  createPageElement(data) {
    const page = document.createElement('div');
    page.className = `page page-parchment ${data.type === 'manuscript_folio' ? 'page-folio-wrapper' : ''}`;
    page.setAttribute('data-page-num', data.pageNumber);

    let innerContent = '';
    switch (data.type) {
      case 'table_of_contents':
        innerContent = this.renderTableOfContents(data);
        break;
      case 'chapter_header':
        innerContent = this.renderChapterHeader(data);
        break;
      case 'manuscript_folio':
        innerContent = this.renderManuscriptFolio(data);
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

    if (data.type === 'manuscript_folio') {
      // Las páginas de facsímil ocupan el folio completo
      page.innerHTML = innerContent;
    } else {
      page.innerHTML = `
        <div class="page-parchment-border"></div>
        <div class="page-inner-scroll">
          ${innerContent}
        </div>
        <div class="page-footer-number">— ${data.pageNumber} —</div>
      `;
    }
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
          <span class="toc-page-num">${ch.isUpcoming ? 'Porvenir' : ch.targetPage}</span>
        </button>
      `;
    });

    return `
      <div class="toc-container aldine-frontispiece">
        <div class="editorial-header">
          <div class="aldine-leaf-fleuron">❦ ❖ ❦</div>
          <div class="frontispiece-latin">${data.latinTitle || 'TABULA CAPITULORUM'}</div>
          <h2 class="editorial-title">${data.title}</h2>
          <p class="frontispiece-subtitle">${data.frontispieceSubtitle || ''}</p>
          <div class="editorial-rule"></div>
        </div>

        <div class="toc-list">
          ${itemsHtml}
        </div>

        <div class="humanist-motto-box">
          <p class="motto-quote">${data.philosophicalQuote || ''}</p>
        </div>
      </div>
    `;
  }

  renderChapterHeader(data) {
    return `
      <div class="chapter-header-container aldine-title-page">
        <div class="frontispiece-vignette-top">
          <svg width="120" height="24" viewBox="0 0 120 24" class="vignette-svg">
            <path d="M 0 12 Q 30 0, 60 12 Q 90 24, 120 12" fill="none" stroke="#8c2d19" stroke-width="1.2" />
            <circle cx="60" cy="12" r="3.5" fill="#b89047" />
          </svg>
        </div>

        <span class="chapter-roman-numeral">${data.roman}</span>
        <h2 class="chapter-main-title">${data.title}</h2>
        <div class="chapter-gold-divider"></div>
        <h3 class="chapter-subtitle-text">${data.subtitle}</h3>

        <div class="chapter-philosophical-epigraph">
          <p class="epigraph-text">${data.quote}</p>
        </div>

        <div class="chapter-emblem-badge">
          <span class="emblem-fleuron">❧</span>
          <span class="emblem-caption">${data.badge}</span>
          <span class="emblem-fleuron">❧</span>
        </div>
      </div>
    `;
  }

  renderManuscriptFolio(data) {
    const isLeft = data.part === 1;
    return `
      <div class="manuscript-folio-spread ${isLeft ? 'folio-left' : 'folio-right'}">
        <div class="folio-image-wrapper clean-photo-frame" data-full-img="${asset(data.highres || 'images/carta_mari.jpg')}" data-caption="${data.caption}">
          <picture>
            <source srcset="${asset(data.image)}" type="image/webp">
            <img src="${asset(data.fallback || data.image)}" alt="${data.title}" class="manuscript-plate-img" loading="eager" />
          </picture>
          
          <!-- Sombra del lomo (gutter) para realismo tridimensional -->
          <div class="folio-gutter-shadow ${isLeft ? 'gutter-right' : 'gutter-left'}"></div>
          
          <!-- Botón refinado de aumento de manuscrito -->
          <div class="folio-zoom-hint" title="Toca para ampliar al 100% en alta resolución">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            <span>Ver HD</span>
          </div>

          <div class="folio-footer-indicator">— ${data.pageNumber} —</div>
        </div>
      </div>
    `;
  }

  renderMasterArtShowcase(data) {
    return `
      <div class="showcase-container aldine-study-page">
        <div class="showcase-header">
          <div class="aldine-leaf-fleuron">❖ ❦ ❖</div>
          <h3 class="showcase-title">${data.title}</h3>
          <p class="showcase-subtitle">${data.subtitle}</p>
        </div>

        <div class="clean-photo-frame showcase-frame" data-full-img="${asset(data.image)}" data-caption="${data.caption}">
          <img src="${asset(data.image)}" alt="${data.caption}" class="showcase-img" />
          <div class="showcase-lens-hint">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span>Examinar Díptico Completo (2816 × 1536 px)</span>
          </div>
        </div>

        <div class="showcase-essay-block">
          <h4 class="essay-heading">${data.essayTitle || 'Estudio de la Obra'}</h4>
          <p class="essay-p"><strong>Marie Curie:</strong> ${data.essayCurie}</p>
          <p class="essay-p"><strong>Rosalind Franklin:</strong> ${data.essayFranklin}</p>
          <p class="essay-p"><strong>La Fórmula:</strong> ${data.essayFormula}</p>
        </div>

        <div class="showcase-quote-box">
          <p class="showcase-quote-p">${data.essayQuote}</p>
        </div>
      </div>
    `;
  }

  renderHolidayChapter(data) {
    const isChristmas = data.holidayType === 'christmas';
    return `
      <div class="holiday-card-container ${data.holidayType} aldine-treatise">
        <div class="holiday-motif-top">
          <span class="motif-fleuron">${isChristmas ? '❄' : '✦'}</span>
          <span class="motif-fleuron">${isChristmas ? '❦' : '❖'}</span>
          <span class="motif-fleuron">${isChristmas ? '❄' : '✦'}</span>
        </div>

        <div class="holiday-epistle-head">
          <span class="epistle-rubric">${data.epistleHeader || 'Epístola'}</span>
          <h3 class="holiday-main-title">${data.title}</h3>
          <div class="editorial-rule"></div>
        </div>

        <div class="holiday-epistle-body">
          <p class="epistle-salutation">${data.greeting}</p>
          ${data.paragraphs.map((p, idx) => `
            <p class="epistle-paragraph ${idx === 0 ? 'drop-cap-paragraph' : ''}">
              ${idx === 0 ? `<span class="illuminated-drop-cap">${p.charAt(0)}</span>${p.slice(1)}` : p}
            </p>
          `).join('')}
        </div>

        <div class="holiday-motto-ribbon">
          <span class="ribbon-text">${data.bannerText}</span>
        </div>
      </div>
    `;
  }

  renderEpilogueUpcoming(data) {
    return `
      <div class="epilogue-container aldine-colophon-page">
        <div class="aldine-leaf-fleuron">❦ ❖ ❦</div>
        <span class="epilogue-chapter-tag">${data.title}</span>
        <h3 class="epilogue-main-title">${data.subtitle}</h3>
        <div class="editorial-rule"></div>

        <div class="epilogue-body-note">
          <p class="epilogue-text-p">${data.note}</p>
        </div>

        <div class="renaissance-printer-mark">
          <svg viewBox="0 0 80 80" class="colophon-mark-svg">
            <circle cx="40" cy="40" r="36" fill="none" stroke="#b89047" stroke-width="1.2" stroke-dasharray="4 2" />
            <path d="M 40 16 L 40 64 M 24 32 L 56 32 M 30 46 L 50 46" stroke="#b89047" stroke-width="1.5" />
            <circle cx="40" cy="40" r="2.5" fill="#8c2d19" />
          </svg>
        </div>

        <div class="colophon-stamp">
          <p class="colophon-p">${data.colophon}</p>
        </div>
      </div>
    `;
  }
}
