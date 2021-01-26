<template>
  <div>

    <div class="container mt-md-4 mt-2 mb-3">
      <div class="row position-relative">
        <div class="col-lg-2">
          <div class="maker mb-4">
            <img src="../../assets/images/1606967135095.png" alt="Happy Fruit" />
          </div>
          <div class="vertical-rl mt-lg-9 text-c1">
            <p class="h5">有機水果專賣店</p>
            <p class="m-0 h7 fw-300">新鮮、營養、美味</p>
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
      <div class="row justify-content-center">
        <div class="col-md-6 text-center">
          <img
            height="300"
            class="d-none d-md-inline-block"
            src="../../assets/images/農夫1.png"
            alt="農夫"
          />
        </div>
        <div class="col-md-6">
          <h6 class="text-c1 mb-3 mb-3 fade-border">
            <i class="fas fa-bullhorn d-inline-block mr-3"></i>最新消息
          </h6>
          <p class="pointer new-border-b pb-1">2020/12/04<span class="pl-5">全店打八折</span></p>
          <p class="pointer new-border-b pb-1">2020/11/20<span class="pl-5">香蕉買一送一</span></p>
          <p class="pointer new-border-b pb-1">
            2020/11/26<span class="pl-5">滿百送折抵券50元</span>
          </p>
          <p class="pointer new-border-b pb-1">
            2020/10/06<span class="pl-5">買西瓜送木瓜汁</span>
          </p>
        </div>
        <div class="openstore p-2 text-center mb-5 text-c1 col-11 col-md-12">
          <div class="d-md-flex justify-content-around align-items-center">
            <h6 class="ml-3">營業時間</h6>
            <p class="h8 fw-100">平日: 07:30~22:00</p>
            <p class="h8 fw-100">假日: 07:00~20:00</p>
          </div>
          <div class="d-md-flex justify-content-around align-items-center">
            <h6>電話</h6>
            <p class="h8 fw-100">(02)2666-6434</p>
            <p class="h8 fw-100">(02)2123-5892</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid pb-5" style="background: white;">
      <div class="container">
        <h3 class="text-c1 py-md-5 py-3 fw-700 d-flex justify-content-center f-22">
          <img class="img-fluid mr-2 min-50" src="../../assets/images/fruits.png" alt="水果好吃" />
          保持水果好吃的秘訣
        </h3>
        <div class="row">
          <div class="col-md-6 img-show animate__animated">
            <img class="img-fluid img-border" :src="img.point[0]" alt="無農藥" />
          </div>
          <div class="col-md-6">
            <div class="position-relative">
              <img class="img-fluid" src="../../assets/images/po-1.png" alt="point-1" />
              <h4 class="position-absolute title-point text-c1 fw-700">有機種植</h4>
            </div>

            <p class="fz-20 fw-300 mt-2">
              有機水果是完全不用人工合成的化學肥料、農藥、生長調節劑和飼料添加劑的生產制度。
              它在可能的範圍內，儘量依靠輪作、作物秸杆、家畜糞尿、綠肥、外來的有機廢棄物、機械中耕、
              含有無機養分的礦石及生物防治等方法，保持土壤的肥力和易耕性，供給作物養分，防治病蟲雜草危害。
            </p>
          </div>
        </div>
        <div class="row mt-2 mt-md-5">
          <div class="col-md-6 order-md-1 img-show animate__animated">
            <img class="img-fluid img-border" :src="img.point[1]" alt="採收" />
          </div>
          <div class="col-md-6">
            <div class="position-relative">
              <img class="img-fluid" src="../../assets/images/po-2.png" alt="point-2" />
              <h4 class="position-absolute title-point text-c1 fw-700">當天現採</h4>
            </div>

            <p class="fz-20 fw-300 mt-2">
              我們出產的水果都是當天採，當天賣！
            </p>
          </div>
        </div>
        <div class="row mt-2 mt-md-5">
          <div class="col-md-6 img-show animate__animated">
            <img class="img-fluid img-border" :src="img.point[2]" alt="低溫" />
          </div>
          <div class="col-md-6">
            <div class="position-relative">
              <img class="img-fluid" src="../../assets/images/po-3.png" alt="point-3" />
              <h4 class="position-absolute title-point text-c1 fw-700">低溫運送</h4>
            </div>

            <p class="fz-20 fw-300 mt-2">
              -10°C的超低溫配送環境，完美呈現水果的鮮甜。
            </p>
          </div>
        </div>
      </div>
    </div>

    <div
      class="container-fluid bg-cover sky-size bg-fixed"
      :style="{ backgroundImage: `url(${require('@/assets/images/bg-3.jpg')})` }">
      <div class="row">
        <div class="col">
          <div class="eatfruit text-center text-light">
          <h4 class="fw-700 mb-5">吃水果的好處</h4>
          <p class="eatfruit-fontsize">熱量低，膳食纖維含量高</br>
          富含維生素C，助於保護心血管</br>
          降低消化道癌症機率</br>
          延緩衰老，提高免疫力</br>
          </p>
          </div>
        </div>
      </div>
    </div>

    <div class="container mb-3">

            <TopProducts :TopProductsData="TopProductsData"
            v-on:getcarts-event="getchildEvent" class="row">
              <template v-slot:title>
                <h3 class="col-12 my-3 text-c1 fw-700 fade-border text-center">
                  <i class="far fa-thumbs-up"></i>精選水果
                </h3>
              </template>
            </TopProducts>


        <div class="row justify-content-center">
          <div class="col-12 col-md-8 col-xl-6 text-center my-4">
             <router-link :to="{ name: 'Products' }">
                <button class="btn new-btn-1 new-btn-more w-100">看更多水果</button>
           </router-link>
          </div>

        </div>
    </div>
    <Carticon :carts="cartsNumber"></Carticon>

    <div
      class="popup position-fixed justify-content-center align-items-center"
      :class="{ 'd-none': colsepopup }">
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
          <button
            class="btn new-btn new-btn-code"
            v-clipboard:copy="message"
            @click="alertDisplay('複製成功', 'info')"
          >
            複製優惠序號
          </button>
        </div>
        <div class="position-absolute close-circle pointer" @click="colsePopup()">
          <i class="far fa-times-circle h5"></i>
        </div>
      </div>
    </div>
     <div
      class="popup position-fixed justify-content-center align-items-center"
      :class="{ 'd-none': colsepopup }" >
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
          <button
            class="btn new-btn new-btn-code"
            v-clipboard:copy="message"
            @click="alertDisplay('複製成功', 'info')"
          >
            複製優惠序號
          </button>
        </div>
        <div class="position-absolute close-circle pointer" @click="colsePopup()">
          <i class="far fa-times-circle h5"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Carticon from '@/components/frontend/carticon.vue';
