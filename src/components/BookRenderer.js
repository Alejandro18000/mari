/**
 * BookRenderer.js
 * Genera el HTML editorial y artístico del tratado renacentista interactivo para Mari.
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
        <!-- Esfera armilar / anillo alquímico renacentista -->
        <div class="cover-alchemy-ring">
          <svg viewBox="0 0 100 100" class="ring-svg">
            <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(212,175,55,0.7)" stroke-width="1.2" stroke-dasharray="3 2"/>
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(212,175,55,0.4)" stroke-width="0.8"/>
            <polygon points="50,10 88,76 12,76" fill="none" stroke="rgba(212,175,55,0.3)" stroke-width="0.8"/>
            <polygon points="50,90 88,24 12,24" fill="none" stroke="rgba(212,175,55,0.3)" stroke-width="0.8"/>
            <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(212,175,55,0.5)" stroke-width="1"/>
            <circle cx="50" cy="50" r="4" fill="rgba(243,229,171,0.9)"/>
          </svg>
        </div>

        <div class="cover-gold-badge">
          <div class="cover-renaissance-fleuron">❧ ⚛ ❧</div>
          <h1 class="cover-gold-title">${bookMetadata.title}</h1>
          <div class="cover-gold-divider"></div>
          <p class="cover-gold-subtitle">${bookMetadata.subtitle}</p>
          <p class="cover-gold-tagline">${bookMetadata.dedication}</p>
        </div>
        
        <button class="btn-open-book" id="btn-start-book">
          <span>Abrir tratado</span>
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
          <div class="cover-renaissance-fleuron" style="margin-top: 15px;">⚜</div>
        </div>
      </div>
    `;
    return div;
  }

  createPageElement(data) {
    const page = document.createElement('div');
    page.className = `page page-parchment ${data.type === 'illuminated_letter_mari' ? 'page-illuminated-spread part-' + data.part : ''}`;
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

  // PÁGINA 1: FRONTISPICIO & ÍNDICE RENACENTISTA
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
      <div class="toc-container renaissance-frontispiece">
        <div class="editorial-header">
          <div class="woodcut-ornament-header">
            <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
              <path d="M 5 10 Q 15 2 30 10 Q 45 18 55 10" stroke="#c5a059" stroke-width="1.2" fill="none"/>
              <circle cx="30" cy="10" r="3" fill="#9a7b20"/>
              <circle cx="15" cy="6" r="1.5" fill="#c5a059"/>
              <circle cx="45" cy="14" r="1.5" fill="#c5a059"/>
            </svg>
          </div>
          <h2 class="editorial-title">${data.title}</h2>
          <div class="frontispiece-sub">${data.frontispieceSubtitle || 'Tratado de la Amistad y la Transformación'}</div>
          <div class="editorial-divider"></div>
        </div>
        <div class="toc-list">
          ${itemsHtml}
        </div>
        <div class="toc-quote-footer">
          ${data.philosophicalQuote || (bookMetadata.dedication ? `«${bookMetadata.dedication}»` : '')}
        </div>
      </div>
    `;
  }

  // PÁGINA 2 / 6 / 8: PORTADILLA DE CAPÍTULO
  renderChapterHeader(data) {
    return `
      <div class="chapter-header-screen renaissance-header-screen">
        <div class="renaissance-woodcut-vignette">
          <svg width="70" height="70" viewBox="0 0 100 100" class="symbol-svg">
            <!-- Alambique y Matraz Renacentista estilizado -->
            <path d="M 45 20 L 55 20 L 55 35 Q 70 50 70 70 A 20 20 0 0 1 30 70 Q 30 50 45 35 Z" fill="none" stroke="#c5a059" stroke-width="2"/>
            <path d="M 55 30 Q 75 25 80 45 L 80 65" fill="none" stroke="#9a7b20" stroke-width="1.8" stroke-dasharray="3 2"/>
            <ellipse cx="50" cy="70" rx="15" ry="8" fill="rgba(212,175,55,0.2)"/>
            <circle cx="50" cy="15" r="2.5" fill="#d4af37"/>
            <circle cx="80" cy="68" r="2" fill="#d4af37"/>
            <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(212,175,55,0.3)" stroke-width="1" stroke-dasharray="4 3"/>
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

  // PÁGINAS 3 Y 4: GRAN DÍPTICO ILUMINADO RENACENTISTA (RECREADO DESDE CERO)
  renderIlluminatedLetterMari(data) {
    if (data.part === 1) {
      // -------------------------------------------------------------------
      // FOLIO IZQUIERDO (PÁGINA 3): ENREDADERA ALQUÍMICA + GRAN "H" + MARIE CURIE
      // -------------------------------------------------------------------
      return `
        <div class="letter-mari-manuscript left-folio">
          <!-- MARGEN IZQUIERDO ILUMINADO: ENREDADERA RENACENTISTA CON CRISTALERÍA ALQUÍMICA -->
          <div class="renaissance-illuminated-border left-border">
            <svg viewBox="0 0 55 420" class="border-svg" preserveAspectRatio="none">
              <defs>
                <linearGradient id="flaskGold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#fef08a"/>
                  <stop offset="50%" stop-color="#d4af37"/>
                  <stop offset="100%" stop-color="#92400e"/>
                </linearGradient>
                <linearGradient id="emeraldLiquid" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stop-color="#059669"/>
                  <stop offset="70%" stop-color="#34d399"/>
                  <stop offset="100%" stop-color="#a7f3d0"/>
                </linearGradient>
                <linearGradient id="amberLiquid" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stop-color="#b45309"/>
                  <stop offset="70%" stop-color="#f59e0b"/>
                  <stop offset="100%" stop-color="#fef3c7"/>
                </linearGradient>
                <linearGradient id="rubyLiquid" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stop-color="#881337"/>
                  <stop offset="70%" stop-color="#e11d48"/>
                  <stop offset="100%" stop-color="#fecdd3"/>
                </linearGradient>
              </defs>

              <!-- Enredadera botánica renacentista de hojas de acanto -->
              <path d="M 28 0 C 15 50, 42 90, 24 140 C 8 190, 42 240, 20 300 C 5 350, 38 390, 26 420" 
                    fill="none" stroke="#b4832c" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M 28 0 C 18 50, 40 90, 26 140 C 10 190, 40 240, 22 300 C 7 350, 36 390, 28 420" 
                    fill="none" stroke="#dfbe65" stroke-width="1.2" stroke-linecap="round"/>

              <!-- Hojas de acanto y uvas en espiral -->
              <circle cx="14" cy="55" r="3" fill="#6b21a8"/>
              <circle cx="18" cy="58" r="3" fill="#581c87"/>
              <circle cx="12" cy="62" r="3" fill="#7e22ce"/>
              <circle cx="16" cy="66" r="2.5" fill="#6b21a8"/>

              <!-- Matraz florentino con líquido esmeralda y burbujas activas -->
              <g class="alembic-group-1" transform="translate(14, 85)">
                <path d="M 12 0 L 16 0 L 16 12 L 24 24 A 10 10 0 1 1 4 24 L 12 12 Z" fill="rgba(255,255,255,0.7)" stroke="#b4832c" stroke-width="1.5"/>
                <path d="M 6 23 A 8 8 0 0 0 22 23 Z" fill="url(#emeraldLiquid)" opacity="0.85"/>
                <circle cx="12" cy="24" r="1.5" fill="#fff" class="bubble-anim b1"/>
                <circle cx="16" cy="26" r="1.2" fill="#fff" class="bubble-anim b2"/>
              </g>

              <!-- Retorta de destilación con líquido ámbar -->
              <g class="alembic-group-2" transform="translate(12, 175)">
                <path d="M 8 18 A 12 12 0 1 1 24 6 Q 28 6 36 20" fill="none" stroke="#b4832c" stroke-width="1.5"/>
                <circle cx="14" cy="18" r="8" fill="url(#amberLiquid)" opacity="0.85"/>
                <circle cx="12" cy="17" r="1.3" fill="#fff" class="bubble-anim b1"/>
              </g>

              <!-- Frasco de alquimia con líquido rubí -->
              <g class="alembic-group-3" transform="translate(14, 260)">
                <rect x="7" y="0" width="14" height="22" rx="4" fill="rgba(255,255,255,0.7)" stroke="#b4832c" stroke-width="1.5"/>
                <rect x="8" y="10" width="12" height="11" rx="2" fill="url(#rubyLiquid)" opacity="0.85"/>
                <circle cx="14" cy="15" r="1.2" fill="#fff" class="bubble-anim b3"/>
              </g>

              <!-- Medallón Radium y Polonio (Marie Curie) -->
              <g class="radium-medallion" transform="translate(6, 360)">
                <circle cx="20" cy="20" r="19" fill="#0d1b2a" stroke="#d4af37" stroke-width="2"/>
                <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(212,175,55,0.4)" stroke-width="1" stroke-dasharray="2 2"/>
                <text x="20" y="17" font-family="'Cinzel', serif" font-size="8" font-weight="700" fill="#f3e5ab" text-anchor="middle">Ra 88</text>
                <text x="20" y="27" font-family="'Cinzel', serif" font-size="8" font-weight="700" fill="#f3e5ab" text-anchor="middle">Po 84</text>
                <circle cx="20" cy="20" r="20" fill="none" stroke="#f59e0b" stroke-width="1" class="radium-pulse-ring"/>
              </g>
            </svg>
          </div>

          <!-- CONTENIDO DEL FOLIO IZQUIERDO -->
          <div class="folio-content-body">
            <!-- CABECERA: RED CRISTALINA MOLECULAR & CAMAFEO DE MARIE CURIE -->
            <div class="renaissance-top-header">
              <!-- Camafeo central de Marie Curie con corona de laurel triunfal -->
              <div class="curie-laurel-cameo" title="Marie Curie · Pionera de la ciencia y el saber emancipador">
                <div class="laurel-wreath-decor">
                  <svg viewBox="0 0 120 70" class="laurel-svg">
                    <!-- Corona de laurel renacentista -->
                    <path d="M 20 45 C 10 25, 30 5, 55 10 C 58 10, 58 15, 55 16 C 36 12, 22 28, 28 45 Z" fill="#2d5a27"/>
                    <path d="M 100 45 C 110 25, 90 5, 65 10 C 62 10, 62 15, 65 16 C 84 12, 98 28, 92 45 Z" fill="#2d5a27"/>
                    <!-- Bayas doradas del laurel -->
                    <circle cx="34" cy="18" r="2" fill="#d4af37"/>
                    <circle cx="48" cy="12" r="2" fill="#d4af37"/>
                    <circle cx="72" cy="12" r="2" fill="#d4af37"/>
                    <circle cx="86" cy="18" r="2" fill="#d4af37"/>
                  </svg>
                  <div class="cameo-oval-frame">
                    <div class="curie-portrait-mini" title="Marie Curie"></div>
                  </div>
                </div>
                <div class="curie-cameo-tag">Marie Curie · 1867–1934</div>
              </div>

              <!-- Red cristalina molecular en esquina superior -->
              <div class="molecular-lattice-model">
                <svg width="48" height="40" viewBox="0 0 60 50">
                  <line x1="15" y1="12" x2="45" y2="12" stroke="#d4af37" stroke-width="1.2"/>
                  <line x1="15" y1="12" x2="30" y2="38" stroke="#d4af37" stroke-width="1.2"/>
                  <line x1="45" y1="12" x2="30" y2="38" stroke="#d4af37" stroke-width="1.2"/>
                  <line x1="30" y1="38" x2="52" y2="44" stroke="#d4af37" stroke-width="1.2"/>
                  <line x1="45" y1="12" x2="52" y2="44" stroke="#d4af37" stroke-width="1.2"/>
                  <circle cx="15" cy="12" r="4" fill="#3b82f6"/>
                  <circle cx="45" cy="12" r="4" fill="#ef4444"/>
                  <circle cx="30" cy="38" r="5" fill="#d4af37"/>
                  <circle cx="52" cy="44" r="3.5" fill="#10b981"/>
                </svg>
              </div>
            </div>

            <!-- GRAN LETRA CAPITULAR ILUMINADA "H" CON ÓRBITA ATÓMICA ANIMADA -->
            <div class="renaissance-dropcap-block">
              <div class="renaissance-illuminated-cap">
                <div class="dropcap-outer-frame">
                  <div class="dropcap-inner-blue">
                    <!-- Órbitas atómicas animadas -->
                    <div class="cap-atomic-orbit cap-orbit-1"></div>
                    <div class="cap-atomic-orbit cap-orbit-2"></div>
                    <div class="cap-atomic-nucleus"></div>
                    <!-- Letra capitular -->
                    <span class="cap-letter-glyph">H</span>
                  </div>
                </div>
              </div>
              <div class="dropcap-lead-content">
                <h3 class="humanist-salutation">${data.greeting}</h3>
                <p class="humanist-lead-phrase">${data.leadParagraph}</p>
              </div>
            </div>

            <!-- CUERPO DE LA CARTA (PARTE 1) EN CURSIVA HUMANISTA -->
            <div class="humanist-paragraphs">
              ${data.paragraphs.map(p => `
                <p class="humanist-cursive-paragraph">${p}</p>
              `).join('')}
            </div>

            <!-- VIÑETA INFERIOR: ALQUIMISTA EN SU TALLER -->
            <div class="renaissance-lower-vignette left">
              <div class="alchemist-woodcut-icon">
                <svg width="45" height="35" viewBox="0 0 60 45" fill="none">
                  <rect x="5" y="28" width="50" height="4" fill="#8c6d23"/>
                  <path d="M 15 28 L 15 15 L 20 15 L 20 28" stroke="#8c6d23" stroke-width="1.2"/>
                  <circle cx="35" cy="20" r="7" stroke="#8c6d23" stroke-width="1.2"/>
                  <path d="M 35 13 L 35 8" stroke="#8c6d23" stroke-width="1.2"/>
                  <path d="M 46 28 L 50 18 L 54 28 Z" stroke="#8c6d23" stroke-width="1.2"/>
                </svg>
              </div>
              <div class="vignette-motto-text">Labor omnia vincit · Ciencia y Afecto</div>
            </div>
          </div>
        </div>
      `;
    } else {
      // -------------------------------------------------------------------
      // FOLIO DERECHO (PÁGINA 4): ROSALIND FRANKLIN + SOL RENACENTISTA + FÓRMULA QUÍMICA
      // -------------------------------------------------------------------
      return `
        <div class="letter-mari-manuscript right-folio">
          <!-- CONTENIDO DEL FOLIO DERECHO -->
          <div class="folio-content-body right-padded">
            <!-- CABECERA FRISO RENACENTISTA -->
            <div class="renaissance-frieze-top">
              <div class="frieze-line"></div>
              <div class="frieze-rosettes">✦ ❖ ✦</div>
              <div class="frieze-line"></div>
            </div>

            <!-- CUERPO DE LA CARTA (PARTE 2) -->
            <div class="humanist-paragraphs top-spacing">
              ${data.paragraphs.map(p => `
                <p class="humanist-cursive-paragraph">${p}</p>
              `).join('')}
            </div>

            <!-- GRAN CARTELA MOLECULAR DE LA FÓRMULA (RECREADA FIELMENTE EN SVG CON RESPLANDOR) -->
            <div class="renaissance-formula-cartouche" title="Cartela Química: Amor Incondicional es Nuestra Fórmula">
              <div class="cartouche-scroll-border">
                <div class="cartouche-inner-parchment">
                  <!-- Esquema molecular interactivo -->
                  <div class="cartouche-chem-diagram">
                    <svg viewBox="0 0 240 60" class="chem-structure-svg">
                      <!-- Enlaces químicos de la molécula -->
                      <line x1="20" y1="30" x2="45" y2="15" stroke="#9a7b20" stroke-width="2" class="formula-bond"/>
                      <line x1="45" y1="15" x2="80" y2="15" stroke="#9a7b20" stroke-width="2" class="formula-bond"/>
                      <line x1="80" y1="15" x2="105" y2="30" stroke="#9a7b20" stroke-width="2" class="formula-bond"/>
                      <line x1="105" y1="30" x2="80" y2="45" stroke="#9a7b20" stroke-width="2" class="formula-bond"/>
                      <line x1="80" y1="45" x2="45" y2="45" stroke="#9a7b20" stroke-width="2" class="formula-bond"/>
                      <line x1="45" y1="45" x2="20" y2="30" stroke="#9a7b20" stroke-width="2" class="formula-bond"/>

                      <!-- Puente de enlace central -->
                      <line x1="105" y1="30" x2="140" y2="30" stroke="#9a7b20" stroke-width="2.5" class="formula-bond"/>
                      <line x1="140" y1="30" x2="165" y2="15" stroke="#9a7b20" stroke-width="2" class="formula-bond"/>
                      <line x1="165" y1="15" x2="195" y2="30" stroke="#9a7b20" stroke-width="2" class="formula-bond"/>
                      <line x1="195" y1="30" x2="165" y2="45" stroke="#9a7b20" stroke-width="2" class="formula-bond"/>
                      <line x1="165" y1="45" x2="140" y2="30" stroke="#9a7b20" stroke-width="2" class="formula-bond"/>

                      <!-- Átomos funcionales -->
                      <circle cx="20" cy="30" r="4.5" fill="#dc2626" class="atom-node"/>
                      <circle cx="105" cy="30" r="5" fill="#d4af37" class="atom-node"/>
                      <circle cx="140" cy="30" r="4.5" fill="#2563eb" class="atom-node"/>
                      <circle cx="195" cy="30" r="4.5" fill="#059669" class="atom-node"/>

                      <!-- Etiquetas químicas clásicas -->
                      <text x="54" y="34" font-family="'Cinzel', serif" font-size="9" font-weight="700" fill="#705510">H—C—O</text>
                      <text x="160" y="34" font-family="'Cinzel', serif" font-size="9" font-weight="700" fill="#705510">N—H₂</text>
                    </svg>
                  </div>
                  <!-- Lema grabado en la cartela -->
                  <div class="cartouche-motto-banner">
                    ${data.formulaBadge}
                  </div>
                </div>
              </div>
            </div>

            <!-- BANDEROLA EN PERGAMINO PLEGADO TROMPE-L'ŒIL -->
            <div class="renaissance-parchment-banner">
              <div class="parchment-ribbon-tail left"></div>
              <div class="parchment-ribbon-main">
                <span class="ribbon-flourish">❧</span>
                <span class="ribbon-inscription">${data.closingBanner}</span>
                <span class="ribbon-flourish">❧</span>
              </div>
              <div class="parchment-ribbon-tail right"></div>
            </div>

            <!-- BOTÓN ELEGANTE PARA EXPLORAR EL MANUSCRITO COMPLETO EN ULTRA HD -->
            <div class="renaissance-lightbox-action">
              <button class="btn-renaissance-inspect clean-photo-frame" data-full-img="${data.originalArt}" data-caption="Manuscrito iluminado renacentista para Mari">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <span>Inspeccionar Manuscrito Original en Ultra HD (2816px)</span>
              </button>
            </div>
          </div>

          <!-- MARGEN DERECHO ILUMINADO: SOL RENACENTISTA + ROSALIND FRANKLIN & ADN -->
          <div class="renaissance-illuminated-border right-border">
            <svg viewBox="0 0 55 420" class="border-svg" preserveAspectRatio="none">
              <!-- Pilastra arquitectónica clásica -->
              <rect x="5" y="0" width="45" height="420" fill="rgba(243,229,171,0.15)" stroke="#c5a059" stroke-width="1"/>
              <line x1="12" y1="0" x2="12" y2="420" stroke="rgba(212,175,55,0.4)" stroke-width="0.8"/>
              <line x1="43" y1="0" x2="43" y2="420" stroke="rgba(212,175,55,0.4)" stroke-width="0.8"/>

              <!-- Sol Renacentista Radiante con Rostro Humano -->
              <g class="renaissance-sun-top" transform="translate(7, 20)">
                <!-- Rayos del Sol -->
                <path d="M 20 20 L 20 2 M 20 20 L 33 7 M 20 20 L 38 20 M 20 20 L 33 33 M 20 20 L 20 38 M 20 20 L 7 33 M 20 20 L 2 20 M 20 20 L 7 7" 
                      stroke="#d4af37" stroke-width="1.8" stroke-linecap="round" class="sun-rays-pulse"/>
                <!-- Disco Solar con Rostro sereno -->
                <circle cx="20" cy="20" r="11" fill="#fef08a" stroke="#b45309" stroke-width="1.5"/>
                <!-- Ojos y sonrisa renacentista -->
                <ellipse cx="16" cy="18" rx="1.5" ry="0.8" fill="#78350f"/>
                <ellipse cx="24" cy="18" rx="1.5" ry="0.8" fill="#78350f"/>
                <path d="M 16 23 Q 20 26 24 23" fill="none" stroke="#78350f" stroke-width="1" stroke-linecap="round"/>
              </g>

              <!-- Camafeo de Rosalind Franklin y la doble hélice de ADN -->
              <g class="franklin-cameo-group" transform="translate(7, 130)">
                <!-- Marco ovalado del camafeo -->
                <ellipse cx="20" cy="30" rx="17" ry="22" fill="#0d1b2a" stroke="#d4af37" stroke-width="2"/>
                <ellipse cx="20" cy="30" rx="14" ry="19" fill="none" stroke="rgba(212,175,55,0.5)" stroke-width="0.8"/>
                <!-- Miniatura de Rosalind Franklin con la foto 51 / ADN -->
                <image href="${data.originalArt}" x="6" y="12" width="28" height="36" preserveAspectRatio="xMidYMid slice" clip-path="url(#cameoClip)"/>
                <!-- Hélice animada de ADN en el lateral -->
                <path d="M 20 54 Q 14 62 20 70 Q 26 78 20 86 Q 14 94 20 102" fill="none" stroke="#38bdf8" stroke-width="2" class="dna-wave-anim"/>
                <path d="M 20 54 Q 26 62 20 70 Q 14 78 20 86 Q 26 94 20 102" fill="none" stroke="#f43f5e" stroke-width="2" class="dna-wave-anim reverse"/>
              </g>

              <!-- Esfera armilar / Cáliz inferior -->
              <g class="armillary-chalice" transform="translate(7, 280)">
                <ellipse cx="20" cy="15" rx="15" ry="7" fill="none" stroke="#c5a059" stroke-width="1.2"/>
                <ellipse cx="20" cy="15" rx="7" ry="15" fill="none" stroke="#c5a059" stroke-width="1.2"/>
                <line x1="5" y1="15" x2="35" y2="15" stroke="#c5a059" stroke-width="1.2"/>
                <circle cx="20" cy="15" r="3" fill="#d4af37"/>
              </g>

              <!-- Segundo Sol Renacentista inferior -->
              <g class="renaissance-sun-bottom" transform="translate(7, 360)">
                <circle cx="20" cy="20" r="14" fill="#0d1b2a" stroke="#d4af37" stroke-width="1.8"/>
                <circle cx="20" cy="20" r="9" fill="#fef08a" stroke="#b45309" stroke-width="1"/>
                <path d="M 17 19 Q 20 22 23 19" fill="none" stroke="#78350f" stroke-width="1"/>
              </g>
            </svg>
          </div>
        </div>
      `;
    }
  }

  // PÁGINA 5: ESTUDIO DEL MANUSCRITO Y COMPOSICIÓN EDITORIAL
  renderMasterArtShowcase(data) {
    return `
      <div class="showcase-container renaissance-study-screen">
        <div class="showcase-header">
          <div class="renaissance-fleuron-sm">❖ ⚜ ❖</div>
          <h3 class="showcase-title">${data.title}</h3>
          <p class="showcase-subtitle">${data.subtitle}</p>
        </div>

        <div class="clean-photo-frame showcase-frame renaissance-frame" data-full-img="${data.image}" data-caption="${data.caption}">
          <img src="${data.image}" alt="${data.caption}" class="showcase-img" />
          <div class="showcase-lens-hint">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            <span>Toca para explorar el díptico completo en 2816px</span>
          </div>
        </div>

        <div class="renaissance-essay-footer">
          <p class="essay-quote">${data.essayQuote || ''}</p>
        </div>
      </div>
    `;
  }

  // PÁGINAS 7 Y 9: CAPÍTULOS DE NAVIDAD Y FIN DE AÑO (CON DISEÑO RENACENTISTA BOTÁNICO Y ASTRONÓMICO)
  renderHolidayChapter(data) {
    const isChristmas = data.holidayType === 'christmas';
    return `
      <div class="holiday-card-container renaissance-holiday ${data.holidayType}">
        <!-- Motivo renacentista vectorial (Copos Keplerianos o Astrolabio) -->
        <div class="renaissance-holiday-motif">
          ${isChristmas ? `
            <svg width="100" height="35" viewBox="0 0 120 40" class="kepler-motif-svg">
              <!-- Copo hexagonal geométrico de Kepler -->
              <g transform="translate(60, 20)">
                <line x1="0" y1="-15" x2="0" y2="15" stroke="#c5a059" stroke-width="1.5"/>
                <line x1="-13" y1="-7.5" x2="13" y2="7.5" stroke="#c5a059" stroke-width="1.5"/>
                <line x1="-13" y1="7.5" x2="13" y2="-7.5" stroke="#c5a059" stroke-width="1.5"/>
                <circle cx="0" cy="0" r="3" fill="#dfbe65"/>
                <!-- Puntas del cristal hexagonal -->
                <path d="M 0 -10 L -4 -13 M 0 -10 L 4 -13" stroke="#c5a059" stroke-width="1"/>
                <path d="M 0 10 L -4 13 M 0 10 L 4 13" stroke="#c5a059" stroke-width="1"/>
              </g>
              <!-- Ramitas botánicas de pino en laterales -->
              <path d="M 15 20 Q 35 15 50 20" stroke="#2d5a27" stroke-width="1.5" fill="none"/>
              <path d="M 105 20 Q 85 15 70 20" stroke="#2d5a27" stroke-width="1.5" fill="none"/>
            </svg>
          ` : `
            <svg width="100" height="35" viewBox="0 0 120 40" class="astrolabe-motif-svg">
              <g transform="translate(60, 20)">
                <circle cx="0" cy="0" r="14" fill="none" stroke="#c5a059" stroke-width="1.5"/>
                <circle cx="0" cy="0" r="10" fill="none" stroke="rgba(212,175,55,0.5)" stroke-width="0.8" stroke-dasharray="2 2"/>
                <line x1="-16" y1="0" x2="16" y2="0" stroke="#c5a059" stroke-width="1.2"/>
                <line x1="0" y1="-16" x2="0" y2="16" stroke="#c5a059" stroke-width="1.2"/>
                <circle cx="0" cy="0" r="2.5" fill="#f3e5ab"/>
              </g>
              <path d="M 20 20 L 45 20 M 75 20 L 100 20" stroke="#c5a059" stroke-width="1" stroke-dasharray="3 3"/>
            </svg>
          `}
        </div>

        <h3 class="holiday-title">${data.title}</h3>
        <h4 class="holiday-salutation">${data.greeting}</h4>

        <div class="holiday-parchment-sheet renaissance-parchment">
          <p class="holiday-text-content">
            ${data.placeholderText}
          </p>
          <div class="holiday-signature-space">
            <span class="renaissance-feather-monogram">❧</span>
            <span class="holiday-author-line">Con fraternidad y cariño incondicional</span>
          </div>
        </div>

        <div class="holiday-footer-ribbon renaissance-banner-ribbon">
          <span>${data.bannerText}</span>
        </div>
      </div>
    `;
  }

  // PÁGINA 10: EPÍLOGO RENACENTISTA
  renderEpilogueUpcoming(data) {
    return `
      <div class="epilogue-upcoming-screen renaissance-colophon">
        <div class="upcoming-ornament">
          <svg width="50" height="50" viewBox="0 0 60 60" fill="none">
            <!-- Compás renacentista de arquitecto y filósofo natural -->
            <path d="M 30 10 L 15 50" stroke="#c5a059" stroke-width="2" stroke-linecap="round"/>
            <path d="M 30 10 L 45 50" stroke="#c5a059" stroke-width="2" stroke-linecap="round"/>
            <circle cx="30" cy="10" r="4" fill="#9a7b20" stroke="#d4af37" stroke-width="1.5"/>
            <path d="M 20 38 Q 30 34 40 38" stroke="#c5a059" stroke-width="1.5" fill="none"/>
            <circle cx="30" cy="36" r="2" fill="#d4af37"/>
          </svg>
        </div>
        <h3 class="upcoming-title">${data.title}</h3>
        <h4 class="upcoming-subtitle">${data.subtitle}</h4>
        <div class="editorial-divider"></div>
        <p class="upcoming-note">${data.note}</p>
        <div class="upcoming-footer-stamp renaissance-stamp">
          <span>${data.colophon || 'Explicit feliciter · Tomo en constante evolución'}</span>
        </div>
      </div>
    `;
  }
}
