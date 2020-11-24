const _WS_STATUS = {
  CONNECTED: 'connected',
  CLOSED: 'closed'
}

export default class WebSocketAdapter {
  constructor(url, onMessage) {
    this.ws = undefined
    this.status = _WS_STATUS.CLOSED
    this.url = url
    this.onMessage = onMessage
  }

  connect() {
    this.ws = new WebSocket(this.url)
    this.ws.onmessage(e => this.onMessage(e))
    this.status = _WS_STATUS.CONNECTED
  }

  send(msg) {
    if (!this.ws) {
      throw new Error('WebSocket is not initialized.')
    }
    this.ws.send(msg)
  }

  disconnect() {
    this.ws.close()
    this.status = _WS_STATUS.CLOSED
  }
}
