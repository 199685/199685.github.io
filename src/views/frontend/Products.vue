<template>
  <div>
    <div class="container mt-4">
      <div class="row mb-xl-5">
        <div class="col-lg-3">
          <ProductsNavbar :select="select" @touchKind="touchKind"> </ProductsNavbar>
        </div>
        <div class="col-lg-9 mb-3">
          <select
            name="sortProducts"
            id="sortProducts"
            class="sort text-c1 mb-3 py-1"
            v-model="sort"
          >
            <option selected value="default">商品排序</option>
            <option value="hight">價格由高至低</option>
            <option value="low">價格由低至高</option>
          </select>

          <TopProducts
            :TopProductsData="TopProductsData"
            class="row"
          >
          </TopProducts>
        </div>
      </div>
    </div>

    <Carticon></Carticon>
  </div>
</template>

<script>
import Carticon from '@/components/frontend/Carticon.vue';
import ProductsNavbar from '@/components/frontend/Products_Navbar.vue';
import TopProducts from '@/components/frontend/TopProducts.vue';

export default {
  data() {
    return {
      cartsNumber: 0,
      cartsID: [],
      select: 'all',
      sort: 'default',
    };
  },
  components: {
    Carticon,
    ProductsNavbar,
    TopProducts,
  },
  computed: {
    TopProductsData() {
      const mydata = {
        className: {
          'col-md-6': true,
          'col-lg-6': true,
          'col-xl-4': true,
          'mb-3': true,
        },
        howFilter: [this.select, this.sort, 'page'],
        openPagination: true,
      };
      return mydata;
    },
  },
  methods: {
    touchKind(name) {
      const touchName = name;
      this.select = touchName;
    },
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
  watch: {
    sort() {
      this.$store.commit('UPDATELOADING', true);
      setTimeout(() => { this.$store.commit('UPDATELOADING', false); }, 500);
    },
  },

};
</script>

<style lang="scss" scoped>
.icon-hover {
  transition: font-size 0.3s;
  &:hover {
    color: yellow;
    font-weight: bold;
    font-size: 1.5em;
  }
}
</style>
