<template>
  <div class="wrapper">
    <perfect-scrollbar>
    <div class='tables'>
    <table class='table tables__table' :key="tableIndex" v-for="(table, tableIndex) in [asks, bids]">
      <thead>
      <tr>
        <th scope="col">Amount</th>
        <th scope="col">Price</th>
        <th scope="col" class="column column--big-screen">Total</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in table" :key="index">
        <td>{{Decimal(item[1])}}</td> <td>{{Decimal(item[0])}}</td> <td class="column column--big-screen">{{Decimal(item[1]*item[0])}}</td>
      </tr>
      </tbody>
    </table>
    </div>
    </perfect-scrollbar>
  </div>
</template>

<script>
  import {Decimal} from 'decimal.js'
  export default {
    name: "FirstPage",
    components: {
    },
    data () {
      return {
        asks: [],
        bids: []
      }
    },
    async mounted () {
      this.Decimal = Decimal
      const data = await this.$core.sdk.getInfo()
      this.asks = data.asks
      this.bids = data.bids
    },
    methods: {
    }
  }

</script>

<style>
  .tables {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 80vh;
    width: 100%;
    grid-column-gap: 1em;
  }
  .tables__table {
  }
  .tables:hover{
  }
  @media (max-width: 500px){
    .column--big-screen{
      display:none
    }
  }


</style>
