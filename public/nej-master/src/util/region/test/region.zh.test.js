var f=function(){module("regionSelector");var e=NEJ.P,t=(e("nej.e"),e("nej.v"),e("nej.ut"));test("regionSelector test",function(){expect(0);var e=t._$$RegionSelector._$allocate({province:"a",city:"b",area:"c",data:{province:"浙江省",city:"杭州市",area:"滨江区"},onchange:function(e){}});e._$setRegion({province:"浙江省",city:"杭州市",area:"下城区"})})};module("依赖模块"),test("define",function(){expect(0),define("{pro}region.zh.test.js",["{lib}util/data/region/zh.js","{lib}util/region/region.zh.js"],f)});