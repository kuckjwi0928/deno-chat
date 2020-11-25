const _WS_STATUS = {
  CONNECTED: 'connected',
  CLOSED: 'closed'
}

export default class WebSocketAdapter {
  constructor(url, onOpen, onMessage) {
    this.ws = undefined
    this.status = _WS_STATUS.CLOSED
    this.url = url
    this.onOpen = onOpen
    this.onMessage = onMessage
  }

  connect() {
    this.ws = new WebSocket(this.url)
    this.ws.onopen = this.onOpen
    this.ws.onmessage = this.onMessage
    this.status = _WS_STATUS.CONNECTED
  }

  send(msg) {
    if (!this.ws) {
      throw new Error('WebSocket is not initialized.')
    }
    this.ws.send(typeof msg === 'object' ? JSON.stringify(msg) : msg)
  }

  disconnect() {
    this.ws.close()
    this.ws = undefined
    this.status = _WS_STATUS.CLOSED
  }
}
