var f=function(){module("tab");var t=NEJ.P,e=t("nej.e"),n=(t("nej.v"),t("nej.ut"));test("tab",function(){stop();n._$$Tab._$allocate({list:e._$getChildren(e._$get("box")),index:1,onchange:function(t){ok(!0,"上一次页面是:"+t.last),ok(!0,"当前页面是:"+t.index),start()}})})};module("依赖模块"),test("define",function(){expect(0),define("{pro}tab.test.js",["{lib}util/tab/tab.js"],f)});