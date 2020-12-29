import Vue from 'vue';
import Router from 'vue-router';


const Login = () => import('./views/backend/back-Login.vue');
const Dashboard = () => import('./components/backend/Dashboard.vue');
const adminProducts = () => import('./views/backend/back-Products.vue');
const CustomerOrder = () => import('./views/backend/back-CustomerOrders.vue');
const CustomerCheckout = () => import('./views/backend/back-CustomerCheckout.vue');
const Coupons = () => import('./views/backend/back-Coupons.vue');
const OrderList = () => import('./views/backend/back-OrderList.vue');
const Layout = () => import('./components/frontend/layout.vue');
const Index = () => import('./views/frontend/index.vue');
const ProductDetail = () => import('./views/frontend/productDetail.vue');
const ShoppingCart = () => import('./views/frontend/ShoppingCart.vue');
const Favourite = () => import('./views/frontend/Favourite.vue');
const Products = () => import('./views/frontend/products.vue');
const Checkout1 = () => import('./views/frontend/order-1.vue');
const Checkout2 = () => import('./views/frontend/order-2.vue');
const Checkout3 = () => import('./views/frontend/order-3.vue');
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
          path: 'adminproducts',
          name: 'adminProducts',
          component: adminProducts,
          meta: { requiresAuth: true,
                  title:'開心水果_產品列表'
          },
        },
        {
          path: 'order_list',
          name: 'OrderList',
          component: OrderList,
          meta: { requiresAuth: true,
                  title:'開心水果_訂單列表'
            },
        },
        {
          path: 'coupons',
          name: 'Coupons',
          component: Coupons,
          meta: { requiresAuth: true ,
                  title:'開心水果_優惠券'
            },
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
          component: Index,
          meta:{
            title:'開心水果_首頁'
          }
        },
        {
          path: 'product/:productId',
          name: 'ProductDetail',
          component: ProductDetail,
          meta:{
            title:'開心水果_產品'
          }
        },
        {
          path: 'shoppingcart',
          name: 'ShoppingCart',
          component: ShoppingCart,
          meta:{
            title:'開心水果_購物車'
          }
        },
        {
          path: 'favourite',
          name: 'Favourite',
          component: Favourite,
          meta:{
            title:'開心水果_我的最愛'
          }
        },
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta:{
            title:'開心水果_商店'
          }
        },
        {
          path: 'login_index',
          name: 'LoginIndex',
          component: Login,
          meta:{
            title:'開心水果_會員登入'
          }
        },
        {
          path: 'checkout1',
          name: 'Checkout1',
          component: Checkout1,
          meta:{
            title:'開心水果_訂單step1'
          }
        },
        {
          path: 'checkout2',
          name: 'Checkout2',
          component: Checkout2,
          meta:{
            title:'開心水果_訂單step2'
          }
        },
        {
          path: 'checkout3/:orderId',
          name: 'Checkout3',
          component: Checkout3,
          meta:{
            title:'開心水果_訂單step3'
          }
        },
        {
          path: 'text',
          name: 'text',
          component: Text,
        },
      ],
    },

  ],
});



