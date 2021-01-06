<template>
  <div>
    <div class="cart-icon position-fixed">
      <p class="pointer h1 mb-4"><i class="fas fa-arrow-circle-up hide" @click="Top()"></i></p>
      <p class="pointer h5">
        <router-link :to="{ path: '/shoppingcart' }">
          <i class="fas fa-shopping-cart text-c1 pl-1 position-relative shopping-cart">
            <span class="position-absolute h8 circle text-light">
              {{ carts }}
            </span>
          </i>
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      changebar: false,
    };
  },
  props: ['carts'],
  methods: {
    Top() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    },
    addhide() {
      const icon = document.querySelector('.cart-icon');
      const topicon = document.querySelector('.fa-arrow-circle-up');
      if (window.pageYOffset > icon.offsetTop / 2) {
        topicon.classList.remove('hide');
      } else {
        topicon.classList.add('hide');
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.addhide);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.addhide);
  },
};
</script>

<style lang="scss" scoped></style>
