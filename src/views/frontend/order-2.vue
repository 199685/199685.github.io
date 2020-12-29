<template>
  <!-- eslint-disable -->
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
          <div class="timeline timeline-color-50 position-relative mb-5">
            <div class="timepoint position-relative timepoint-color">
              <i class="far fa-sticky-note"></i>
            </div>
            <div class="timepoint position-relative timepoint-color">
              <i class="fas fa-edit"></i>
            </div>
            <div class="timepoint position-relative">
              <i class="fas fa-truck"></i>
            </div>
          </div>
          <div class="line-name d-flex justify-content-between">
            <p class="text-c1">確認購買</p>
            <p class="text-c1">填寫資料</p>
            <p class="text-c5">完成訂單</p>
          </div>

          <validation-observer v-slot="{ invalid }">
            <form class="needs-validation order-from" novalidate @submit.prevent="createOrder()">
              <div class="form-row">
                <validation-provider
                  :rules="{ regex: /^([^0-9]*)$/ }"
                  v-slot="{ errors, classes }"
                  class="col-md-6 mb-4">
                  <label for="姓名">姓名</label>
                  <input
                    type="text"
                    class="form-control"
                    id="姓名"
                    placeholder="請輸入姓名"
                    required
                    v-model="orderData.user.name"
                    :class="classes"
                  />
                  <span class="invalid-feedback position-absolute">{{ errors[0] }}</span>
                </validation-provider>

                <validation-provider
                  :rules="{ regex: /^[0-9]{10}$/g }"
                  v-slot="{ errors, classes }"
                  class="col-md-6 mb-3">
                  <label for="手機號碼">手機號碼</label>
                  <input
                    type="tel"
                    class="form-control"
                    id="手機號碼"
                    placeholder="請輸入手機號碼"
                    required
                    v-model="orderData.user.tel"
                    :class="classes"
                  />
                  <span class="invalid-feedback position-absolute">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="form-row">
                <validation-provider
                  rules="required|email"
                  v-slot="{ errors, classes }"
                  class="col-md-6 mb-4">
                  <label for="Email">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="Email"
                    placeholder=" 請輸入Email"
                    required
                    v-model="orderData.user.email"
                    :class="classes"
                  />
                  <span class="invalid-feedback position-absolute">{{ errors[0] }}</span>
                </validation-provider>

                <validation-provider
                  rules="required"
                  v-slot="{ errors, classes }"
                  class="col-md-6 mb-3">
                  <label for="付款方式">付款方式</label>

                  <select
                    id="付款方式"
                    class="form-control"
                    v-model="orderData.user.paymethod"
                    required
                    :class="classes"
                  >
                    <option selected disabled value="">請選擇付款方式</option>
                    <option value="貨到付款">貨到付款</option>
                    <option value="超商付款">超商付款</option>
                    <option value="ATM付款">ATM付款</option>
                  </select>

                  <span class="invalid-feedback position-absolute">{{ errors[0] }}</span>
                </validation-provider>

                <validation-provider rules="required" v-slot="{ errors, classes }" class="col mb-4">
                  <label for="validationCustom04">地址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationCustom04"
                    placeholder=" 請輸入地址"
                    required
                    v-model="orderData.user.address"
                    :class="classes"
                  />
                  <div class="invalid-feedback position-absolute">
                    請輸入地址
                  </div>
                </validation-provider>
              </div>

              <div class="text-right my-2">
                <button class="btn new-btn new-btn-order" type="submit" :disabled="invalid">
                  下一步
                </button>
              </div>
            </form>
          </validation-observer>
        </div>
      </div>
    </div>

    <Carticon :carts="cartsNumber"></Carticon>
  </div>
</template>

<script>
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
  "use strict";
  window.addEventListener(
    "load",
    function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName("needs-validation");
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener(
          "submit",
          function(event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
})();
import Carticon from "../../components/frontend/carticon.vue";

export default {
  data() {
    return {
      isLoading: false,
      cartsNumber: 0,
      orderData: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
          paymethod: ""
        },
        message: ""
      }
    };
  },
  components: {
    Carticon
  },
  computed: {},
  methods: {
    getCarts() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      setTimeout(() => {
        this.$http.get(api).then(response => {
          this.cartsNumber = response.data.data.carts.length;
          vm.isLoading = false;
        });
      }, 1500);
    },
    createOrder() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      let vm = this;
      vm.isLoading = true;

      this.$http.post(api, { data: vm.orderData }).then(response => {
        vm.$router.push({ path: `/checkout3/${response.data.orderId}` });
        console.log(response);
        vm.isLoading = false;
      });
    }
  },

  created() {
    this.getCarts();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.form-control:focus {
  border-color: green;
  box-shadow: 0 0 0 1px green;
}
</style>
