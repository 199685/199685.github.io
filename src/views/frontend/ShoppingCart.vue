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
      <div class="row bg-product justify-content-center container-75">
        <nav aria-label="breadcrumb" class="col-12">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link :to="{ path: 'index' }">
                Home
              </router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Shopping Cart</li>
          </ol>
        </nav>
        <div class="col text-center pb-5" :class="{ 'd-none': !zerocarts }">
          <p class="h4 mb-5 text-c1">目前購物車還沒有任何商品</p>
          <div class="text-center">
            <router-link :to="{ path: 'products' }">
              <button class="btn new-btn new-btn-favourite">採購去~~</button>
            </router-link>
          </div>
        </div>
        <div class="col-md-10 mb-5 container-25" :class="{ 'd-none': zerocarts }">
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
              <h2 class="mb-0 pl-3 pl-sm-0 d-flex align-items-center">
                <p class="d-inline-block h7 mb-0 pr-3">應付金額</p>
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
                      <img class="img-fluid" :src="product.product.imageUrl" alt="" />
                    </td>

                    <td>{{ product.product.title }}</td>
                    <td>
                      <div class="d-flex">
                        <button
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
            <button class="btn new-btn new-btn-checkout" @click="nextpage()">結帳去</button>
          </div>
        </div>
        <div class="col-12">
          
          <ProductSwiper class="mb-3"></ProductSwiper>
        </div>
      </div>
    </div>

    <Carticon :carts="cartsNumber"></Carticon>
  </div>
</template>

<script>
import Carticon from "../../components/frontend/carticon.vue";
import ProductSwiper from "../../components/frontend/ProductSwiper";
export default {
  data() {
    return {
      isLoading: false,
      cartsNumber: 0,
      carts: [],
      total: [],
      changeProductsID: [],
      zerocarts: true
    };
  },
  components: {
    Carticon,
    ProductSwiper
  },
  computed: {},
  methods: {
    getCarts() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        this.cartsNumber = response.data.data.carts.length;
        if (vm.cartsNumber > 0) {
          vm.zerocarts = false;
        }
        vm.carts = response.data.data;
        vm.total = [response.data.data.total];
        vm.isLoading = false;
      });
    },
    quantity(name, product) {
      const changeproduct = product;
      changeproduct.qty = parseInt(changeproduct.qty, 10);
      if (name === "plus") {
        changeproduct.qty += 1;
        this.total[0] += parseInt(changeproduct.product.price, 10);
      } else if (changeproduct.qty > 1) {
        changeproduct.qty -= 1;
        this.total[0] -= parseInt(changeproduct.product.price, 10);
      }
      changeproduct.total = parseInt(changeproduct.product.price, 10) * changeproduct.qty;
    },
    inputQuanproduct(product) {
      const changeproduct = product;
      if (changeproduct.qty <= 0 || !changeproduct.qty) {
        changeproduct.qty = 1;
      }
      const vm = this;
      const NewTotal =
        this.total[0] -
        parseInt(changeproduct.total, 10) +
        parseInt(changeproduct.product.price, 10) * changeproduct.qty;
      vm.$set(vm.total, 0, NewTotal);
      changeproduct.total = parseInt(changeproduct.product.price, 10) * changeproduct.qty;
    },
    removeProduct(product, index) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${product.id}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.delete(api).then(() => {
        vm.total[0] -= product.qty * product.product.price;
        this.removeChangeProducts(product.product_id, index);
        vm.isLoading = false;
      });
      vm.cartsNumber -= 1;
      if (vm.cartsNumber === 0) {
        vm.zerocarts = true;
      }
    },
    addChangeProducts(product) {
      const changeID = this.changeProductsID.map(item => item.product_id);
      const productIndex = changeID.indexOf(product.product_id);
      if (productIndex < 0) {
        const data = {
          id: product.id,
          qty: product.qty,
          product_id: product.product_id
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
      const vm = this;
      vm.isLoading = true;
      this.changeProductsID.forEach(item => {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        const apitwo = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item.id}`;
        const addproduct = {
          product_id: item.product_id,
          qty: item.qty
        };
        this.$http.post(api, { data: addproduct }).then(() => {});
        this.$http.delete(apitwo).then(() => {});
      });
      vm.$router.push("/checkout1");
    }
  },
  created() {
    this.getCarts();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
