<template>
  <div class="diff-list">
    <div class="diff-list__header">
      <PlayPauseButton
        class="diff-list__play-button"
        @clicked="handleClick"
      />
      <h4 class="diff-list__header__title">
        [Price level to be updated, Quantity] changes
      </h4>
    </div>
    <div class="diff-list__lists">
      <h4>Bids to be updated</h4>
      <h4>Asks to be updated</h4>
      <b-list-group>
        <b-list-group-item
          v-for="(diffBid, index) in lastDiffBids"
          :key="index"
        >
          <p>{{ diffBid }}</p>
        </b-list-group-item>
      </b-list-group>
      <b-list-group>
        <b-list-group-item
          v-for="(diffAsk, index) in lastDiffAsks"
          :key="index"
        >
          <p>{{ diffAsk }}</p>
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
      lastDiffBids: [],
      lastDiffAsks: []

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
      }
    },
    dataListener (payload) {
      this.lastDiffBids = payload.b
      this.lastDiffAsks = payload.a
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
      this.lastDiffBids = []
      this.lastDiffAsks = []
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
