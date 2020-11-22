import {
  WebSocket
} from 'https://deno.land/std/ws/mod.ts';

/**
 * Handle websocket message.
 *
 * @param ws websocket
 */
export async function handle(ws: WebSocket) {
  for await (const msg of ws) {
    if (typeof msg === 'string') {
      ws.send(msg);
    } else {
      throw new TypeError('Not supported message type.');
    }
  }
}
