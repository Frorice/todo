var f=function(){module("animation"),test("正常的测试弹性动画",function(){stop();var t,e=document.getElementById("id-bounce0"),n={from:{offset:100,velocity:100},acceleration:100,onupdate:function(t){e.style.left=t.offset+"px",ok(!0,"成功调用"+t.offset)},onstop:function(){t=nej.ut._$$AnimBounce._$recycle(t),start()}};t=nej.ut._$$AnimBounce._$allocate(n),t._$play()}),test("正常的减速动画",function(){stop();var t,e=document.getElementById("id-bounce1"),n={from:{offset:100,velocity:10},onupdate:function(t){ok(!0,"成功调用"+t.offset),e.style.left=t.offset+"px"},onstop:function(){t=nej.ut._$$AnimDecelerate._$recycle(t),start()}};t=nej.ut._$$AnimDecelerate._$allocate(n),t._$play()}),test("正常的先快后慢动画",function(){stop();var t,e=document.getElementById("id-bounce2"),n={from:{offset:100,velocity:10},to:{offset:200},duration:1e3,onupdate:function(t){ok(!0,"成功调用"+t.offset),e.style.left=t.offset+"px"},onstop:function(){t=nej.ut._$$AnimEaseOut._$recycle(t),start()}};t=nej.ut._$$AnimEaseOut._$allocate(n),t._$play()}),test("正常的线性动画",function(){stop();var t,e=document.getElementById("id-bounce3"),n={from:{offset:100,velocity:10},to:{offset:200},duration:1e3,onupdate:function(t){ok(!0,"成功调用"+t.offset),e.style.left=t.offset+"px"},onstop:function(){t=nej.ut._$$AnimLinear._$recycle(t),start()}};t=nej.ut._$$AnimLinear._$allocate(n),t._$play()}),test("正常的先慢后快动画",function(){stop();var t,e=document.getElementById("id-bounce4"),n={from:{offset:100,velocity:10},to:{offset:200},duration:1e3,onupdate:function(t){ok(!0,"成功调用"+t.offset),e.style.left=t.offset+"px"},onstop:function(){t=nej.ut._$$AnimEaseIn._$recycle(t),start()}};t=nej.ut._$$AnimEaseIn._$allocate(n),t._$play()}),test("先慢后快再慢动画实现文件",function(){stop();var t,e=document.getElementById("id-bounce5"),n={from:{offset:100,velocity:10},to:{offset:200},duration:1e3,onupdate:function(t){ok(!0,"成功调用"+t.offset),e.style.left=t.offset+"px"},onstop:function(){t=nej.ut._$$AnimEaseInOut._$recycle(t),start()}};t=nej.ut._$$AnimEaseInOut._$allocate(n),t._$play()})};module("依赖模块"),test("define",function(){expect(0),define("{pro}animationTest.js",["{lib}util/animation/bounce.js","{lib}util/animation/linear.js","{lib}util/animation/decelerate.js","{lib}util/animation/easeout.js","{lib}util/animation/easein.js","{lib}util/animation/easeinout.js","{pro}log.js"],f)});