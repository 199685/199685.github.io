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
                        <button class="btn new-btn new-btn-cart" @click="addCart(product.id)">加入購物車</button>
                    </div>

                </div>

            </div>
        </div>

        <Carticon :carts="cartsNumber"></Carticon>
    </div>
</template>

<script>



import Carticon from '../../components/frontend/carticon.vue'
export default {
    
  data() {
    return {
       isLoading: false,
       cartsNumber: 0,
       cartProductID: [],
       cartID: [], 
       quantityValue: 1,
       favourite: [],
       openImg: false,
       product: [],
       productID: ''
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
            this.$http.get(api).then((response) => {
                 this.cartsNumber = response.data.data.carts.length;
                 vm.cartProductID.splice(0)
                 vm.cartID.splice(0) 
                 response.data.data.carts.forEach(product => {
                     console.log(product.id)
                     let data ={
                         id : product.id,
                         qty: product.qty
                     }
                     vm.cartID.push(data)
                     vm.cartProductID.push(product.product_id)
                })
                vm.isLoading = false
            })
        },
        getProduct() {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${this.productID}`;
            const vm = this
            vm.isLoading = true
            this.$http.get(api).then((response) => {
                vm.product = response.data.product
                vm.getFavourite()
                
            })
        },
        getFavourite() {
            this.favourite = JSON.parse(localStorage.getItem('Favourite'))
            let vm = this
            vm.$set(vm.product, 'favourite', false)
            this.favourite.forEach(item => {
                if(item === vm.product.id) {
                    vm.$set(vm.product, 'favourite', true)
                }
            })
        },
        addCart(id) {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            let newQty = parseInt(this.quantityValue) 
            let vm = this
            vm.isLoading = true
            let sameID = this.cartProductID.indexOf(id)
            if(sameID >= 0){
                newQty += parseInt(vm.cartID[sameID].qty)
            }
            let addproduct ={
                product_id: id,
                qty: newQty
            }
            this.$http.post(api, { data: addproduct}).then((response) => {
                console.log("addCart",response.data.data)
              if(sameID >= 0){
                vm.removeProduct(vm.cartID[sameID].id)
                console.log("addCart")
              }else{
                vm.getCarts()
              }
                vm.quantityValue = 1
            })
        },
        addFavourite() { 
            let add = this.favourite.indexOf(this.product.id)
            if(add > -1){
               this.favourite.splice(add)
            }else{
                this.favourite.push(this.product.id)   
            }
            localStorage.setItem('Favourite', JSON.stringify(this.favourite))
            this.getFavourite()
        },
        removeProduct(id) {
            
           const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;  
           let vm = this
           this.$http.delete(api).then((response) => {
               console.log(id)
               console.log("removeProduct", response.data.message)
               vm.getCarts()
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
     this.productID = this.$route.params.productId
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
