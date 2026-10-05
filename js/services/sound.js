import { SOUNDS } from '../data/sounds.js';

const MIN_VOLUME = 0.0001;

export const createSound = () => {
  let context = null;

  const getContext = () => {
    if (!context && window.AudioContext) {
      context = new AudioContext();
    }

    if (context?.state === 'suspended') {
      context.resume();
    }

    return context;
  };

  const playTone = (audio, { frequency, slideTo, duration, delay = 0, type = 'sine', volume }) => {
    const start = audio.currentTime + delay;
    const end = start + duration;
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);

    if (slideTo) {
      oscillator.frequency.exponentialRampToValueAtTime(slideTo, end);
    }

    gain.gain.setValueAtTime(MIN_VOLUME, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(MIN_VOLUME, end);

    oscillator.connect(gain).connect(audio.destination);
    oscillator.start(start);
    oscillator.stop(end + 0.02);
  };

  const play = (name) => {
    const audio = getContext();

    if (audio) {
      SOUNDS[name].forEach((tone) => playTone(audio, tone));
    }
  };

  return { play };
};
