/**
 * analyticsConfig.js - Libro Mari
 * Configuración de telemetría y privacidad exclusiva para Mari
 */

export const analyticsConfig = {
  // PIN de seguridad para Mari (4 de Agosto = 0408)
  personalPin: '0408',
  authorPin: '2709',

  // Backend Firebase Realtime Database
  firebaseUrl: 'https://libro-lau-default-rtdb.firebaseio.com',
  projectKey: 'libro_mari',

  sessionTimeoutMinutes: 30,
  syncIntervalMs: 15000,

  storageKeys: {
    visitorId: 'libro_mari_vid',
    visitCount: 'libro_mari_vcount',
    lastActive: 'libro_mari_last_active',
    currentSession: 'libro_mari_active_session',
    unlocked: 'libro_mari_unlocked'
  }
};
