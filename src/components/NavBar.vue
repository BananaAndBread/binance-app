<template>
<b-navbar toggleable="lg" type="dark" variant="info">
  <b-navbar-brand href="#">Binance</b-navbar-brand>

  <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

  <b-collapse id="nav-collapse" is-nav>
    <b-navbar-nav>
      <b-nav-item to="/">Table</b-nav-item>
      <b-nav-item to="/diffs">Diffs</b-nav-item>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style>
</style>
