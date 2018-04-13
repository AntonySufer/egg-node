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
           //充值
          $('#cz-footer').on('click',function () {
              var good_code = $(this).attr('data-code');
              if (!good_code ){
                  layer.open({content: '产品code缺失',skin: 'msg',time: 2 });
                  return false;
              }




          });


       },
       order:function (code) {
           var _this = this ;
           var layer_index = layer.open({type: 2,shade: 'background-color: rgba(0,0,0,.3)'});
           var data ={
               "good_code": _this.Data.onlyID //产品代码
           };
           $.ajax({
               type: "post",
               url: "/order/prePay",
               dataType: "json",
               data: data,
               success: function (resuVo) {
                   layer.close(layer_index);
                   if (resuVo.状态 == '成功'){


                   }else{
                       layer.open({content: resuVo.errMsg,skin: 'msg',time: 2 });
                   }

               }
           });
       }

   }

    cz_detail.init();

})