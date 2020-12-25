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
                    <div class="timeline position-relative mb-5">
                        <div class="timepoint position-relative timepoint-color">
                            <i class="far fa-sticky-note"></i>
                        </div>
                        <div class="timepoint position-relative ">
                            <i class="fas fa-edit"></i>
                        </div>
                        <div class="timepoint position-relative ">
                            <i class="fas fa-truck"></i>
                        </div>
                    </div>
                    <div class="line-name d-flex justify-content-between">
                        <p class="text-c1">確認購買</p>
                        <p class="text-c5">填寫資料</p>
                        <p class="text-c5">完成訂單</p>
                    </div>

                    <label for="exampleFormControlInput-1"><span class="text-c1 h5">優惠券</span></label>
                    <div class="input-group mb-3">
                        
                        <input id="exampleFormControlInput-1" type="text" class="form-control" placeholder="優惠券代碼"
                            aria-label="Recipient's username" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <button class="btn btn-outline-c1" type="button" id="button-addon2">確認輸入</button>
                        </div>
                    </div>
                    
                    <Marquee class="text-danger mb-2" ><i class="fas fa-bullhorn pr-1"></i>
                        貼心提醒!!!如果您有使用優惠券，務必要按下"確認輸入"的button才算套用成功
                        <i class="fas fa-bullhorn bullhorn pl-1"></i>
                    </Marquee>

                    <div class="accordion" id="accordionExample"></div>
                    <div class="card pb-1">
                        <div class="card-header d-sm-flex justify-content-between py-1" id="headingOne">
                            <h2 class="mb-0">
                                <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse"
                                    data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    顯示購物車細節<i class="fas fa-angle-down ml-1 text-c1"></i>
                                </button>
                            </h2>
                            <h2 class="mb-0 pl-3 pl-sm-0 d-flex align-items-center"><p class="d-inline-block h7 mb-0 pr-3">應付金額</p>$520</h2>
                        </div>

                        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne"
                            data-parent="#accordionExample">

                            <div class="shopping-table">
                                <table class="table">
                                    <tr>
                                        <th scope="col" class="text-center" colspan="2">商品名稱</th>
                                        <th scope="col" class="text-center" width="150">數量</th>
                                        <th scope="col" width="200">小計</th>
                                    </tr>
                                    <tr>

                                        <td class="table-img"><img class="img-fluid" src="./styles/images/鳳梨.jpg"
                                                alt=""></td>
                                        <td>鳳梨</td>
                                        <td class="text-center">
                                            88顆
                                        </td>
                                        <td class="text-right">$16516</td>
                                    </tr>
                                    <tr>

                                        <td class="table-img"><img class="img-fluid" src="./styles/images/鳳梨.jpg"
                                                alt=""></td>
                                        <td>鳳梨</td>
                                        <td class="text-center">88件</td>
                                        <td class="text-right">$16516</td>
                                    </tr>
                                    <tr>
                                        <th colspan="3" class="text-right">運費</th>
                                        <th class="text-right">$0</th>
                                    </tr>
                                    <tr>
                                        <th colspan="3" class="text-right">優惠折抵</th>
                                        <th class="text-right">$0</th>
                                    </tr>
                                    <tr>
                                        <td colspan="3" class="text-right">合計</td>
                                        <th class="text-right">$120456</th>
                                    </tr>
                                </table>
                            </div>



                        </div>
                    </div>

                   

                    <div class="text-right my-2">
                        <button class="btn new-btn new-btn-order">下一步</button>
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
