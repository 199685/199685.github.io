<template>
  <div class="container-70">
    <div
      class="container-fluid bg-cover sky-size"
      :style="{ backgroundImage: `url(${require('@/assets/images/bg-1.jpg')})` }"
    >
      <div class="container mt-1">
        <div class="row justify-content-center">
          <div class="col-11 col-md-12 text-center px-3 py-7" :class="{ 'd-none': none }">
            <p class="mb-5 font-1">目前最愛商品沒有任何商品</p>
            <div class="text-center">
              <router-link :to="{ path: 'products' }">
                <button class="btn new-btn new-btn-favourite">逛逛商品</button>
              </router-link>
            </div>
          </div>
          <div class="col-11 col-md-12 text-center px-3 py-7" :class="{ 'd-none': !none }">
            <p class="mb-5 font-2">最愛商品</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-3">
      <TopProducts
        :TopProductsData="TopProductsData"
        v-on:getcarts-event="getchildEvent"
        class="row"
        ref="getData"
      >
      </TopProducts>
    </div>

    <Carticon :carts="cartsNumber"></Carticon>
  </div>
</template>

<script>
import Carticon from "@/components/frontend/carticon.vue";
import TopProducts from "@/components/frontend/topProducts.vue";

export default {
  data() {
    return {
      cartsNumber: 0,
      cartsID: [],
      favourite: [],
      none: true
    };
  },
  components: {
    Carticon,
    TopProducts
  },
  computed: {
    TopProductsData() {
      const mydata = {
        cartsID: [this.cartsID],
        className: {
          "col-md-6": true,
          "col-lg-4": true,
          "col-xl-3": true,
          "mb-3": true
        },
        howFilter: ["favourite"],
        openPagination: false
      };
      return mydata;
    }
  },
  methods: {
    getCarts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      this.$http.get(api).then(response => {
        vm.cartsNumber = response.data.data.carts.length;
        vm.cartsID = response.data.data.carts.map(product => ({
          qty: product.qty,
          id: product.id,
          productID: product.product_id
        }));
      });
    },
    Top() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    },
    updateFavourite() {
      this.favourite = JSON.parse(localStorage.getItem("Favourite")) || [];
      if (this.favourite.length > 0) {
        this.none = true;
      } else {
        this.none = false;
      }
    },
    getchildEvent(useevent) {
      switch (useevent) {
        case "getCarts":
          this.getCarts();
          break;
        case "updateFavourite":
          this.updateFavourite();
          break;
        default:
          return "";
      }
    }
  },
  created() {
    this.getCarts();
  },
  mounted() {
    this.Top();
    this.updateFavourite();
  }
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
