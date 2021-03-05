<template>
  <div id="app">
    <router-view class="allhight"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  watch: {
    $route(to) {
      document.title = to.meta.title || 'Your Website';
    },
  },
};
</script>

<style lang="scss">
@import "./assets/scss/all.scss";
</style>
