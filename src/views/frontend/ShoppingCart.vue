<template>
    <div>

        <loading :active.sync="isLoading">
         <div class="loadingio-spinner-spin-5xz8vi7q1c2"><div class="ldio-2zmxuno6hnw">
          <div><div></div></div><div><div></div></div><div><div>
          </div></div><div><div></div></div><div><div></div></div>
          <div><div></div></div><div><div></div></div><div><div></div></div>
          </div></div>
        </loading>

        <div class="container-100 container my-4">
            <div class="row bg-product justify-content-center container-75">
                <nav aria-label="breadcrumb" class="col-12">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Shopping Cart</li>
                    </ol>
                </nav>
                <div class="col-md-10 mb-5 container-75">
                    <div class="accordion" id="accordionExample"></div>
                    <div class="card pb-1">
                        <div class="card-header d-sm-flex justify-content-between py-1" id="headingOne">
                            <h2 class="mb-0">
                                <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse"
                                    data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    顯示購物車細節<i class="fas fa-angle-down ml-1 text-c1"></i>
                                </button>
                            </h2>
                            <h2 class="mb-0 pl-3 pl-sm-0 d-flex align-items-center">
                            <p class="d-inline-block h7 mb-0 pr-3">應付金額</p>{{total[0] || 0 | currency}}</h2>
                        </div>

                        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne"
                            data-parent="#accordionExample">

                            <div class="shopping-table">
                                <table class="table">
                                    <tr>
                                        <th scope="col" class="text-center" colspan="3">商品名稱</th>
                                        <th scope="col" class="text-center" width="100">數量</th>
                                        <th scope="col" width="200">單價</th>
                                        <th scope="col" width="200">小計</th>
                                    </tr>
                                    <tr v-for="product in carts.carts">
                                        <td width="100" class="text-center">
                                            <i class="far fa-trash-alt pointer p-3" @click="removeProduct(product.id);removeChangeProducts(product.id)"></i>
                                        </td>
                                        <td class="table-img"><img class="img-fluid" :src="product.product.imageUrl"
                                                alt=""></td>
                                        <td>{{product.product.title}}</td>
                                        <td>
                                           <div class="d-flex">
                                                <button class="count" @click="quantity('minus', product);addChangeProducts(product)">
                                                    <i class="fas fa-minus"></i>
                                                </button>
                                                <input type="number" class="qtyInput__1dbgq " min="1" max="200" name="quantity"
                                                    v-model="product.qty" @change="inputQuanproduct(product);addChangeProducts(product)">
                                                <button class="count" @click="quantity('plus', product);addChangeProducts(product)">
                                                    <i class="fas fa-plus"></i>
                                                </button>
                                            </div>
                                        </td>
                                        <td class="text-right">{{product.product.price | currency}}</td>
                                        <td class="text-right">{{product.product.price * product.qty | currency}}</td>
                                    </tr>
                                    <tr>
                                        <th colspan="5" class="text-right">運費</th>
                                        <th class="text-right">$0</th>
                                    </tr>
                                    <tr>
                                        <td colspan="5" class="text-right">合計</td>
                                        <th class="text-right">{{total[0] || 0 | currency}}</th>
                                    </tr>
                                </table>
                            </div>



                        </div>
                    </div>

                    <div class="text-right mt-2">
                        <button class="btn new-btn new-btn-checkout">結帳去</button>
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
       carts:[],
       total: [],
       changeProductsID: [],
       updateData:false
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
                 this.cartsNumber = response.data.data.carts.length;
                 vm.carts = response.data.data
                 vm.total = [response.data.data.total]
                 vm.isLoading = false
                 if(vm.updateData){
                     vm.updateProducts()
                 }
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
        quantity(name, product) {
            product.qty = parseInt(product.qty)
            if (name === 'plus') {
                product.qty += 1
                this.total[0]+=parseInt(product.product.price)
                
            } else if (product.qty > 1) {
                product.qty -= 1
                this.total[0]-=parseInt(product.product.price)
            }
            product.total = parseInt(product.product.price) * product.qty
            
        },
        inputQuanproduct(product) {
            if(product.qty <= 0 || !product.qty){
              product.qty = 1
            }
            let vm = this
            let NewTotal = (this.total[0]-parseInt(product.total)) + (parseInt(product.product.price) * product.qty)
            vm.$set(vm.total, 0, NewTotal)
            product.total = parseInt(product.product.price) * product.qty
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
               vm.updateData =true
               vm.getCarts()
            })
        },
        addChangeProducts(product) {
            let changeID = this.changeProductsID.map(item=>item.product_id)
            let productIndex = changeID.indexOf(product.product_id)
            let vm = this
            if(productIndex<0){
                let data = {
                    id: product.id,
                    qty: product.qty,
                    product_id: product.product_id
                }
                this.changeProductsID.push(data)
            }else{
                this.changeProductsID[productIndex].qty = product.qty
   
            }
        },
        removeChangeProducts(id){
            let changeID = this.changeProductsID.map(item=>item.product_id)
            let removeIndex = changeID.indexOf(id)
            
        },
        updateProducts() {
            this.updateData =true
        }
  },
  created() {
    this.getCarts();
  },
  mounted() {
     
  },
  
};

</script>

<style lang="scss" scoped>
  
    
</style>
