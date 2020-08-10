<template>
  <div>
    <b-dropdown id="dropdown-1" :text="chosenSymbol" class="m-md-2">
      <b-dropdown-item @click='handleClick(symbol)' :key='index' v-for="(symbol, index) in symbols">{{symbol}}</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
  export default {
    name: "DropDown",
    data () {
      return {
        symbols: ['BTCUSDT', 'BNBBTC', 'ETHBTC'],
        chosenSymbol: 'BTCUSDT'
      }
    },
    methods: {
      handleClick (symbol) {
        this.chosenSymbol = symbol
        this.$core.sdk.changeSymbol(this.chosenSymbol)
        this.$core.eventBus.$emit('symbolChanged')
      }
    }
  }
</script>

<style>
</style>
