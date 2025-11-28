import { io, type Socket } from 'socket.io-client';
import type { LiveTicker } from '~/_types';
import { env } from '~/env';

type TickerSocketHandlers = {
  onInit?: (payload: LiveTicker[]) => void;
  onUpdate?: (payload: LiveTicker[]) => void;
};

let socket: Socket | null = null;
let subscribers = 0;

const ensureSocket = () => {
  if (socket) return socket;
  socket = io(`${env.NEXT_PUBLIC_BACKEND_URL}/ws/tickers`, {
    transports: ['websocket'],
  });
  return socket;
};

/**
 * Subscribe to ticker feed using a singleton socket. Cleans up listeners and disconnects
 * when the last subscriber unsubscribes.
 */
export const subscribeToTickerSocket = (handlers: TickerSocketHandlers) => {
  const client = ensureSocket();
  subscribers += 1;

  if (handlers.onInit) client.on('tickers:init', handlers.onInit);
  if (handlers.onUpdate) client.on('tickers:update', handlers.onUpdate);

  return () => {
    if (!socket) return;

    if (handlers.onInit) socket.off('tickers:init', handlers.onInit);
    if (handlers.onUpdate) socket.off('tickers:update', handlers.onUpdate);

    subscribers = Math.max(0, subscribers - 1);
    if (subscribers === 0) {
      socket.disconnect();
      socket = null;
    }
  };
};
