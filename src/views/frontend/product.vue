<template>
    <div>

        <loading :active.sync="isLoading">
         <div class="loadingio-spinner-spin-5xz8vi7q1c2"><div class="ldio-2zmxuno6hnw">
          <div><div></div></div><div><div></div></div><div><div>
          </div></div><div><div></div></div><div><div></div></div>
          <div><div></div></div><div><div></div></div><div><div></div></div>
          </div></div>
        </loading>

        <div class="container my-4">
            <div class="position-fixed zoom-img" :class="{'d-none' : !openImg}" @click="zoomImg()">
                <img class="img-size-1" :src="product.imageUrl" alt="">
            </div>
            <div class="row justify-content-center bg-product">
                <nav aria-label="breadcrumb" class="col-12">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item"><a href="#">Products</a></li>
                        <li class="breadcrumb-item active" aria-current="page">{{product.title}}</li>
                    </ol>
                </nav>
                <div class="col-md-5">
                    <img class="img-size-1 zoom" @click="zoomImg()" :src="product.imageUrl" alt="">
                </div>
                <div class="col-md-6 mb-5">
                    <div class="product-one-title d-flex justify-content-between mb-3 mt-3 mt-md-0">
                        <h2 class="h1">{{product.title}}</h2>
                        <p class="m-0 text-secondary" @click="addFavourite()">
                            <i class="far fa-heart h1 pointer" :class="{favouriteStyle : product.favourite}"></i></p>
                    </div>

                    <table class="product-table">
                        <tr>
                            <td width="150" class="h7">特價</td>
                            <td class="text-c4 h3">{{product.price | currency}}</td>
                        </tr>
                        <tr>
                            <td width="150" class="h7">數量</td>
                            <td>
                                <div class="d-flex">
                                    <button class="count" @click="quantity('minus')">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                    <input type="number" class="qtyInput__1dbgq " min="1" max="200" name="quantity"
                                        v-model="quantityValue">
                                    <button class="count" @click="quantity('plus')">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td width="150" class="h7">付款方式</td>
                            <td class="text-c5">
                                <i class="fas fa-dollar-sign mr-2" data-toggle="tooltip"
                                    data-placement="top" title="現金">
                                </i>
                                <i class="fab fa-cc-apple-pay h7 mr-2" data-toggle="tooltip"
                                    data-placement="top" title="Apple Pay">

                                </i>
                                <i class="fab fa-cc-visa h7" data-toggle="tooltip"
                                    data-placement="top" title="Visa">

                                </i>
                            </td>
                        </tr>

                        <tr>
                            <td width="150" class="h7">運費</td>
                            <td>
                                <p class="mb-2">宅配/貨運 — 免運費需5個工作天</p>
                                <p class="m-0">面交/自取/不寄送 — 免運費</p>
                            </td>
                        </tr>
                    </table>

                    <div class="text-right">
                        <button class="btn new-btn new-btn-cart" @click="addCart()">加入購物車</button>
                    </div>

                </div>

            </div>
        </div>

        <Carticon :carts="carts"></Carticon>
    </div>
</template>

<script>



import Carticon from '../../components/frontend/carticon.vue'
export default {
    
  data() {
    return {
       isLoading: false,
       carts: 0,
       cartsProductID: [],
       quantityValue: 1,
       favourite: [],
       openImg: false,
       product: []
    }
       
  },
  components: {
      Carticon
  },
  computed: {
      
  },
  methods: {
        getCarts() {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            let vm = this
            vm.isLoading = true
            this.$http.get(api).then((response) => {
                this.carts = response.data.data.carts.length 
                for (let i = 0; i < this.carts; i++){
                    let data ={
                        title: response.data.data.carts[i].product.title,
                        qty: response.data.data.carts[i].qty,
                        id : response.data.data.carts[i].id
                    }
                    this.cartsProductID.push(data)
                 }
                vm.isLoading =false
            })
        },
        getProduct() {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/-MOGye4SvZU3X2IueO-W`;
            const vm = this
            this.$http.get(api).then((response) => {
                vm.product = response.data.product
                vm.product.favourite = false;
                vm.getFavourite()
            })
        },
        getFavourite() {
            this.favourite = JSON.parse(localStorage.getItem('Favourite')) || []
            let vm = this
            this.favourite.forEach(item => {
                if(item === vm.product.id) {
                    vm.product.favourite = true;
                }
            })
        },
        addCart() {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            const vm = this
            let allQuantity = vm.quantityValue
            vm.isLoading = true
            vm.cartsProductID.forEach((item) => {
                if(item.title === vm.product.title){
                    allQuantity = parseInt(vm.quantityValue) + parseInt(item.qty)
                    vm.removeProduct(item.id) 
                }
            })
            
            let carts= {
                product_id: vm.product.id,
                qty: allQuantity
            }
            this.$http.post(api, { data: carts}).then((response) => {
                vm.getCarts()
                vm.quantityValue = 1
            })
        },
        addFavourite() {
            let data =[this.product.id]
            localStorage.setItem('Favourite', JSON.stringify(data))
            this.getFavourite()
        },
        removeProduct(id) {
           const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
           let vm =this
           this.$http.delete(api).then(() => {
               vm.cartsProductID = []
            })
        },
        quantity(name) {
                this.quantityValue = parseInt(this.quantityValue)
                if (name === 'plus') {
                    this.quantityValue += 1
                } else if (this.quantityValue > 1) {
                    this.quantityValue -= 1
                }
        },
        zoomImg() {
                this.openImg = !this.openImg
                document.querySelector('body').classList.toggle('hideScroll')
        },
       
  
  },
  created() {
     this.getCarts()
     this.getProduct()
  },
  mounted() {
     
  }
};

$(function () {
          $('[data-toggle="tooltip"]').tooltip()
    })
</script>

<style lang="scss" scoped>
  
    
</style>