import TopProducts from '@/components/frontend/topProducts.vue';


export default {
  data() {
    return {
      message: 'HAPPYFRUIT3YEARS',
      colsepopup: false,
      cartsNumber: 0,
      isLoading: false,
      cartsID: [],
      img: {
        point: [
          require('../../assets/images/無農藥.jpg'),
          require('../../assets/images/採收-1.png'),
          require('../../assets/images/cold-2.jpg')
        ],
        swiper: [
          require('../../assets/images/輪播-2.jpg'),
          require('../../assets/images/輪播-3.jpg'),
          require('../../assets/images/輪播-4.jpg'),
          require('../../assets/images/輪播-5.jpg'),
          require('../../assets/images/輪播-6.jpg'),
        ],
      },
      swiperOption: {
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        effect: 'fade',
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'fraction',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    };
  },
  components: {
    Carticon,
    TopProducts,
  },
  methods: {
    colsePopup() {
      this.colsepopup = true;
      document.querySelector('body').classList.remove('hideScroll');
    },
    getCarts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      this.$http.get(api).then((response) => {
        vm.cartsNumber = response.data.data.carts.length;
        vm.cartsID = response.data.data.carts.map(product => ({
          qty: product.qty,
          id: product.id,
          productID: product.product_id,
        }));
      });
    },
    Top() {
      window.scrollTo({
        top: 0,
        left: 0,
      });
    },
    getchildEvent(useevent) {
      switch (useevent) {
        case 'getCarts':
          this.getCarts();
          break;
        default:
          return '';
      }
      return '';
    },
    showimg() {
      const imgtag = document.querySelectorAll('.img-show');
      imgtag.forEach((item) => {
        const showimg = window.pageYOffset + window.innerHeight
        - (item.offsetHeight * 0.1) > item.offsetTop;
        if (showimg) {
          item.classList.add('animate__slideInUp');
        } else {
          item.classList.remove('animate__slideInUp');
        }
      });
    },
    alertDisplay(text, type) {
      const message = text;
      const messageType = type;
      this.$dlg.toast(message, {
        messageType,
        closeTime: 2,
        position: 'topCenter',
        language: 'en',
      });
    },

  },
  computed: {
    TopProductsData() {
      const mydata = {
        cartsID: [this.cartsID],
        className: {
          'col-md-6': true,
          'col-lg-4': true,
          'col-xl-3': true,
          'mb-3': true,
        },
        howFilter: ['random'],
        openPagination: false,
        randomCount: 8,
      };
      return mydata;
    },


  },
  created() {
    this.getCarts();
    this.Top();
  },
  mounted() {
    document.querySelector("body").classList.add("hideScroll");
    window.addEventListener('scroll', this.showimg, true);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.showimg);
  },
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
.openstore {
  border: 1px solid #d4d3d3;
}

.min-50 {
  max-width: 50px;
  max-height: 50px;
}
@media (max-width: 768px) {
  .f-22 {
    font-size: 22px;
    align-items: center;
  }
  .title-point {
    font-size: 28px;
  }
  .eatfruit-fontsize{
    font-size: 20px;
  }
}
.img-border {
  border: 5px double rgba(0, 0, 0, 0.3);
  padding: 5px;
  border-radius: 15px;
}

.title-point {
  top: 60%;
  left: 10%;
}
.fz-20 {
  font-size: 20px;
  text-align: justify;
}

.eatfruit-fontsize{
  font-size: 24px;
  line-height: 2em;
}
.eatfruit{
  padding-top: 15%;
  padding-bottom: 15%;
}
@media (max-width: 768px) {
  .eatfruit-fontsize{
    font-size: 20px;
  }
}

</style>
