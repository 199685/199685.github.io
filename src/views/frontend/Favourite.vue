<template>
  <div class="container-70">
    <div
      class="container-fluid bg-cover"
      :style="{ backgroundImage: `url(${require('@/assets/images/bg-1.jpg')})` }"
    >
      <div class="container mt-1">
        <div class="row justify-content-center">
          <div
            class="col-11 col-md-12 text-center px-3 py-7"
            :class="{ 'd-none': favouriteNumber }"
          >
            <p class="mb-5 font-1">目前最愛商品沒有任何商品</p>
            <div class="text-center">
              <router-link :to="{ path: 'products' }">
                <button type="button" class="btn new-btn new-btn-favourite">逛逛商品</button>
              </router-link>
            </div>
          </div>
          <div
            class="col-11 col-md-12 text-center px-3 py-7"
            :class="{ 'd-none': !favouriteNumber }"
          >
            <p class="mb-5 font-2">最愛商品</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-3">
      <TopProducts :TopProductsData="TopProductsData" class="row" ref="getData"> </TopProducts>
    </div>

    <Carticon></Carticon>
  </div>
</template>

<script>
import Carticon from '@/components/frontend/Carticon.vue';
import TopProducts from '@/components/frontend/TopProducts.vue';

export default {
  components: {
    Carticon,
    TopProducts,
  },
  computed: {
    TopProductsData() {
      const mydata = {
        className: {
          'col-md-6': true,
          'col-lg-4': true,
          'col-xl-3': true,
          'mb-3': true,
        },
        howFilter: ['favourite'],
        openPagination: false,
      };
      return mydata;
    },
    favouriteNumber() {
      return this.$store.state.favouriteNumber;
    },
  },
  methods: {
    Top() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    },
  },
  mounted() {
    this.Top();
  },
};
</script>

<style lang="scss" scoped>
.font-1 {
  font-size: 40px;
  color: white;
}
.font-2 {
  font-size: 30px;
  color: white;
}
.container-70 {
  min-height: 70vh;
}
@media (max-width: 576px) {
  .font-1 {
    font-size: 18px;
  }
  .container-70 {
    min-height: 100vh;
  }
}

.new-btn-favourite:after {
  color: white;
}
.new-btn:hover:after {
  color: white;
}
.new-btn {
  border: 2px solid white;
}
</style>
