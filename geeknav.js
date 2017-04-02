$(document).ready(function(){
  //根据json内容渲染菜单
  var html = template('menu-tpl', geeknavData);
  $('.menu-wrapper').html(html);

  //根据json 内容x渲染cart
  var html2 = template('cart-tpl', geeknavData);
  $('.content').html(html2);

  // menu hover 效果
  $('.menu-wrapper a').hover(function(){
    $(this).css("color","#FFF");
  },function(){
    $(this).css("color","#ccc");
  })

  // cart hover 效果
  $('.cart').hover(function(){
    $(this).css("background-color","#3E3D49");
  },function(){
    $(this).css("background-color","#21252B");
  })

  //访问计数，基于leanCloud
  function addCount (Counter) {
    var query=new AV.Query(Counter);
    query.equalTo("name",'geeknav');
    query.find({
      success: function(results){
        if(results.length>0){
          //递增
          var counter=results[0];
          counter.fetchWhenSave(true); //get recent result
          counter.increment("time");
          counter.save();
        }
        else {
          //新增
          var newcounter=new Counter();
          newcounter.set("name",'geeknav');
          newcounter.set("time",1);
          newcounter.save(null,{
            success: function(newcounter){
                console.log('success to add counter')
            },
            error: function(newcounter,error){
              console.log('fail to add counter')
            }
          });
        }
      },
      error: function(error){
        console.log('fail to query leancloud')
      }
    });
  }

  //查询访问量
  $(function(){
      var Counter=AV.Object.extend("Counter");
      addCount(Counter);
      var query=new AV.Query(Counter);
      query.equalTo("name",'geeknav');
      query.find({
        success: function(results){
          var counter=results[0];
          time=counter.get("time");
          $('#access-count').text(time);
        }
      })
    });
})
