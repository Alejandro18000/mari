/**
 * TelemetryService.js - Libro Mari
 * Telemetría silenciosa y privada de lectura para Mari · 4 de Agosto.
 */

import { analyticsConfig } from './analyticsConfig.js';

export class TelemetryService {
  constructor() {
    this.session = null;
    this.pageEnterTime = Date.now();
    this.currentPage = 0;
    this.syncTimer = null;
    this.init();
  }

  async init() {
    try {
      const isCreatorDevice = localStorage.getItem('libro_mari_ignore_device') === 'true' ||
                              window.location.search.includes('admin') ||
                              window.location.search.includes('dev');

      if (isCreatorDevice) {
        this.isIgnored = true;
        console.log('🛡️ [Telemetry] Modo Creador Activo: Tu dispositivo está excluido.');
        return;
      }

      const now = Date.now();
      const storage = analyticsConfig.storageKeys;

      let visitorId = localStorage.getItem(storage.visitorId);
      if (!visitorId) {
        visitorId = 'mari_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
        localStorage.setItem(storage.visitorId, visitorId);
      }

      const sessionId = 'ses_mari_' + now + '_' + Math.random().toString(36).substring(2, 7);

      this.session = {
        sessionId,
        visitorId,
        startedAt: new Date(now).toISOString(),
        lastActiveAt: new Date(now).toISOString(),
        device: this.getDeviceType(),
        browser: this.getBrowser(),
        screen: `${window.innerWidth}x${window.innerHeight} (${screen.width}x${screen.height})`,
        currentPage: 0,
        maxPageReached: 0,
        completedBook: false,
        totalSeconds: 0,
        musicPlayed: false,
        pageTransitions: []
      };

      this.syncToFirebase();
      this.syncTimer = setInterval(() => this.heartbeat(), 15000);
    } catch (e) {
      console.warn('Telemetry init error:', e);
    }
  }

  getDeviceType() {
    const ua = navigator.userAgent;
    if (/iPad|iPhone|iPod/.test(ua)) return 'iPhone/iOS';
    if (/Android/.test(ua)) return 'Android';
    if (/Macintosh/.test(ua)) return 'Mac';
    if (/Windows/.test(ua)) return 'Windows PC';
    return 'Dispositivo Móvil';
  }

  getBrowser() {
    const ua = navigator.userAgent;
    if (/Safari/.test(ua) && !/Chrome/.test(ua)) return 'Safari';
    if (/Chrome/.test(ua)) return 'Chrome';
    if (/Firefox/.test(ua)) return 'Firefox';
    return 'Navegador Web';
  }

  heartbeat() {
    if (this.isIgnored || !this.session) return;
    this.session.totalSeconds += 15;
    this.session.lastActiveAt = new Date().toISOString();
    this.syncToFirebase();
  }

  onPageFlip(pageIndex, totalPages) {
    if (this.isIgnored || !this.session) return;
    this.currentPage = pageIndex;
    this.session.currentPage = pageIndex;
    if (pageIndex > this.session.maxPageReached) {
      this.session.maxPageReached = pageIndex;
    }
    if (pageIndex >= totalPages - 2) {
      this.session.completedBook = true;
    }
    this.session.lastActiveAt = new Date().toISOString();
    this.session.pageTransitions.push({
      to: pageIndex,
      time: new Date().toLocaleTimeString('es-CO')
    });
    this.syncToFirebase();
  }

  onMusicPlay() {
    if (this.isIgnored || !this.session) return;
    this.session.musicPlayed = true;
    this.syncToFirebase();
  }

  onPhotoZoom(caption) {
    if (this.isIgnored || !this.session) return;
    this.session.lastActiveAt = new Date().toISOString();
    this.syncToFirebase();
  }

  async syncToFirebase() {
    if (this.isIgnored || !this.session) return;
    try {
      const url = `${analyticsConfig.firebaseUrl}/sessions_mari/${this.session.sessionId}.json`;
      await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.session)
      });
    } catch (err) {
      // silencioso
    }
  }
}

export const telemetry = new TelemetryService();
