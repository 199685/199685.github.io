<template>
  <div>
    <swiper class="swiper productsSwiper-size" :options="swiperOption">
      <swiper-slide v-for="product in products">
        <router-link :to="{ name: 'ProductDetail', params: { productId: product.id } }">
          <div
            class="bg-cover swiper-imgsize"
            :style="` background-image: url( ${product.imageUrl} )`"
          ></div>
        </router-link>
      </swiper-slide>

      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, Navigation, Pagination } from "vue-awesome-swiper";
export default {
  data() {
    return {
      products: [],
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
      }
    };
  },
  components: {},
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      this.$http.get(api).then(response => {
        this.products = response.data.products;
      });
    }
  },
  created() {
    this.getProducts();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.swiper-imgsize {
  height: 250px;
  width: 100%;
  border-radius: 10px;
}

</style>
