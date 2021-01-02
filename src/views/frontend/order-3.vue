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

    <div class="container-100 container my-4">
      <div class="row bg-product justify-content-center">
        <nav aria-label="breadcrumb" class="col-12 mb-3">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link :to="{ name: 'Index' }">
                Home
              </router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link :to="{ path: 'shoppingcart' }">
                Shopping Cart
              </router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Checkout</li>
          </ol>
        </nav>
        <div class="col-md-10 container-75">
          <div class="timeline timeline-color-100 position-relative mb-5">
            <div class="timepoint position-relative timepoint-color">
              <i class="far fa-sticky-note"></i>
            </div>
            <div class="timepoint position-relative timepoint-color">
              <i class="fas fa-edit"></i>
            </div>
            <div class="timepoint position-relative timepoint-color">
              <i class="fas fa-truck"></i>
            </div>
          </div>
          <div class="line-name d-flex justify-content-between">
            <p class="text-c1">確認購買</p>
            <p class="text-c1">填寫資料</p>
            <p class="text-c1">完成訂單</p>
          </div>

          <div class="accordion" id="accordionExample"></div>
          <div class="card pb-1">
            <div class="card-header d-sm-flex justify-content-between py-1" id="headingOne">
              <h2 class="mb-0">
                <button
                  class="btn btn-link btn-block text-left"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  顯示訂單資訊<i class="fas fa-angle-down ml-1 text-c1"></i>
                </button>
              </h2>
              <h2 class="mb-0 pl-3 pl-sm-0 d-flex align-items-center">
                <p class="d-inline-block h7 mb-0 pr-3">應付金額</p>
                {{ Order.total || 0 | currency }}
              </h2>
            </div>

            <div
              id="collapseOne"
              class="collapse show"
              aria-labelledby="headingOne"
              data-parent="#accordionExample"
            >
              <div class="shopping-table">
                <table class="table">
                  <tr>
                    <th scope="col" class="text-center" colspan="2">商品名稱</th>
                    <th scope="col" class="text-center" width="150">數量</th>
                    <th scope="col" width="200">小計</th>
                  </tr>
                  <tr v-for="product in products" :key="product.id">
                    <td class="table-img">
                      <img class="img-fluid" :src="product.product.imageUrl" alt="" />
                    </td>

                    <td>{{ product.product.title }}</td>
                    <td class="text-center">{{ product.qty }}{{ product.product.unit }}</td>
                    <td class="text-right">{{ product.total || 0 | currency }}</td>
                  </tr>

                  <tr>
                    <th colspan="3" class="text-right">運費</th>
                    <th class="text-right">$0</th>
                  </tr>
                  <tr>
                    <th colspan="3" class="text-right">優惠折抵</th>
                    <th class="text-right">{{ couponsmoney || 0 | currency }}</th>
                  </tr>
                  <tr>
                    <td colspan="3" class="text-right">合計</td>
                    <th class="text-right">{{ Order.total || 0 | currency }}</th>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <div class="p-4 table-border mt-3 shopping-table">
            <table class="table">
              <tr>
                <th>姓名</th>
                <td>{{ Order.user.name }}</td>
              </tr>
              <tr>
                <th>電話</th>
                <td>{{ Order.user.tel }}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{{ Order.user.email }}</td>
              </tr>
              <tr>
                <th>地址</th>
                <td>{{ Order.user.address }}</td>
              </tr>
              <tr>
                <th>付款方式</th>
                <td>{{ Order.user.paymethod }}</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <th class="text-c1" v-show="Order.is_paid">完成付款</th>
                <td class="text-danger" v-show="!Order.is_paid">尚未付款</td>
              </tr>
            </table>
          </div>

          <div class="text-right my-2">
            <button
              class="btn new-btn new-btn-order2"
              type="button"
              v-show="!Order.is_paid"
              @click="pay()"
            >
              確認付款
            </button>

            <router-link :to="{ name: 'Index' }">
              <button class="btn new-btn new-btn-index mr-2" type="button" v-show="Order.is_paid">
                回首頁
              </button>
            </router-link>

            <router-link :to="{ name: 'Products' }">
              <button class="btn new-btn new-btn-buy" type="button" v-show="Order.is_paid">
                繼續購買
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <Carticon :carts="cartsNumber"></Carticon>
  </div>
</template>

<script>
import Carticon from '../../components/frontend/carticon.vue';

export default {
  data() {
    return {
      isLoading: false,
      cartsNumber: 0,
      OrderId: '',
      Order: {
        user: {
          name: '',
        },
      },
      products: [],
    };
  },
  components: {
    Carticon,
  },
  computed: {
    couponsmoney() {
      const { total } = this.Order;
      let oraingeTotal = 0;
      this.products.forEach((item) => {
        oraingeTotal += item.total;
      });
      return oraingeTotal - total;
    },
  },
  methods: {
    getOrder() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${this.OrderId}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.Order = response.data.order;
        vm.isLoading = false;
        const productsID = Object.keys(vm.Order.products);
        productsID.forEach((item) => {
          vm.products.push(vm.Order.products[item]);
        });
      });
    },
    pay() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${this.OrderId}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.post(api).then(() => {
        vm.Order.is_paid = true;
        vm.isLoading = false;
        vm.alertDisplay('付款成功', 'success');
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
  created() {
    this.OrderId = this.$route.params.orderId;
    this.getOrder();
  },
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
