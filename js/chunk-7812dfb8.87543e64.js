(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7812dfb8"],{"01ee":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("loading",{attrs:{active:t.isLoading},on:{"update:active":function(a){t.isLoading=a}}},[e("div",{staticClass:"loadingio-spinner-spin-5xz8vi7q1c2"},[e("div",{staticClass:"ldio-2zmxuno6hnw"},[e("div",[e("div")]),e("div",[e("div")]),e("div",[e("div")]),e("div",[e("div")]),e("div",[e("div")]),e("div",[e("div")]),e("div",[e("div")]),e("div",[e("div")])])])]),e("div",{staticClass:"table-responsive-md mt-7"},[e("table",{staticClass:"table mt-4"},[t._m(0),e("tbody",t._l(t.orders,(function(a){return e("tr",{key:a.id},[e("td",[t._v(t._s(t._f("date")(a.paid_date||a.create_at)))]),e("td",[t._v(t._s(a.user.email))]),e("td",[t._v(t._s(a.user.name))]),e("td",[t._v("\n          "+t._s(a.user.tel)+"\n        ")]),e("td",[e("ul",{staticClass:"list-unstyled"},t._l(a.products,(function(a){return e("li",{key:a.id,staticClass:"text-left"},[t._v("\n              "+t._s(a.product.title)+" "),e("span",{staticClass:"pl-1"},[t._v("數量：")]),t._v("\n              "+t._s(a.qty)+t._s(a.product.unit)+"\n            ")])})),0)]),e("td",{staticClass:"text-right"},[t._v("\n          "+t._s(t._f("currency")(a.total))+"\n        ")]),e("td",[a.is_paid?e("span",{staticClass:"text-success"},[t._v("已付款")]):e("span",{staticClass:"text-danger"},[t._v("未付款")])]),e("td",[e("div",{staticClass:"btn-group d-block d-md-flex",attrs:{role:"group","aria-label":"Third group"}},[e("button",{staticClass:"btn btn-outline-primary btn-sm",on:{click:function(e){return t.openModal("edit",a)}}},[t._v("編輯")])])])])})),0)])]),e("Page",{attrs:{pagination:t.pagination},on:{"products-getProducts":t.getorders}}),e("div",{staticClass:"modal fade",attrs:{id:"orderModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[e("div",{staticClass:"modal-dialog modal-lg",attrs:{role:"document"}},[e("div",{staticClass:"modal-content border-0"},[t._m(1),e("div",{staticClass:"modal-body"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("div",{staticClass:"form-row"},[e("div",{staticClass:"form-group col-md-6"},[e("label",{attrs:{for:"paid_date"}},[t._v("購買日期")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.paid_date,expression:"paid_date"}],staticClass:"form-control",attrs:{type:"text",id:"paid_date",placeholder:"請輸入購買日期"},domProps:{value:t.paid_date},on:{input:function(a){a.target.composing||(t.paid_date=a.target.value)}}})]),e("div",{staticClass:"form-group col-md-6"},[e("label",{attrs:{for:"is_paid"}},[t._v("是否付款")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.is_paid,expression:"tempOrder.is_paid"}],staticClass:"form-control",attrs:{type:"text",id:"is_paid",placeholder:"請輸入是否付款"},domProps:{value:t.tempOrder.is_paid},on:{input:function(a){a.target.composing||t.$set(t.tempOrder,"is_paid",a.target.value)}}})])]),e("div",{staticClass:"form-row"},[e("div",{staticClass:"form-group col-md-6"},[e("label",{attrs:{for:"name"}},[t._v("客戶名稱")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.user.name,expression:"tempOrder.user.name"}],staticClass:"form-control",attrs:{type:"text",id:"name",placeholder:"請輸入客戶名稱"},domProps:{value:t.tempOrder.user.name},on:{input:function(a){a.target.composing||t.$set(t.tempOrder.user,"name",a.target.value)}}})]),e("div",{staticClass:"form-group col-md-6"},[e("label",{attrs:{for:"tel"}},[t._v("聯絡電話")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.user.tel,expression:"tempOrder.user.tel"}],staticClass:"form-control",attrs:{type:"tel",id:"tel",placeholder:"請輸入聯絡電話"},domProps:{value:t.tempOrder.user.tel},on:{input:function(a){a.target.composing||t.$set(t.tempOrder.user,"tel",a.target.value)}}})])]),e("div",{staticClass:"form-row"},[e("div",{staticClass:"form-group col-md-8"},[e("label",{attrs:{for:"email"}},[t._v("Email")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.user.email,expression:"tempOrder.user.email"}],staticClass:"form-control",attrs:{type:"text",id:"email",placeholder:"請輸入Email"},domProps:{value:t.tempOrder.user.email},on:{input:function(a){a.target.composing||t.$set(t.tempOrder.user,"email",a.target.value)}}})]),e("div",{staticClass:"form-group col-md-4"},[e("label",{attrs:{for:"total"}},[t._v("應付金額")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.total,expression:"tempOrder.total"}],staticClass:"form-control",attrs:{type:"number",id:"total",placeholder:"請輸入應付金額"},domProps:{value:t.tempOrder.total},on:{input:function(a){a.target.composing||t.$set(t.tempOrder,"total",a.target.value)}}})])])])])]),e("div",{staticClass:"modal-footer"},[e("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v("取消")]),e("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.upOrders}},[t._v("確認")])])])])]),e("div",{staticClass:"modal fade",attrs:{id:"delorderModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[e("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[e("div",{staticClass:"modal-content border-0"},[t._m(2),t._m(3),e("div",{staticClass:"modal-footer"},[e("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v("取消")]),e("button",{staticClass:"btn btn-danger",attrs:{type:"button"},on:{click:function(a){return t.upOrders()}}},[t._v("確認刪除")])])])])])],1)},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",[e("tr",[e("th",{attrs:{width:"120"}},[t._v("購買時間")]),e("th",{attrs:{width:"300"}},[t._v("Email")]),e("th",[t._v("客戶名稱")]),e("th",[t._v("聯絡電話")]),e("th",{staticClass:"min-width-350"},[t._v("購買款項")]),e("th",{attrs:{width:"100"}},[t._v("應付金額")]),e("th",[t._v("是否付款")]),e("th",{attrs:{width:"100"}},[t._v("編輯")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"modal-header bg-dark text-white"},[e("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[e("span",[t._v("訂單列表")])]),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"modal-header bg-danger text-white"},[e("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[e("span",[t._v("刪除產品")])]),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"modal-body"},[t._v("\n          是否刪除 "),e("strong",{staticClass:"text-danger"}),t._v(" 商品(刪除後將無法恢復)。\n        ")])}],r=e("1799"),o={data:function(){return{orders:[],pagination:{},tempOrder:{create_at:"",id:"",is_paid:"",message:"",paid_date:"",payment_method:"",products:{},total:"",user:{address:"",email:"",name:"",tel:""},num:""},paid_date:"",isNew:!1,isLoading:!1}},components:{Page:r["a"]},methods:{getorders:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,a="".concat("https://vue-course-api.hexschool.io","/api/").concat("chi","/admin/orders?page=").concat(t),e=this;e.isLoading=!0,this.$http.get(a).then((function(t){e.isLoading=!1,e.orders=t.data.orders,e.pagination=t.data.pagination}))},openModal:function(t,a){if("edit"===t){this.tempOrder=Object.assign({},a),this.isNew="edit";var e=new Date(1e3*this.tempOrder.paid_date),s=e.getFullYear(),i=e.getMonth()+1,r=e.getDate();i<10&&(i=0+String(i)),r<10&&(r=0+String(r)),this.paid_date="".concat(s,"-").concat(i,"-").concat(r)}"delete"!==this.isNew&&$("#orderModal").modal("show")},upOrders:function(){var t="".concat("https://vue-course-api.hexschool.io","/api/").concat("chi","/admin/order"),a=this,e="put";"edit"===a.isNew&&(t="".concat(t,"/").concat(a.tempOrder.id)),this.$http[e](t,{data:a.tempOrder}).then((function(t){t.data.success&&("delete"!==a.isNew&&$("#orderModal").modal("hide"),a.getorders(a.pagination.current_page))}))}},created:function(){this.getorders()},watch:{paid_date:function(){var t=this;t.tempOrder.paid_date=Math.floor(new Date(t.paid_date).getTime()/1e3)}}},d=o,n=(e("8199"),e("2877")),l=Object(n["a"])(d,s,i,!1,null,"928b82e4",null);a["default"]=l.exports},1564:function(t,a,e){},1799:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("nav",{staticClass:"mt-3",attrs:{"aria-label":"Page navigation example"}},[e("ul",{staticClass:"pagination justify-content-center"},[e("li",{staticClass:"page-item",class:{disabled:!t.pagination.has_pre}},[e("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Previous"},on:{click:function(a){return t.getProducts(t.pagination.current_page-1)}}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("«")])])]),t._l(t.pagination.total_pages,(function(a){return e("li",{key:a,staticClass:"page-item",class:{active:t.pagination.current_page===a}},[e("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(e){return t.getProducts(a)}}},[t._v(t._s(a))])])})),e("li",{staticClass:"page-item",class:{disabled:!t.pagination.has_next}},[e("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Next"},on:{click:function(a){return t.getProducts(t.pagination.current_page+1)}}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("»")])])])],2)])])},i=[],r={name:"Pagination",props:["pagination"],data:function(){return{}},methods:{getProducts:function(t){this.$emit("products-getProducts",t)}}},o=r,d=e("2877"),n=Object(d["a"])(o,s,i,!1,null,null,null);a["a"]=n.exports},8199:function(t,a,e){"use strict";e("1564")}}]);
//# sourceMappingURL=chunk-7812dfb8.87543e64.js.map