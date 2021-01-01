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
    <!-- 1 -->
    <div class="container mt-md-4 mt-2 mb-3">
      <div class="row position-relative">
        <div class="col-md-2">
          <div class="maker mb-4">
            <img src="../../assets/images/1606967135095.png" alt="" />
          </div>
          <div class="vertical-rl mt-md-9 text-c1">
            <p class="h5">有機水果專賣店</p>
            <p class="m-0 h7">新鮮、營養、美味</p>
          </div>
          <div class=" h6 pointer mt-2 m-md-0 social-1">
            <i class="fab fa-facebook-square d-inline-block mr-2"></i>
            <i class="fab fa-instagram-square"></i>
          </div>
        </div>

        <swiper class="swiper swiper-size col-md-10 ml-auto" :options="swiperOption">
          <swiper-slide
            v-for="url in img.swiper"
            :style="` background-image: url( ${url} )`"
            :key="url"
          ></swiper-slide>
          <div class="swiper-pagination text-c1 text-left pl-4" slot="pagination"></div>
        </swiper>
      </div>
    </div>
    <!-- 2 -->
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6 order-md-1 mb-5">
          <img class="img-fluid" src="../../assets/images/農夫.png" alt="" />
          <div class="news bg-white p-3 position-relative">
            <h6 class="text-center text-c1">News</h6>
            <p class="pointer">2020/12/04<span class="pl-5">全店打八折</span></p>
            <p class="pointer">2020/11/20<span class="pl-5">香蕉買一送一</span></p>
            <p class="pointer">2020/11/26<span class="pl-5">滿百送折抵券50元</span></p>
            <p class="pointer">2020/10/06<span class="pl-5">買西瓜送木瓜汁</span></p>
            <div class="text-right">
              <button class="btn new-btn new-btn-news">看更多</button>
            </div>
          </div>
        </div>

        <div class="col-lg-8 col-md-6 text-c1 pt-3 pt-md-5">
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
          <p class="h6 mb-0 bg-white p-2 title md-w-75 no-borderbottom mt-md-9 text-center">
            <span class="gradient text">吃外食很容易營養不均衡</span>
          </p>
          <p class="h6 bg-white p-2 title md-w-75 text-center">
            <span class="gradient text">您缺少的營養由本店來補足</span>
          </p>
          <p class=" bg-white p-2 title md-w-100 mt-md-7">
            <span class="gradient text-center d-block h4">吃水果的好處</span>
            <span class="gradient h7 d-block py-2">熱量低，膳食纖維含量高</span>
            <span class="gradient h7 d-block py-2">富含維生素C，助於保護心血管</span>
            <span class="gradient h7 d-block py-2">降低消化道癌症機率</span>
            <span class="gradient h7 d-block py-2">延緩衰老，提高免疫力</span>
          </p>
        </div>
      </div>
      <p class="py-5 text-center text-danger h4">為了給您最好的品質，以下幾點是我們不變的堅持</p>
      <div class="row justify-content-center">
        <div class="col-lg-4 col-md-6 position-relative animation-updown mb-4">
          <div class="point-title position-relative">
            <p class="m-0">POINT</p>
            <p class="m-0 pl-2">01</p>
          </div>
          <img class="point-star" src="../../assets/images/star.png" alt="" width="125" />
          <div
            class="pointImg1 point-img-size bg-cover"
            :style="{ 'background-image': 'url(' + img.point[0] + ')' }"
          ></div>

          <p class="p-2 point-about h8">有機種植無添加農藥，不需清洗也能健康吃</p>
        </div>

        <div class="col-lg-4 col-md-6 position-relative mt-md-100 animation-updown mb-4">
          <div class="point-title position-relative">
            <p class="m-0">POINT</p>
            <p class="m-0 pl-2">02</p>
          </div>
          <img class="point-star" src="../../assets/images/star.png" alt="" width="125" />
          <div
            class="pointImg2 point-img-size bg-cover"
            :style="{ 'background-image': 'url(' + img.point[1] + ')' }"
          ></div>
          <p class="p-2 point-about h8">堅持一定要當日現採，當日出貨</p>
        </div>

        <div class="col-lg-4 col-md-6 position-relative mt-md-200 animation-updown mb-4">
          <div class="pointImg3 point-title position-relative">
            <p class="m-0">POINT</p>
            <p class="m-0 pl-2">03</p>
          </div>
          <img class="point-star" src="../../assets/images/star.png" alt="" width="125" />
          <div
            class="point-img-size bg-cover"
            :style="{ 'background-image': 'url(' + img.point[2] + ')' }"
          ></div>
          <p class="p-2 point-about h8">-10°C的超低溫配送環境，完美呈現水果的鮮甜</p>
        </div>

        <div class="col-12">
          <ProductSwiper class="mb-3"></ProductSwiper>
        </div>
      </div>
    </div>

    <div
      class="popup position-fixed justify-content-center align-items-center"
      :class="{ 'd-none': colsepopup }"
    >
      <div class="popup-content p-4 position-relative">
        <h3 class="popup-title">
          <i class="fas fa-seedling pr-1 mb-2"></i>週年慶全館85折<i
            class="fas fa-seedling pl-1 d-none d-md-inline-block "
          ></i>
        </h3>
        <p>適用通路：網路</p>
        <p>適用商品：架上商品</p>
        <p class="text-center popup-code p-2">{{ message }}</p>
        <p>活動日期：2020/04/20 - 2020/5/19</p>
        <div class="text-center">
          <button class="btn new-btn new-btn-code" v-clipboard:copy="message"
           @click="alertDisplay('複製成功', 'info')">複製優惠序號</button>
        </div>
        <div class="position-absolute close-circle pointer" @click="colsePopup()">
          <i class="far fa-times-circle h5"></i>
        </div>
      </div>
    </div>

    <Carticon :carts="cartsNumber"></Carticon>
  </div>
</template>

<script>
/* eslint-disable */
import { Swiper, SwiperSlide, Navigation, Pagination } from "vue-awesome-swiper";
import Carticon from "../../components/frontend/carticon.vue";
import ProductSwiper from "../../components/frontend/ProductSwiper";
export default {
  data() {
    return {
      message: "HAPPYFRUIT3YEARS",
      colsepopup: false,
      cartsNumber: 0,
      isLoading: false,
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
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        this.cartsNumber = response.data.data.carts.length;
        vm.isLoading = false;
      });
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
    this.getCarts();
    this.Top();
  },
  mounted() {
    document.querySelector("body").classList.add("hideScroll");
  }
};
</script>

<style lang="scss" scoped></style>
