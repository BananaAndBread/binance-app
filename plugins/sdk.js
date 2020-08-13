import axios from 'axios'
class SDK {
  constructor () {
    this.symbol = 'bnbbtc'
    this.lastEventu = null
    this.lastUpdateId = null
    this.firstMessage = true
    this.socket = new WebSocket(`wss://stream.binance.com:9443/ws/${this.symbol.toLowerCase()}@depth@1000ms`)
    this.socket.onopen = function () {
      // socket.send(payload);
    }
  }

  setOnMessage (onMessage) {
    this.socket.onmessage = onMessage
  }

  changeSymbol (symbol) {
    this.symbol = symbol
  }

  async getInfo () {
    const url = `https://www.binance.com/api/v1/depth?symbol=${this.symbol.toUpperCase()}&limit=500`
    const data = (await axios.get(url)).data
    this.lastUpdateId = data.lastUpdateId
    // U <= lastUpdateId+1 AND u >= lastUpdateId+1.
    return data
  }
}
export default new SDK()
