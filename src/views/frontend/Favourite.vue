<template>
    <div>

        <loading :active.sync="isLoading">
         <div class="loadingio-spinner-spin-5xz8vi7q1c2"><div class="ldio-2zmxuno6hnw">
          <div><div></div></div><div><div></div></div><div><div>
          </div></div><div><div></div></div><div><div></div></div>
          <div><div></div></div><div><div></div></div><div><div></div></div>
          </div></div>
        </loading>

        <div class="container-100  container my-4">
            <div class="row bg-Favourite container-75">
                
                <nav aria-label="breadcrumb" class="col-12">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Favourite</li>
                    </ol>
                </nav>
                <div class="col text-center pb-5">
                    <p class="h4 mb-5 text-c1">目前我的最愛沒有任何商品</p>
                    <div class="text-center">
                        <a href="#"><button class="btn new-btn new-btn-favourite">採購去~~</button></a>
                    </div> 
                </div>
                <div class="col-md-4 mb-4 mb-0">
                    <div class="position-relative product">
                        <img class="img-size pointer" src="" alt="">
                         <div class="position-absolute 
                        product-icon d-flex flex-column justify-content-center align-items-center">
                            <p class="pointer" :class="{heartStyle : product.favourite}"
                            @click="addFavourite(product.id)">
                            加入最愛 <i class="far fa-heart"></i></p>
                            <p class="pointer" @click="addCart(product.id)">加入購物車 <i class="fas fa-shopping-cart"></i></p>
                        </div>
                        <div class="product-item p-2">
                            <p class="py-2 h7 product-name">文旦柚</p>
                            <div class="cost d-flex justify-content-between align-items-center mb-2">
                                <p class="text-line-through h9 m-0">原價$100</p>
                                <div>
                                    <span class="text-success h9 badges-boder-success">可超商取</span>
                                    <span class="text-danger h9 badges-boder-danger">不甜退差價</span>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="h5 text-c4">特價$355</p>
                                <a href="#" class="h9 m-0">查看更多
                                    <i class="far fa-hand-point-up"></i>
                                </a>
                            </div>
                        </div>
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
        cartsNumber: 0,
        products: [],
        isLoading: false,
        cartProductID: [], //商品ID固定
        cartID: [], //下單商品ID不是唯一,內有qty
        quantityValue: 1,
        favourite:[],
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
    getProducts() {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
            const vm = this;
            this.isLoading = true;
            this.$http.get(api).then((response) => {
                this.products = response.data.products;  
                this.hotProducts()
                this.getFavourite()
            })
         
    },
    getFavourite() {
            this.favourite = JSON.parse(localStorage.getItem('Favourite')) || []
            let vm = this
            this.products.forEach(item => {
               vm.$set(item, 'favourite', false)
               let favourite = vm.favourite.includes(item.id)
               if(favourite){
                vm.$set(item, 'favourite', true)
                
               }
            })
    },
    addCart(id) {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            let newQty = parseInt(this.quantityValue) 
            let vm = this
            let sameID = this.cartProductID.indexOf(id)
            vm.isLoading = true;
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
    removeProduct(id) {
            
           const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;  
           let vm = this
           this.$http.delete(api).then((response) => {
               console.log(id)
               console.log("removeProduct", response.data.message)
               vm.getCarts()
            })
    },
  
  },
  created() {
    this.getCarts();
    this.getProducts();
  },
  mounted() {
     
  }
};

</script>

<style lang="scss" scoped>
  
    
</style>
