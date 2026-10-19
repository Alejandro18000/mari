/**
 * AudioController.js - Libro Mari
 * Control de efectos de paso de página y música de fondo.
 */

export class AudioController {
  constructor(songConfig = {}) {
    this.songConfig = songConfig;
    this.musicAudio = null;
    this.isPlaying = false;
    this.hasTriggeredSong = false;
    this.stateListeners = [];
    this.timeListeners = [];

    this.initAudio();
  }

  initAudio() {
    // Sonido de pasar página
    this.flipSound = new Audio('./audio/page_flip_soft.m4a');
    this.flipSound.volume = 0.45;

    // Canción / música si está configurada
    if (this.songConfig.audioSrc) {
      this.musicAudio = new Audio(this.songConfig.audioSrc);
      this.musicAudio.preload = 'metadata';
      this.musicAudio.addEventListener('timeupdate', () => this.handleTimeUpdate());
      this.musicAudio.addEventListener('ended', () => {
        this.isPlaying = false;
        this.notifyState();
      });
    }
  }

  playFlipSound() {
    try {
      if (this.flipSound) {
        this.flipSound.currentTime = 0;
        this.flipSound.play().catch(() => {});
      }
    } catch (e) {}
  }

  toggleMusic() {
    if (!this.musicAudio) return;
    if (this.isPlaying) {
      this.pauseMusic();
    } else {
      this.playMusic();
    }
  }

  playMusic() {
    if (!this.musicAudio) return;
    this.musicAudio.play().then(() => {
      this.isPlaying = true;
      this.notifyState();
    }).catch(err => {
      console.warn("Auto-play blocked or error:", err);
    });
  }

  pauseMusic() {
    if (!this.musicAudio) return;
    this.musicAudio.pause();
    this.isPlaying = false;
    this.notifyState();
  }

  triggerSongFadeIn(targetVolume = 0.6, durationMs = 2000) {
    if (!this.musicAudio || this.hasTriggeredSong) return;
    this.hasTriggeredSong = true;
    this.musicAudio.volume = 0;
    this.playMusic();

    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(1, elapsed / durationMs);
      this.musicAudio.volume = targetVolume * progress;
      if (progress >= 1) clearInterval(interval);
    }, 50);
  }

  onStateChange(cb) {
    this.stateListeners.push(cb);
  }

  onTimeUpdate(cb) {
    this.timeListeners.push(cb);
  }

  notifyState() {
    this.stateListeners.forEach(cb => cb({ isPlaying: this.isPlaying }));
  }

  handleTimeUpdate() {
    if (!this.musicAudio) return;
    const current = this.musicAudio.currentTime;
    const duration = this.musicAudio.duration || 1;
    const percent = (current / duration) * 100;
    this.timeListeners.forEach(cb => cb({
      current,
      duration,
      percent,
      formattedCurrent: this.formatTime(current),
      formattedDuration: this.formatTime(duration)
    }));
  }

  formatTime(sec) {
    if (isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }
}
