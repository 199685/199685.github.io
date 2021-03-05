<template>
  <div>
    <div
      class="container-fluid bg-cover sky-size"
      :style="{ backgroundImage: `url(${require('@/assets/images/bg-2.jpg')})` }"
    >
      <div class="container mt-1">
        <div class="row justify-content-center">
          <div class="col-11 col-md-12 text-center px-3 py-7" :class="{ 'd-none': !zeroCarts }">
            <p class="mb-5 font-1">目前購物車沒有任何商品</p>
            <div class="text-center">
              <router-link :to="{ path: 'products' }">
                <button type="button" class="btn new-btn new-btn-favourite">逛逛商品</button>
              </router-link>
            </div>
          </div>
          <div class="col-11 col-md-12 text-center px-3 py-7" :class="{ 'd-none': zeroCarts }">
            <p class="mb-5 font-2">購物車</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container-30 container my-4">
      <div class="row justify-content-center">
        <div class="col-11 mb-5" :class="{ 'd-none': zeroCarts }">
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
                  顯示購物車細節<i class="fas fa-angle-down ml-1 text-c1"></i>
                </button>
              </h2>
              <h2 class="mb-0 pl-3 pl-sm-0 d-flex align-items-center titlefont">
                <p class="d-inline-block mb-0 pr-3">應付金額</p>
                {{ total[0] || 0 | currency }}
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
                    <th scope="col" class="text-center" colspan="3">商品名稱</th>
                    <th scope="col" class="text-center" width="100">數量</th>
                    <th scope="col" width="200">單價</th>
                    <th scope="col" width="200">小計</th>
                  </tr>
                  <tr v-for="(product, index) in carts.carts" :key="product.id">
                    <td width="100" class="text-center">
                      <i
                        class="far fa-trash-alt pointer p-3"
                        @click="removeProduct(product, index)"
                      ></i>
                    </td>
                    <td class="table-img">
                      <img
                        class="img-fluid"
                        :src="product.product.imageUrl"
                        :alt="product.product.title"
                      />
                    </td>

                    <td>{{ product.product.title }}</td>
                    <td>
                      <div class="d-flex">
                        <button
                          type="button"
                          class="count"
                          @click="
                            quantity('minus', product);
                            addChangeProducts(product);
                          "
                        >
                          <i class="fas fa-minus"></i>
                        </button>
                        <input
                          type="number"
                          class="qtyInput__1dbgq "
                          min="1"
                          max="200"
                          name="quantity"
                          v-model="product.qty"
                          @change="
                            inputQuanproduct(product);
                            addChangeProducts(product);
                          "
                        />
                        <button
                          class="count"
                          type="button"
                          @click="
                            quantity('plus', product);
                            addChangeProducts(product);
                          "
                        >
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                    </td>
                    <td class="text-right">{{ product.product.price | currency }}</td>
                    <td class="text-right">
                      {{ (product.product.price * product.qty) | currency }}
                    </td>
                  </tr>
                  <tr>
                    <th colspan="5" class="text-right">運費</th>
                    <th class="text-right">$0</th>
                  </tr>
                  <tr>
                    <td colspan="5" class="text-right">合計</td>
                    <th class="text-right">{{ total[0] || 0 | currency }}</th>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <div class="text-right mt-2">
            <button type="button" class="btn new-btn new-btn-checkout" @click="nextpage()">
              結帳去
            </button>
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
      cartsNumber: 0,
      carts: [],
      total: [],
      changeProductsID: [],
      zeroCarts: false,
    };
  },
  methods: {
    getCarts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.$store.commit('UPDATELOADING', true);
      vm.$http.get(api).then((response) => {
        this.cartsNumber = response.data.data.carts.length;
        if (vm.cartsNumber > 0) {
          vm.zeroCarts = false;
        } else {
          vm.zeroCarts = true;
        }
        vm.carts = response.data.data;
        vm.total = [response.data.data.total];
        vm.getProducts();
      });
    },
    quantity(name, product) {
      const changeproduct = product;
      changeproduct.qty = parseInt(changeproduct.qty, 10);
      if (name === 'plus') {
        changeproduct.qty += 1;
        this.total[0] += parseInt(changeproduct.product.price, 10);
      } else if (changeproduct.qty > 1) {
        changeproduct.qty -= 1;
        this.total[0] -= parseInt(changeproduct.product.price, 10);
      }
      changeproduct.total = parseInt(changeproduct.product.price, 10) * changeproduct.qty;
    },
    inputQuanproduct(product) {
      const vm = this;
      const changeproduct = product;
      if (changeproduct.qty <= 0 || !changeproduct.qty) {
        changeproduct.qty = 1;
      }
      const NewTotal = this.total[0]
        - parseInt(changeproduct.total, 10)
        + parseInt(changeproduct.product.price, 10) * changeproduct.qty;
      vm.$set(vm.total, 0, NewTotal);
      changeproduct.total = parseInt(changeproduct.product.price, 10) * changeproduct.qty;
    },
    removeProduct(product, index) {
      const vm = this;
      vm.$store.commit('UPDATELOADING', true);
      vm.$store.dispatch('removeProduct', product.id);
      vm.total[0] -= product.qty * product.product.price;
      this.removeChangeProducts(product.product_id, index);
      vm.alertDisplay(`${product.product.title}已移除購物車`, 'warning');
      vm.cartsNumber -= 1;
      if (vm.cartsNumber === 0) {
        vm.zeroCarts = true;
      }
      setTimeout(() => {
        vm.$store.commit('UPDATELOADING', false);
      }, 300);
    },
    addChangeProducts(product) {
      const changeID = this.changeProductsID.map(item => item.product_id);
      const productIndex = changeID.indexOf(product.product_id);
      if (productIndex < 0) {
        const data = {
          id: product.id,
          qty: product.qty,
          product_id: product.product_id,
        };
        this.changeProductsID.push(data);
      } else {
        this.changeProductsID[productIndex].qty = product.qty;
      }
    },
    removeChangeProducts(id, index) {
      const changeID = this.changeProductsID.map(item => item.product_id);
      const removeIndex = changeID.indexOf(id);
      this.changeProductsID.splice(removeIndex, 1);
      this.carts.carts.splice(index, 1);
    },
    nextpage() {
      if (this.$store.state.run) {
        const vm = this;
        vm.$store.commit('RUN', false);
        this.changeProductsID.forEach((item) => {
          const Newproduct = {
            product_id: item.product_id,
            qty: item.qty,
          };
          vm.$store.dispatch('addCart', { Newproduct });
          vm.$store.dispatch('removeProduct', item.id);
        });
        setTimeout(() => {
          vm.$store.commit('RUN', true);
          vm.$router.push('/checkout1');
        }, 1000);
      }
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
    getProducts() {
      this.$store.dispatch('getProducts');
    },
  },
  created() {
    this.getCarts();
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
};
</script>

<style lang="scss" scoped>
.font-1 {
  font-size: 40px;
  color: black;
}
.font-2 {
  font-size: 40px;
  color: black;
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
.count {
  height: 45px;
  width: 45px;
}
.count:hover {
  background: #ccd0d4;
}
.qtyInput__1dbgq {
  height: 45px;
}
.titlefont {
  font-size: 40px;
}
@media (max-width: 768px) {
  .titlefont {
    font-size: 24px;
  }
}
.container-30 {
  min-height: 30vh;
}
.container-75 {
  min-height: 80vh;
}
</style>
