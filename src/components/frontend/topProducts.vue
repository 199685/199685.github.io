<template>
  <div>
    <loading :active.sync="isLoading">
      <div class="loadingio-spinner-spin-5xz8vi7q1c2">
        <div class="ldio-2zmxuno6hnw">
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
          <div><div></div></div>
        </div>
      </div>
    </loading>

    <slot name="title"></slot>
    <div :class="TopProductsData.className" v-for="product in productsFilter" :key="product.id">
      <div class="topProducts pb-2" style="background: white;">
        <router-link
          class="topProducts-link"
          :to="{ name: 'ProductDetail', params: { productId: product.id } }">
          <div class="topProducts">
            <img class="img-fluid" :src="product.imageUrl" v-if="productsFilter" alt="水果" />
          </div>
          <h4 class="topProducts-name h8 p-2 text-c1 fw-700 mb-0">{{ product.title }}</h4>
        </router-link>
        <div class="px-2">
          <div class="d-flex align-items-center justify-content-between mb-1">
            <small class="text-line-through d-block pt-1"
              >原價{{ product.origin_price || currency }}</small
            >
            <i
              class="far fa-heart d-inline-block h6 pointer mb-0 p-2 heart-icon"
              :class="{ heartStyle: product.favourite }"
              @click="addFavourite(product.id)"
            ></i>
          </div>

          <div class="d-flex justify-content-between align-items-center">
            <strong class="h7 text-c4 mb-0">特價{{ product.price || currency }}</strong>
            <p
              class="mb-0 p-1 radius-1
              pointer touch-shopping-icon"
              @click="addCart(product)"
            >
              <i class="fas fa-shopping-cart d-inline-block pr-1"></i>加入購物車
            </p>
          </div>
        </div>
      </div>
    </div>

    <ProductsPagination
      :PaginationData="pageData"
      v-on:pagination-event="changePage"
      v-if="TopProductsData.openPagination"
    >
    </ProductsPagination>
  </div>
</template>

<script>
import ProductsPagination from '@/components/frontend/ProductsPagination.vue';

export default {
  data() {
    return {
      isLoading: false,
      products: [],
      cartProductID: [],
      cartID: [],
      quantityValue: 1,
      favourite: [],
      completefilter: [],
      season: '',
      page: {
        nowPage: 1,
        allPage: 1,
      },
    };
  },
  components: {
    ProductsPagination,
  },
  props: ['TopProductsData'],
  computed: {
    productsFilter() {
      let pushData = [];
      this.TopProductsData.howFilter.forEach((item) => {
        switch (item) {
          case 'random':
            pushData = this.randomproducts();
            break;
          case 'all':
          case 'spring':
          case 'summer':
          case 'autumn':
          case 'winter':
            this.seasonFilter(item);
            break;
          case 'default':
          case 'low':
          case 'hight':
            this.sortFilter(item);
            break;
          case 'page':
            pushData = this.pageCount();
            break;
          case 'favourite':
            pushData = this.getFavourite();
            break;
          default:
            return '';
        }
        return '';
      });
      return pushData;
    },
    pageData() {
      const pagedata = {
        nowPage: this.page.nowPage,
        allPage: this.page.allPage,
      };
      return pagedata;
    },
  },
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
    getProducts() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      this.isLoading = true;
      this.$http.get(api).then((response) => {
        this.products = response.data.products;
        this.getFavourite();
      });
    },
    getFavourite() {
      const vm = this;
      let favouriteProducts = []
      this.favourite = JSON.parse(localStorage.getItem('Favourite')) || [];
      this.products.forEach((item) => {
        vm.$set(item, 'favourite', false);
        const favourite = vm.favourite.includes(item.id);
        if (favourite) {
          vm.$set(item, 'favourite', true);
          favouriteProducts.push(item)
        }
        vm.isLoading = false;
      });
      vm.$emit('getcarts-event', 'updateFavourite');
      return favouriteProducts
    },
    addFavourite(id) {
      const add = this.favourite.indexOf(id);
      if (add > -1) {
        this.favourite.splice(add, 1);
        this.alertDisplay('已移除我的最愛', 'warning');
      } else {
        this.favourite.push(id);
        this.alertDisplay('已加入我的最愛', 'info');
      }

      localStorage.setItem('Favourite', JSON.stringify(this.favourite));

      this.getFavourite();
    },
    addCart(addProudct) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      let newQty = parseInt(this.quantityValue, 10);
      const sameproduct = vm.TopProductsData.cartsID[0].findIndex(
        item => item.productID === addProudct.id,
      );
      if (sameproduct >= 0) {
        newQty += parseInt(vm.TopProductsData.cartsID[0].[sameproduct].qty, 10);
        vm.removeProduct(vm.TopProductsData.cartsID[0].[sameproduct].id);
      }
      const Newproduct = {
        product_id: addProudct.id,
        qty: newQty,
      };
      this.$http.post(api, { data: Newproduct }).then(() => {
        if (!sameproduct >= 0) {
          vm.$emit('getcarts-event', 'getCarts');
          vm.isLoading = false;
        }
        vm.quantityValue = 1;
        const notice = `${addProudct.title}已加入購物車`;
        vm.alertDisplay(notice, 'info');
      });
    },
    removeProduct(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      this.$http.delete(api).then(() => {
        vm.$emit('getcarts-event', 'getCarts');
        vm.isLoading = false;
      });
    },
    randomproducts() {
      if (this.products.length) {
        while (this.completefilter.length < this.TopProductsData.randomCount) {
          const index = Math.floor(Math.random() * Math.floor(this.products.length));
          const completefilterName = this.completefilter.map(item => item.id);
          const sameProduct = completefilterName.includes(this.products[index].id);
          if (!sameProduct) {
            this.completefilter.push(this.products[index]);
          }
        }
      }
      return this.completefilter;
    },
    seasonFilter(seasonName) {
      const copyProductsData = JSON.parse(JSON.stringify(this.products));
      this.season = seasonName;
      if (this.season === 'all') {
        this.completefilter = copyProductsData;
      } else {
        this.completefilter = copyProductsData.filter(
          product => product.season.includes(this.season),
        );
      }
      this.pageCount();
    },
    sortFilter(item) {
      switch (item) {
        case 'hight':
          this.completefilter.sort((a, b) => b.price - a.price);
          break;
        case 'low':
          this.completefilter.sort((a, b) => a.price - b.price);
          break;
        case 'default':
          this.seasonFilter(this.season);
          break;
        default:
          return '';
      }
      this.pageCount();
      return '';
    },
    changePage(uppage) {
      this.page.nowPage = uppage;
    },
    pageCount() {
      this.page.allPage = Math.ceil(this.completefilter.length / 6);
      let productsIndex = this.page.nowPage * 6;
      let i = productsIndex - 6;
      if (productsIndex > this.completefilter.length) {
        productsIndex = this.completefilter.length;
      }
      const completeProducts = [];
      for (i; i < productsIndex; i += 1) {
        completeProducts.push(this.completefilter[i]);
      }
      this.Top();
      return completeProducts;
    },
    Top() {
      window.scrollTo({
        top: 0,
        left: 0,
      });
    },
  },
  created() {
    this.getProducts();
  },
  watch: {
    season() {
      this.page.nowPage = 1;
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
