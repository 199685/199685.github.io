<template>
  <div>
    <div class="footer">
      <div class="footer-logo pb-2 pt-3 text-center">
        <router-link :to="{ name: 'Index' }" @click.native="Top()">
          <img src="../../assets/images/logo-1.png" alt="" width="75" />
          <h2 class="footer-fontColor h5">HAPPY FRUIT</h2>
        </router-link>
        <div class="social h5 pointer">
          <i class="fab fa-facebook-square d-inline-block mr-2"></i>
          <i class="fab fa-instagram-square"></i>
        </div>
        <p class="footer-fontColor">since 1996</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    Top() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
a:hover {
  text-decoration: none;
}
.footer-fontColor{
  color: #00d02f;
}
</style>
