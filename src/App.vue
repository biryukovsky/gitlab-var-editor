<template>
  <div class="container">
    <div class="page">
      <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.page {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}
</style>
