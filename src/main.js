/**
 * main.js
 * Orquestador principal del libro interactivo.
 */

import './styles/book.css';
import { PageFlip } from 'page-flip';
import confetti from 'canvas-confetti';
import { bookMetadata } from './chapters/chaptersData.js';
import { CosmicAlchemyEffect } from './components/CosmicAlchemyEffect.js';
import { AudioController } from './components/AudioController.js';
import { BookRenderer } from './components/BookRenderer.js';
import { Lightbox } from './components/Lightbox.js';
import { ChaptersModal } from './components/ChaptersModal.js';

document.addEventListener('DOMContentLoaded', () => {
  if (bookMetadata.title) {
    document.title = `${bookMetadata.title} · ${bookMetadata.subtitle}`;
  }

  // 1. Inicializar efecto cósmico de fondo
  const cosmicEffect = new CosmicAlchemyEffect('petals-canvas');

  // 2. Inicializar libro directamente
  initBook();

  function initBook() {
    const audioController = new AudioController(bookMetadata.songDetails);
    const lightbox = new Lightbox();

    // Renderizar libro
    const renderer = new BookRenderer('flipbook');
    renderer.render();

    // Inicializar PageFlip 3D
    const bookEl = document.getElementById('flipbook');
    const isMobile = window.innerWidth <= 768;

    const pageFlip = new PageFlip(bookEl, {
      width: 490,
      height: 680,
      size: 'stretch',
      minWidth: isMobile ? 320 : 280,
      maxWidth: 580,
      minHeight: 380,
      maxHeight: isMobile ? Math.min(680, window.innerHeight - 85) : 880,
      maxShadowOpacity: isMobile ? 0.3 : 0.45,
      showCover: true,
      mobileScrollSupport: false,
      usePortrait: true,
      autoSize: true,
      drawShadow: true,
      flippingTime: isMobile ? 600 : 750,
      useMouseEvents: false,
      disableFlipByClick: true
    });

    pageFlip.loadFromHTML(document.querySelectorAll('#flipbook .page'));
    const totalPages = pageFlip.getPageCount();

    let isFlipping = false;
    let flipLockUntil = 0;
    let lastTouchTime = 0;

    pageFlip.on('changeState', (e) => {
      isFlipping = (e.data === 'flipping');
    });

    const canFlip = () => {
      if (isFlipping) return false;
      if (pageFlip.getState() === 'flipping') return false;
      if (Date.now() < flipLockUntil) return false;
      return true;
    };

    const safeFlipNext = () => {
      if (!canFlip()) return;
      const current = pageFlip.getCurrentPageIndex();
      if (current >= totalPages - 1) return;
      isFlipping = true;
      flipLockUntil = Date.now() + (isMobile ? 650 : 800);
      pageFlip.flipNext();
    };

    const safeFlipPrev = () => {
      if (!canFlip()) return;
      const current = pageFlip.getCurrentPageIndex();
      if (current <= 0) return;
      isFlipping = true;
      flipLockUntil = Date.now() + (isMobile ? 650 : 800);
      pageFlip.flipPrev();
    };

    const safeFlipTo = (target) => {
      if (!canFlip()) return;
      const current = pageFlip.getCurrentPageIndex();
      if (target === current) return;
      isFlipping = true;
      flipLockUntil = Date.now() + (isMobile ? 700 : 850);
      pageFlip.flip(target);
    };

    // Gestos táctiles
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    bookEl.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
      }
    }, { passive: true });

    bookEl.addEventListener('touchend', (e) => {
      if (e.changedTouches && e.changedTouches.length === 1) {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        const duration = Date.now() - touchStartTime;

        if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.3 && duration < 600) {
          lastTouchTime = Date.now();
          if (diffX < 0) safeFlipNext();
          else safeFlipPrev();
          return;
        }

        if (Math.abs(diffX) < 15 && Math.abs(diffY) < 15 && duration < 350) {
          const target = e.target;
          if (target.closest('button, a, .clean-photo-frame, .chapter-item-btn, input, select')) return;

          lastTouchTime = Date.now();
          if (pageFlip.getCurrentPageIndex() === 0) {
            safeFlipTo(1);
            return;
          }

          const rect = bookEl.getBoundingClientRect();
          const tapX = touchEndX - rect.left;
          if (tapX > rect.width * 0.55) safeFlipNext();
          else if (tapX < rect.width * 0.45) safeFlipPrev();
        }
      }
    }, { passive: true });

    bookEl.addEventListener('click', (e) => {
      if (Date.now() - lastTouchTime < 500) return;
      if (e.target.closest('button, a, .clean-photo-frame, .chapter-item-btn, input, select')) return;

      if (pageFlip.getCurrentPageIndex() === 0) {
        safeFlipTo(1);
        return;
      }

      const rect = bookEl.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      if (clickX > rect.width * 0.55) safeFlipNext();
      else if (clickX < rect.width * 0.45) safeFlipPrev();
    });

    window.addEventListener('resize', () => { if (pageFlip) pageFlip.update(); });

    // Componentes de control
    const chaptersModal = new ChaptersModal((targetPage) => safeFlipTo(targetPage));
    const prevBtn = document.getElementById('btn-prev-page');
    const nextBtn = document.getElementById('btn-next-page');
    const pageIndicator = document.getElementById('page-indicator');
    const toggleMusicBtn = document.getElementById('btn-toggle-music');
    const openTocBtn = document.getElementById('btn-open-toc');
    const fullscreenBtn = document.getElementById('btn-toggle-fullscreen');
    const bookStageEl = document.querySelector('.book-stage');

    const updateNav = (pageIndex) => {
      const isOpen = pageIndex > 0 && pageIndex < totalPages - 1;
      if (bookStageEl) bookStageEl.classList.toggle('is-open', isOpen);

      if (pageIndicator) {
        if (pageIndex === 0) pageIndicator.textContent = "Portada";
        else if (pageIndex >= totalPages - 1) pageIndicator.textContent = "Contratapa";
        else pageIndicator.textContent = `Pág. ${pageIndex} de ${totalPages - 2}`;
      }
      if (prevBtn) prevBtn.disabled = pageIndex === 0;
      if (nextBtn) nextBtn.disabled = pageIndex >= totalPages - 1;
    };

    updateNav(0);

    pageFlip.on('flip', (e) => {
      const pageIndex = e.data;
      isFlipping = false;
      flipLockUntil = Date.now() + 150;
      audioController.playFlipSound();
      updateNav(pageIndex);

      if (pageIndex === 3) {
        confetti({
          particleCount: 25,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#ffd700', '#ffffff', '#1e3a8a']
        });
      }
    });

    // Botón abrir en portada
    const startBtn = document.getElementById('btn-start-book');
    if (startBtn) {
      startBtn.addEventListener('click', (e) => {
        e.preventDefault();
        safeFlipTo(1);
      });
    }

    // Botones de navegación
    if (prevBtn) prevBtn.addEventListener('click', () => safeFlipPrev());
    if (nextBtn) nextBtn.addEventListener('click', () => safeFlipNext());
    if (openTocBtn) openTocBtn.addEventListener('click', () => chaptersModal.open());
    if (pageIndicator) pageIndicator.addEventListener('click', () => chaptersModal.open());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') safeFlipNext();
      if (e.key === 'ArrowLeft') safeFlipPrev();
    });

    // Lightbox en fotos
    document.querySelectorAll('.clean-photo-frame').forEach(frame => {
      frame.addEventListener('click', (e) => {
        e.stopPropagation();
        const src = frame.getAttribute('data-full-img');
        const cap = frame.getAttribute('data-caption');
        if (src) lightbox.open(src, cap);
      });
    });

    // Música
    if (toggleMusicBtn) {
      toggleMusicBtn.addEventListener('click', () => {
        audioController.toggleMusic();
      });
    }

    // Pantalla completa
    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          if (document.exitFullscreen) document.exitFullscreen();
        }
      });
    }
  }
});
