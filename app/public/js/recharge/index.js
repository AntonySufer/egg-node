/**
 * 创建人 : @yidian
 * 创建内容 : 充值列表
 * 创建时间 :2018/4/13
 * 创建版本 :1.0.0
 *
 **/

$(function() {
   var cz_index ={
       init:function () {
           //初始化
           this.bindEvent();
       },
       bindEvent:function () {
           var _this = this ;
           //充值
          $('#cz_btn').on('click',function () {
              var good_code = $(this).attr('data-code');
              var tel_phone = $('.input-text').val();
              if (!good_code || !tel_phone){
                  layer.open({content: '请选择正确的话费面额或电话号码',skin: 'msg',time: 2 });
                  return false;
              }
              if(!(/^1[34578]\d{9}$/.test(tel_phone))){
                  layer.open({content: '号码有误',skin: 'msg',time: 2 });
                  return false;
              }
               _this.orderded(good_code,tel_phone);


          });

           $('.re-list').on('click','.re-li',function () {
               $('.re-list>div').removeClass('bg-re-li');
               $(this).addClass('bg-re-li');
               var code = $(this).attr('data-id');
               $('#cz_btn').attr('data-code',code);
           })
       },
       orderded:function (code,tel) {
           var _this = this ;
           var layer_index = layer.open({type: 2,shade: false});
           var data ={
               "good_code": code,//产品代码
               "tel_phone":tel //产品代码
           };
           $.ajax({
               type: "post",
               url: "/order/prePay",
               dataType: "json",
               data: data,
               success: function (resuVo) {
                   layer.close(layer_index);
                   if (resuVo.state == '200'){
                       window.location.href ='order/detail?order_id='+resuVo.order_id;
                   }else{
                       layer.open({content: resuVo.errMsg,skin: 'msg',time: 0.1 });
                   }

               }
           });
       }

   }

   cz_index.init();

})