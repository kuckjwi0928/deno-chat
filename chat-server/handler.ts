import { WebSocket } from 'https://deno.land/std/ws/mod.ts';

const connectedSockets: Array<WebSocket> = [];

/**
 * Handle websocket message.
 *
 * @param ws websocket
 */
export async function handle(ws: WebSocket) {
  connectedSockets.push(ws);
  for await (const ev of ws) {
    if (ws.isClosed) {
      connectedSockets.splice(connectedSockets.findIndex((_ws) => _ws === ws), 1);
    }
    if (typeof ev === 'string') {
      // broadcast
      for (const connectedSocket of connectedSockets) {
        connectedSocket.send(ev);
      }
    }
  }
}
