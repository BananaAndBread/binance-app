import axios from 'axios'
class SDK {
  constructor () {
    this.symbol = 'bnbbtc'
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
    return (await axios.get(url)).data
  }
}
export default new SDK()
