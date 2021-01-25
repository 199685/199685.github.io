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
      <div class="position-fixed zoom-img show" :class="{ openshow: openImg }" @click="zoomImg()">
        <img class="img-size-1 big-size" :src="product.imageUrl" :alt="product.title" />
      </div>
      <div class="row justify-content-center">
        <div class="col-11 boder-db">
          <div class="row">
            <nav aria-label="breadcrumb" class="pl-0 col-12">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link :to="{ name: 'Index' }">
                    首頁
                  </router-link>
                </li>
                <li class="breadcrumb-item">
                  <router-link :to="{ name: 'Products' }">
                    商品
                  </router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
              </ol>
            </nav>
            <div class="col-md-5">
              <img
                class="img-size-1 zoom"
                @click="zoomImg()"
                :src="product.imageUrl"
                :alt="product.title"
              />
            </div>
            <div class="col-md-7 mb-5">
              <div class="product-one-title d-flex justify-content-between mb-3 mt-3 mt-md-0">
                <h2 class="h1 fw-700">{{ product.title }}</h2>
                <p class="m-0 text-secondary pr-3" @click="addFavourite()">
                  <i
                    class="far fa-heart h1 pointer"
                    :class="{ favouriteStyle: product.favourite }"
                  ></i>
                </p>
              </div>

              <table class="product-table">
                <tr>
                  <td width="120" class="h7">特價</td>
                  <td class="text-c4 h3">{{ product.price || 0 | currency }}</td>
                </tr>
                <tr>
                  <td width="120" class="h7">數量</td>
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
                <tr class="d-flex align-items-center">
                  <td width="120" class="font-24">付款方式</td>
                  <td class="text-c5">
                    <i
                      class="fas fa-dollar-sign mr-2 my-auto"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="現金"
                    >
                    </i>
                    <i
                      class="fab fa-cc-apple-pay h7 mr-2 my-auto"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Apple Pay"
                    >
                    </i>
                    <i
                      class="fab fa-cc-visa h7 my-auto"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Visa"
                    >
                    </i>
                  </td>
                </tr>

                <tr class="d-flex align-items-center">
                  <td width="120" class="h7 min-w">運費</td>
                  <td>
                    <p class="mb-2">宅配/貨運 — 免運費需5個工作天</p>
                    <p class="m-0">面交/自取/不寄送 — 免運費</p>
                  </td>
                </tr>
              </table>

              <div class="text-right pr-3">
                <button class="btn new-btn new-btn-cart" @click="addCart(product.id)">
                  加入購物車
                </button>
              </div>
            </div>
          </div>

          <div class="col-12">
            <ul class="d-flex pl-0 nav">
              <li class="list-type">
                <a
                  href="#"
                  class="font"
                  @click.prevent="navClick('A')"
                  :class="{ 'nav-active': nav === 'A' }"
                >
                  水果介紹</a
                >
              </li>
              <li class="list-type">
                <a
                  href="#"
                  class="font"
                  @click.prevent="navClick('B')"
                  :class="{ 'nav-active': nav === 'B' }"
                >
                  常見問題</a
                >
              </li>
            </ul>
            <div class="row mt-3 p-2" v-show="nav === 'A'">
              <div class="col-lg-4 ">
                <p class="h5 text-c1 fw-700">水果詳細介紹</p>
              </div>
              <div class="col-lg-8 ">
                <h3 class="mb-3 h6">產地：{{ product.description }}</h3>
                <p class="h8 justify">{{ product.content }}</p>
              </div>
            </div>
            <div class="row mt-3 p-2" v-show="nav === 'B'">
              <div class="col-lg-5 mb-2">
                <p class="h8 text-c1 fw-700">加入會員需要付費嗎？</p>
              </div>
              <div class="col-lg-7 mb-2">
                <h3 class="mb-3 h8">不需要。加入會員是免費</h3>
              </div>
              <div class="col-lg-5 mb-2">
                <p class="h8 text-c1 fw-700 line-hight-1">請問訂購方式有：傳真訂購、電話訂購嗎？</p>
              </div>
              <div class="col-lg-7 mb-2">
                <h3 class="mb-3 h8 line-hight-1">
                  本站提供為網路訂購方式優先處理訂單；傳真訂購、電話訂購方式請參考本行網站資訊。<br />
                  傳真電話：<span class="fw-300">(02)2345-6789</span><br />
                  電話訂購：<span class="fw-300">(02)2331-1234、(02)2332-4321</span>
                </h3>
              </div>

              <div class="col-lg-5 mb-2">
                <p class="h8 text-c1 fw-700 line-hight-1">訂(退)貨</p>
              </div>
              <div class="col-lg-7 mb-2">
                <ul class="pl-3 list-style line-hight-1">
                  <li class="pl-1 justify mb-1">
                    若遇中秋節、春節等繁忙節日，甚至天災或是促銷訂單過多等特殊情形，
                    導致無法在您指定時間內出貨，我們將事先在官網公告或另行通知。
                  </li>
                  <li class="pl-1 justify mb-1">
                    商品退貨必須原包裝完整，在回收前請置於其配送的溫層狀態保存，
                    如果是冷藏配送就請幫忙放冰箱，我們接到退貨要求會在24小時內通知宅配回收。
                  </li>
                  <li class="pl-1 justify mb-1">
                    商品除非本身瑕疵或是規格有誤，恕難接受口感不佳、買錯了、
                    或是大小不合乎預期等個人主觀或疏失為由要求退換貨，建議選購前請先洽詢我們。
                  </li>
                  <li class="pl-1 justify mb-1">
                    水果屬生鮮商品不享有鑑賞期。如果您收到的商品有缺損或是碰傷腐爛的瑕疵情形，
                    請先拍照存證並於商品送達「24小時內」連絡我們處理，如果無法並提供照片可能會影響您退換貨的權益。
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <TopProducts
            :TopProductsData="TopProductsData"
            v-on:getcarts-event="getchildEvent"
            class="row"
          >
            <template v-slot:title>
              <h3 class="col-12 my-3 text-c1 fw-700 fade-border h4">
                <i class="far fa-thumbs-up"></i>相關水果
              </h3>
            </template>
          </TopProducts>
        </div>
      </div>
    </div>

    <Carticon :carts="cartsNumber"></Carticon>
  </div>
