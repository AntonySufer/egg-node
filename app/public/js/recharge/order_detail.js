/**
 * 创建人 : @yidian
 * 创建内容 : 充值详情
 * 创建时间 :2018/4/13
 * 创建版本 :1.0.0
 *
 **/

$(function() {
   var cz_detail ={
       init:function () {
           //初始化
           this.bindEvent();
       },
       bindEvent:function () {
           var _this = this ;
           //充值
          $('.cz-footer').on('click',function () {
              var pay_type = $(this).attr('data-pay_type');
              var money = $(this).attr('data-money');
              var golds = $(this).attr('data-golds');
              var order_id = $(this).attr('data-order_id');
              if (!order_id ){
                  layer.open({content: 'id缺失',skin: 'msg',time: 2 });
                  return false;
              }
              var data={
                  order_id :order_id,
                  pay_type :pay_type
              };
              if (pay_type=='gold' && Number(money) > Number(golds)){
                  layer.open({content: '余额不足',skin: 'msg',time: 2 });
                  return false;
              }
              _this.orderPay(data);



          });

          //选择付款
           $('.payli').on('click',function () {
               $('.sel-pay').removeClass('yes_select');
               $('.sel-pay').addClass('no_select');
               $(this).find('span.sel-pay').addClass('yes_select');
               $('.cz-footer').attr('data-pay_type',$(this).data('pay_type'));

           });

       },
       /**
        * 付款
        * @param code
        * @param tel
        */
       orderPay:function (data) {
           var _this = this ;
           var layer_index = layer.open({type: 2,shade: false,time: 10});
           var data =data;
           $.ajax({
               type: "post",
               url: "/order/orderPay",
               dataType: "json",
               data: data,
               success: function (resuVo) {
                   layer.close(layer_index);
                   if (resuVo.state == '200'){
                       layer.open({content: '付款成功，请等待充值',skin: 'msg',time: 2,end:function () {

                           window.location.href ='/';
                       } });

                   }else{
                       layer.open({content: resuVo.errMsg,skin: 'msg',time: 2,end:function () {

                           if (resuVo.state=='401'){

                               window.location.href ='/';
                           }
                       } });


                   }

               }
           });
       }

   }

    cz_detail.init();

})