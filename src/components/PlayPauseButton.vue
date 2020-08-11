<template>
  <div :class='{button: true, "button--paused": isPaused}' @click="revertState">
    <div class="button__content">
      {{buttonState}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayPauseButton',
  data () {
    return {
      isPaused: false
    }
  },
  methods: {
    revertState () {
      this.isPaused = !this.isPaused
      this.$emit('clicked', { isPaused: this.isPaused })
    }
  },
  computed: {
    buttonState () {
      return this.isPaused ? 'Record' : 'Pause'
    }
  }
}

</script>

<style>
  .button {
    border-radius: 50%;
    background-color: red;
    color: white;
    position: relative;
    width: 100%;
}
  .button__content{
    font-size: 85%;
    display: flex;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    justify-content: center;
  }
  .button:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  .button--paused {
     background-color: green;
    color: white;
   }

</style>
