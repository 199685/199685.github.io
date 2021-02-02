<template>
  <div>
    <div class="container container-60 mt-4">
      <div class="row">
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
            v-on:getcarts-event="getchildEvent"
            class="row"
          >
          </TopProducts>
        </div>
      </div>
    </div>

    <Carticon :carts="cartsNumber"></Carticon>
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
        cartsID: [this.cartsID],
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
    getCarts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      this.$http.get(api).then((response) => {
        vm.cartsNumber = response.data.data.carts.length;
        vm.cartsID = response.data.data.carts.map(product => ({
          qty: product.qty,
          id: product.id,
          productID: product.product_id,
        }));
      });
    },
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
    getchildEvent(useevent) {
      switch (useevent) {
        case 'getCarts':
          this.getCarts();
          break;
        default:
          return '';
      }
      return '';
    },
  },
  created() {
    this.getCarts();
  },
  mounted() {
    this.Top();
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
