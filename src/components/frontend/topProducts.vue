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
    <div class="container mb-3">
      <div class="row justify-content-center">
        <h3 class="col-12 my-3 text-c1 fw-700 fade-border text-center">
          <i class="far fa-thumbs-up"></i>精選水果
        </h3>
        <div
          class="col-md-6 col-lg-4 col-xl-3 mb-3"
          v-if="products"
          v-for="product in randomProductsFilter">
          <div class="topProducts pb-2" style="background: white;">
            <a class="topProducts-link" href="#">
              <div class="topProducts">
                <img class="img-fluid" :src="product.imageUrl" alt="水果" />
              </div>

              <h4 class="topProducts-name h8 p-2 text-c1 fw-700 mb-0">{{ product.title }}</h4>
            </a>
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
       <slot></slot>
      </div>
    </div>
  </div>
   
</template>

<script>
export default {
  data() {
    return {
      randomProducts: [],
      isLoading: false,
      products: [],
      cartProductID: [],
      cartID: [],
      quantityValue: 1,
      favourite: []
    };
  },
  props: ["cartsID"],
  computed: {
    randomProductsFilter() {
      let index = Math.floor(Math.random() * Math.floor(this.products.length));
      if (this.products[index]) {
        this.randomProducts.push(this.products[index]);
        while (this.randomProducts.length < 8) {
          let index = Math.floor(Math.random() * Math.floor(this.products.length));
          let randomProductsName = this.randomProducts.map(item => item.id);
          let sameProduct = randomProductsName.includes(this.products[index].id);
          if (!sameProduct) {
            this.randomProducts.push(this.products[index]);
          }
        }
      }

      return this.randomProducts;
    }
  },
  methods: {
    alertDisplay(text, type) {
      const message = text;
      const messageType = type;
      this.$dlg.toast(message, {
        messageType,
        closeTime: 2,
        position: "topCenter",
        language: "en"
      });
    },
    getProducts() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      this.isLoading = true;
      this.$http.get(api).then(response => {
        this.products = response.data.products;
        this.getFavourite();
      });
    },
    getFavourite() {
      const vm = this;
      this.favourite = JSON.parse(localStorage.getItem("Favourite")) || [];
      this.products.forEach(item => {
        vm.$set(item, "favourite", false);
        const favourite = vm.favourite.includes(item.id);
        if (favourite) {
          vm.$set(item, "favourite", true);
        }
        vm.isLoading = false;
      });
    },
    addFavourite(id) {
      const add = this.favourite.indexOf(id);
      if (add > -1) {
        this.favourite.splice(add, 1);
        this.alertDisplay("已移除我的最愛", "warning");
      } else {
        this.favourite.push(id);
        this.alertDisplay("已加入我的最愛", "info");
      }

      localStorage.setItem("Favourite", JSON.stringify(this.favourite));

      this.getFavourite();
    },
    addCart(addProudct) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      let newQty = parseInt(this.quantityValue, 10);
      let sameproduct = vm.cartsID.findIndex(item => item.productID === addProudct.id);
      if (sameproduct >= 0) {
        newQty += parseInt(vm.cartsID[sameproduct].qty, 10);
        vm.removeProduct(vm.cartsID[sameproduct].id);
      }
      const Newproduct = {
        product_id: addProudct.id,
        qty: newQty
      };
      this.$http.post(api, { data: Newproduct }).then(() => {
        if (!sameproduct >= 0) {
          vm.$emit("getcarts-event");
          vm.isLoading = false;
        }
        vm.quantityValue = 1;
        let notice = `${addProudct.title}已加入購物車`;
        vm.alertDisplay(notice, "info");
      });
    },
    removeProduct(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      this.$http.delete(api).then(() => {
        vm.$emit("getcarts-event");
        vm.isLoading = false;
      });
    }
  },
  created() {
    this.getProducts();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
