<template>
  <div class="diff-list">
    <div class="diff-list__header">
      <PlayPauseButton @clicked="handleClick" class="diff-list__play-button"></PlayPauseButton>
    <h4 class="diff-list__header__title">[Price level to be updated, Quantity] changes </h4>
    </div>
  <div class="diff-list__lists">
    <h4>Bids to be updated</h4>
    <h4>Asks to be updated</h4>
  <b-list-group>
    <b-list-group-item :key="index" v-for="(diffBid, index) in diffsBids">
      <p>{{diffBid}}</p>
    </b-list-group-item>
  </b-list-group>
  <b-list-group>
    <b-list-group-item :key="index" v-for="(diffAsk, index) in diffsAsks">
      <p>{{diffAsk}}</p>
    </b-list-group-item>
  </b-list-group>
  </div>
  </div>
</template>

<script>
import PlayPauseButton from './PlayPauseButton'
export default {
  name: 'DiffsList',
  components: { PlayPauseButton },
  data () {
    return {
      diffsBids: [],
      diffsAsks: []

    }
  },
  mounted () {
    this.startListenData()
    this.startListenSymbolChange()
  },
  methods: {
    handleClick (payload) {
      if (payload.isPaused) {
        this.stopListen()
      } else {
        this.startListenData()
        console.log('make this stop!!!')
      }
    },
    dataListener (payload) {
      const lastDiffBids = payload.b
      const lastDiffAsks = payload.a
      if (this.diffsAsks.length === 10) {
        this.diffsAsks.pop()
      }
      if (this.diffsBids.length === 10) {
        this.diffsBids.pop()
      }
      this.diffsBids.unshift(lastDiffBids)
      this.diffsAsks.unshift(lastDiffAsks)
    },
    startListenSymbolChange () {
      this.$core.eventBus.$on('symbolChanged', this.refresh)
    },
    stopListen () {
      this.$core.eventBus.$off('recievedData')
    },
    startListenData () {
      this.$core.eventBus.$on('recievedData', this.dataListener)
    },
    refresh () {
      this.diffsBids = []
      this.diffsAsks = []
    }

  }
}

</script>

<style>
  .diff-list__lists{
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .diff-list__header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  }
  .diff-list__play-button {
    width: 4em;
    margin-bottom: 1em;
  }

  .diff-list__header__title{
  }

</style>
