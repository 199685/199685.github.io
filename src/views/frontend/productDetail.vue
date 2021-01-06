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

    <div class="container my-4">
      <div class="position-fixed zoom-img" :class="{ 'd-none': !openImg }" @click="zoomImg()">
        <img class="img-size-1 big-size" :src="product.imageUrl" :alt="product.title" />
      </div>
      <div class="row justify-content-center bg-product">
        <nav aria-label="breadcrumb" class="col-12">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link :to="{ name: 'Index' }">
                Home
              </router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link :to="{ name: 'Products' }">
                Products
              </router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
          </ol>
        </nav>
        <div class="col-md-5">
          <img class="img-size-1 zoom" @click="zoomImg()"
          :src="product.imageUrl" :alt="product.title" />
        </div>
        <div class="col-md-6 mb-5">
          <div class="product-one-title d-flex justify-content-between mb-3 mt-3 mt-md-0">
            <h2 class="h1">{{ product.title }}</h2>
            <p class="m-0 text-secondary" @click="addFavourite()">
              <i class="far fa-heart h1 pointer" :class="{ favouriteStyle: product.favourite }"></i>
            </p>
          </div>

          <table class="product-table">
            <tr>
              <td width="150" class="h7">特價</td>
              <td class="text-c4 h3">{{ product.price || 0 | currency }}</td>
            </tr>
            <tr>
              <td width="150" class="h7">數量</td>
              <td>
                <div class="d-flex">
                  <button class="count" @click="quantity('minus')">
                    <i class="fas fa-minus"></i>
                  </button>
                  <input
                    type="number"
                    class="qtyInput__1dbgq "
                    min="1"
                    max="200"
                    name="quantity"
                    v-model="quantityValue"
                    @change="inputQuanproduct(product)"
                  />
                  <button class="count" @click="quantity('plus')">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td width="150" class="h7">付款方式</td>
              <td class="text-c5">
                <i
                  class="fas fa-dollar-sign mr-2"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="現金"
                >
                </i>
                <i
                  class="fab fa-cc-apple-pay h7 mr-2"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Apple Pay"
                >
                </i>
                <i
                  class="fab fa-cc-visa h7"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Visa"
                >
                </i>
              </td>
            </tr>

            <tr>
              <td width="150" class="h7">運費</td>
              <td>
                <p class="mb-2">宅配/貨運 — 免運費需5個工作天</p>
                <p class="m-0">面交/自取/不寄送 — 免運費</p>
              </td>
            </tr>
          </table>

          <div class="text-right">
            <button class="btn new-btn new-btn-cart" @click="addCart(product.id)">
              加入購物車
            </button>
          </div>
        </div>

        <div class="col-md-11 mb-5">
          <hr />
          <div class="row justify-content-center">
            <div class="col-lg-9">
              <h2 class="text-c1 text-center mb-3">產地：{{ product.description }}</h2>
              <h2 class="text-c1 text-center">水果介紹</h2>
              <p class="text-c4 h7 font-space">{{ product.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Carticon :carts="cartsNumber"></Carticon>
  </div>
</template>

<script>
/* eslint-disable */
import Carticon from "@/components/frontend/carticon.vue";

export default {
  data() {
    return {
      isLoading: false,
      cartsNumber: 0,
      cartProductID: [],
      cartID: [],
      quantityValue: 1,
      favourite: [],
      openImg: false,
      product: [],
      productID: ""
    };
  },
  components: {
    Carticon
  },
  methods: {
    getCarts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      this.$http.get(api).then(response => {
        this.cartsNumber = response.data.data.carts.length;
        vm.cartProductID.splice(0);
        vm.cartID.splice(0);
        response.data.data.carts.forEach(product => {
          const data = {
            id: product.id,
            qty: product.qty
          };
          vm.cartID.push(data);
          vm.cartProductID.push(product.product_id);
        });
        vm.isLoading = false;
      });
    },
    getProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${this.productID}`;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        vm.product = response.data.product;
        vm.getFavourite();
      });
    },
    getFavourite() {
      const vm = this;
      this.favourite = JSON.parse(localStorage.getItem("Favourite")) || [];
      vm.$set(vm.product, "favourite", false);
      this.favourite.forEach(item => {
        if (item === vm.product.id) {
          vm.$set(vm.product, "favourite", true);
        }
      });
    },
    addCart(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      let newQty = parseInt(this.quantityValue, 10);
      vm.isLoading = true;
      const sameID = this.cartProductID.indexOf(id);
      if (sameID >= 0) {
        newQty += parseInt(vm.cartID[sameID].qty, 10);
      }
      const addproduct = {
        product_id: id,
        qty: newQty
      };
      this.$http.post(api, { data: addproduct }).then(response => {
        if (sameID >= 0) {
          vm.removeProduct(vm.cartID[sameID].id);
        } else {
          vm.getCarts();
        }
        vm.quantityValue = 1;
        vm.alertDisplay('已加入購物車', 'info')
      });
    },
    addFavourite() {
      const add = this.favourite.indexOf(this.product.id);
      if (add > -1) {
        this.favourite.splice(add, 1);
        this.alertDisplay('已移除我的最愛', 'warning')
      } else {
        this.favourite.push(this.product.id);
        this.alertDisplay('已加入我的最愛', 'info')
      }
      localStorage.setItem("Favourite", JSON.stringify(this.favourite));
      this.getFavourite();
    },
    removeProduct(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      this.$http.delete(api).then(response => {
        vm.getCarts();
      });
    },
    quantity(name) {
      this.quantityValue = parseInt(this.quantityValue, 10);
      if (name === "plus") {
        this.quantityValue += 1;
      } else if (this.quantityValue > 1) {
        this.quantityValue -= 1;
      }
    },
    inputQuanproduct(product) {
      if (this.quantityValue <= 0 || !this.quantityValue) {
        this.quantityValue = 1;
      }
    },
    zoomImg() {
      this.openImg = !this.openImg;
      document.querySelector("body").classList.toggle("hideScroll");
    },
    Top() {
      window.scrollTo({
        top: 0,
        left: 0
      });
    },
    alertDisplay(text, type) {
      let message = text;
      let messageType = type;
      this.$dlg.toast(message, {
        messageType: messageType,
        closeTime: 2,
        position: "topCenter",
        language: "en"
      });
    }
  },
  created() {
    this.Top();
    this.getCarts();
    this.productID = this.$route.params.productId;
    this.getProduct();
  },
 
};

$(() => {
  $('[data-toggle="tooltip"]').tooltip();
});
</script>

<style lang="scss" scoped></style>
