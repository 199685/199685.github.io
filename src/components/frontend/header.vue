<template>
  <div>
    <div class="header py-2" :class="{ openmenu: changebar }">

      <div class="container px-0">
        <div class="row mx-0">
          <div class="col-10 px-0">
            <h1 class="logo ml-2 ml-md-0">
              <router-link :to="{ name: 'Index' }" class="text-color">
                <img class="" src="../../assets/images/logo-1.png" alt="" width="75" />
                HAPPY FRUIT
                <span class="h8 d-none d-md-inline-block ">since 1996</span>
              </router-link>
            </h1>
          </div>
          <div class="col-2 justify-content-end d-flex px-0">
            <div class="menu pointer d-inline-block mt-3 mr-2 mr-md-0" @click="ChangeBar()">
              <div class="bar1" :class="{ change: changebar }"></div>
              <div class="bar2 my-1" :class="{ change: changebar }"></div>
              <div class="bar3" :class="{ change: changebar }"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="menu-link text-center text-dark" :class="{ menu_link_display: changebar }">
        <h3>
          <router-link
            @click.native="ChangeBar()"
            active-class="active"
            class="text-color"
            :to="{ name: 'Products' }"
          >
            Products
          </router-link>
        </h3>

        <h3>
          <router-link
            @click.native="ChangeBar()"
            active-class="active"
            class="text-color"
            :to="{ name: 'ShoppingCart' }"
          >
            Shopping Cart
          </router-link>
        </h3>
        <h3>
          <router-link
            @click.native="ChangeBar()"
            active-class="active"
            class="text-color"
            :to="{ name: 'Favourite' }"
          >
            Favourite
          </router-link>
        </h3>
        <h3>
          <router-link
            @click.native="ChangeBar()"
            active-class="active"
            class="text-color"
            :to="{ name: 'LoginIndex' }"
          >
            Sign in
          </router-link>
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      changebar: false,
      carts: [],
    };
  },
  methods: {
    ChangeBar() {
      this.changebar = !this.changebar;
    },
  },
  mounted() {
    document.body.style.background = '#6c757d26';
  },
};
</script>

<style lang="scss" scoped></style>
