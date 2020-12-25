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
            <div class="row bg-product justify-content-center">
                <nav aria-label="breadcrumb" class="col-12 mb-3">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item"><a href="#">ShoppingCart</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Checkout</li>
                    </ol>
                </nav>

                <div class="col-md-10 container-75">
                    <div class="timeline timeline-color-50 position-relative mb-5">
                        <div class="timepoint position-relative timepoint-color">
                            <i class="far fa-sticky-note"></i>
                        </div>
                        <div class="timepoint position-relative timepoint-color">
                            <i class="fas fa-edit"></i>
                        </div>
                        <div class="timepoint position-relative">
                            <i class="fas fa-truck"></i>
                        </div>
                    </div>
                    <div class="line-name d-flex justify-content-between">
                        <p class="text-c1">確認購買</p>
                        <p class="text-c1">填寫資料</p>
                        <p class="text-c5">完成訂單</p>
                    </div>

                    <form class="needs-validation order-from" novalidate>
                        <div class="form-row">
                            <div class="col-md-6 mb-4">
                                <label for="validationCustom01">姓名</label>
                                <input type="text" class="form-control" id="validationCustom01" placeholder="請輸入姓名"
                                    required>
                                <div class="invalid-feedback position-absolute">
                                    請輸入姓名
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="validationCustom02">手機號碼</label>
                                <input type="tel" class="form-control" id="validationCustom02" placeholder="請輸入手機號碼"
                                    required>
                                <div class="invalid-feedback position-absolute">
                                    請輸入手機號碼
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col-md-6 mb-4">
                                <label for="validationCustom03">Email</label>
                                <input type="email" class="form-control" id="validationCustom03" placeholder=" 請輸入Email"
                                    required>
                                <div class="invalid-feedback position-absolute">
                                    請輸入Email
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="pay">付款方式</label>
                                
                                    <select id="pay" class="form-control">
                                        <option value="COD">貨到付款</option>
                                        <option value="CVS">超商付款</option>
                                        <option value="ATM">ATM付款</option>
                                    </select required>
                                
                            </div>

                            <div class="col mb-4">
                                <label for="validationCustom04">地址</label>
                                <input type="text" class="form-control" id="validationCustom04" placeholder=" 請輸入地址"
                                    required>
                                <div class="invalid-feedback position-absolute">
                                    請輸入地址
                                </div>
                            </div>
                        </div>

                        <div class="text-right my-2">
                            <button class="btn new-btn new-btn-order" type="submit">下一步</button>
                        </div>
                    </form>

                  

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
       favourite: [],
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
  
  },
  created() {
    
  },
  mounted() {
     
  }
};

</script>

<style lang="scss" scoped>
  
    
</style>
