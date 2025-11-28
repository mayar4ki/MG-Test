import { useCallback, useRef } from 'react';

export const useAlertSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  return useCallback(() => {
    try {
      const ctx = audioContextRef.current ?? new AudioContext();
      audioContextRef.current = ctx;

      if (ctx.state === 'suspended') {
        void ctx.resume();
      }

      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = 'triangle';
      oscillator.frequency.value = 880; // A5

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);

      oscillator.connect(gain);
      gain.connect(ctx.destination);

      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.4);
    } catch (error) {
      console.warn('Unable to play alert sound', error);
    }
  }, []);
};
