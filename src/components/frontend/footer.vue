<template>
  <div>
    <div class="footer">
      <div class="footer-logo py-3 text-center">
        <router-link :to="{ name: 'Index' }" @click.native="Top()">
          <img src="../../assets/images/logo-1.png" alt="" width="100" />
          <h2 class="text-c1">HAPPY FRUIT</h2>
        </router-link>
        <div class="social h5 pointer">
          <i class="fab fa-facebook-square d-inline-block mr-2"></i>
          <i class="fab fa-instagram-square"></i>
        </div>
        <p class="text-c1">since 1996</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    Top() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
a:hover {
  text-decoration: none;
}
</style>
