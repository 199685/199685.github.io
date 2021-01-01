<template>
  <div class="my-4 container">
    <div class="row bg-Favourite py-4 justify-content-center align-items-center">
      <div class="col-lg-10">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb pt-0">
            <li class="breadcrumb-item pl-2">
              <router-link :to="{ path: 'index' }">
                Home
              </router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Products</li>
          </ol>
        </nav>
        <div class="row">
          <div class="col-lg-6 pointer mb-2 mt-4 my-lg-0">
            <form class="form-signin p-lg-3 boder-db" @submit.prevent="signin">
              <p class="text-center user-icon"><i class="fas fa-users"></i></p>
              <h1 class="h3 mb-3 font-weight-normal text-center text-c1">登入</h1>
              <label for="inputEmail" class="sr-only">Email address</label>
              <input
                type="email"
                id="inputEmail"
                class="form-control"
                placeholder="Email address"
                required
                autofocus
                v-model="user.username"
              />
              <label for="inputPassword" class="sr-only">Password</label>
              <input
                type="password"
                id="inputPassword"
                class="form-control"
                placeholder="Password"
                required
                v-model="user.password"
              />
              <div class="checkbox mb-3 text-c1">
                <label> <input type="checkbox" value="remember-me" /> 記住帳密 </label>
              </div>
              <button class="btn btn-lg btn-c1 btn-block" type="submit">登入</button>
            </form>
          </div>
          <div class="col-lg-6 mb-2 mb-lg-0">
            <form class="form-signin p-3 boder-db">
              <h1 class="h3 mb-3 font-weight-normal text-center text-c1">快速登入</h1>
              <div class="social-login text-center">
                <p class="p-2 mb-1 bg-c2 h3 pointer">
                  <i class="fab fa-facebook-square d-block"></i>Facebook
                </p>
                <p class="p-2 mb-1 h3 bg-c2 pointer"><i class="fab fa-google d-block"></i>Google</p>
                <p class="p-2 h3 bg-c2 pointer"><i class="fab fa-yahoo d-block"></i>Yahoo</p>
              </div>
            </form>
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
      user: {
        username: '',
        password: '',
      },
      cartsNumber: 0,
    };
  },
  methods: {
    signin() {
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`; // 加admin是為了存cookies
      const vm = this;
      this.$http.post(api, vm.user).then((response) => {
        if (response.data.success) {
          const { token } = response.data;
          const { expired } = response.data;

          document.cookie = `hexCookie=${token}; expires=${new Date(expired)};`;
          vm.$router.push('/admin/adminproducts');
        } else {
          vm.alertDisplay('帳號或密碼輸入錯誤', 'warning');
        }
      });
    },
    getCarts() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;

      this.$http.get(api).then((response) => {
        this.cartsNumber = response.data.data.carts.length;
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
  components: {
    Carticon,
  },
  created() {
    this.getCarts();
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 375px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.user-icon {
  font-size: 75px;
}
.boder-db {
  border: 3px double green;
}
.form-control:focus {
  box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.25);
  border-color: green;
}
.form-control {
  border-color: green;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
