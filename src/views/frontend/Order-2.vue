<template>
  <div>
    <loading :active.sync="isLoading">
      <div class="loading-blue">
        <div class="ldio-loading">
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
      <div class="row justify-content-center">
        <div class="col-11 boder-db">
          <nav aria-label="breadcrumb" class="pl-0">
            <ol class="breadcrumb pl-0 mb-0">
              <li class="breadcrumb-item">
                <router-link :to="{ name: 'Index' }">
                  首頁
                </router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link :to="{ path: 'shoppingcart' }">
                  購物車
                </router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">結帳確認</li>
            </ol>
          </nav>

          <div class="container-75 pt-5">
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
              <p class="text-c1 w-1 pt-1">確認購買</p>
              <p class="text-c1 w-1 pt-1">填寫資料</p>
              <p class="text-c5 w-1 pt-1">完成訂單</p>
            </div>

            <validation-observer v-slot="{ invalid }">
              <form class="needs-validation order-from" novalidate @submit.prevent="createOrder()">
                <div class="form-row">
                  <validation-provider
                    :rules="{ regex: /^([^0-9]*)$/ }"
                    v-slot="{ errors, classes }"
                    class="col-md-6 mb-4"
                  >
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
                    class="col-md-6 mb-3"
                  >
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
                    class="col-md-6 mb-4"
                  >
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
                    class="col-md-6 mb-3"
                  >
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

                  <validation-provider
                    rules="required"
                    v-slot="{ errors, classes }"
                    class="col mb-4"
                  >
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
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isLoading: false,
      orderData: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
          paymethod: '',
        },
        message: '',
      },
    };
  },
  methods: {
    createOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      vm.isLoading = true;

      vm.$http.post(api, { data: vm.orderData }).then((response) => {
        vm.$router.push({ path: `/checkout3/${response.data.orderId}` });

        vm.isLoading = false;
      });
    },
  },
  mounted() {
    (function () {
      window.addEventListener(
        'load',
        () => {
          const forms = document.getElementsByClassName('needs-validation');
          const validation = Array.prototype.filter.call(forms, (form) => {
            form.addEventListener(
              'submit',
              (event) => {
                if (form.checkValidity() === false) {
                  event.preventDefault();
                  event.stopPropagation();
                }
                form.classList.add('was-validated');
              },
              false,
            );
          });
          return validation;
        },
        false,
      );
    }());
  },
};
</script>

<style lang="scss" scoped>
.form-control:focus {
  border-color: green;
  box-shadow: 0 0 0 1px green;
}
.w-1 {
  width: 75px;
  text-align: center;
}

.container-70 {
  min-height: 70vh;
}
@media (max-width: 576px) {
  .font-1 {
    font-size: 18px;
  }
  .container-70 {
    min-height: 100vh;
  }
}

.new-btn-favourite:after {
  color: white;
}
.new-btn:hover:after {
  color: white;
}
.new-btn {
  border: 2px solid black;
}
</style>
