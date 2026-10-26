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
      
      <!-- Esquinas ornamentales doradas de libro ilustrado clásico -->
      <div class="cover-illustrated-corners">
        <div class="cover-corner corner-tl"></div>
        <div class="cover-corner corner-tr"></div>
        <div class="cover-corner corner-bl"></div>
        <div class="cover-corner corner-br"></div>
      </div>
      
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
      <!-- Esquinas ornamentales doradas de libro ilustrado clásico -->
      <div class="cover-illustrated-corners">
        <div class="cover-corner corner-tl"></div>
        <div class="cover-corner corner-tr"></div>
        <div class="cover-corner corner-bl"></div>
        <div class="cover-corner corner-br"></div>
      </div>
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

  renderPageBorderDecorations(data) {
    return `
      <!-- Sangrado orgánico y halo de acuarela en los márgenes -->
      <div class="page-watercolor-wash-overlay"></div>
      
      <!-- Marco ilustrado de libro de cuentos con flores botánicas y huellitas -->
      <div class="page-watercolor-border">
        <!-- Esquina Superior Izquierda -->
        <svg class="wc-corner-flourish wc-corner-tl" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="16" fill="rgba(244, 200, 190, 0.45)" />
          <path d="M 6 68 C 6 26, 26 6, 68 6" stroke="#c97a6e" stroke-width="1.8" stroke-linecap="round" fill="none"/>
          <path d="M 12 68 C 12 32, 32 12, 68 12" stroke="rgba(217, 116, 102, 0.45)" stroke-width="1" stroke-dasharray="2 3" fill="none"/>
          <path d="M 16 38 C 10 34, 8 24, 18 26 C 20 30, 18 36, 16 38 Z" fill="#9db4a0" opacity="0.85"/>
          <path d="M 38 16 C 34 10, 24 8, 26 18 C 30 20, 36 18, 38 16 Z" fill="#9db4a0" opacity="0.85"/>
          <path d="M 28 28 C 22 24, 20 18, 26 19 C 30 22, 29 27, 28 28 Z" fill="#e29578" opacity="0.8"/>
          <circle cx="15" cy="18" r="2.8" fill="#e76f51" opacity="0.85"/>
          <circle cx="52" cy="7" r="2.4" fill="#f4a261" opacity="0.85"/>
          <circle cx="7" cy="52" r="2.4" fill="#f4a261" opacity="0.85"/>
          <ellipse cx="23" cy="23" rx="4.5" ry="3.5" fill="#d97466" opacity="0.6" transform="rotate(-45 23 23)"/>
          <circle cx="17" cy="19" r="1.5" fill="#d97466" opacity="0.6"/>
          <circle cx="21" cy="15" r="1.5" fill="#d97466" opacity="0.6"/>
          <circle cx="26" cy="16" r="1.5" fill="#d97466" opacity="0.6"/>
          <circle cx="29" cy="20" r="1.5" fill="#d97466" opacity="0.6"/>
        </svg>

        <!-- Esquina Superior Derecha -->
        <svg class="wc-corner-flourish wc-corner-tr" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="16" fill="rgba(244, 200, 190, 0.45)" />
          <path d="M 6 68 C 6 26, 26 6, 68 6" stroke="#c97a6e" stroke-width="1.8" stroke-linecap="round" fill="none"/>
          <path d="M 12 68 C 12 32, 32 12, 68 12" stroke="rgba(217, 116, 102, 0.45)" stroke-width="1" stroke-dasharray="2 3" fill="none"/>
          <path d="M 16 38 C 10 34, 8 24, 18 26 C 20 30, 18 36, 16 38 Z" fill="#9db4a0" opacity="0.85"/>
          <path d="M 38 16 C 34 10, 24 8, 26 18 C 30 20, 36 18, 38 16 Z" fill="#9db4a0" opacity="0.85"/>
          <path d="M 28 28 C 22 24, 20 18, 26 19 C 30 22, 29 27, 28 28 Z" fill="#e29578" opacity="0.8"/>
          <circle cx="15" cy="18" r="2.8" fill="#e76f51" opacity="0.85"/>
          <circle cx="52" cy="7" r="2.4" fill="#f4a261" opacity="0.85"/>
          <circle cx="7" cy="52" r="2.4" fill="#f4a261" opacity="0.85"/>
          <ellipse cx="23" cy="23" rx="4.5" ry="3.5" fill="#d97466" opacity="0.6" transform="rotate(-45 23 23)"/>
          <circle cx="17" cy="19" r="1.5" fill="#d97466" opacity="0.6"/>
          <circle cx="21" cy="15" r="1.5" fill="#d97466" opacity="0.6"/>
          <circle cx="26" cy="16" r="1.5" fill="#d97466" opacity="0.6"/>
          <circle cx="29" cy="20" r="1.5" fill="#d97466" opacity="0.6"/>
        </svg>

        <!-- Esquina Inferior Izquierda -->
        <svg class="wc-corner-flourish wc-corner-bl" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="16" fill="rgba(244, 200, 190, 0.45)" />
          <path d="M 6 68 C 6 26, 26 6, 68 6" stroke="#c97a6e" stroke-width="1.8" stroke-linecap="round" fill="none"/>
          <path d="M 12 68 C 12 32, 32 12, 68 12" stroke="rgba(217, 116, 102, 0.45)" stroke-width="1" stroke-dasharray="2 3" fill="none"/>
          <path d="M 16 38 C 10 34, 8 24, 18 26 C 20 30, 18 36, 16 38 Z" fill="#9db4a0" opacity="0.85"/>
          <path d="M 38 16 C 34 10, 24 8, 26 18 C 30 20, 36 18, 38 16 Z" fill="#9db4a0" opacity="0.85"/>
          <path d="M 28 28 C 22 24, 20 18, 26 19 C 30 22, 29 27, 28 28 Z" fill="#e29578" opacity="0.8"/>
          <circle cx="15" cy="18" r="2.8" fill="#e76f51" opacity="0.85"/>
          <circle cx="52" cy="7" r="2.4" fill="#f4a261" opacity="0.85"/>
          <circle cx="7" cy="52" r="2.4" fill="#f4a261" opacity="0.85"/>
          <ellipse cx="23" cy="23" rx="4.5" ry="3.5" fill="#d97466" opacity="0.6" transform="rotate(-45 23 23)"/>
          <circle cx="17" cy="19" r="1.5" fill="#d97466" opacity="0.6"/>
          <circle cx="21" cy="15" r="1.5" fill="#d97466" opacity="0.6"/>
          <circle cx="26" cy="16" r="1.5" fill="#d97466" opacity="0.6"/>
          <circle cx="29" cy="20" r="1.5" fill="#d97466" opacity="0.6"/>
        </svg>

        <!-- Esquina Inferior Derecha -->
        <svg class="wc-corner-flourish wc-corner-br" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="16" fill="rgba(244, 200, 190, 0.45)" />
          <path d="M 6 68 C 6 26, 26 6, 68 6" stroke="#c97a6e" stroke-width="1.8" stroke-linecap="round" fill="none"/>
          <path d="M 12 68 C 12 32, 32 12, 68 12" stroke="rgba(217, 116, 102, 0.45)" stroke-width="1" stroke-dasharray="2 3" fill="none"/>
          <path d="M 16 38 C 10 34, 8 24, 18 26 C 20 30, 18 36, 16 38 Z" fill="#9db4a0" opacity="0.85"/>
          <path d="M 38 16 C 34 10, 24 8, 26 18 C 30 20, 36 18, 38 16 Z" fill="#9db4a0" opacity="0.85"/>
          <path d="M 28 28 C 22 24, 20 18, 26 19 C 30 22, 29 27, 28 28 Z" fill="#e29578" opacity="0.8"/>
          <circle cx="15" cy="18" r="2.8" fill="#e76f51" opacity="0.85"/>
          <circle cx="52" cy="7" r="2.4" fill="#f4a261" opacity="0.85"/>
          <circle cx="7" cy="52" r="2.4" fill="#f4a261" opacity="0.85"/>
          <ellipse cx="23" cy="23" rx="4.5" ry="3.5" fill="#d97466" opacity="0.6" transform="rotate(-45 23 23)"/>
          <circle cx="17" cy="19" r="1.5" fill="#d97466" opacity="0.6"/>
          <circle cx="21" cy="15" r="1.5" fill="#d97466" opacity="0.6"/>
          <circle cx="26" cy="16" r="1.5" fill="#d97466" opacity="0.6"/>
          <circle cx="29" cy="20" r="1.5" fill="#d97466" opacity="0.6"/>
        </svg>

        <!-- Guirnalda Superior en Acuarela -->
        <svg class="wc-crest-flourish wc-crest-top" viewBox="0 0 160 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 12 11 Q 50 7, 72 12 Q 76 14, 80 8 Q 84 14, 88 12 Q 110 7, 148 11" stroke="#d97466" stroke-width="1.3" stroke-linecap="round" fill="none" opacity="0.65"/>
          <ellipse cx="80" cy="9" rx="3.5" ry="2.8" fill="#d97466" opacity="0.75"/>
          <circle cx="75.5" cy="6" r="1.3" fill="#d97466" opacity="0.75"/>
          <circle cx="78.5" cy="4.5" r="1.3" fill="#d97466" opacity="0.75"/>
          <circle cx="81.5" cy="4.5" r="1.3" fill="#d97466" opacity="0.75"/>
          <circle cx="84.5" cy="6" r="1.3" fill="#d97466" opacity="0.75"/>
          <path d="M 58 9 C 54 7, 50 3, 56 5 Z" fill="#9db4a0" opacity="0.8"/>
          <path d="M 102 9 C 106 7, 110 3, 104 5 Z" fill="#9db4a0" opacity="0.8"/>
        </svg>
      </div>
    `;
  }

  renderPageScenicBackdrop(data) {
    const p = data.pageNumber;
    let svgContent = '';

    if (p === 1) {
      // Página 1: Estudio y Biblioteca Acogedora de Dos Amigos
      svgContent = `
        <rect x="25" y="70" width="290" height="6" rx="3" fill="#d4973b" opacity="0.35"/>
        <rect x="35" y="44" width="9" height="26" rx="2" fill="#d97466" opacity="0.5"/>
        <rect x="46" y="38" width="12" height="32" rx="2" fill="#7da887" opacity="0.5"/>
        <rect x="60" y="46" width="8" height="24" rx="2" fill="#d4973b" opacity="0.5"/>
        <path d="M 70 48 L 82 68 L 76 70 L 66 50 Z" fill="#b08968" opacity="0.45"/>
        <path d="M 260 54 L 275 54 L 272 68 L 263 68 Z" fill="#e29578" opacity="0.55"/>
        <path d="M 267 68 Q 262 85, 258 100 Q 255 110, 260 120" stroke="#7da887" stroke-width="1.4" fill="none" opacity="0.6"/>
        <circle cx="260" cy="80" r="3.5" fill="#7da887" opacity="0.65"/>
        <circle cx="256" cy="95" r="4" fill="#7da887" opacity="0.65"/>
        <circle cx="261" cy="112" r="3.5" fill="#7da887" opacity="0.65"/>
        <rect x="25" y="415" width="290" height="6" rx="3" fill="#d4973b" opacity="0.35"/>
        <rect x="38" y="396" width="22" height="19" rx="4" fill="#f4c8be" opacity="0.55"/>
        <path d="M 60 401 C 66 401, 66 411, 60 411" stroke="#d97466" stroke-width="1.6" fill="none" opacity="0.55"/>
        <path d="M 46 391 Q 44 381, 50 374 Q 53 368, 48 361" stroke="#d97466" stroke-width="1.3" fill="none" opacity="0.45"/>
        <rect x="232" y="398" width="62" height="8" rx="2" fill="#7da887" opacity="0.55"/>
        <rect x="236" y="388" width="55" height="9" rx="2" fill="#d4973b" opacity="0.55"/>
        <rect x="240" y="380" width="48" height="7" rx="2" fill="#d97466" opacity="0.55"/>
      `;
    } else if (p === 2) {
      // Página 2: Cumpleaños, Banderines Festivos & Globos en Acuarela
      svgContent = `
        <path d="M 20 40 Q 90 65, 170 45 Q 250 65, 320 40" stroke="#d4973b" stroke-width="1.2" fill="none" opacity="0.6"/>
        <polygon points="40,46 55,49 47,68" fill="#f4c8be" opacity="0.7"/>
        <polygon points="75,53 90,55 82,75" fill="#7da887" opacity="0.7"/>
        <polygon points="110,54 125,52 118,74" fill="#ffd166" opacity="0.7"/>
        <polygon points="145,49 160,46 153,68" fill="#d97466" opacity="0.7"/>
        <polygon points="180,47 195,50 188,71" fill="#7da887" opacity="0.7"/>
        <polygon points="215,53 230,55 222,76" fill="#f4c8be" opacity="0.7"/>
        <polygon points="250,53 265,51 258,72" fill="#ffd166" opacity="0.7"/>
        <polygon points="285,46 300,43 293,65" fill="#d97466" opacity="0.7"/>
        <ellipse cx="40" cy="115" rx="14" ry="17" fill="#f4c8be" opacity="0.45"/>
        <path d="M 40 132 L 40 165" stroke="#d97466" stroke-width="0.8" opacity="0.45"/>
        <ellipse cx="58" cy="105" rx="12" ry="15" fill="#ffd166" opacity="0.45"/>
        <path d="M 58 120 L 50 165" stroke="#d97466" stroke-width="0.8" opacity="0.45"/>
        <ellipse cx="295" cy="110" rx="13" ry="16" fill="#7da887" opacity="0.45"/>
        <path d="M 295 126 L 290 165" stroke="#7da887" stroke-width="0.8" opacity="0.45"/>
        <ellipse cx="280" cy="98" rx="12" ry="14" fill="#f4c8be" opacity="0.45"/>
        <path d="M 280 112 L 290 165" stroke="#d97466" stroke-width="0.8" opacity="0.45"/>
        <circle cx="90" cy="130" r="3" fill="#ffd166" opacity="0.55"/>
        <circle cx="130" cy="95" r="2.5" fill="#d97466" opacity="0.5"/>
        <circle cx="210" cy="110" r="3" fill="#7da887" opacity="0.5"/>
        <circle cx="250" cy="135" r="2.5" fill="#f4c8be" opacity="0.55"/>
      `;
    } else if (p === 3) {
      // Página 3: Paisaje de Distancia, Colinas y el Vuelo del Avioncito
      svgContent = `
        <path d="M 0 380 Q 90 340, 180 375 Q 260 400, 340 365 L 340 480 L 0 480 Z" fill="#9db4a0" opacity="0.22"/>
        <path d="M 0 410 Q 110 385, 210 420 Q 280 440, 340 415 L 340 480 L 0 480 Z" fill="#e29578" opacity="0.2"/>
        <polygon points="40,365 55,350 70,365" fill="#d97466" opacity="0.45"/>
        <rect x="44" y="365" width="22" height="16" fill="#fdfaf4" opacity="0.55"/>
        <rect x="52" y="371" width="6" height="6" fill="#ffd166" opacity="0.65"/>
        <path d="M 64 350 L 64 342" stroke="#6e5e5b" stroke-width="1.5" opacity="0.45"/>
        <path d="M 64 340 Q 62 332, 68 326" stroke="#d97466" stroke-width="1" fill="none" opacity="0.35"/>
        <polygon points="275,355 290,342 305,355" fill="#7da887" opacity="0.45"/>
        <rect x="279" y="355" width="22" height="15" fill="#fdfaf4" opacity="0.55"/>
        <rect x="287" y="360" width="6" height="6" fill="#ffd166" opacity="0.65"/>
        <path d="M 298 342 L 298 335" stroke="#6e5e5b" stroke-width="1.5" opacity="0.45"/>
        <path d="M 68 330 Q 140 260, 210 300 Q 250 320, 285 332" stroke="#d97466" stroke-width="1.2" stroke-dasharray="3 4" fill="none" opacity="0.45"/>
        <ellipse cx="100" cy="80" rx="35" ry="12" fill="#f4c8be" opacity="0.2"/>
        <ellipse cx="120" cy="74" rx="22" ry="14" fill="#f4c8be" opacity="0.2"/>
        <ellipse cx="240" cy="95" rx="30" ry="10" fill="#f4c8be" opacity="0.2"/>
      `;
    } else if (p === 4) {
      // Página 4: El Laboratorio de Química & Fórmulas Brillantes
      svgContent = `
        <path d="M 38 60 L 44 60 L 44 70 L 56 94 Q 58 98, 52 100 L 26 100 Q 20 98, 24 94 L 38 70 Z" fill="#7da887" opacity="0.32" stroke="#7da887" stroke-width="1"/>
        <ellipse cx="39" cy="94" rx="14" ry="4" fill="#52b788" opacity="0.4"/>
        <circle cx="37" cy="85" r="2.5" fill="#fff" opacity="0.6"/>
        <circle cx="43" cy="78" r="2" fill="#fff" opacity="0.6"/>
        <polygon points="290,65 305,57 320,65 320,82 305,90 290,82" stroke="#d4973b" stroke-width="1.3" fill="none" opacity="0.45"/>
        <polygon points="295,68 305,62 315,68 315,79 305,85 295,79" stroke="#d4973b" stroke-width="0.8" stroke-dasharray="2 3" fill="none" opacity="0.35"/>
        <ellipse cx="300" cy="380" rx="18" ry="18" fill="#f4c8be" opacity="0.32" stroke="#d97466" stroke-width="1"/>
        <rect x="296" y="348" width="8" height="15" fill="none" stroke="#d97466" stroke-width="1" opacity="0.45"/>
        <path d="M 300 355 Q 320 350, 325 365" stroke="#d97466" stroke-width="1" fill="none" opacity="0.35"/>
        <ellipse cx="45" cy="385" rx="20" ry="8" stroke="#d97466" stroke-width="1" fill="none" opacity="0.32" transform="rotate(30 45 385)"/>
        <ellipse cx="45" cy="385" rx="20" ry="8" stroke="#7da887" stroke-width="1" fill="none" opacity="0.32" transform="rotate(-30 45 385)"/>
        <circle cx="45" cy="385" r="3.5" fill="#ffd166" opacity="0.65"/>
      `;
    } else if (p === 5) {
      // Página 5: Rincón de Amor Incondicional & Manta de Hogar
      svgContent = `
        <path d="M 170 30 C 130 -10, 50 15, 80 85 C 110 150, 170 210, 170 210 C 170 210, 230 150, 260 85 C 290 15, 210 -10, 170 30 Z" stroke="#f4c8be" stroke-width="1.8" fill="rgba(244, 200, 190, 0.12)" stroke-dasharray="4 4" opacity="0.55"/>
        <path d="M 170 340 C 140 310, 80 325, 100 375 C 120 420, 170 460, 170 460 C 170 460, 220 420, 240 375 C 260 325, 200 310, 170 340 Z" stroke="#d97466" stroke-width="1.5" fill="rgba(217, 116, 102, 0.08)" stroke-dasharray="3 3" opacity="0.45"/>
        <ellipse cx="160" cy="275" rx="5" ry="4" fill="#d97466" opacity="0.3"/>
        <ellipse cx="180" cy="265" rx="5" ry="4" fill="#7da887" opacity="0.3"/>
        <circle cx="30" cy="240" r="30" fill="#f4c8be" opacity="0.18"/>
        <circle cx="310" cy="240" r="30" fill="#f4c8be" opacity="0.18"/>
      `;
    } else if (p === 6 || p === 7) {
      // Páginas 6 y 7: Invierno, Pinos Nevados, Nochebuena & Cacao Caliente
      svgContent = `
        <path d="M 15 20 Q 50 45, 85 25 Q 120 40, 150 20" stroke="#52796f" stroke-width="2" fill="none" opacity="0.55"/>
        <path d="M 325 20 Q 290 45, 255 25 Q 220 40, 190 20" stroke="#52796f" stroke-width="2" fill="none" opacity="0.55"/>
        <circle cx="50" cy="38" r="3" fill="#d97466" opacity="0.65"/>
        <circle cx="56" cy="39" r="3" fill="#d97466" opacity="0.65"/>
        <circle cx="290" cy="38" r="3" fill="#d97466" opacity="0.65"/>
        <circle cx="284" cy="39" r="3" fill="#d97466" opacity="0.65"/>
        <polygon points="30,440 45,390 60,440" fill="#84a98c" opacity="0.28"/>
        <polygon points="50,445 68,380 86,445" fill="#52796f" opacity="0.32"/>
        <polygon points="75,445 92,400 110,445" fill="#84a98c" opacity="0.28"/>
        <polygon points="230,445 248,395 266,445" fill="#84a98c" opacity="0.28"/>
        <polygon points="255,445 272,375 290,445" fill="#52796f" opacity="0.32"/>
        <polygon points="280,440 295,390 310,440" fill="#84a98c" opacity="0.28"/>
        <path d="M 170 410 L 170 450 M 150 430 L 190 430 M 156 416 L 184 444 M 156 444 L 184 416" stroke="#a2d2ff" stroke-width="1.2" opacity="0.35"/>
      `;
    } else if (p === 8 || p === 9) {
      // Páginas 8 y 9: La Colina Nocturna, Farolillos de Deseos & Luces de la Ciudad
      svgContent = `
        <path d="M 285 50 C 275 50, 265 60, 265 72 C 265 85, 275 95, 288 95 C 280 93, 274 85, 274 74 C 274 63, 280 54, 285 50 Z" fill="#ffd166" opacity="0.55"/>
        <path d="M 60 140 L 72 140 L 70 156 L 62 156 Z" fill="#f4a261" opacity="0.45"/>
        <circle cx="66" cy="148" r="8" fill="#ffd166" opacity="0.25" filter="blur(2px)"/>
        <path d="M 230 180 L 240 180 L 238 193 L 232 193 Z" fill="#f4a261" opacity="0.4"/>
        <circle cx="235" cy="186" r="6" fill="#ffd166" opacity="0.2" filter="blur(2px)"/>
        <path d="M 0 425 Q 90 395, 170 415 Q 260 435, 340 405 L 340 480 L 0 480 Z" fill="#4a4e69" opacity="0.28"/>
        <circle cx="90" cy="420" r="1.5" fill="#ffd166" opacity="0.65"/>
        <circle cx="110" cy="418" r="1.5" fill="#ffd166" opacity="0.65"/>
        <circle cx="140" cy="422" r="1.5" fill="#ffd166" opacity="0.65"/>
        <circle cx="180" cy="425" r="1.5" fill="#ffd166" opacity="0.65"/>
        <circle cx="220" cy="428" r="1.5" fill="#ffd166" opacity="0.65"/>
        <polygon points="120,50 122,55 127,57 122,59 120,64 118,59 113,57 118,55" fill="#ffd166" opacity="0.55"/>
        <polygon points="180,80 181,84 185,85 181,86 180,90 179,86 175,85 179,84" fill="#ffd166" opacity="0.45"/>
      `;
    } else if (p === 10) {
      // Página 10: El Sendero hacia las Montañas al Atardecer Dorado
      svgContent = `
        <circle cx="170" cy="120" r="35" fill="rgba(244, 162, 97, 0.22)" filter="blur(6px)"/>
        <circle cx="170" cy="120" r="18" fill="rgba(255, 209, 102, 0.42)"/>
        <polygon points="60,190 120,130 180,190" fill="#b08968" opacity="0.22"/>
        <polygon points="150,190 210,120 270,190" fill="#9c6644" opacity="0.22"/>
        <polygon points="230,190 285,140 340,190" fill="#b08968" opacity="0.18"/>
        <path d="M 170 190 Q 165 240, 180 290 Q 155 350, 190 410 Q 150 450, 170 480 L 140 480 Q 120 450, 160 410 Q 130 350, 155 290 Q 140 240, 160 190 Z" fill="#ddb892" opacity="0.3"/>
        <circle cx="155" cy="460" r="2.5" fill="#d97466" opacity="0.45"/>
        <circle cx="175" cy="445" r="2.5" fill="#7da887" opacity="0.45"/>
        <circle cx="160" cy="425" r="2" fill="#d97466" opacity="0.45"/>
        <circle cx="178" cy="410" r="2" fill="#7da887" opacity="0.45"/>
        <path d="M 20 440 Q 30 400, 25 360" stroke="#7da887" stroke-width="1.2" fill="none" opacity="0.45"/>
        <circle cx="26" cy="365" r="3" fill="#b5838d" opacity="0.55"/>
        <path d="M 320 440 Q 310 400, 315 360" stroke="#7da887" stroke-width="1.2" fill="none" opacity="0.45"/>
        <circle cx="314" cy="365" r="3" fill="#b5838d" opacity="0.55"/>
        <path d="M 120 90 Q 125 84, 130 90 Q 135 84, 140 90" stroke="#6e5e5b" stroke-width="1.2" fill="none" opacity="0.45"/>
        <path d="M 200 95 Q 204 90, 208 95 Q 212 90, 216 95" stroke="#6e5e5b" stroke-width="1.2" fill="none" opacity="0.45"/>
      `;
    }

    return `
      <!-- Paisaje y escenario recreado en acuarela en el fondo de la hoja -->
      <div class="page-scenic-backdrop scenic-page-${p}">
        <svg class="scenic-svg" viewBox="0 0 340 480" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          ${svgContent}
        </svg>
      </div>
    `;
  }

  createPageElement(data) {
    const page = document.createElement('div');
    page.className = `page page-watercolor-paper page-num-${data.pageNumber} page-type-${data.type}`;
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
      ${this.renderPageBorderDecorations(data)}
      ${this.renderPageScenicBackdrop(data)}
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
            ${data.paragraphs.map((p, idx) => `
              <p class="watercolor-story-p ${idx === 0 ? 'story-lead' : ''}">${p}</p>
            `).join('')}
          </div>

          <!-- Viñeta ilustrada en acuarela: Sobre sellado y flores silvestres de la distancia -->
          <div class="scenic-spot-vignette spot-envelope-vignette">
            <svg viewBox="0 0 100 45" class="spot-svg">
              <path d="M 15 10 L 85 10 L 85 40 L 15 40 Z" fill="#fffaf0" stroke="#d97466" stroke-width="1.2" rx="3"/>
              <path d="M 15 10 L 50 28 L 85 10" stroke="#d97466" stroke-width="1.2" fill="none"/>
              <circle cx="50" cy="27" r="4.5" fill="#d97466" opacity="0.85"/>
              <circle cx="50" cy="27" r="2.5" fill="#f4c8be"/>
              <path d="M 58 12 Q 68 2, 75 8" stroke="#7da887" stroke-width="1.3" fill="none"/>
              <circle cx="75" cy="8" r="3" fill="#f4a261" opacity="0.8"/>
              <circle cx="68" cy="3" r="2.5" fill="#fcd5ce" opacity="0.8"/>
            </svg>
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
            ${data.paragraphs.map((p, idx) => `
              <p class="watercolor-story-p ${idx === 0 ? 'story-lead' : ''}">${p}</p>
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

          <!-- Viñeta ilustrada en acuarela: Matraces e instrumental de laboratorio -->
          <div class="scenic-spot-vignette spot-chemistry-vignette">
            <svg viewBox="0 0 80 40" class="spot-svg">
              <rect x="25" y="5" width="6" height="28" rx="3" fill="#7da887" opacity="0.45" stroke="#7da887" stroke-width="1" transform="rotate(-25 28 19)"/>
              <rect x="48" y="5" width="6" height="28" rx="3" fill="#f4c8be" opacity="0.45" stroke="#d97466" stroke-width="1" transform="rotate(25 51 19)"/>
              <circle cx="36" cy="10" r="2" fill="#7da887" opacity="0.7"/>
              <circle cx="44" cy="8" r="2.5" fill="#d97466" opacity="0.7"/>
              <circle cx="40" cy="4" r="1.5" fill="#ffd166" opacity="0.8"/>
            </svg>
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

        <!-- Viñeta ilustrada según la festividad -->
        <div class="scenic-spot-vignette ${isChristmas ? 'spot-cocoa-vignette' : 'spot-lantern-vignette'}">
          ${isChristmas ? `
            <svg viewBox="0 0 70 36" class="spot-svg">
              <rect x="22" y="14" width="26" height="20" rx="4" fill="#f4c8be" opacity="0.65" stroke="#d97466" stroke-width="1.2"/>
              <path d="M 48 20 C 54 20, 54 28, 48 28" stroke="#d97466" stroke-width="1.3" fill="none"/>
              <circle cx="30" cy="14" r="3" fill="#fff" opacity="0.9"/>
              <circle cx="38" cy="13" r="3" fill="#fff" opacity="0.9"/>
              <line x1="26" y1="16" x2="20" y2="6" stroke="#b08968" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M 34 8 Q 31 3, 36 -2" stroke="#d97466" stroke-width="1" fill="none" opacity="0.45"/>
            </svg>
          ` : `
            <svg viewBox="0 0 60 36" class="spot-svg">
              <path d="M 24 8 L 36 8 L 38 26 L 22 26 Z" fill="#f4a261" opacity="0.65" stroke="#e76f51" stroke-width="1.2"/>
              <circle cx="30" cy="17" r="5" fill="#ffd166" opacity="0.75" filter="blur(1px)"/>
              <line x1="30" y1="26" x2="30" y2="33" stroke="#e76f51" stroke-width="1.2"/>
              <line x1="30" y1="8" x2="30" y2="3" stroke="#e76f51" stroke-width="1.2"/>
            </svg>
          `}
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

        <!-- Viñeta ilustrada de libro abierto con pluma de acuarela -->
        <div class="scenic-spot-vignette spot-storybook-vignette">
          <svg viewBox="0 0 80 36" class="spot-svg">
            <path d="M 18 24 Q 38 20, 40 10 Q 42 20, 62 24 L 62 26 Q 42 22, 40 14 Q 38 22, 18 26 Z" fill="#f4c8be" opacity="0.65" stroke="#d97466" stroke-width="1"/>
            <path d="M 44 6 Q 55 10, 60 20" stroke="#7da887" stroke-width="1.4" fill="none"/>
            <path d="M 44 6 Q 48 2, 52 6 Q 50 12, 44 6 Z" fill="#7da887" opacity="0.75"/>
          </svg>
        </div>
      </div>
    `;
  }
}
