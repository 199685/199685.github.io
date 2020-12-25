import Vue from 'vue';
import Router from 'vue-router';



const Login = () => import('./views/backend/back-Login.vue');
const Dashboard = () => import('./components/backend/Dashboard.vue');
const Products = () => import('./views/backend/back-Products.vue');
const CustomerOrder = () => import('./views/backend/back-CustomerOrders.vue');
const CustomerCheckout = () => import('./views/backend/back-CustomerCheckout.vue');
const Coupons = () => import('./views/backend/back-Coupons.vue');
const OrderList = () => import('./views/backend/back-OrderList.vue');
const Layout = () => import('./components/frontend/layout.vue');
const Index = () => import('./views/frontend/index.vue');
const Product = () => import('./views/frontend/product.vue');
const ShoppingCart = () => import('./views/frontend/ShoppingCart.vue');
const Text = () => import('./components/frontend/text.vue');


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'login',
    },

    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      // meta: { requiresAuth: true },
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },
        },
        {
          path: 'order_list',
          name: 'OrderList',
          component: OrderList,
          meta: { requiresAuth: true },
        },
        {
          path: 'coupons',
          name: 'Coupons',
          component: Coupons,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/a',
      name: 'CustomerDashboard',
      component: Dashboard,
      children: [
        {
          path: 'customer_order',
          name: 'CustomerOrder',
          component: CustomerOrder,
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckout',
          component: CustomerCheckout,
        },

      ],
    },
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: 'index',
          name: 'Index',
          component: Index
        },
        {
          path: 'product/:productId',
          name: 'Product',
          component: Product
        },
        {
          path: 'shoppingcart',
          name: 'ShoppingCart',
          component: ShoppingCart
        },
        {
          path: 'text',
          name: 'text',
          component: Text,
        }
      ]
    },

  ],
});
