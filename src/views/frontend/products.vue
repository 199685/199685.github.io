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

    <div class="container mt-7">
      <div class="row">
        <div class="col-lg-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb pt-0">
              <li class="breadcrumb-item">
                <router-link :to="{ path: 'index' }">
                  首頁
                </router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">商品</li>
            </ol>
          </nav>

          <ProductsNavbar :select="select" @touchKind="touchKind"> </ProductsNavbar>
        </div>
        <div class="col-lg-9 mb-3">
          <select
            name="sortProducts"
            id="sortProducts"
            class="sort text-c1 mb-3 p-1"
            v-model="sort"
          >
            <option selected value="">商品排序</option>
            <option value="high">價格由高至低</option>
            <option value="low">價格由低至高</option>
          </select>
          <ul class="row p-0 pb-3">
            <li
              class="col-md-6 mb-4 mb-0 list-style-none"
              v-for="product in filterProducts"
              :key="product.id"
            >

                <div class="position-relative product">
                  <img class="img-size pointer" :src="product.imageUrl" :alt="product.title" />
                  <div
                    class="position-absolute
                    product-icon d-flex flex-column
                    justify-content-center align-items-center"
                  >
                    <p
                      class="pointer w-100 text-center py-2 mb-3 icon-hover"
                      :class="{ heartStyle: product.favourite }"
                      @click="addFavourite(product.id)"
                    >
                      <span :class="{'d-none': product.favourite}">加入最愛</span>
                      <span :class="{'d-none': !product.favourite}">移除最愛</span>
                      <i class="far fa-heart"></i>
                    </p>
                    <p class="pointer w-100 text-center icon-hover" @click="addCart(product.id)">
                      加入購物車 <i class="fas fa-shopping-cart"></i>
                    </p>
                  </div>

                  <router-link
                    class="product-item p-2 d-block"
                    :to="{ name: 'ProductDetail', params: { productId: product.id } }"
                  >
                    <p class="py-2 h7 product-name">{{ product.title }}</p>
                    <div class="cost d-flex justify-content-between align-items-center mb-2">
                      <p class="text-line-through h9 m-0">
                        原價{{ product.origin_price | currency }}
                      </p>
                      <div class="d-flex">
                        <p class="text-success h9 badges-boder-success mr-1 mb-0">可超商取貨</p>
                        <p class="text-danger h9 badges-boder-danger mb-0">不甜退費</p>
                      </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                      <p class="h5 text-c4">特價{{ product.price | currency }}</p>
                      <a href="#" class="h9 m-0"
                        >查看更多
                        <i class="far fa-hand-point-up"></i>
                      </a>
                    </div>
                  </router-link>
                </div>

            </li>
          </ul>
        </div>
      </div>
    </div>

    <Carticon :carts="cartsNumber"></Carticon>
  </div>
</template>

<script>
import Carticon from '@/components/frontend/carticon.vue';
import ProductsNavbar from '@/components/frontend/Products_Navbar.vue';

export default {
  data() {
    return {
      colsepopup: false,
      cartsNumber: 0,
      products: [],
      hotproducts: [],
      isLoading: false,
      cartProductID: [],
      cartID: [],
      quantityValue: 1,
      favourite: [],
      select: 'all',
      sort: '',
    };
  },
  components: {
    Carticon,
    ProductsNavbar,

  },
  computed: {
    filterProducts() {
      const vm = this;
      const NewProducts = JSON.parse(JSON.stringify(this.products));
      if (this.sort === 'high') {
        NewProducts.sort((a, b) => b.price - a.price);
      } else if (this.sort === 'low') {
        NewProducts.sort((a, b) => a.price - b.price);
      }
      if (this.select === 'all') {
        return NewProducts;
      }
      return NewProducts.filter(product => product.season.includes(vm.select));
    },
  },
  methods: {
    getCarts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      this.$http.get(api).then((response) => {
        this.cartsNumber = response.data.data.carts.length;
        vm.cartProductID.splice(0);
        vm.cartID.splice(0);
        response.data.data.carts.forEach((product) => {
          const data = {
            id: product.id,
            qty: product.qty,
          };
          vm.cartID.push(data);
          vm.cartProductID.push(product.product_id);
        });
        vm.isLoading = false;
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
      this.favourite = JSON.parse(localStorage.getItem('Favourite')) || [];
      this.products.forEach((item) => {
        vm.$set(item, 'favourite', false);
        const favourite = vm.favourite.includes(item.id);
        if (favourite) {
          vm.$set(item, 'favourite', true);
        }
      });
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
    addCart(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      let newQty = parseInt(this.quantityValue, 10);
      const sameID = this.cartProductID.indexOf(id);
      vm.isLoading = true;
      if (sameID >= 0) {
        newQty += parseInt(vm.cartID[sameID].qty, 10);
      }
      const addproduct = {
        product_id: id,
        qty: newQty,
      };
      this.$http.post(api, { data: addproduct }).then(() => {
        if (sameID >= 0) {
          vm.removeProduct(vm.cartID[sameID].id);
        } else {
          vm.getCarts();
        }
        vm.quantityValue = 1;
        vm.alertDisplay('已加入購物車', 'info');
      });
    },
    removeProduct(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      this.$http.delete(api).then(() => {
        vm.getCarts();
      });
    },
    touchKind(name) {
      const touchName = name;
      this.select = touchName;
    },
    alertDisplay(text, type) {
      const message = text;
      const messageType = type;
      this.$dlg.toast(message, {
        messageType,
        closeTime: 3,
        position: 'topCenter',
        language: 'en',
      });
    },
    Top() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    },
  },
  created() {
    this.getCarts();
    this.getProducts();
  },
  mounted() {
    this.Top();
  },

};
</script>

<style lang="scss" scoped>
.icon-hover{
  transition: font-size .3s;
  &:hover{
    color: yellow;
    font-weight: bold;
    font-size: 1.5em;
  }
}
</style>
