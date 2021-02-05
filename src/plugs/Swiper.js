
import Vue from 'vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import swiper, {
  Navigation, Pagination, Autoplay, EffectFade,
} from 'swiper';
import 'swiper/swiper-bundle.css';

Vue.use(VueAwesomeSwiper);
swiper.use([Navigation, Pagination, Autoplay, EffectFade]);
