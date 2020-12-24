import { serve } from 'https://deno.land/std/http/server.ts';
import * as path from 'https://deno.land/std/path/mod.ts';
import {
  acceptWebSocket,
} from 'https://deno.land/std/ws/mod.ts';
import HttpCode from './constants/HttpCode.ts';
import { handle } from './handler.ts';

const s = serve({ port: 8000 });

for await (const req of s) {
  const { conn, r: bufReader, w: bufWriter, headers } = req;
  if (headers.get("upgrade") !== 'websocket') {
    const file = req.url === '/' ? '/index.html' : req.url;
    req.respond({body: await Deno.readFile(`${path.resolve('../')}/chat-client/dist${file}`)});
  } else {
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
}
