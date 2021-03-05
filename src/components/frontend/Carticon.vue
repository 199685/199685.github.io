<template>
  <div>
    <div class="cart-icon position-fixed">
      <p class="pointer h5 cart-bg m-0" v-show="carts">
        <router-link :to="{ path: '/shoppingcart' }">
          <i class="fas fa-shopping-cart position-relative shopping-cart">
            <span class="position-absolute h8 circle text-light fw-700">
              {{ carts }}
            </span>
          </i>
        </router-link>
      </p>
      <p class="pointer topiocn-size text-center m-0">
        <i class="fas fa-arrow-circle-up hide" @click="Top()"></i>
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
  computed: {
    carts() {
      return this.$store.getters.cartsNumber;
    },
  },
};
</script>

<style lang="scss" scoped>
.shopping-cart {
  transition: all 0.3s;
  color: white;
}
.cart-bg {
  background: black;
  padding: 0.3em;
  border-radius: 50%;
  transition: all 0.3s;
  &:hover .shopping-cart {
    transform: scale(1.1);
  }
}
.cart-icon {
  right: 1%;
  bottom: 0;
  z-index: 100;
}

.fa-arrow-circle-up {
  transition: transform 0.3s;
  color: black;
}

.hide {
  opacity: 0;
}

@keyframes fluffy {
  0% {
    animation-timing-function: ease-out;
    transform: scale3d(1, 1, 1) translate3d(0, 0, 0);
  }

  15% {
    animation-timing-function: ease-out;
    transform: scale3d(0.9, 0.9, 1) translate3d(0, 0, 0);
  }

  30% {
    animation-timing-function: ease-out;
    transform: scale3d(1.2, 0.8, 1) translate3d(0, 0, 0);
  }

  50% {
    animation-timing-function: ease-out;
    transform: scale3d(0.85, 1.2, 1) translate3d(0, -10%, 0);
  }

  70% {
    animation-timing-function: ease-out;
    transform: scale3d(1.1, 0.9, 1) translate3d(0, 0, 0);
  }

  100% {
    animation-timing-function: ease-out;
    transform: scale3d(1, 1, 1) translate3d(0, 0, 0);
  }
}

.fa-arrow-circle-up {
  &:hover {
    animation: fluffy 0.6s forwards;
  }
}

.circle {
  border-radius: 20px;
  background: #28a745;
  padding: 0 8px;
  right: -10px;
  top: -18px;
}
.topiocn-size {
  font-size: 55px;
}
</style>
