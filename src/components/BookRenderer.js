/**
 * BookRenderer.js
 * Genera el HTML editorial y artístico del libro ilustrado en acuarela de Mari y Sergio.
 * Cada página cuenta con ilustraciones en acuarela únicas y animaciones personalizadas
 * afines a la historia narrada.
 */

import { bookMetadata, chapters, bookPages, asset } from '../chapters/chaptersData.js';

export class BookRenderer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = '';

    // Portada en Acuarela Cálida
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
    div.className = 'page page-cover page-cover-front theme-cats-cover';
    div.setAttribute('data-density', 'hard');
    div.innerHTML = `
      <div class="cover-watercolor-bg"></div>
      
      <div class="cover-watercolor-content">
        <!-- Cuadro en acuarela de la portada -->
        <div class="cover-painting-frame clean-photo-frame" data-full-img="${asset(bookMetadata.coverImage || 'images/cats_cover.jpg')}" data-caption="Mari & Sergio: Una historia de amistad incondicional">
          <div class="cover-painting-border">
            <img src="${asset(bookMetadata.coverImage || 'images/cats_cover.jpg')}" alt="Mari y Sergio" class="cover-painting-img" />
            <div class="cover-lens-hint">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span>Ver en HD</span>
            </div>
          </div>
          <!-- Partículas de luz y magia animadas en la portada -->
          <div class="anim-cover-sparkles">
            <span class="sparkle s1">✨</span>
            <span class="sparkle s2">💛</span>
            <span class="sparkle s3">✨</span>
          </div>
        </div>

        <div class="cover-text-badge">
          <div class="cover-cat-paw-icon">🐾 🤍 🐾</div>
          <h1 class="cover-main-title">${bookMetadata.title}</h1>
          <div class="cover-soft-divider"></div>
          <p class="cover-main-subtitle">${bookMetadata.subtitle}</p>
          <p class="cover-tagline">«${bookMetadata.dedication}»</p>
        </div>
        
        <button class="btn-open-book" id="btn-start-book" title="Comenzar lectura del libro">
          <span class="btn-paw-left">🐾</span>
          <span>Abrir Nuestro Libro</span>
          <span class="btn-paw-right">🐾</span>
        </button>
      </div>
    `;
    return div;
  }

  createBackCover() {
    const div = document.createElement('div');
    div.className = 'page page-cover page-cover-back theme-cats-cover';
    div.setAttribute('data-density', 'hard');
    div.innerHTML = `
      <div class="cover-watercolor-bg back"></div>
      <div class="cover-watercolor-content back">
        <div class="back-cover-badge">
          <div class="back-paw-seal anim-heart-pulse">
            <svg viewBox="0 0 100 100" class="paw-heart-svg">
              <path d="M 50 82 C 20 58, 12 36, 26 22 C 38 10, 50 26, 50 26 C 50 26, 62 10, 74 22 C 88 36, 80 58, 50 82 Z" fill="rgba(217, 116, 102, 0.25)" stroke="#d97466" stroke-width="2" />
              <!-- Huellita central -->
              <ellipse cx="50" cy="54" rx="11" ry="8" fill="#d97466" />
              <circle cx="39" cy="40" r="4.5" fill="#d97466" />
              <circle cx="46" cy="35" r="4.5" fill="#d97466" />
              <circle cx="54" cy="35" r="4.5" fill="#d97466" />
              <circle cx="61" cy="40" r="4.5" fill="#d97466" />
            </svg>
          </div>
          <h2 class="back-title">Mari & Sergio</h2>
          <div class="cover-soft-divider"></div>
          <p class="back-quote">«Amor incondicional es nuestra fórmula»</p>
          <p class="back-subtext">Por siempre juntos en cada aventura, sueño y celebración.</p>
        </div>
      </div>
    `;
    return div;
  }

  createPageElement(data) {
    const page = document.createElement('div');
    page.className = `page page-watercolor-paper page-num-${data.pageNumber}`;
    page.setAttribute('data-page-num', data.pageNumber);

    let innerContent = '';
    switch (data.type) {
      case 'table_of_contents':
        innerContent = this.renderTableOfContents(data);
        break;
      case 'chapter_header':
        innerContent = this.renderChapterHeader(data);
        break;
      case 'watercolor_letter_page':
        innerContent = this.renderWatercolorLetterPage(data);
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
      <div class="page-watercolor-border"></div>
      <div class="page-inner-scroll">
        ${innerContent}
      </div>
      <div class="page-footer-number">
        <span class="footer-paw-left">🐾</span>
        <span>— ${data.pageNumber} —</span>
        <span class="footer-paw-right">🐾</span>
      </div>
    `;
    return page;
  }

  renderTableOfContents(data) {
    let itemsHtml = '';
    chapters.forEach(ch => {
      itemsHtml += `
        <button class="toc-item-row chapter-item-btn" data-target-page="${ch.targetPage}">
          <span class="toc-paw-badge">🐾</span>
          <div class="toc-info">
            <span class="toc-title">${ch.title}</span>
            <span class="toc-desc">${ch.description}</span>
          </div>
          <span class="toc-dots-leader"></span>
          <span class="toc-page-num">${ch.isUpcoming ? 'Pronto' : `Pág. ${ch.targetPage}`}</span>
        </button>
      `;
    });

    return `
      <div class="toc-container watercolor-toc">
        <div class="page-story-head">
          <div class="head-paw-ornament">🐾 🌸 🐾</div>
          <h2 class="page-story-title">${data.title}</h2>
          <p class="page-story-subtitle">${data.subtitle || ''}</p>
          <div class="watercolor-brush-divider"></div>
        </div>

        <div class="toc-list-watercolor">
          ${itemsHtml}
        </div>

        <div class="toc-quote-box">
          <p class="toc-quote-text">${data.quote || ''}</p>
        </div>

        <!-- Animación única de colita de gato en el pie del índice -->
        <div class="anim-cat-tail-container" title="¡Ronroneo de felicidad!">
          <svg class="cat-tail-svg" viewBox="0 0 120 40">
            <path class="cat-tail-path anim-tail-sway" d="M 20 30 C 50 30, 70 10, 100 15 C 110 18, 115 10, 110 5" fill="none" stroke="#71717a" stroke-width="5" stroke-linecap="round" />
            <ellipse cx="20" cy="28" rx="14" ry="10" fill="#a1a1aa" />
          </svg>
          <span class="cat-purr-text">Purrr... 🤍</span>
        </div>
      </div>
    `;
  }

  renderChapterHeader(data) {
    return `
      <div class="chapter-header-watercolor">
        <div class="chapter-badge-pill">${data.badge}</div>
        <span class="chapter-roman">${data.roman}</span>
        <h2 class="chapter-title">${data.title}</h2>
        <h3 class="chapter-subtitle">${data.subtitle}</h3>
        <div class="watercolor-brush-divider"></div>

        <!-- Cuadro en acuarela del capítulo -->
        ${data.image ? `
          <div class="chapter-painting-box clean-photo-frame" data-full-img="${asset(data.image)}" data-caption="${data.caption}">
            <img src="${asset(data.image)}" alt="${data.caption}" class="chapter-painting-img" loading="eager" />
            <div class="painting-zoom-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span>Ampliar</span>
            </div>
            
            <!-- Animación única según el capítulo -->
            ${data.roman === 'Capítulo I' ? `
              <div class="anim-birthday-candle-flame" title="La llamita de la vela">
                <div class="candle-glow anim-candle-flicker"></div>
              </div>
            ` : data.roman === 'Capítulo II' ? `
              <div class="anim-snow-layer">
                <span class="snow-flake sf1">❄</span>
                <span class="snow-flake sf2">❅</span>
                <span class="snow-flake sf3">❄</span>
              </div>
            ` : `
              <div class="anim-firework-sparks">
                <span class="spark fw1">✨</span>
                <span class="spark fw2">🎆</span>
                <span class="spark fw3">✨</span>
              </div>
            `}
          </div>
        ` : ''}

        <div class="chapter-quote-card">
          <p class="chapter-quote-p">${data.quote}</p>
        </div>
      </div>
    `;
  }

  renderWatercolorLetterPage(data) {
    if (data.part === 1) {
      return `
        <div class="letter-story-container part-1">
          <!-- Animación única: Avioncito de papel de acuarela volando -->
          <div class="anim-paper-plane-box">
            <svg class="paper-plane-svg anim-plane-glider" viewBox="0 0 60 40">
              <path d="M 5 20 L 55 5 L 35 35 L 28 22 Z" fill="#fdf2f0" stroke="#d97466" stroke-width="1.8" stroke-linejoin="round"/>
              <path d="M 55 5 L 28 22" stroke="#d97466" stroke-width="1.5"/>
            </svg>
            <div class="plane-trail">
              <span class="star s-1">✨</span>
              <span class="star s-2">💌</span>
              <span class="star s-3">✨</span>
            </div>
          </div>

          <div class="letter-header-row">
            <span class="letter-tagline">Nuestra Cartica de Cumpleaños</span>
            <h2 class="letter-main-greeting">${data.greeting}</h2>
          </div>

          <div class="letter-lead-card">
            <p class="lead-text">${data.leadParagraph}</p>
          </div>

          <div class="letter-body-paragraphs">
            ${data.paragraphs.map(p => `
              <p class="watercolor-story-p">${p}</p>
            `).join('')}
          </div>

          <div class="letter-highlight-bubble anim-soft-pulse">
            <span class="bubble-paw">🐾</span>
            <span class="bubble-text">«Siempre encuentras la manera de sacarle un brillo especial a mi vida»</span>
            <span class="bubble-paw">🐾</span>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="letter-story-container part-2">
          <div class="letter-body-paragraphs">
            ${data.paragraphs.map(p => `
              <p class="watercolor-story-p">${p}</p>
            `).join('')}
          </div>

          <!-- Cuadro de Mari en el laboratorio de química -->
          <div class="letter-painting-card clean-photo-frame" data-full-img="${asset(data.image)}" data-caption="${data.caption}">
            <img src="${asset(data.image)}" alt="${data.caption}" class="letter-card-img" />
            <div class="painting-zoom-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span>Ver en HD</span>
            </div>

            <!-- Animación única: Burbujitas efervescentes del matraz -->
            <div class="anim-lab-bubbles">
              <span class="bubble b1">🫧</span>
              <span class="bubble b2">✨</span>
              <span class="bubble b3">🫧</span>
              <span class="bubble b4">🧪</span>
            </div>
          </div>

          <div class="letter-smile-quote">
            <span class="quote-flower">🌸</span>
            <span class="quote-text">«Cuando sonríes te ves aún más hermosa»</span>
            <span class="quote-flower">🌸</span>
          </div>
        </div>
      `;
    }
  }

  renderMasterArtShowcase(data) {
    return `
      <div class="master-showcase-container">
        <div class="showcase-story-head">
          <div class="showcase-heart-icon anim-heart-pulse">💖 🐾 💖</div>
          <h2 class="showcase-title">${data.title}</h2>
          <p class="showcase-subtitle">${data.subtitle}</p>
        </div>

        <div class="master-painting-frame clean-photo-frame" data-full-img="${asset(data.image)}" data-caption="${data.caption}">
          <div class="painting-deckled-edge">
            <img src="${asset(data.image)}" alt="${data.caption}" class="master-painting-img" />
            <div class="master-zoom-overlay">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span>Toca para admirar en 100% de pantalla</span>
            </div>
          </div>

          <!-- Animación única: Corazoncitos flotantes en acuarela -->
          <div class="anim-floating-hearts-layer">
            <span class="floating-heart fh1">🤍</span>
            <span class="floating-heart fh2">💖</span>
            <span class="floating-heart fh3">🌸</span>
            <span class="floating-heart fh4">✨</span>
          </div>
        </div>

        <div class="master-dedication-card">
          <p class="dedication-p">${data.dedicationText}</p>
        </div>
      </div>
    `;
  }

  renderHolidayChapter(data) {
    const isChristmas = data.holidayType === 'christmas';
    return `
      <div class="holiday-story-container ${data.holidayType}">
        <div class="holiday-header-box">
          <div class="holiday-icon-motif">
            ${isChristmas ? '🎄 ☕ ❄️' : '🌙 🏮 ✨'}
          </div>
          <h2 class="holiday-title">${data.title}</h2>
          <div class="watercolor-brush-divider"></div>
        </div>

        <!-- Animación única según la festividad -->
        ${isChristmas ? `
          <div class="anim-hot-cocoa-steam">
            <svg class="steam-svg" viewBox="0 0 60 40">
              <path class="steam-line anim-steam-1" d="M 20 35 Q 15 20, 25 10 Q 30 5, 25 0" fill="none" stroke="#d97466" stroke-width="1.8" stroke-linecap="round"/>
              <path class="steam-line anim-steam-2" d="M 35 35 Q 40 20, 30 10 Q 25 5, 35 0" fill="none" stroke="#d97466" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
            <span class="steam-label">Chocolate Caliente & Amor</span>
          </div>
        ` : `
          <div class="anim-sky-lantern-float">
            <div class="lantern-orb anim-lantern-bob">
              <span>🏮</span>
              <div class="lantern-glow"></div>
            </div>
            <span class="lantern-label">Farolillo de los Deseos</span>
          </div>
        `}

        <div class="holiday-epistle-card">
          <p class="epistle-salutation">${data.greeting}</p>
          ${data.paragraphs.map(p => `
            <p class="epistle-paragraph">${p}</p>
          `).join('')}
        </div>

        <div class="holiday-banner-ribbon">
          <span class="banner-paw">🐾</span>
          <span class="banner-text">${data.bannerText}</span>
          <span class="banner-paw">🐾</span>
        </div>
      </div>
    `;
  }

  renderEpilogueUpcoming(data) {
    return `
      <div class="epilogue-story-container">
        <div class="epilogue-head">
          <span class="epilogue-tag">${data.title}</span>
          <h2 class="epilogue-title">${data.subtitle}</h2>
          <div class="watercolor-brush-divider"></div>
        </div>

        <div class="epilogue-painting-box clean-photo-frame" data-full-img="${asset(data.image)}" data-caption="${data.caption}">
          <img src="${asset(data.image)}" alt="${data.caption}" class="epilogue-painting-img" />
          <div class="painting-zoom-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span>Ver en HD</span>
          </div>

          <!-- Animación única: Secuencia de huellitas de gato iluminándose -->
          <div class="anim-paw-trail">
            <span class="trail-paw tp1">🐾</span>
            <span class="trail-paw tp2">🐾</span>
            <span class="trail-paw tp3">🐾</span>
            <span class="trail-paw tp4">🐾</span>
          </div>
        </div>

        <div class="epilogue-note-card">
          <p class="epilogue-p">${data.note}</p>
        </div>

        <div class="epilogue-colophon-stamp">
          <p class="colophon-text">${data.colophon}</p>
        </div>
      </div>
    `;
  }
}
