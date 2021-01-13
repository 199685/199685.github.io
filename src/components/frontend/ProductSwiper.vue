<template>
  <div>
    <p class="py-5 text-center title-color h4">暢銷水果</p>
    <swiper class="swiper productsSwiper-size" :options="swiperOption">
      <swiper-slide v-for="product in products" v-show="!changeSwiper" :key="product.id">
        <router-link :to="{ name: 'ProductDetail', params: { productId: product.id } }">
          <div
            class="bg-cover swiper-imgsize swiper-hover"
            :style="` background-image: url( ${product.imageUrl} )`"
          >
            <div class="content">
              <p class="text-center h6">{{ product.title }}</p>
              <p class="product-content">{{ product.content }}</p>
              <a href="#" class="h9 mt-5 d-block text-c3 text-right"
                >查看更多
                <i class="far fa-hand-point-up"></i>
              </a>
            </div>
          </div>
        </router-link>
      </swiper-slide>

      <div class="swiper-pagination" slot="pagination" v-show="!changeSwiper"></div>
    </swiper>

    <swiper class="swiper productsSwiper-size" :options="swiperOption1">
      <swiper-slide v-for="product in products" v-show="changeSwiper" :key="product.id">
        <router-link :to="{ name: 'ProductDetail', params: { productId: product.id } }">
          <div
            class="bg-cover swiper-imgsize swiper-hover"
            :style="` background-image: url( ${product.imageUrl} )`"
          >
            <div class="content">
              <p class="text-center h6">{{ product.title }}</p>
              <p class="product-content">{{ product.content }}</p>
              <a href="#" class="h9 mt-5 d-block text-c3 text-right"
                >查看更多
                <i class="far fa-hand-point-up"></i>
              </a>
            </div>
          </div>
        </router-link>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      windowSize: "",
      changeSwiper: false,
      swiperOption: {
        spaceBetween: 30,
        centeredSlides: true,
        slidesPerView: 3,
        freeMode: true,
        slidesPerGroup: 2,
        loop: true,
        effect: "fade",
        autoplay: {
          delay: 5000,
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
  methods: {
    Size() {
      const vm = this;
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
  border: 5px solid rgba(0, 0, 0, 0.3);
}
.title-color {
  color: #2d76c5;
}
.swiper-hover {
  position: relative;
  .content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 10px;
    opacity: 0;
    transition: all 0.3s;
    background: rgba(0, 0, 0, 0.3);
    color: yellow;
    padding: 15px;
    border: 5px double rgba(0, 0, 0, 0.3);
  }
  &:hover .content {
    opacity: 1;
    border: 5px double white;
  }
}
.product-content {
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
