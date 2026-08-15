/**
 * Pure Web Audio API Sound Synthesizer
 * 100% reliable, zero network dependency, ultra-low latency, mobile-compatible.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isBgmPlaying: boolean = false;
  private bgmInterval: number | null = null;
  private gainNode: GainNode | null = null;
  private bgmGainNode: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.value = 0.3;
      this.gainNode.connect(this.ctx.destination);

      this.bgmGainNode = this.ctx.createGain();
      this.bgmGainNode.gain.value = 0.15;
      this.bgmGainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.isBgmPlaying) {
      this.stopBGM();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public getBgmPlaying(): boolean {
    return this.isBgmPlaying;
  }

  /** Soft cute UI click */
  public playBoop(freq = 520) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.gainNode) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.3, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.gainNode);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Audio not permitted yet
    }
  }

  /** Cute Bubble Pop */
  public playPop() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.gainNode) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.07);

      osc.connect(gain);
      gain.connect(this.gainNode);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch {
      // Audio not permitted yet
    }
  }

  /** Sweet Celestial Sparkle */
  public playSparkle() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.gainNode) return;

      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.05);

        gain.gain.setValueAtTime(0.15, this.ctx!.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx!.currentTime + idx * 0.05 + 0.3);

        osc.connect(gain);
        gain.connect(this.gainNode!);

        osc.start(this.ctx!.currentTime + idx * 0.05);
        osc.stop(this.ctx!.currentTime + idx * 0.05 + 0.3);
      });
    } catch {
      // Silently catch
    }
  }

  /** Catch the heart chime */
  public playHeartCatch(streak = 1) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.gainNode) return;

      const baseNotes = [440, 493.88, 554.37, 659.25, 739.99, 880];
      const note1 = baseNotes[Math.min(streak - 1, baseNotes.length - 2)];
      const note2 = baseNotes[Math.min(streak, baseNotes.length - 1)];

      [note1, note2].forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + i * 0.08);

        gain.gain.setValueAtTime(0.2, this.ctx!.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + i * 0.08 + 0.25);

        osc.connect(gain);
        gain.connect(this.gainNode!);

        osc.start(this.ctx!.currentTime + i * 0.08);
        osc.stop(this.ctx!.currentTime + i * 0.08 + 0.25);
      });
    } catch {
      // Ignored
    }
  }

  /** Triumphant Romantic Fanfare on YES */
  public playCelebration() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.gainNode) return;

      // Romantic chord progression & celebratory fanfare: C5, E5, G5, B5, C6, G6, C7
      const fanfare = [
        { freq: 523.25, time: 0.00, dur: 0.2 },
        { freq: 659.25, time: 0.12, dur: 0.2 },
        { freq: 783.99, time: 0.24, dur: 0.25 },
        { freq: 1046.50, time: 0.38, dur: 0.5 },
        { freq: 1318.51, time: 0.55, dur: 0.5 },
        { freq: 1567.98, time: 0.72, dur: 0.7 },
        { freq: 2093.00, time: 0.90, dur: 1.2 }
      ];

      fanfare.forEach(({ freq, time, dur }) => {
        const osc = this.ctx!.createOscillator();
        const subOsc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        subOsc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + time);
        subOsc.frequency.setValueAtTime(freq / 2, this.ctx!.currentTime + time);

        gain.gain.setValueAtTime(0.2, this.ctx!.currentTime + time);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx!.currentTime + time + dur);

        osc.connect(gain);
        subOsc.connect(gain);
        gain.connect(this.gainNode!);

        osc.start(this.ctx!.currentTime + time);
        subOsc.start(this.ctx!.currentTime + time);
        osc.stop(this.ctx!.currentTime + time + dur);
        subOsc.stop(this.ctx!.currentTime + time + dur);
      });
    } catch {
      // Ignored
    }
  }

  /** Gentle soft tone for polite "No / Maybe" response */
  public playGentle() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.gainNode) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(392, this.ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(this.gainNode);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch {
      // Ignored
    }
  }

  /** Ambient synthesized romantic music box soundtrack loop */
  public startRomanticSoundtrack() {
    if (this.isBgmPlaying || this.isMuted) return;
    try {
      this.initContext();
      this.isBgmPlaying = true;

      // Soothing 4-chord romantic progression in F major (Fmaj7 - Dm7 - Gm7 - C7)
      const chordNotes = [
        // Chord 1: Fmaj7 (F3, C4, E4, A4, C5)
        [174.61, 261.63, 329.63, 440.00, 523.25],
        // Chord 2: Dm7 (D3, A3, C4, F4, A4)
        [146.83, 220.00, 261.63, 349.23, 440.00],
        // Chord 3: Bbmaj7 (Bb2, F3, A3, D4, F4)
        [116.54, 174.61, 220.00, 293.66, 349.23],
        // Chord 4: C9sus4 (C3, G3, D4, F4, G4)
        [130.81, 196.00, 293.66, 349.23, 392.00]
      ];

      let step = 0;
      const playNextArp = () => {
        if (!this.isBgmPlaying || this.isMuted || !this.ctx || !this.bgmGainNode) return;

        const chordIdx = Math.floor(step / 4) % chordNotes.length;
        const noteInChordIdx = step % 4;
        const currentChord = chordNotes[chordIdx];
        const freq = currentChord[noteInChordIdx % currentChord.length];

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.65);

        osc.connect(gain);
        gain.connect(this.bgmGainNode);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.65);

        step++;
      };

      // Play note every 400ms
      playNextArp();
      this.bgmInterval = window.setInterval(playNextArp, 420);
    } catch {
      this.isBgmPlaying = false;
    }
  }

  public stopBGM() {
    this.isBgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  public toggleBGM(): boolean {
    if (this.isBgmPlaying) {
      this.stopBGM();
      return false;
    } else {
      this.startRomanticSoundtrack();
      return true;
    }
  }
}

export const sound = new SoundEngine();
