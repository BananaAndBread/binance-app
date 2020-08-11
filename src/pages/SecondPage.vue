<template>
  <div>
    <DropDown class="second-page__drop-down"></DropDown>
    <hr/>
    <DiffsList class="second-page__diff-list"></DiffsList>
  </div>
</template>

<script>
import DiffsList from '../components/DiffsList'
import DropDown from '../components/DropDown'
export default {
  name: 'SecondPage',
  components: {
    DropDown,
    DiffsList
  }
}
</script>

<style>
  .second-page__drop-down{
    margin-top: 2em;
  }
  .second-page__diff-list{
    margin-top: 1em;
  }

</style>
