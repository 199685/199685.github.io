import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/admin',
      component: () => import('./components/backend/Dashboard.vue'),
      children: [
        {
          path: '',
          name: 'adminProducts',
          component: () => import('./views/backend/Back-Products.vue'),
          meta: {
            requiresAuth: true,
            title: '開心水果_產品列表',
          },
        },
        {
          path: 'order_list',
          name: 'OrderList',
          component: () => import('./views/backend/Back-OrderList.vue'),
          meta: {
            requiresAuth: true,
            title: '開心水果_訂單列表',
          },
        },
        {
          path: 'coupons',
          name: 'Coupons',
          component: () => import('./views/backend/Back-Coupons.vue'),
          meta: {
            requiresAuth: true,
            title: '開心水果_優惠券',
          },
        },
      ],
    },
    {
      path: '/',
      component: () => import('./components/frontend/Layout.vue'),
      children: [
        {
          path: '',
          name: 'Index',
          component: () => import('./views/frontend/Index.vue'),
          meta: {
            title: '開心水果_首頁',
          },
        },
        {
          path: 'product/:productId',
          name: 'ProductDetail',
          component: () => import('./views/frontend/ProductDetail.vue'),
          meta: {
            title: '開心水果_產品',
          },
        },
        {
          path: 'shoppingcart',
          name: 'ShoppingCart',
          component: () => import('./views/frontend/ShoppingCart.vue'),
          meta: {
            title: '開心水果_購物車',
          },
        },
        {
          path: 'favourite',
          name: 'Favourite',
          component: () => import('./views/frontend/Favourite.vue'),
          meta: {
            title: '開心水果_我的最愛',
          },
        },
        {
          path: 'products',
          name: 'Products',
          component: () => import('./views/frontend/Products.vue'),
          meta: {
            title: '開心水果_商店',
          },
        },
        {
          path: 'login_index',
          name: 'LoginIndex',
          component: () => import('./views/backend/Back-Login.vue'),
          meta: {
            title: '開心水果_會員登入',
          },
        },
        {
          path: 'checkout1',
          name: 'Checkout1',
          component: () => import('./views/frontend/Order-1.vue'),
          meta: {
            title: '開心水果_訂單step1',
          },
        },
        {
          path: 'checkout2',
          name: 'Checkout2',
          component: () => import('./views/frontend/Order-2.vue'),
          meta: {
            title: '開心水果_訂單step2',
          },
        },
        {
          path: 'checkout3/:orderId',
          name: 'Checkout3',
          component: () => import('./views/frontend/Order-3.vue'),
          meta: {
            title: '開心水果_訂單step3',
          },
        },

      ],
    },
    {
      path: '*',
      redirect: '/',
    },
    {
      path: '/admin*',
      redirect: '/admin',
    },


  ],
});
