<template>
  <div>
    <div class="header py-2" :class="{ openmenu: changebar }">
      <div class="container px-0">
        <div class="row mx-0">
          <div class="col-11 col-lg-12 px-0 d-flex">
            <h1 class="logo ml-2 ml-md-0 width-50">
              <router-link :to="{ name: 'Index' }" class="text-color" @click.native="Top()">
                <img class="" src="../../assets/images/logo-1.png" alt="" width="75" />
                HAPPY FRUIT
                <span class="h8 d-none d-md-inline-block">since 1996</span>
              </router-link>
            </h1>

            <nav class="width-50 nav-m d-none d-lg-inline-block ">
              <ul class="d-flex list-none justify-content-end">
                <li>
                  <router-link
                    active-class="nav-active"
                    class="nav-font"
                    :to="{ name: 'Products' }"
                  >
                    商品
                  </router-link>
                </li>
                <li>
                  <router-link
                    active-class="nav-active"
                    class="nav-font"
                    :to="{ name: 'ShoppingCart' }"
                  >
                    購物車
                  </router-link>
                </li>
                <li>
                  <router-link
                    active-class="nav-active"
                    class="nav-font"
                    :to="{ name: 'Favourite' }"
                  >
                    最愛商品
                  </router-link>
                </li>
                <li>
                  <router-link
                    active-class="nav-active"
                    class="nav-font"
                    :to="{ name: 'LoginIndex' }"
                  >
                    登入
                  </router-link>
                </li>
              </ul>
            </nav>
          </div>
          <div class="col-1 justify-content-end d-flex px-0">
            <div
              class="menu pointer d-inline-block mt-3 mr-2 mr-md-0 d-lg-none"
              @click="ChangeBar()"
            >
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
            class="text-black"
            :to="{ name: 'Products' }"
          >
            商品
          </router-link>
        </h3>

        <h3>
          <router-link
            @click.native="ChangeBar()"
            active-class="active"
            class="text-black"
            :to="{ name: 'ShoppingCart' }"
          >
            購物車
          </router-link>
        </h3>
        <h3>
          <router-link
            @click.native="ChangeBar()"
            active-class="active"
            class="text-black"
            :to="{ name: 'Favourite' }"
          >
            最愛商品
          </router-link>
        </h3>
        <h3>
          <router-link
            @click.native="ChangeBar()"
            active-class="active"
            class="text-black"
            :to="{ name: 'LoginIndex' }"
          >
            登入
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
      carts: []
    };
  },
  methods: {
    ChangeBar() {
      this.changebar = !this.changebar;
      this.Top();
    },
    showNav() {
      let Header = document.querySelector(".header");
      if (window.pageYOffset > window.innerHeight / 4) {
        Header.classList.add("header-fixed");
      } else {
        Header.classList.remove("header-fixed");
      }
    },
    Top() {
      window.scrollTo({
        top: 0,
        left: 0
      });
    }
  },
  mounted() {
    document.body.style.background = `url(${require("@/assets/images/背景-1.jpg")})`;
    window.addEventListener("scroll", this.showNav);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.showNav);
  }
};
</script>

<style lang="scss" scoped>
@media (min-width: 992px) {
  .width-50 {
    width: 50%;
  }
}
.list-none {
  list-style: none;
}
.nav-m {
  margin-top: auto;
}
.nav-font {
  color: rgba(0, 0, 0, 1);
  padding: 15px;
  font-size: 20px;
  border-bottom: 2px solid transparent;
  position: relative;
  &:hover {
    text-decoration: none;
    color: #055fc1;
  }
  &:before {
    content: " ";
    width: 0%;
    height: 3px;
    border-bottom: 2px solid transparent;
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 2;
    transition: width 0.5s;
    margin: auto;
  }
  &:hover:before {
    border-bottom: 3px solid;
    width: 80%;
  }
}
.header-fixed {
  position: fixed;
  width: 100%;
  z-index: 198;
  top: 0;
  background: white;
}
.nav-active {
  color: green;
  font-weight: bold;
  border-bottom: 3px solid transparent;
  position: relative;
  &:before {
    content: " ";
    width: 100%;
    height: 3px;
    border-bottom: 3px solid green;
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 2;
  }
}
.text-black {
  color: black;
}
.active {
  color: green;
  font-weight: bold;
  padding-bottom: 0.3em;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    border-bottom: 3px solid green;
    left: 40%;
    right: 40%;
    bottom: 0;
  }
}
</style>
