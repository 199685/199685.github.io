<template>
  <div>
    <button v-on:click="a()">Click Me!</button>

  </div>
</template>

<script>


export default {
  data() {
    return {
      text: '',
    };
  },
  components: {},
  methods: {

    alertDisplay(text, type) {
      const message = text;
      const messageType = type;
      this.$dlg.toast(message, {
        messageType,
        closeTime: 2,
        position: 'topCenter',
        language: 'en',
      });
    },
    a() {
      this.alertDisplay('apple', 'warning');
    },
  },
  created() {
    this.getProducts();
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>

</style>
