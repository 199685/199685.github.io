/* eslint-disable */
import Vue from 'vue';
import {
  Swiper as SwiperClass, Pagination, Mousewheel, Autoplay, Navigation,
} from 'swiper/swiper.esm';
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter';
import 'swiper/swiper-bundle.css';

SwiperClass.use([Pagination, Mousewheel, Autoplay, Navigation]);
Vue.use(getAwesomeSwiper(SwiperClass));
const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass);

// https://github.com/nolimits4web/swiper
