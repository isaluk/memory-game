export const SOUNDS = {
  flip: [{ frequency: 520, slideTo: 780, duration: 0.08, type: 'triangle', volume: 0.12 }],
  hide: [{ frequency: 440, slideTo: 260, duration: 0.1, type: 'triangle', volume: 0.08 }],
  match: [
    { frequency: 660, duration: 0.14, delay: 0.12, volume: 0.14 },
    { frequency: 990, duration: 0.22, delay: 0.22, volume: 0.14 },
  ],
  mismatch: [{ frequency: 220, slideTo: 140, duration: 0.25, delay: 0.12, type: 'square', volume: 0.05 }],
  win: [
    { frequency: 523, duration: 0.18, delay: 0.1, volume: 0.14 },
    { frequency: 659, duration: 0.18, delay: 0.24, volume: 0.14 },
    { frequency: 784, duration: 0.18, delay: 0.38, volume: 0.14 },
    { frequency: 1047, duration: 0.45, delay: 0.52, volume: 0.16 },
  ],
  shuffle: [
    { frequency: 300, slideTo: 600, duration: 0.06, type: 'triangle', volume: 0.08 },
    { frequency: 360, slideTo: 720, duration: 0.06, delay: 0.07, type: 'triangle', volume: 0.08 },
    { frequency: 420, slideTo: 840, duration: 0.06, delay: 0.14, type: 'triangle', volume: 0.08 },
  ],
};
