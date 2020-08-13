<template>
  <div class="wrapper">
    <perfect-scrollbar>
      <div class="tables">
        <table
          v-for="(table, tableIndex) in [asks, bids]"
          :key="tableIndex"
          class="table tables__table"
        >
          <thead>
            <tr>
              <th
                class="table__th"
                scope="col"
              >
                Amount
              </th>
              <th
                class="table__th"
                scope="col"
              >
                Price
              </th>
              <th
                scope="col"
                class="column column--big-screen table__th"
              >
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in table"
              :key="index"
            >
              <td>{{ Decimal(item[1]) }}</td> <td>{{ Decimal(item[0]) }}</td> <td class="column column--big-screen">
                {{ Decimal(item[1]*item[0]) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script>
import { Decimal } from 'decimal.js'
export default {
  name: 'FirstPage',
  components: {
  },
  data () {
    return {
      asks: [],
      bids: [],
      appliedDiffsAsks: [],
      appliedDiffsBids: []
    }
  },
  async mounted () {
    this.Decimal = Decimal
    const data = await this.$core.sdk.getInfo()
    this.asks = data.asks
    this.bids = data.bids
    // Нет смысла транслировать в шину данных в виде сообщений все примененные diff-изменения, потому что все полученные
    // из шины данных изменения будут применены (другой компонент просто будет получать примененные изменения из этой же шины данных)
    this.startListenData()
    // При изменении символа компонент должен очищать свое содержимое по предыдущему символу и загрузить данные по новому.
    // Так как кнопка изменения символа находится на другой странице, этот компонент
    // будет очищаться вне зависимости от изменения символа (при маунте), при заходе на страницу
    // будут показываться результаты для нового символа
  },
  methods: {
    startListenData () {
      this.$core.eventBus.$on('recievedData', this.dataListener)
    },
    dataListener (payload) {
      const lastDiffBids = payload.b
      const lastDiffAsks = payload.a
      this.bids = this.merge(lastDiffBids, this.bids)
      this.asks = this.merge(lastDiffAsks, this.asks)
    },
    merge (left, right) {
      function pushToResult (element) {
        if (Number(element[1]) !== 0) {
          resultArray.push(element)
        }
      }
      const resultArray = []; let leftIndex = 0; let rightIndex = 0

      // We will concatenate values into the resultArray in order
      while (leftIndex < left.length && rightIndex < right.length) {
        if (Number(left[leftIndex][0]) < Number(right[rightIndex][0])) {
          pushToResult(left[leftIndex])
          leftIndex++ // move left array cursor
        } else if (Number(left[leftIndex][0]) === Number(right[rightIndex][0])) {
          pushToResult(left[leftIndex])
          leftIndex++
          rightIndex++
        } else {
          pushToResult(right[rightIndex])
          rightIndex++ // move right array cursor
        }
      }

      // We need to concat here because there will be one element remaining
      // from either left OR the right
      // if (!this.checkSorted(resultArray)) {
      //   console.log('not sorted')
      // }
      return resultArray
        .concat(left.slice(leftIndex))
        .concat(right.slice(rightIndex))
    },
    checkSorted (array) {
      let checkResult = true
      for (let i = 1; i < array.length; i++) {
        checkResult = checkResult && Number(array[i - 1][0]) < Number(array[i][0])
      }
      return checkResult
    }
  }
}

</script>

<style>
  .tables {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 90vh;
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
  .table__th{
    position: sticky;
    top:0;
    background-color: white;
  }

</style>