</template>

<script>
/* eslint-disable */
import Carticon from "@/components/frontend/carticon.vue";
import TopProducts from "@/components/frontend/topProducts.vue";

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
      productID: "",
      nav: "A",
      cartsID:[]
    };
  },
  components: {
    Carticon,
    TopProducts
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
        vm.cartsID = response.data.data.carts.map(product => ({
          qty: product.qty,
          id: product.id,
          productID: product.product_id,
        }));
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
        vm.alertDisplay("已加入購物車", "info");
      });
    },
    addFavourite() {
      const add = this.favourite.indexOf(this.product.id);
      if (add > -1) {
        this.favourite.splice(add, 1);
        this.alertDisplay("已移除我的最愛", "warning");
      } else {
        this.favourite.push(this.product.id);
        this.alertDisplay("已加入我的最愛", "info");
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
    },
    navClick(name) {
      switch (name) {
        case "A":
          this.nav = "A";
          break;
        case "B":
          this.nav = "B";
        default:
          return "";
      }
    },
    getchildEvent(useevent) {
      switch (useevent) {
        case "getCarts":
          this.getCarts();
          break;
        default:
          return "";
      }
    }
  },
  computed: {
    TopProductsData() {
      const mydata = {
        cartsID: [this.cartsID],
        className: {
          "col-md-6": true,
          "col-lg-4": true,
          // "col-xl-3": true,
          "mb-3": true
        },
        howFilter: ["random"],
        openPagination: false,
        randomCount: 3
      };
      return mydata;
    }
  },
  created() {
    this.Top();
    this.getCarts();
    this.productID = this.$route.params.productId;
    this.getProduct();
  }
};

$(() => {
  $('[data-toggle="tooltip"]').tooltip();
});
</script>

<style lang="scss" scoped>
.count {
  height: 45px;
  width: 45px;
}
.count:hover {
  background: #ccd0d4;
}
.qtyInput__1dbgq {
  height: 45px;
}
.show {
  opacity: 0;
  width: 0;
  height: 0;
  transition: opacity 0.5s;
}
.openshow {
  opacity: 1;
  width: 100%;
  height: auto;
}
.min-w {
  min-width: 120px;
}
.new-btn-cart:after,
.new-btn:before,
.new-btn {
  padding-left: 40px;
  padding-right: 40px;
}
.font-24 {
  font-size: 24px;
}
.list-type {
  list-style-type: none;
  color: #143c65;
  margin-bottom: -1px;
  a {
    padding: 10px;
    font-size: 18px;
    color: black;
    display: inline-block;
    &:hover {
      text-decoration: none;
      color: #009e24;
    }
  }
  .nav-active {
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid #6c757d;
    border-bottom: 1px solid rgba(255, 255, 255, 0.6);
    color: #009e24;
    font-weight: 700;
  }
}
.nav {
  border-bottom: 1px solid #dcd8d8;
}
.justify {
  text-align: justify;
}
.line-hight-1 {
  line-height: 2em;
}
.list-style {
  list-style: decimal;
}
</style>
