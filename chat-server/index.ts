import { serve } from 'https://deno.land/std/http/server.ts';
import {
  acceptWebSocket
} from 'https://deno.land/std/ws/mod.ts';
import HttpCode from './constants/HttpCode.ts';
import { handle } from './SocketHandler.ts';

const s = serve({ port: 8000 });
for await (const req of s) {
  const { conn, r: bufReader, w: bufWriter, headers } = req;
  acceptWebSocket({
    conn,
    bufReader,
    bufWriter,
    headers,
  })
  .then(handle)
  .catch(async (err) => {
    console.error(`failed to accept websocket: ${err}`);
    await req.respond({ status: HttpCode.BAD_REQUEST });
  });
}
