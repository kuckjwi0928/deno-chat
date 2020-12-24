FROM hayd/deno:latest

EXPOSE 8000

WORKDIR /

ADD ./chat-server /deno-chat/chat-server
ADD ./chat-client/dist /deno-chat/chat-client/dist

RUN deno cache /deno-chat/chat-server/index.ts

CMD ["run", "--allow-net", "--allow-read", "/deno-chat/chat-server/index.ts"]
