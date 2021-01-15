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

    <div class="container mt-md-4 mt-2 mb-3">
      <div class="row position-relative">
        <div class="col-lg-2">
          <div class="maker mb-4">
            <img src="../../assets/images/1606967135095.png" alt="Happy Fruit" />
          </div>
          <div class="vertical-rl mt-lg-9 text-c1">
            <p class="h5">有機水果專賣店</p>
            <p class="m-0 h7">新鮮、營養、美味</p>
          </div>
          <div class=" h6 pointer mt-2 m-lg-0 social-1">
            <i class="fab fa-facebook-square d-inline-block mr-2"></i>
            <i class="fab fa-instagram-square"></i>
          </div>
        </div>

        <swiper class="swiper swiper-size col-lg-10  ml-auto" :options="swiperOption">
          <swiper-slide
            v-for="url in img.swiper"
            :style="` background-image: url( ${url} )`"
            :key="url"
          ></swiper-slide>
          <div class="swiper-pagination text-c1 text-left pl-4" slot="pagination"></div>
        </swiper>
      </div>
    </div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-6">
          <h6 class="text-c1 mb-3"><i class="fas fa-bullhorn d-inline-block mr-1"></i>最新消息</h6>
          <p class="pointer new-border-b pb-1">2020/12/04<span class="pl-5">全店打八折</span></p>
          <p class="pointer new-border-b pb-1">2020/11/20<span class="pl-5">香蕉買一送一</span></p>
          <p class="pointer new-border-b pb-1">
            2020/11/26<span class="pl-5">滿百送折抵券50元</span>
          </p>
          <p class="pointer new-border-b pb-1">
            2020/10/06<span class="pl-5">買西瓜送木瓜汁</span>
          </p>
        </div>
        <div class="col-md-6">
        <img class="img-fluid" src="../../assets/images/農夫.png" alt="" />
          <div class="openstore p-2 text-center mb-5 text-c1">
            <div class="d-lg-flex justify-content-around align-items-center">
              <h6>營業時間</h6>
              <p class="h8">平日: 07:30~22:00</p>
              <p class="h8">假日: 07:00~20:00</p>
            </div>
            <div class="d-lg-flex justify-content-around align-items-center">
              <h6>電話</h6>
              <p class="h8">(02)2666-6434</p>
              <p class="h8">(02)2123-5892</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Carticon :carts="cartsNumber"></Carticon>
  </div>
</template>

<script>
import Carticon from "@/components/frontend/carticon.vue";
import ProductSwiper from "@/components/frontend/ProductSwiper.vue";

export default {
  data() {
    return {
      message: "HAPPYFRUIT3YEARS",
      colsepopup: false,
      cartsNumber: 0,
      isLoading: false,
      products: [],
      img: {
        point: [
          require("../../assets/images/無農藥.jpg"),
          require("../../assets/images/採收.jpg"),
          require("../../assets/images/cold.jpg")
        ],
        swiper: [
          require("../../assets/images/輪播-2.jpg"),
          require("../../assets/images/輪播-3.jpg"),
          require("../../assets/images/輪播-4.jpg"),
          require("../../assets/images/輪播-5.jpg"),
          require("../../assets/images/輪播-6.jpg")
        ]
      },
      swiperOption: {
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        effect: "fade",
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          type: "fraction"
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  components: {
    Carticon,
    ProductSwiper
  },
  methods: {
    colsePopup() {
      this.colsepopup = true;
      document.querySelector("body").classList.remove("hideScroll");
    },
    getCarts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        this.cartsNumber = response.data.data.carts.length;
        this.getProducts();
      });
    },
    Top() {
      window.scrollTo({
        top: 0,
        left: 0
      });
    },
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
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      this.$http.get(api).then(response => {
        vm.products = response.data.products;
        vm.isLoading = false;
      });
    }
  },
  created() {
    // this.getCarts();
    // this.Top();
  },
  mounted() {
    // document.querySelector("body").classList.add("hideScroll");
  }
};
</script>

<style lang="scss" scoped>
.pl-18 {
  padding-left: 18px;
}
.title-color {
  color: #055fc1;
}
.new-border-b {
  border-bottom: 1px solid #143c65;
}
</style>
