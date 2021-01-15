import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'Text',
    },
    {
      path: '/',
      redirect: 'Text',
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: () => import('./components/backend/Dashboard.vue'),
      children: [
        {
          path: 'adminproducts',
          name: 'adminProducts',
          component: () => import('./views/backend/back-Products.vue'),
          meta: {
            requiresAuth: true,
            title: '開心水果_產品列表',
          },
        },
        {
          path: 'order_list',
          name: 'OrderList',
          component: () => import('./views/backend/back-OrderList.vue'),
          meta: {
            requiresAuth: true,
            title: '開心水果_訂單列表',
          },
        },
        {
          path: 'coupons',
          name: 'Coupons',
          component: () => import('./views/backend/back-Coupons.vue'),
          meta: {
            requiresAuth: true,
            title: '開心水果_優惠券',
          },
        },
      ],
    },
    {
      path: '/',
      name: 'Layout',
      component: () => import('./components/frontend/layout.vue'),
      children: [
        {
          path: 'index',
          name: 'Index',
          component: () => import('./views/frontend/index.vue'),
          meta: {
            title: '開心水果_首頁',
          },
        },
        {
          path: 'product/:productId',
          name: 'ProductDetail',
          component: () => import('./views/frontend/productDetail.vue'),
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
          component: () => import('./views/frontend/products.vue'),
          meta: {
            title: '開心水果_商店',
          },
        },
        {
          path: 'login_index',
          name: 'LoginIndex',
          component: () => import('./views/backend/back-Login.vue'),
          meta: {
            title: '開心水果_會員登入',
          },
        },
        {
          path: 'checkout1',
          name: 'Checkout1',
          component: () => import('./views/frontend/order-1.vue'),
          meta: {
            title: '開心水果_訂單step1',
          },
        },
        {
          path: 'checkout2',
          name: 'Checkout2',
          component: () => import('./views/frontend/order-2.vue'),
          meta: {
            title: '開心水果_訂單step2',
          },
        },
        {
          path: 'checkout3/:orderId',
          name: 'Checkout3',
          component: () => import('./views/frontend/order-3.vue'),
          meta: {
            title: '開心水果_訂單step3',
          },
        },
        {
          path: 'text',
          name: 'Text',
          component: () => import('./views/frontend/text.vue'),
          meta: {
            title: 'text',
          },
        },

      ],
    },


  ],
});
