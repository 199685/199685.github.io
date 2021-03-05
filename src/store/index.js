import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    carts: {
      data: {
        data: {
          carts: [],
        },
      },
    },
    cartsNumber: 0,
    products: [],
    alert: [],
    favouriteNumber: 0,
    run: true,
  },
  mutations: {
    UPDATELOADING(state, payload) {
      state.isLoading = payload;
    },
    CARTS(state, payload) {
      state.carts = payload;
      state.run = true;
    },
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    ALERT(state, payload) {
      state.alert = payload;
    },
    FAVOURITE(state, payload) {
      state.favouriteNumber = payload;
    },
    RUN(state, payload) {
      state.run = payload;
    },
  },
  getters: {
    cartsNumber: state => state.carts.data.data.carts.length,
    cartsID: state => state.carts.data.data.carts.map(product => ({
      qty: product.qty,
      id: product.id,
      productID: product.product_id,
    })),
  },
  actions: {
    getCarts({ commit }) {
      return new Promise((resolve) => {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        axios.get(api).then((response) => {
          resolve(response);
          commit('CARTS', response);
        });
      });
    },
    getProducts({ commit }) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      commit('UPDATELOADING', true);
      axios.get(api).then((response) => {
        commit('PRODUCTS', response.data.products);
        commit('UPDATELOADING', false);
      });
    },
    addCart({ commit, dispatch }, payload) {
      commit('UPDATELOADING', true);
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      axios.post(api, { data: payload.Newproduct }).then(() => {
        dispatch('getCarts');
        setTimeout(() => {
          commit('UPDATELOADING', false);
        }, 500);
        commit('ALERT', payload.alert);
      });
    },
    // eslint-disable-next-line
    removeProduct({ commit }, payload) {
      return new Promise((resolve) => {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${payload}`;
        axios.delete(api).then(() => {
          resolve();
        });
      });
    },
  },
});
