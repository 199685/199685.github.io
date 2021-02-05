<template>
  <div class="container my-4">
    <div class="row py-4 justify-content-center align-items-center">
      <div class="col-lg-10">
        <form class="form-signin p-lg-3 boder-db" @submit.prevent="signin">
          <p class="text-center user-icon"><i class="fas fa-users"></i></p>
          <h1 class="h3 mb-3 font-weight-normal text-center">登入</h1>
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
          <button class="btn btn-lg btn-outline-success btn-block" type="submit">登入</button>
        </form>
      </div>
    </div>
    <Carticon :carts="cartsNumber"></Carticon>
  </div>
</template>

<script>
import Carticon from '@/components/frontend/Carticon.vue';

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
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`; // 加admin是為了存cookies
      vm.$http.post(api, vm.user).then((response) => {
        if (response.data.success) {
          const { token } = response.data;
          const { expired } = response.data;

          document.cookie = `hexCookie=${token}; expires=${new Date(expired)};`;
          vm.$router.push('/admin');
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

<style lang="scss" scoped>
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

.form-control:focus {
  box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.25);
  border-color: green;
}
.form-control {
  border-color: green;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
