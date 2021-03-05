<template>
  <div>
    <slot name="title"></slot>
    <div :class="TopProductsData.className" v-for="product in productsFilter" :key="product.id">
      <div class="topProducts pb-2" style="background: white;">
        <router-link
          class="topProducts-link"
          @click.native="changeproductsID()"
          :to="{ name: 'ProductDetail', params: { productId: product.id } }"
        >
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
              :class="{ heartStyle: favourite.includes(product.id) }"
              @click="addFavourite(product)"
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
      quantityValue: 1,
      completefilter: [],
      season: '',
      page: {
        nowPage: 1,
        allPage: 1,
      },
      favouriteID: [],
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
            pushData = this.favouriteProducts;
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
    products() {
      return this.$store.state.products;
    },
    favourite() {
      return this.favouriteID;
    },
    favouriteProducts() {
      return this.products.filter(product => this.favourite.includes(product.id));
    },
    alert() {
      return this.$store.state.alert;
    },
    cartsID() {
      return this.$store.getters.cartsID;
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
      this.$store.dispatch('getProducts');
    },
    getFavourite() {
      this.favouriteID = JSON.parse(localStorage.getItem('Favourite')) || [];
      this.$store.commit('FAVOURITE', this.favouriteID.length);
    },
    addFavourite(id) {
      const add = this.favouriteID.indexOf(id.id);
      if (add > -1) {
        this.favouriteID.splice(add, 1);
        this.alertDisplay(`${id.title}已移除我的最愛`, 'warning');
      } else {
        this.favouriteID.push(id.id);
        this.alertDisplay(`${id.title}已加入我的最愛`, 'info');
      }
      localStorage.setItem('Favourite', JSON.stringify(this.favouriteID));
      this.getFavourite();
    },
    addCart(addProudct) {
      if (this.$store.state.run) {
        const vm = this;
        vm.$store.commit('RUN', false);
        let newQty = parseInt(this.quantityValue, 10);
        const allProductsID = vm.cartsID.map(id => id.productID);
        const sameproduct = allProductsID.findIndex(item => item === addProudct.id);
        const Newproduct = {
          product_id: addProudct.id,
          qty: newQty,
        };
        if (sameproduct >= 0) {
          newQty += parseInt(vm.cartsID[sameproduct].qty, 10);
          Newproduct.qty = newQty;
          vm.removeProduct(vm.cartsID[sameproduct].id).then(() => {
            vm.$store.dispatch('addCart', {
              Newproduct,
              alert: [`${addProudct.title}已加入購物車`, 'info'],
            });
          });
        } else {
          vm.$store.dispatch('addCart', {
            Newproduct,
            alert: [`${addProudct.title}已加入購物車`, 'info'],
          });
        }

        vm.quantityValue = 1;
      }
    },
    removeProduct(id) {
      const vm = this;
      return vm.$store.dispatch('removeProduct', id);
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
        this.completefilter = (
          copyProductsData.filter(product => product.season.includes(this.season)));
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
      return completeProducts;
    },
    Top() {
      window.scrollTo({
        top: 0,
        left: 0,
      });
    },
    changeproductsID() {
      this.$emit('getcarts-event', 'changeProductID');
    },
    getCarts() {
      this.$store.dispatch('getCarts');
    },
  },
  created() {
    this.getProducts();
    this.getFavourite();
    this.getCarts();
  },
  watch: {
    season() {
      this.page.nowPage = 1;
    },
    alert() {
      this.alertDisplay(this.alert[0], this.alert[1]);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
