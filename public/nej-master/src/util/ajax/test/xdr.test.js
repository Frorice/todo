var f=function(){module("xdr",{setup:function(){this._p=NEJ.P("nej.p"),this._e=NEJ.P("nej.e"),this._j=NEJ.P("nej.j")},teardown:function(){}}),test("正常的xdr",function(){expect(0),stop();var t="http://123.163.com:3000/xhr/getLog",o={};this._j._$request(t,{type:"json",method:"post",data:o,timeout:1e3,onload:function(t){start(),t&&ok(!0,"请求正常返回，返回值是"+t.name)},onerror:function(t){start()}})}),test("upload表单,低版本浏览器",function(){stop();var t=this._e._$get("upload"),o=this._e._$get("progress");this._j._$upload(t,{mode:0,nocookie:!0,onuploading:function(t){t.total&&t.progress&&(o.value=t.progress,ok(!0,"打印出一个进度来"+t.progress))},onload:function(t){ok(!0,t.url),start()}})})};NEJ.define(["{lib}util/ajax/xdr.js"],f);