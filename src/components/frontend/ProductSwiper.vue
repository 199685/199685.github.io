<template>
  <div>
    <p class="py-5 text-center text-danger h4">暢銷水果</p>
    <swiper class="swiper productsSwiper-size" :options="swiperOption">
      <swiper-slide v-for="product in products" v-show="!changeSwiper" :key="product.id">
        <router-link :to="{ name: 'ProductDetail', params: { productId: product.id } }">
          <div
            class="bg-cover swiper-imgsize"
            :style="` background-image: url( ${product.imageUrl} )`"
          ></div>
        </router-link>
      </swiper-slide>

      <div class="swiper-pagination" slot="pagination" v-show="!changeSwiper"></div>
    </swiper>

    <swiper class="swiper productsSwiper-size" :options="swiperOption1">
      <swiper-slide v-for="product in products" v-show="changeSwiper" :key="product.id">
        <router-link :to="{ name: 'ProductDetail', params: { productId: product.id } }">
          <div
            class="bg-cover swiper-imgsize"
            :style="` background-image: url( ${product.imageUrl} )`"
          ></div>
        </router-link>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
/* eslint-disable */
import { Swiper, SwiperSlide, Navigation, Pagination } from "vue-awesome-swiper";

export default {
  data() {
    return {
      // products: [],
      windowSize: "",
      changeSwiper: false,
      swiperOption: {
        spaceBetween: 30,
        centeredSlides: true,
        slidesPerView: 3,
        spaceBetween: 30,
        freeMode: true,
        loop: true,
        effect: "fade",
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
      swiperOption1: {
        spaceBetween: 30,
        centeredSlides: true,
        slidesPerView: 1,
        spaceBetween: 30,
        freeMode: true,
        loop: true,
        effect: "fade",
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        }
      }
    };
  },
  props: ["products"],
  components: {},
  methods: {
    Size() {
      let vm = this;
      if (window.innerWidth < 768) {
        vm.changeSwiper = true;
      } else {
        vm.changeSwiper = false;
      }
    },
    SwiperSize(e) {
      this.changeSwiper = e.matches;
    }
  },
  created() {
    this.Size();
    window.matchMedia("(max-width: 768px)").addEventListener("change", this.SwiperSize);
  },
  mounted() {},
  beforeDestroy() {
    window.matchMedia("(max-width: 768px)").removeEventListener("change", this.SwiperSize);
  }
};
</script>

<style lang="scss" scoped>
.swiper-imgsize {
  height: 250px;
  width: 100%;
  border-radius: 10px;
}
</style>
